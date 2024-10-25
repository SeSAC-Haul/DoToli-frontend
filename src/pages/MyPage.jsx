import React, { useEffect, useState } from "react";
import axios from "axios";
import InvitationItem from "../components/InvitationItem";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/mypage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.log(err);
      alert("데이터를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveInvitation = (invitationId) => {
    setUserData((prevData) => ({
      ...prevData,
      invitations: prevData.invitations.filter((inv) => inv.id !== invitationId),
    }));
  };

  const handleAcceptInvitation = async (invitationId) => {
    try {
      await axios.post(`http://localhost:8080/api/invitations/accept/${invitationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // 팀 목록을 업데이트하기 위해 재요청
    } catch (error) {
      console.error("초대 수락에 실패했습니다.", error);
    }
  };

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  const totalTasks = userData.totalTaskCount || 0;
  const completedTasks = userData.completedTaskCount || 0;

  return (
      <div className="p-5 mt-1 w-2/3">
        <h1 className="text-2xl font-semibold mb-10">My Page</h1>
        <h2 className="text-lg mb-4">{userData.nickname}</h2>
        <h2 className="text-md text-gray-500 mb-4">{userData.email}</h2>

        <div className="bg-gray-100 rounded-lg p-8 mt-16 ">
          <h2 className="text-lg font-semibold mb-4">My DoToli</h2>

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
          <div className="bg-gray-100 rounded-lg p-8 mt-16">
            <h2 className="text-lg font-semibold mb-4">Invitations</h2>
            <div className="border-t border-gray-300 w-full my-4 mb-10"></div>
            <div className="flex justify-between items-center space-x-4 pb-2 mb-2 bg-gray-100 sticky top-0 z-10">
              <span className="w-1/4 font-semibold text-center">Nickname</span>
              <span className="w-1/4 font-semibold text-center">Email</span>
              <span className="w-1/4 font-semibold text-center">Team Name</span>
              <span className="w-1/4 font-semibold text-center">Actions</span>
            </div>

            <div className="bg-white rounded-lg p-4 max-h-64 overflow-y-auto">
              <ul className="space-y-2">
                {userData.invitations.length > 0 ? (
                    userData.invitations.map((invitation) => (
                        <InvitationItem
                            key={invitation.id}
                            invitation={invitation}
                            onAccept={handleAcceptInvitation}
                            onRemove={handleRemoveInvitation}
                        />
                    ))
                ) : (
                    <li className="text-center">팀 초대 목록이 존재하지 않습니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyPage;
