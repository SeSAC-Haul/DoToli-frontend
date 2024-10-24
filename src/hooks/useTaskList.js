import { useCallback, useEffect, useState } from 'react';
import api from "../services/api.js";

const useTaskList = (baseUrl) => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');

  // 상세옵션 상태 관리
  const [showDetails, setShowDetails] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState('');
  const [flag, setFlag] = useState(false);

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

    let finalDeadline = null;

    // 마감일과 마감시간을 병합하여 LocalDateTime 형태로 생성
    if (deadline && !time) {
      // 마감일만 선택된 경우, 시간을 23:59로 설정
      finalDeadline = `${deadline}T23:59:00`;
    } else if (!deadline && time) {
      // 마감시간만 선택된 경우, 현재 날짜를 마감일로 설정
      const today = new Date().toISOString().split('T')[0];
      finalDeadline = `${today}T${time}:00`;
    } else if (deadline && time) {
      // 마감일과 마감시간 모두 선택된 경우
      finalDeadline = `${deadline}T${time}:00`;
    }

    // 모든 값이 선택되지 않은 경우 -> 기본 마감일 및 마감시간 설정
    if (!deadline && !time) {
      // 아무 것도 설정되지 않은 경우에는 그냥 null로 유지해도 무방합니다.
      finalDeadline = null;
    }

    // 최종 데이터 구성
    const data = {
      content,
      deadline: finalDeadline, // 마감일과 마감시간이 설정되지 않았다면 null로 유지됨
      flag: flag || false, // 플래그를 설정하지 않았다면 기본값 false
    };

    console.log("Sending data to backend:", data); // 데이터 확인용 콘솔 출력

    try {
      await api.post(baseUrl, data);
      setContent('');
      setDeadline('');
      setTime('');
      setFlag(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('할 일 추가에 실패했습니다.');
    }
  };

  // 상세 옵션 폼 표시/숨기기
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
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

  const handleTaskEdit = async (taskId, updatedTask) => {
    try {
      // 모든 수정된 데이터를 포함하여 PUT 요청 전송
      await api.put(`${baseUrl}/${taskId}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchTasks(); // 수정 후 할 일 목록 갱신
    } catch (err) {
      console.error("Error editing task:", err);
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
    isLoading,
    deadline,
    time,
    flag,
    showDetails,
    handleContentChange,
    handleAddTask,
    handleTaskDelete,
    handleTaskEdit,
    handleTaskToggle,
    setDeadline,
    setTime,
    setFlag,
    toggleDetails,
    fetchTasks,
  };
};

export default useTaskList;
