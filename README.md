# ChatGPT Clone with Gemini API

A ChatGPT-like chat interface that uses Google's Gemini API for both text and image generation.

## Features

- Text generation using Gemini API
- Image generation using Gemini API
- Modern React/Next.js interface
- TypeScript support

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chatgpt-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

You can get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Type your message and click "Send" for text generation
- Switch to "Image" mode to generate images from text descriptions

## Technologies Used

- Next.js 14
- React 18
- Google Generative AI SDK
- TypeScript

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```
