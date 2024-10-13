import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';
import api from "../services/api.js";

const TeamTaskListPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    tasks,
    content,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchTasks
  } = useTaskList(`/team/${teamId}/tasks`);

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const teamResponse = await api.get(`/team/${teamId}`);
        setTeamName(teamResponse.data.name);
        await fetchTasks();
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 403) {
          setError('이 팀에 접근할 권한이 없습니다.');
          navigate('/');
        } else {
          setError('팀 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId, navigate, fetchTasks]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <TaskListPage
          title={`${teamName} 할 일 목록`}
          tasks={tasks}
          content={content}
          handleContentChange={handleContentChange}
          handleAddTask={handleAddTask}
          handleTaskToggle={handleTaskToggle}
          handleTaskDelete={handleTaskDelete}
          handleTaskEdit={handleTaskEdit}
      />
  );
};

export default TeamTaskListPage;