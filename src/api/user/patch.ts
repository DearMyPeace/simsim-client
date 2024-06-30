import instance from '@api/axios';
import { IAiPersonaData, IAiPersonaPatchRequest } from '@type/AiPersona';

// todo: userId는 보내지 않는 것으로 수정
export const patchUserAiPersona = async ({
  personaCode,
  userId,
}: IAiPersonaPatchRequest): Promise<IAiPersonaData> => {
  const response = await instance.patch(`/user/persona/${personaCode}`, userId);
  return response.data;
};
