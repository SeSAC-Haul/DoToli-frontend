import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = useCallback(async () => {
    try {
      const response = await api.get("/teams");
      if (response.status === 200) {
        setTeams(response.data);
      }
    } catch (error) {
      console.error("팀 목록을 불러오는데 실패했습니다.", error);
    }
  }, []);

  const refreshTeams = useCallback(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
      <TeamContext.Provider value={{ teams, refreshTeams }}>
        {children}
      </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
