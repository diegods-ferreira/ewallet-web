import { useMutation } from '@tanstack/react-query';

import { AuthUser } from '@/features/auth';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useUser } from '@/lib/react-query-auth';

export type ChangeProfilePictureDTO = {
  data: {
    picture: File;
  };
};

export const changeProfilePicture = async ({ data }: ChangeProfilePictureDTO) => {
  const formData = new FormData();
  formData.append('file', data.picture);

  const response = await axios.patch<AuthUser>('/users/profile/picture', formData);
  return response.data;
};

type UseChangeProfilePictureOptions = {
  config?: MutationConfig<typeof changeProfilePicture>;
};

export function useChangeProfilePicture({ config }: UseChangeProfilePictureOptions = {}) {
  const { refetch: refetchUser } = useUser();

  return useMutation({
    onSuccess: () => {
      refetchUser();
    },
    ...config,
    mutationFn: changeProfilePicture
  });
}
