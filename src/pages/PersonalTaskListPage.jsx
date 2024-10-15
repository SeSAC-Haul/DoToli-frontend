import React from 'react';
import useTaskList from '../hooks/useTaskList';
import TaskListPage from '../components/TaskListPage';

const PersonalTaskListPage = () => {
  const {
    tasks,
    content,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle
  } = useTaskList('/tasks');

  return (
      <TaskListPage
          title="개인 할 일 목록"
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

export default PersonalTaskListPage;