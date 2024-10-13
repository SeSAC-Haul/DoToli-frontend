import React, { useEffect, useState } from "react";
import { Leaf, PlusCircle, User, Users, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get("/teams");
      if (response.status === 200) setTeams(response.data);
    } catch (error) {
      console.error("팀 목록을 불러오는데 실패했습니다.", error);
    }
  };

  const createNewTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    try {
      const response = await api.post("/teams", { teamName: newTeamName });
      if (response.status === 200) {
        setNewTeamName("");
        setIsCreatingTeam(false);
        fetchTeams();
      }
    } catch (error) {
      console.error("새 팀 생성에 실패했습니다.", error);
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      }
    }
  };

  const toggleCreateTeam = () => {
    setIsCreatingTeam(!isCreatingTeam);
    if (isCreatingTeam) {
      setNewTeamName("");
    }
  };

  return (
      <div className="w-64 bg-white p-4 border-r border-gray-200 h-screen fixed">
        <div className="flex items-center mb-20 ml-2 cursor-pointer" onClick={() => navigate('/')}>
          <Leaf className="h-12 w-12 text-green-600"/>
          <span className="ml-2 text-3xl font-semibold">DoToli</span>
        </div>
        <nav className="space-y-6 ml-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <User className="h-4 w-4 mr-2"/>
              개인 작업 공간
            </h3>
            <Link to="/" className="flex items-center hover:bg-blue-50 rounded-md p-2">
              <span className="mr-3">My Todo</span>
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-2"/>
              팀 작업 공간
            </span>
              <button
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110"
                  onClick={toggleCreateTeam}
              >
                {isCreatingTeam ? (
                    <X className="h-4 w-4 text-gray-600 transition-transform duration-300 ease-in-out transform rotate-0 hover:rotate-90"/>
                ) : (
                    <PlusCircle
                        className="h-4 w-4 text-gray-600 transition-transform duration-300 ease-in-out transform rotate-0 hover:rotate-90"/>
                )}
              </button>
            </h3>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isCreatingTeam ? 'max-h-32' : 'max-h-0'}`}>
              <form onSubmit={createNewTeam} className="mb-2">
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="새 팀 이름"
                    className="w-full p-2 border rounded"
                />
                <button type="submit"
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300">
                  팀 생성
                </button>
              </form>
            </div>
            <ul className="space-y-2">
              {teams.map((team) => (
                  <li key={team.id}>
                    <Link to={`/team/${team.id}`}
                          className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md p-2 transition-colors duration-300">
                      {team.teamName}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
  );
};

export default Sidebar;