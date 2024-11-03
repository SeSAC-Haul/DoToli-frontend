import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

const InviteModal = ({ isOpen, onClose, teamId }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      const response = await api.post(`/teams/${teamId}/invitations`, {
        inviteeEmail: email.trim()
      });

      if (response.status === 200) {
        alert('초대가 성공적으로 전송되었습니다.');
        setEmail('');
        onClose();
      }
    } catch (error) {
      console.error('Team invitation error:', error);
      if (error.response?.status === 404) {
        alert('존재하지 않는 사용자입니다.');
      } else if (error.response?.status === 409) {
        alert('이미 팀에 소속된 사용자입니다.');
      } else {
        alert('팀원 초대 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">팀원 초대하기</h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500"/>
            </button>
          </div>

          {/* 초대 폼 */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 주소
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="초대할 사용자의 이메일을 입력하세요"
                  required
              />
            </div>

            {/* 버튼 섹션 */}
            <div className="flex space-x-3">
              <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                취소
              </button>
              <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? '초대중...' : '초대하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default InviteModal;
