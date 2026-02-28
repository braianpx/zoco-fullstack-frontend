import type { FC } from "react";
import { UserIcon, ExternalLink, Trash2, Mail } from "lucide-react";
import type { UserResponse } from "../types/user.types";

type UserCardProps = {
  user: UserResponse;
  onEdit: (user: UserResponse) => void;
  onDelete: (id: number) => void;
};

export const UserCard: FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <UserIcon size={28} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl"
          >
            <ExternalLink size={20} />
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="p-3 text-slate-400 hover:text-red-600 bg-slate-50 rounded-xl"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-1">
        {user.firstName} {user.lastName}
      </h3>

      <p className="text-indigo-500 font-medium text-sm mb-6 flex items-center gap-2">
        <Mail size={14} /> {user.email}
      </p>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
          {user.roleName || "User"}
        </span>

        <span className="text-[10px] text-slate-300 font-bold">
          UID: {user.id}
        </span>
      </div>
    </div>
  );
};