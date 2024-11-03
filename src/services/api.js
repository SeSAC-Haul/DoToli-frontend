import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// token을 매 요청에 추가하는 interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const acceptInvitation = (teamId, invitationId) => {
  return api.post(`/teams/${teamId}/invitations/${invitationId}/accept`);
};

export const rejectInvitation = (teamId, invitationId) => {
  return api.post(`/teams/${teamId}/invitations/${invitationId}/reject`);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
