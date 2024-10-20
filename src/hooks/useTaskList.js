import { useCallback, useEffect, useState } from 'react';
import api from "../services/api.js";

const useTaskList = (baseUrl) => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');

  // 로딩 상태를 관리하기 위한 state 추가
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    // 로딩 상태 시작
    setIsLoading(true);
    try {
      const response = await api.get(baseUrl);
      console.log(response.data);

      // 배열 확인
      if (Array.isArray(response.data.content)) { // 응답 데이터에서 content 배열 추출
        setTasks(response.data.content);
      } else {
        setTasks([]); // 배열이 아닌 경우 빈 배열로 설정하여 안전하게 유지
      }

    } catch (err) {
      console.error(err);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log({ content, teamId: 1 });
    try {
      await api.post(baseUrl, { content });
      setContent('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 추가에 실패했습니다.');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`${baseUrl}/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const handleTaskEdit = async (taskId, newContent) => {
    try {
      await api.put(`${baseUrl}/${taskId}`, { content: newContent });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      await api.put(`${baseUrl}/${taskId}/toggle`, { done: !tasks.find(task => task.id === taskId).done });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 상태 변경에 실패했습니다.');
    }
  };

  return {
    tasks,
    content,
    isLoading, // 로딩 상태 반환
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    fetchTasks
  };
};

export default useTaskList;
