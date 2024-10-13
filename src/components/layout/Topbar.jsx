import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
      <div className="flex items-center justify-end p-4 border-b border-gray-200 fixed top-0 left-64 right-0 bg-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 px-3 py-2 pl-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"/>
          </div>
          <button onClick={() => navigate('/mypage')}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <User className="w-5 h-5 text-gray-700"/>
          </button>
        </div>
      </div>
  );
};

export default Topbar;
