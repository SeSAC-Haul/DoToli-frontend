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
  const [isFiltered, setIsFiltered] = useState(false);

  const {
    tasks,
    content,
    totalPages,
    page,
    deadline,
    time,
    flag,
    showDetails,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchFilteredTasks,
    resetFilters,
    setPage,
    setDeadline,
    setTime,
    setFlag,
    setShowDetails,
    currentFilters
  } = useTaskList(`/teams/${teamId}/tasks`, teamId);

  const handleFilterApply = async (filters) => {
    setIsFiltered(true);
    setPage(0);
    await fetchFilteredTasks(filters, 0);
  };

  const handleResetFilters = async () => {
    setIsFiltered(false);
    setPage(0);
    await resetFilters();
  };

  const handlePageChange = (newPage) => {
    const pageIndex = newPage - 1;
    setPage(pageIndex);
    if (isFiltered && currentFilters) {
      fetchFilteredTasks(currentFilters, pageIndex);
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const teamResponse = await api.get(`/teams/${teamId}`);
        if (teamResponse.status === 200) {
          setTeamName(teamResponse.data.teamName);
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert(err.response.data.message);
          navigate('/');
        } else {
          console.error('Team data fetch error:', err);
          setError('팀 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId, navigate]);

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
      <div>
        <TaskListPage
            title={`${teamName} 팀 할 일 목록`}
            tasks={tasks}
            content={content}
            handleContentChange={handleContentChange}
            handleAddTask={handleAddTask}
            handleTaskToggle={handleTaskToggle}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
            handleFilterApply={handleFilterApply}
            handleResetFilters={handleResetFilters}
            isFiltered={isFiltered}
            isLoading={isLoading}
            teamId={teamId}
            // 추가된 props
            deadline={deadline}
            time={time}
            flag={flag}
            setDeadline={setDeadline}
            setTime={setTime}
            setFlag={setFlag}
            showDetails={showDetails}
            toggleDetails={setShowDetails}
        />
        {tasks.length > 0 && (
            <Pagination
                currentPage={page + 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onFirstPage={() => handlePageChange(1)}
                onLastPage={() => handlePageChange(totalPages)}
                onNextPage={() => handlePageChange(Math.min(page + 2, totalPages))}
                onPreviousPage={() => handlePageChange(Math.max(page, 1))}
            />
        )}
      </div>
  );
};

export default TeamTaskListPage;
