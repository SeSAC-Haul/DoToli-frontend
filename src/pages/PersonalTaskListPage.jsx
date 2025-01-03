import React, { useState } from 'react';
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';
import Pagination from '../components/Pagination';

const PersonalTaskListPage = () => {
  const {
    // Data states
    tasks,
    content,
    totalPages,
    page,
    currentFilters,
    isLoading,
    deadline,
    time,
    flag,
    showDetails,

    // Event handlers
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchFilteredTasks,
    resetFilters,
    toggleDetails,

    // Setters
    setPage,
    setDeadline,
    setTime,
    setFlag
  } = useTaskList('/tasks');

  const [isFiltered, setIsFiltered] = useState(false);

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

  return (
      <div>
        <TaskListPage
            // Basic props
            title="개인 할 일 목록"
            tasks={tasks}
            content={content}
            isLoading={isLoading}

            // Event handlers
            handleContentChange={handleContentChange}
            handleAddTask={handleAddTask}
            handleTaskToggle={handleTaskToggle}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
            handleFilterApply={handleFilterApply}
            handleResetFilters={handleResetFilters}

            // Filter states
            isFiltered={isFiltered}

            // Detail option props
            deadline={deadline}
            time={time}
            flag={flag}
            showDetails={showDetails}
            setDeadline={setDeadline}
            setTime={setTime}
            setFlag={setFlag}
            toggleDetails={toggleDetails}
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

export default PersonalTaskListPage;
