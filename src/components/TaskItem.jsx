import React, { useState } from 'react';

const TaskItem = ({ task, onTaskToggle, onTaskDelete, handleTaskEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline ? task.deadline.split('T')[0] : ''); // 마감일
  const [editedTime, setEditedTime] = useState(task.deadline ? task.deadline.split('T')[1]?.substring(0, 5) : ''); // 마감시간
  const [editedFlag, setEditedFlag] = useState(task.flag); // 플래그 상태

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(task.content);
    setEditedDeadline(task.deadline ? task.deadline.split('T')[0] : '');
    setEditedTime(task.deadline ? task.deadline.split('T')[1]?.substring(0, 5) : '');
    setEditedFlag(task.flag);
  };

  const handleSaveClick = () => {
    let finalDeadline = null;

    if (editedDeadline && !editedTime) {
      finalDeadline = `${editedDeadline}T23:59:00`;
    } else if (!editedDeadline && editedTime) {
      const today = new Date().toISOString().split('T')[0];
      finalDeadline = `${today}T${editedTime}:00`;
    } else if (editedDeadline && editedTime) {
      finalDeadline = `${editedDeadline}T${editedTime}:00`;
    }

    const updatedTask = {
      content: editedContent,
      deadline: finalDeadline,
      flag: editedFlag,
    };

    handleTaskEdit(task.id, updatedTask);
    setIsEditing(false);
  };

  const formattedCreatedAt = new Date(task.createdAt).toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  });

  const calculateDday = (deadline) => {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? 'D-Day' : `D+${Math.abs(diffDays)}`;
  };

  const dDay = calculateDday(task.deadline);

  return (
      <li className="flex items-start justify-between p-4 border rounded-md mb-4">
        {isEditing ? (
            <div className="w-full">
              <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                  type="date"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                  type="time"
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    checked={editedFlag}
                    onChange={(e) => setEditedFlag(e.target.checked)}
                    className="mr-2"
                />
                <label>Flag 설정</label>
              </div>
              <button
                  onClick={handleSaveClick}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                저장
              </button>
              <button
                  onClick={handleCancelClick}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                취소
              </button>
            </div>
        ) : (
            <>
            <div className="flex items-start flex-grow">
              <div className="flex items-center">
                {/* 체크박스 */}
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onTaskToggle(task.id)}
                    className="mr-4 transform scale-150"
                />
                {/* 할 일 내용 및 추가 정보 */}
                <div className="flex flex-col">
                  <span className="block text-lg font-medium">{task.content}</span>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{task.flag ? '⚑' : ''}</span> {' '}
                    <span>{dDay}</span>
                  </div>
                </div>
              </div>
            </div>
              {/* 수정 및 삭제 버튼 */}
              <div className="flex items-center ml-4">
                <button
                    onClick={handleEditClick}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                    onClick={() => onTaskDelete(task.id)}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </>
            )}
            </li>
        );
        };

        export default TaskItem;
