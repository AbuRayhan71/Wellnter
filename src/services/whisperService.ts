export interface WhisperTranscriptionResult {
  text: string;
  confidence?: number;
  language?: string;
}

export class WhisperService {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = '6NZGbW1JN0wsUEnn4GQDCIOhhcC7HFiABTdE8ujleQHb8j9lQk8OJQQJ99BFACfhMk5XJ3w3AAAAACOGWMbu';
    this.endpoint = 'https://mdabu-mc8sc1nf-swedencentral.cognitiveservices.azure.com/openai/deployments/whisper/audio/translations?api-version=2024-06-01';
  }

  async transcribeAudio(audioBlob: Blob): Promise<WhisperTranscriptionResult> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'api-key': this.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Whisper API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      return {
        text: result.text || '',
        confidence: result.confidence,
        language: result.language
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio. Please try again.');
    }
  }
}

export const whisperService = new WhisperService();