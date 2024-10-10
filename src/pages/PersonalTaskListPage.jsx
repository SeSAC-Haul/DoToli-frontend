import React, {useEffect, useState} from 'react';
import TaskList from '../components/TaskList';
import api from "../services/api.js";

const PersonalTaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState('');
    const [page, setPage] = useState(0);  // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(0);  // 전체 페이지 수
    const pageSize = 5;  // 페이지당 항목 수

    useEffect(() => {
        fetchTasks();
    }, [page]);  // 페이지가 변경될 때마다 데이터를 가져옴

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', {
                params: {
                    page: page,
                    size: pageSize
                }
            });
            setTasks(response.data.content);  // tasks 목록 설정
            setTotalPages(response.data.totalPages);  // 전체 페이지 수 설정
        } catch (err) {
            console.error(err);
            alert('할 일 목록을 불러오는데 실패했습니다.');
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', {content});
            setContent('');
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('할 일 추가에 실패했습니다.');
        }
    };

    const handleTaskDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('할 일 삭제에 실패했습니다.');
        }
    };

    const handleTaskEdit = async (taskId, newContent) => {
        try {
            await api.put(`/tasks/${taskId}`, {content: newContent});
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('할 일 수정에 실패했습니다.');
        }
    };

    const handleTaskToggle = async (taskId) => {
        try {
            await api.put(`/tasks/${taskId}/toggle`, {done: !tasks.find(task => task.id === taskId).done});
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('할 일 상태 변경에 실패했습니다.');
        }
    };

    // 페이지네이션 버튼 핸들러
    const handleFirstPage = () => {
        setPage(0);
    };

    const handleLastPage = () => {
        setPage(totalPages - 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">개인 할 일 목록</h2>
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

                {/* 페이지네이션 버튼 */}
                <div className="flex justify-center mt-4">
                    <button onClick={handleFirstPage} disabled={page === 0}
                            className="px-2 py-1 mx-1 bg-gray-300 rounded">{"<<"}</button>
                    <button onClick={handlePreviousPage} disabled={page === 0}
                            className="px-2 py-1 mx-1 bg-gray-300 rounded">{"<"}</button>

                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`px-2 py-1 mx-1 ${page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}

                    <button onClick={handleNextPage} disabled={page === totalPages - 1}
                            className="px-2 py-1 mx-1 bg-gray-300 rounded">{">"}</button>
                    <button onClick={handleLastPage} disabled={page === totalPages - 1}
                            className="px-2 py-1 mx-1 bg-gray-300 rounded">{">>"}</button>
                </div>
            </div>
        </div>
    );
};

export default PersonalTaskListPage;
