import { useStandardMutation } from "../../utils/mutationHelpers";
import { useQueryClient } from "@tanstack/react-query";
import { register, updateUser, deleteOneUser } from "../../api/user.api";
import type { UserCreate, UserUpdate, UserResponse } from "../../types/user.types";
import type { ApiResponse } from "../../types/apiResponse.types";
import { useApiHelpers } from "../../utils/apiHelpers";

export const useUserMutations = () => {
  const { getErrorMessage } = useApiHelpers();
  const queryClient = useQueryClient();

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
    invalidateKey: "users",
  });

  const updateUserAsync = async (vars: { data: UserUpdate; userId: number }) => {
    const res = await updateUserMutation.mutateAsync(vars);
    if (res.data) {
      queryClient.setQueryData(["userDetail", vars.userId], res.data);
    }
    return res;
  };

  const deleteUserMutation = useStandardMutation<number, ApiResponse<UserResponse>>({
    mutationFn: userId => deleteOneUser(userId),
    successMsg: "usuario borrado con exito",
    invalidateKey: "users",
  });

  const firstError =
    createUserMutation.error ??
    updateUserMutation.error ??
    deleteUserMutation.error ??
    null;

  return {
    createUserMutation,
    updateUserMutation: { ...updateUserMutation, mutateAsync: updateUserAsync },
    deleteUserMutation,
    isPending:
      createUserMutation.isPending ||
      updateUserMutation.isPending ||
      deleteUserMutation.isPending,
    isError: firstError ? getErrorMessage(firstError, "Error al gestionar usuarios") : null,
  };
};
