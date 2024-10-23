import { useCallback, useEffect, useState } from 'react';
import api from '../services/api.js';

const useTaskList = (baseUrl, teamId = null) => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');
  const [page, setPage] = useState(0); // 페이지 번호 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // GET 요청: 페이지 번호가 필요한 경우에만 사용
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await api.get(`${baseUrl}?page=${page}`);
      setTasks(response.data.content || []); // 할 일 목록만 저장
    } catch (err) {
      console.error('Error fetching tasks:', err);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [baseUrl, page]);

  // 페이지 변경 시 할 일 목록 다시 불러오기
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // POST 요청: 쿼리 파라미터를 제거하여 사용
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!content.trim()) return; // 내용이 비어있는 경우 추가하지 않음
    try {
      setIsLoading(true); // 로딩 시작
      const postUrl = teamId ? `/teams/${teamId}/tasks` : '/tasks';
      await api.post(postUrl, { content });
      setContent('');
      fetchTasks(); // 할 일 목록 다시 불러오기
    } catch (err) {
      console.error('Error adding task:', err);
      alert('할 일 추가에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTaskDelete = async (taskId) => {
    try {
      setIsLoading(true); // 로딩 시작
      const deleteUrl = teamId ? `/teams/${teamId}/tasks/${taskId}` : `/tasks/${taskId}`;
      await api.delete(deleteUrl);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('할 일 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleTaskEdit = async (taskId, newContent) => {
    if (!newContent.trim()) return; // 내용이 비어있는 경우 수정하지 않음
    try {
      setIsLoading(true); // 로딩 시작
      const putUrl = teamId ? `/teams/${teamId}/tasks/${taskId}` : `/tasks/${taskId}`;
      await api.put(putUrl, { content: newContent });
      fetchTasks();
    } catch (err) {
      console.error('Error editing task:', err);
      alert('할 일 수정에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      setIsLoading(true); // 로딩 시작
      const toggleUrl = teamId ? `/teams/${teamId}/tasks/${taskId}/toggle` : `/tasks/${taskId}/toggle`;
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        await api.put(toggleUrl, { done: !task.done });
        fetchTasks();
      }
    } catch (err) {
      console.error('Error toggling task:', err);
      alert('할 일 상태 변경에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return {
    tasks,
    content,
    isLoading,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchTasks,
    setPage, // 페이지 변경 함수 추가
  };
};

export default useTaskList;
