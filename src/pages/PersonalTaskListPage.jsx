import React, { useState, useEffect } from 'react';
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';
import Pagination from '../components/Pagination';
import api from '../services/api';

const PersonalTaskListPage = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
  } = useTaskList(`/tasks`);

  useEffect(() => {
    console.log("Tasks state updated:", tasks);
  }, [tasks]);

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await api.get(`/tasks?page=${page}`);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching total pages", error);
      }
    };

    fetchTotalPages();
  }, [page]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 데이터를 로딩 중일 때 로딩 상태 표시
  }

  const handleFirstPage = () => setPage(0);
  const handleLastPage = () => setPage(totalPages - 1);
  const handleNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));
  const handlePageChange = (pageNumber) => setPage(pageNumber - 1);

  return (
      <div>
        <TaskListPage
            title="개인 할 일 목록"
            // tasks={Array.isArray(tasks.content) ? tasks.content : []}
            tasks={tasks}
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


export default PersonalTaskListPage;
