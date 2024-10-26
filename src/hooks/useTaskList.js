import { useCallback, useEffect, useState, useRef } from 'react';
import api from '../services/api.js';

const useTaskList = (baseUrl, teamId = null) => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentFilters, setCurrentFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousFiltersRef = useRef();

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
    try {
      setIsLoading(true);
      const filterUrl = teamId ? `/teams/${teamId}/tasks/filter` : '/tasks/filter';
      const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== false) {
          acc[key] = value;
        }
        return acc;
      }, {});

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
      setCurrentFilters(cleanedFilters);
      return response.data;
    } catch (err) {
      console.error('Error fetching filtered tasks:', err);
      alert('필터링된 할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    const filtersChanged = JSON.stringify(currentFilters) !== JSON.stringify(previousFiltersRef.current);
    previousFiltersRef.current = currentFilters;

    if (filtersChanged || page !== undefined) {
      if (currentFilters) {
        fetchFilteredTasks(currentFilters, page);
      } else {
        fetchTasks(page);
      }
    }
  }, [page, fetchTasks, fetchFilteredTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks` : '/tasks';
      await api.post(url, {
        content: content,
        flag: false,
        deadline: null
      });
      setContent('');

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

  const handleTaskEdit = async (taskId, newContent) => {
    if (!newContent.trim()) return;
    try {
      setIsLoading(true);
      const url = teamId ? `/teams/${teamId}/tasks/${taskId}` : `/tasks/${taskId}`;
      const task = tasks.find(t => t.id === taskId);
      await api.put(url, {
        content: newContent,
        flag: task?.flag || false,
        deadline: task?.deadline || null
      });

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

  return {
    tasks,
    content,
    totalPages,
    page,
    currentFilters,
    isLoading,
    handleContentChange: (e) => setContent(e.target.value),
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchFilteredTasks,
    resetFilters,
    setPage,
    setCurrentFilters
  };
};

export default useTaskList;
