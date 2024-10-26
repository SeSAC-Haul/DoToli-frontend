import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerifiedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get('status');
    const messageParam = queryParams.get('message');

    setStatus(statusParam);
    setMessage(messageParam || '');
  }, [location]);

  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white shadow-md rounded-md">
          {status === 'success' ? (
              <h1 className="text-green-600 font-bold text-xl">이메일 인증이 완료되었습니다!</h1>
          ) : (
              <>
                <h1 className="text-red-600 font-bold text-xl">이메일 인증에 실패했습니다.</h1>
                {message && <p className="text-gray-600 mt-2">{message}</p>}
                <button
                    onClick={() => navigate('/signup')}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  다시 인증하기
                </button>
              </>
          )}
        </div>
      </div>
  );
};

export default EmailVerifiedPage;
