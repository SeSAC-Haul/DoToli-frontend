import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';
import api from "../services/api.js";

const TeamTaskListPage = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('');
  const {
    tasks,
    content,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle
  } = useTaskList(`/team/${teamId}/tasks`);

  useEffect(() => {
    const fetchTeamName = async () => {
      try {
        const response = await api.get(`/team/${teamId}`);
        setTeamName(response.data.name);
      } catch (err) {
        console.error(err);
        alert('팀 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchTeamName();
  }, [teamId]);

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