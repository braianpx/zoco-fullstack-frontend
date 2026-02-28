import type { FC } from "react";
import type { UserResponse } from "../types/user.types";
import { UserCard } from "./UserCard";

type UsersGridProps = {
  users: UserResponse[];
  onEdit: (user: UserResponse) => void;
  onDelete: (id: number) => void;
};

export const UsersGrid: FC<UsersGridProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};