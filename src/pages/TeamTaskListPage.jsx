import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';
import Pagination from '../components/Pagination';
import api from '../services/api';

const TeamTaskListPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const {
    tasks = [],
    content,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchTasks,
    setPage: setTaskPage,
  } = useTaskList(`/teams/${teamId}/tasks`, teamId);

  useEffect(() => {
    console.log("Tasks:", tasks);
  }, [tasks]);

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const teamResponse = await api.get(`/teams/${teamId}`);
        setTeamName(teamResponse.data.teamName);
        if (teamResponse.status === 200) {
          await fetchTasks();
          const response = await api.get(`/teams/${teamId}/tasks?page=${page}`);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert(err.response.data.message);
          navigate('/');
        } else {
          console.log(err);
          setError('팀 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId, navigate, fetchTasks, page]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFirstPage = () => setPage(0);
  const handleLastPage = () => setPage(totalPages - 1);
  const handleNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));
  const handlePageChange = (pageNumber) => setPage(pageNumber - 1);

  return (
      <div>
        <TaskListPage
            title={`${teamName} 팀 할 일 목록`}
            tasks={Array.isArray(tasks.content) ? tasks.content : []}
            content={content}
            handleContentChange={handleContentChange}
            handleAddTask={handleAddTask}
            handleTaskToggle={handleTaskToggle}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
        />
        <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
        />
      </div>
  );
};


export default TeamTaskListPage;
