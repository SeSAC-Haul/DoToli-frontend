import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          'http://localhost:8080/api/auth/signup',
          formData
      );
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/signin');
      }
    } catch (err) {
      console.log(err);
      alert('회원가입에 실패하였습니다.')
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-96">
          <h3 className="text-2xl font-bold text-center">회원가입</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">이메일</label>
                <input
                    type="email"
                    placeholder="이메일"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    placeholder="비밀번호"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    placeholder="닉네임"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button type="submit"
                        className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">회원가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignupPage;