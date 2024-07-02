import instance from '@api/axios';
import { IAiPersonaData } from '@type/AiPersona';

export const patchUserAiPersona = async (personaCode: string): Promise<IAiPersonaData> => {
  const response = await instance.patch(`/user/persona/${personaCode}`);
  return response.data;
};
