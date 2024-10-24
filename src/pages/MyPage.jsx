import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.log(err);
      alert('데이터를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  const totalTasks = userData.totalTaskCount || 0;
  const completedTasks = userData.completedTaskCount || 0;

  return (
      <div className="p-5 mt-1 w-1/2">
        <h1 className="text-2xl font-semibold mb-10">My Page</h1>
        <h2 className="text-lg mb-4">{userData.nickname}</h2>
        <h2 className="text-md text-gray-500 mb-4">{userData.email}</h2>

        <div className="bg-gray-100 rounded-lg p-8 mt-16 ">

          <h2 className="text-lg font-semibold mb-4">My DoToli</h2>
          <div className="border-t border-gray-300 w-full my-4 mb-10"></div>

          <div className="flex flex-col items-center mb-20">
            <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg mb-4">
              <h3 className="text-3xl font-bold">{userData.achievementRate}%</h3>
              <p className="text-lg mt-2">Achievement Rate</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <h3 className="text-3xl font-bold">{totalTasks}</h3>
                <p className="text-lg mt-2">All my DoToli</p>
              </div>

              <div className="bg-yellow-400 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <h3 className="text-3xl font-bold">{completedTasks}</h3>
                <p className="text-lg mt-2">My Completed DoToli</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">My Team</h2>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <ul className="space-y-2">
                </ul>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">Invitation</h2>
              <div className="bg-gray-100 rounded-lg p-4">
                <ul className="space-y-2">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyPage;
