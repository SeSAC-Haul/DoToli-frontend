import React from 'react';
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, onTaskToggle, onTaskDelete, onTaskEdit }) => {
  return (
      <ul>
        {tasks.map(task => (
            <TaskItem
                key={task.id}
                task={task}
                onTaskToggle={onTaskToggle}
                onTaskDelete={onTaskDelete}
                onTaskEdit={onTaskEdit}
            />
        ))}
      </ul>
  );
};

export default TaskList;