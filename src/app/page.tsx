'use client';

import { useState } from 'react';

interface ResponsePart {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
  imageUrl?: string;
}

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('Gemini API key is not configured');
      }

      // Select the appropriate model based on mode
      const endpoint = mode === 'text'
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
        : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        ...(mode === 'image' && {
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT']
          }
        })
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate content');
      }

      const data = await response.json();

      if (mode === 'text') {
        const generatedText = data.candidates[0]?.content?.parts[0]?.text || '';
        setResponse(generatedText);
        setImageUrl('');
      } else {
        // For image generation, expect an image URL or base64 data in the response
        const parts = data.candidates[0]?.content?.parts as ResponsePart[] || [];
        const imageData = parts.find((part: ResponsePart) => part.inlineData?.data || part.imageUrl);
        const textData = parts.find((part: ResponsePart) => part.text);

        if (imageData) {
          const imageUrl = imageData.inlineData?.data
            ? `data:image/jpeg;base64,${imageData.inlineData.data}`
            : imageData.imageUrl;
          setImageUrl(imageUrl || '');
          setResponse(textData?.text || 'Image generated successfully');
        } else {
          throw new Error('No image data received in the response');
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Gemini AI Chat</h1>

        <div className="mb-4 flex justify-center">
          <button
            className={`px-4 py-2 mr-2 rounded ${mode === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('text')}
          >
            Text
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('image')}
          >
            Image
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={mode === 'text' ? "Enter your message..." : "Describe the image you want to generate..."}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {response && (
          <div className="mt-8 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}

        {imageUrl && mode === 'image' && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
            <img src={imageUrl} alt="Generated" className="max-w-full h-auto" />
          </div>
        )}
      </div>
    </main>
  );
}
