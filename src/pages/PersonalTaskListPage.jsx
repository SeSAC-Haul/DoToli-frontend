import React from 'react';
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';

const PersonalTaskListPage = () => {
  const {
    tasks,
    content,
    deadline,
    time,
    flag,
    showDetails,
    setDeadline,
    setTime,
    setFlag,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    toggleDetails,
  } = useTaskList('/tasks');

  return (
      <TaskListPage
          title="나의 할 일 목록"
          tasks={tasks}
          content={content}
          deadline={deadline}
          time={time}
          flag={flag}
          showDetails={showDetails}
          setDeadline={setDeadline}
          setTime={setTime}
          setFlag={setFlag}
          handleContentChange={handleContentChange}
          handleAddTask={handleAddTask}
          handleTaskToggle={handleTaskToggle}
          handleTaskDelete={handleTaskDelete}
          handleTaskEdit={handleTaskEdit}
          toggleDetails={toggleDetails}
      />
  );
};

export default PersonalTaskListPage;
