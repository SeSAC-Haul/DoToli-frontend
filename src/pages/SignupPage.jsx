import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

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
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg px-8 py-10">
            <div className="flex justify-center items-center mb-5">
              {/* TODO 로고 생성 시 교체 필요 */}
              <Leaf className="h-12 w-12 text-green-600"/>
              <span className="ml-3 font-bold text-2xl text-gray-800">DoToli</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">회원가입</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="user@example.com"
                    required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호"
                    required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                  닉네임
                </label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="닉네임"
                    required
                />
              </div>
              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              >
                회원가입
              </button>
            </form>
            <button
                onClick={() => navigate('/signin')}
                className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
  );
};

export default SignupPage;