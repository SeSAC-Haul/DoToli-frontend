import React from 'react';
import TaskList from '../components/TaskList';

const TaskListPage = ({
                        title,
                        tasks,
                        content,
                        handleContentChange,
                        handleAddTask,
                        handleTaskToggle,
                        handleTaskDelete,
                        handleTaskEdit
                      }) => {
  return (
      <div className="flex flex-col items-center justify-start min-h-screen p-8">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
          <form onSubmit={handleAddTask} className="mb-6">
            <div className="flex items-center">
              <input
                  type="text"
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  required
                  className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새로운 할 일을 입력하세요"
              />
              <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                추가
              </button>
            </div>
          </form>
          <TaskList
              tasks={tasks}
              onTaskToggle={handleTaskToggle}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
          />
        </div>
      </div>
  );
};

export default TaskListPage;