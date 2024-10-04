import React, { useState } from 'react';

const TaskItem = ({ task, onTaskToggle, onTaskDelete, onTaskEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditContent(task.content);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(task.content);
  };

  const handleEditSave = () => {
    onTaskEdit(task.id, editContent);
    setIsEditing(false);
  };

  return (
      <li>
        <input
            type="checkbox"
            checked={task.done}
            onChange={() => onTaskToggle(task.id)}
        />
        {isEditing ? (
            <>
              <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={handleEditSave}>저장</button>
              <button onClick={handleEditCancel}>취소</button>
            </>
        ) : (
            <>
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.content}
          </span>
              <button onClick={handleEditStart}>수정</button>
              <button onClick={() => onTaskDelete(task.id)}>삭제</button>
            </>
        )}
      </li>
  );
};

export default TaskItem;