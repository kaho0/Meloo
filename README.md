# Tech Learning Assistant

A modern, responsive AI chat interface powered by Google's Gemini API for technical learning assistance. Built with Next.js and Tailwind CSS.

![Tech Learning Assistant](public/preview.png)

## 🚀 Features

- **Interactive AI Chat**
  - Real-time responses from Gemini AI
  - Code syntax highlighting
  - Markdown-style formatting
  - Copy code functionality

- **Smart UI**
  - Responsive design for all devices
  - Collapsible sidebar
  - Chat history management
  - Dark theme interface

- **Learning Tools**
  - Simple/Complex explanation toggle
  - Category-based suggestions
  - Quick access to common questions
  - Code-focused responses

- **Categories Covered**
  - Web Development
  - AI & Machine Learning
  - Data Science
  - General Science
  - Programming

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: React Icons
- **Styling**: Tailwind Typography

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tech-learning-assistant.git
cd tech-learning-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Gemini API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

To get your Gemini API key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in your `.env.local` file

5. Run the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 💡 Usage

1. Select a category or start a new chat
2. Type your technical question
3. Toggle 'Simple Mode' for easier explanations
4. Use suggestion buttons for quick queries
5. Copy code snippets with one click
6. Access chat history from the sidebar

## 🔑 Key Components

- `ChatInterface`: Main chat component with message handling
- `LoadingDots`: Loading animation component
- `geminiApi`: API integration utility

## 📱 Responsive Design

- Desktop: Full sidebar with chat history
- Tablet: Collapsible sidebar
- Mobile: Optimized layout with hidden sidebar

## 🔒 Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Your Gemini API key | `AIzaSyC...` |
| `NEXT_PUBLIC_GEMINI_API_URL` | Gemini API endpoint | `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent` |
| `NEXT_PUBLIC_APP_URL` | Your application URL | `http://localhost:3000` |
