import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import api from "../services/api.js";

const PersonalTaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { content });
      setContent('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 추가에 실패했습니다.');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();  // 삭제 후 목록 새로고침
    } catch (err) {
      console.error(err);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const handleTaskEdit = async (taskId, newContent) => {
    try {
      await api.put(`/tasks/${taskId}`, { content: newContent });
      fetchTasks();  // 수정 후 목록 새로고침
    } catch (err) {
      console.error(err);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}/toggle`, { done: !tasks.find(task => task.id === taskId).done });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 상태 변경에 실패했습니다.');
    }
  };

  return (
      <div>
        <h2>개인 할 일 목록</h2>
        <form onSubmit={handleAddTask}>
          <div>
            <label htmlFor="content">할 일:</label>
            <input
                type="text"
                id="content"
                name="content"
                value={content}
                onChange={handleContentChange}
                required
            />
          </div>
          <button type="submit">할 일 추가</button>
        </form>
        <TaskList
            tasks={tasks}
            onTaskToggle={handleTaskToggle}
            onTaskDelete={handleTaskDelete}
            onTaskEdit={handleTaskEdit}
        />
      </div>
  );
};

export default PersonalTaskListPage;