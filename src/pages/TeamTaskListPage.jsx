import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import api from "../services/api.js";
import { useParams } from "react-router-dom";

const TeamTaskListPage = () => {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/team/${teamId}/tasks`);
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
      await api.post(`/team/${teamId}/tasks`, { content });
      setContent('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 추가에 실패했습니다.');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`/team/${teamId}/tasks/${taskId}`);
      fetchTasks();  // 삭제 후 목록 새로고침
    } catch (err) {
      console.error(err);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const handleTaskEdit = async (taskId, newContent) => {
    try {
      await api.put(`/team/${teamId}/tasks/${taskId}`, { content: newContent });
      fetchTasks();  // 수정 후 목록 새로고침
    } catch (err) {
      console.error(err);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      await api.put(`/team/${teamId}/tasks/${taskId}/toggle`, { done: !tasks.find(task => task.id === taskId).done });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 상태 변경에 실패했습니다.');
    }
  };

  return (
      <div className="flex flex-col items-center justify-start min-h-screen p-8">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          {/* TODO 팀 이름 조회 필요 */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">팀 이름 할 일 목록</h2>
          <form onSubmit={handleAddTask} className="mb-6">
            <div className="flex items-center">
              <input
                  type="text"
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  required
                  className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새로운 할 일을 입력하세요"
              />
              <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                추가
              </button>
            </div>
          </form>
          <TaskList
              tasks={tasks}
              onTaskToggle={handleTaskToggle}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
          />
        </div>
      </div>
  );
};

export default TeamTaskListPage;