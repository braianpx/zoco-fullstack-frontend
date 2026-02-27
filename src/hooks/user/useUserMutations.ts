import { useStandardMutation } from "../../utils/mutationHelpers";
import { register, updateUser, deleteOneUser } from "../../api/user.api";
import type { UserCreate, UserUpdate, UserResponse } from "../../types/user.types";
import type { ApiResponse } from "../../types/apiResponse.types";

export const useUserMutations = () => {
  const createUserMutation = useStandardMutation<UserCreate, ApiResponse<UserResponse>>({
    mutationFn: register,
    successMsg: "usuario creado",
    invalidateKey: "users",
  });

  const updateUserMutation = useStandardMutation<
    { data: UserUpdate; userId: number },
    ApiResponse<UserResponse>
  >({
    mutationFn: ({ data, userId }) => updateUser(data, userId),
    successMsg: "usuario actualizado",
    invalidateKey: ["users", "userDetail"],
  });

  const deleteUserMutation = useStandardMutation<number, ApiResponse<UserResponse>>({
    mutationFn: userId => deleteOneUser(userId),
    successMsg: "usuario borrado con exito",
    invalidateKey: "users",
  });

  return {
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    isPending:
      createUserMutation.isPending ||
      updateUserMutation.isPending ||
      deleteUserMutation.isPending,
  };
};
