import { IUserAIPersona } from '@type/AiPersona';
import { atom } from 'recoil';

export const userAiPersonaStatus = atom<IUserAIPersona>({
  key: 'userAiPersonaStatus',
  default: {
    personaCode: '',
    personaName: '',
  },
});
