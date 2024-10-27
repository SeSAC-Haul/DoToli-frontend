import React from "react";
import { acceptInvitation, rejectInvitation } from "../services/api";
import { useTeam } from '../context/TeamContext';

const InvitationItem = ({ invitation, onRemove }) => {
  const { refreshTeams } = useTeam();

  const handleAccept = async () => {
    try {
      await acceptInvitation(invitation.teamId, invitation.id);
      alert("초대를 수락했습니다.");
      onRemove(invitation.id);
      refreshTeams();
    } catch (err) {
      console.error(err);
      alert("초대를 수락하는 데 실패했습니다.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectInvitation(invitation.teamId, invitation.id);
      alert("초대를 거절했습니다.");
      onRemove(invitation.id);
    } catch (err) {
      console.error(err);
      alert("초대를 거절하는 데 실패했습니다.");
    }
  };

  return (
      <div className="p-4 border-b border-gray-300">
        <div className="flex justify-between items-center space-x-4">
          <div className="w-1/4 font-semibold text-center">{invitation.inviterNickname}</div>
          <div className="w-1/4 text-center">{invitation.inviterEmail}</div>
          <div className="w-1/4 text-center">{invitation.teamName}</div>
          <div className="w-1/4 text-center">
            <button
                onClick={handleAccept}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2"
            >
              수락
            </button>
            <button
                onClick={handleReject}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
            >
              거절
            </button>
          </div>
        </div>
      </div>
  );
};

export default InvitationItem;
