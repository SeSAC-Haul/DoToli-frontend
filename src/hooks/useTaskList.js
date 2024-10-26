import { useCallback, useEffect, useState, useRef } from 'react';
import api from '../services/api.js';

const useTaskList = (baseUrl, teamId = null) => {
  // Basic states
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentFilters, setCurrentFilters] = useState(null);
  const isInitialMount = useRef(true);
  const timeoutRef = useRef(null);

  // Detail option states
  const [showDetails, setShowDetails] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState('');
  const [flag, setFlag] = useState(false);

  const fetchTasks = useCallback(async (currentPage = 0) => {
    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks` : '/tasks';
      const response = await api.get(url, {
        params: {
          page: currentPage,
          size: 5
        }
      });
      setTasks(response.data.content || []);
      setTotalPages(response.data.totalPages);
      return response.data;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  const fetchFilteredTasks = useCallback(async (filters, currentPage = 0) => {
    if (!filters) return;

    try {
      setIsLoading(true);
      const filterUrl = teamId ? `/teams/${teamId}/tasks/filter` : '/tasks/filter';

      const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== false) {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (Object.keys(cleanedFilters).length === 0) {
        return fetchTasks(currentPage);
      }

      if (cleanedFilters.keyword?.trim()) {
        cleanedFilters.keyword = cleanedFilters.keyword.trim();
      }

      const response = await api.get(filterUrl, {
        params: {
          ...cleanedFilters,
          page: currentPage,
          size: 5
        }
      });

      setTasks(response.data.content || []);
      setTotalPages(response.data.totalPages);
      return response.data;
    } catch (err) {
      console.error('Error fetching filtered tasks:', err);
      alert('필터링된 할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [teamId, fetchTasks]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchTasks(page);
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (currentFilters) {
        fetchFilteredTasks(currentFilters, page);
      } else {
        fetchTasks(page);
      }
    }, 300);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [page, fetchTasks, fetchFilteredTasks, currentFilters]);

  const getFinalDeadline = () => {
    if (deadline && !time) {
      return `${deadline}T23:59:00`;
    } else if (!deadline && time) {
      const today = new Date().toISOString().split('T')[0];
      return `${today}T${time}:00`;
    } else if (deadline && time) {
      return `${deadline}T${time}:00`;
    }
    return null;
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks` : '/tasks';
      await api.post(url, {
        content: content,
        flag: flag,
        deadline: getFinalDeadline()
      });

      // Reset form
      setContent('');
      setDeadline('');
      setTime('');
      setFlag(false);
      setShowDetails(false);

      // Refresh tasks
      if (currentFilters) {
        await fetchFilteredTasks(currentFilters, page);
      } else {
        await fetchTasks(page);
      }
    } catch (err) {
      console.error('Error adding task:', err);
      alert('할 일 추가에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks/${taskId}` : `/tasks/${taskId}`;
      await api.delete(url);
      if (currentFilters) {
        await fetchFilteredTasks(currentFilters, page);
      } else {
        await fetchTasks(page);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('할 일 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskEdit = async (taskId, updatedTask) => {
    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks/${taskId}` : `/tasks/${taskId}`;
      await api.put(url, updatedTask);

      if (currentFilters) {
        await fetchFilteredTasks(currentFilters, page);
      } else {
        await fetchTasks(page);
      }
    } catch (err) {
      console.error('Error editing task:', err);
      alert('할 일 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks/${taskId}/toggle` : `/tasks/${taskId}/toggle`;
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        await api.put(url, { done: !task.done });
        if (currentFilters) {
          await fetchFilteredTasks(currentFilters, page);
        } else {
          await fetchTasks(page);
        }
      }
    } catch (err) {
      console.error('Error toggling task:', err);
      alert('할 일 상태 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = useCallback(async () => {
    setCurrentFilters(null);
    setPage(0);
    await fetchTasks(0);
  }, [fetchTasks]);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return {
    // Data
    tasks,
    content,
    totalPages,
    page,
    currentFilters,
    isLoading,
    deadline,
    time,
    flag,
    showDetails,

    // Handlers
    handleContentChange: (e) => setContent(e.target.value),
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchFilteredTasks: async (filters, currentPage) => {
      setCurrentFilters(filters);
      await fetchFilteredTasks(filters, currentPage);
    },
    resetFilters,
    toggleDetails,

    // Setters
    setPage,
    setCurrentFilters,
    setDeadline,
    setTime,
    setFlag,
    setShowDetails
  };
};

export default useTaskList;
