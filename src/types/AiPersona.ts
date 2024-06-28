export interface IAiPersonaData {
  personaId: number;
  personaCode: string;
  personaName: string;
}

export interface IAiPersonaPatchRequest {
  personaCode: string;
  userId: string;
}

export interface IUserAIPersona {
  personaCode: string;
  personaName: string;
}
