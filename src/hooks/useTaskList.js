import { useCallback, useEffect, useState } from 'react';
import api from "../services/api.js";

const useTaskList = (baseUrl) => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get(baseUrl);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(baseUrl, { content });
      setContent('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 추가에 실패했습니다.');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`${baseUrl}/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const handleTaskEdit = async (taskId, newContent) => {
    try {
      await api.put(`${baseUrl}/${taskId}`, { content: newContent });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      await api.put(`${baseUrl}/${taskId}/toggle`, { done: !tasks.find(task => task.id === taskId).done });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 상태 변경에 실패했습니다.');
    }
  };

  return {
    tasks,
    content,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchTasks
  };
};

export default useTaskList;