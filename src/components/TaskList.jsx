import React from 'react';
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, onTaskToggle, onTaskDelete, handleTaskEdit }) => {

  return (
      <ul className="space-y-3">
        {tasks.map(task => (
            <TaskItem
                key={task.id}
                task={task}
                onTaskToggle={onTaskToggle}
                onTaskDelete={onTaskDelete}
                handleTaskEdit={handleTaskEdit}
            />
        ))}
      </ul>
  );
};

export default TaskList;
