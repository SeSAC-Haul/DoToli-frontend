import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { logout } from "../../services/api.js";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
      <div className="flex items-center justify-end p-4 border-b border-gray-200 fixed top-0 left-64 right-0 bg-white">
        <div className="flex items-center space-x-4">

          <button onClick={() => navigate('/mypage')}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <User className="w-5 h-5 text-gray-700"/>
          </button>
          <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4"/>
            <span>로그아웃</span>
          </button>
        </div>
      </div>
  );
};

export default Topbar;
