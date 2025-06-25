import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { whisperService } from '@/services/whisperService';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscription, disabled = false }: VoiceInputProps) {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const { 
    isRecording, 
    isProcessing, 
    startRecording, 
    stopRecording, 
    error: recordingError,
    clearError 
  } = useVoiceRecording();

  const handleVoiceInput = async () => {
    if (disabled) return;

    setTranscriptionError(null);
    clearError();

    if (isRecording) {
      // Stop recording and transcribe
      try {
        setIsTranscribing(true);
        const audioBlob = await stopRecording();
        
        if (audioBlob) {
          const result = await whisperService.transcribeAudio(audioBlob);
          if (result.text.trim()) {
            onTranscription(result.text.trim());
          } else {
            setTranscriptionError('No speech detected. Please try again.');
          }
        }
      } catch (error) {
        console.error('Transcription error:', error);
        setTranscriptionError('Failed to transcribe audio. Please try again.');
      } finally {
        setIsTranscribing(false);
      }
    } else {
      // Start recording
      await startRecording();
    }
  };

  const isLoading = isProcessing || isTranscribing;
  const hasError = recordingError || transcriptionError;

  return (
    <div className="relative">
      <Button
        onClick={handleVoiceInput}
        disabled={disabled || isLoading}
        variant="ghost"
        size="sm"
        className={`h-12 w-12 rounded-xl border transition-all duration-200 ${
          isRecording 
            ? 'border-red-500 bg-red-50 hover:bg-red-100 text-red-600' 
            : 'border-gray-200 hover:bg-gray-50 text-gray-500'
        } ${hasError ? 'border-red-300 bg-red-50' : ''}`}
        title={isRecording ? 'Stop recording' : 'Start voice input'}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>

      {/* Recording indicator */}
      {isRecording && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Status tooltip */}
      {(isRecording || isTranscribing || hasError) && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
          {isRecording && (
            <div className="flex items-center space-x-2">
              <Volume2 className="w-3 h-3" />
              <span>Recording... Click to stop</span>
            </div>
          )}
          {isTranscribing && (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Transcribing...</span>
            </div>
          )}
          {hasError && (
            <span className="text-red-300">
              {recordingError || transcriptionError}
            </span>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}