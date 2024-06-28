import instance from '@api/axios';
import { IAiPersonaPatchRequest } from '@type/AiPersona';

export const patchUserAiPersona = async ({ personaCode, userId }: IAiPersonaPatchRequest) => {
  const response = await instance.patch(`/user/persona/${personaCode}/${userId}`);
  return response.data;
};
