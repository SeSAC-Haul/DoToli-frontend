import React from "react";
import { Leaf, PlusCircle, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
      <div className="w-64 bg-white p-4 border-r border-gray-200 h-screen fixed">
        <div className="flex items-center mb-20 ml-2">
          <Leaf className="h-12 w-12 text-green-600"/>
          <span className="ml-2 text-3xl font-semibold cursor-pointer" onClick={() => navigate('/')}>
          DoToli
        </span>
        </div>
        <nav className="space-y-6 ml-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <User className="h-4 w-4 mr-2"/>
              개인 작업 공간
            </h3>
            <a href="#" className="flex items-center hover:bg-blue-50 rounded-md p-2">
              <span className="mr-3">My Todo</span>
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-2"/>
              팀 작업 공간
            </span>
              <PlusCircle className="cursor-pointer"/>
            </h3>
            <ul className="space-y-2">
              {['My Team', 'My Team', 'My Team'].map((team, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md p-2">
                      {team}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
  )
}

export default Sidebar;