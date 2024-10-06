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
      <li className="flex items-center bg-white p-4 rounded-md shadow">
        <input
            type="checkbox"
            checked={task.done}
            onChange={() => onTaskToggle(task.id)}
            className="mr-3 h-5 w-5 text-blue-500"
        />
        {isEditing ? (
            <>
              <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                  onClick={handleEditSave}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                저장
              </button>
              <button
                  onClick={handleEditCancel}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                취소
              </button>
            </>
        ) : (
            <>
          <span
              className={`flex-grow mr-2 ${task.done ? 'line-through text-gray-500' : 'text-gray-800'}`}
          >
            {task.content}
          </span>
              <button
                  onClick={handleEditStart}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                수정
              </button>
              <button
                  onClick={() => onTaskDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                삭제
              </button>
            </>
        )}
      </li>
  );
};

export default TaskItem;