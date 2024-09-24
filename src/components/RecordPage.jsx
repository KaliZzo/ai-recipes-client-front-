import React, { useState, useRef } from 'react';
import { Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceRecorder = () => {
    const apiUrl = import.meta.env.VITE_SERVER_URL;
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [showContinue, setShowContinue] = useState(false);
    const navigate = useNavigate();
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setTranscript([]);
            setShowContinue(false);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert(
                'Unable to access microphone. Please check your permissions.'
            );
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.onstop = () => {
                sendAudioToServer();
            };
        }
    };

    const sendAudioToServer = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
        });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
            const response = await fetch(`${apiUrl}/transcript`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            setTranscript(result.allIngredients);
            setShowContinue(true);
        } catch (error) {
            console.error('Error sending audio:', error);
            alert(`Failed to send audio for transcription: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleContinue = () => {
        navigate('/confirm', { state: { ingredients: transcript } });
    };

    const handleRecordClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-sm sm:max-w-md">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">
                    מה יש לך במקרר
                </h1>
                <div
                    className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full ${
                        isRecording ? 'bg-red-500' : 'bg-blue-500'
                    } flex items-center justify-center mb-6 sm:mb-8 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none`}
                    onClick={handleRecordClick}
                    role="button"
                    tabIndex={0}
                >
                    <Mic className="w-16 h-16 sm:w-24 sm:h-24 text-white" />
                </div>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center">
                    {isRecording ? 'Recording...' : 'Tap to start recording'}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <button
                        className={`w-full sm:w-auto px-6 py-3 rounded-full text-white text-base sm:text-lg font-semibold focus:outline-none ${
                            isRecording ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        onClick={handleRecordClick}
                        disabled={isProcessing}
                    >
                        {isRecording ? 'Stop' : 'Record'}
                    </button>
                </div>
                {isProcessing && (
                    <p className="mt-4 text-gray-600">Processing audio...</p>
                )}
                {showContinue && (
                    <>
                        <p className="mt-4 text-lg font-semibold">
                            These are your ingredients:
                        </p>
                        <ul className="mt-2 list-disc list-inside">
                            {transcript.map((ingredient, index) => (
                                <li key={index} className="text-gray-700">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-6 w-full sm:w-auto px-6 py-3 rounded-full bg-green-500 text-white text-base sm:text-lg font-semibold focus:outline-none hover:bg-green-600 transition duration-300 ease-in-out"
                            onClick={handleContinue}
                        >
                            Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VoiceRecorder;
