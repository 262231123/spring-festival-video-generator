export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  referenceImage: string;
  promptTemplate: string;
  characterAction: string;
  dialogue: string;
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  styleModifier: string;
  referenceImage: string;
}

export interface VideoGenerationRequest {
  userImage: File;
  styleId: string;
  artStyleId?: string;
}

export interface VideoGenerationResponse {
  taskId: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  videoUrl?: string;
  error?: string;
}
