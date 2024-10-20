import React, {useState} from 'react';
import TaskList from '../components/TaskList';
import { Search } from 'lucide-react'; // lucide-react 아이콘 사용

const TaskListPage = ({
                        title,
                        tasks,
                        content,
                        handleContentChange,
                        handleAddTask,
                        handleTaskToggle,
                        handleTaskDelete,
                        handleTaskEdit,
                        deadline,
                        time,
                        flag,
                        setDeadline,
                        setTime,
                        setFlag,
                      }) => {
  // 추가된 부분: 상세 옵션 폼 보이기/숨기기 위한 상태
  const [showDetails, setShowDetails] = useState(false);

  // 상세 옵션 폼 보이기/숨기기 위한 함수
  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        {/* Search Bar Placeholder */}
        <div className="w-full max-w-2xl mb-4">
          <div className="relative">
            <input
                type="text"
                placeholder="Search Task"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

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
              <button
                  type="button"
                  onClick={toggleDetails}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                +
              </button>
            </div>

            {/* 상세 옵션 폼 */}
            {showDetails && (
                <div className="mt-4 p-4 border border-gray-300 rounded-md">
                  <div className="mb-2">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                      마감일 설정
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      마감 시간 설정
                    </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="flag"
                        checked={flag}
                        onChange={(e) => setFlag(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="flag" className="text-sm font-medium text-gray-700">
                      Flag 설정
                    </label>
                  </div>
                </div>
            )}
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
