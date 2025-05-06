# TafDownloader

TafDownloader is a modern, production-ready web application for downloading videos from popular platforms such as YouTube, X (Twitter), Instagram, TikTok, and Facebook. Built with React, TypeScript, Tailwind CSS, and FastAPI, it offers a seamless, responsive, and user-friendly experience across all devices.

## Features

- **Multi-Platform Support:** Download videos from YouTube, X (Twitter), Instagram, TikTok, and Facebook.
- **Fast & Reliable:** High-speed downloads with multiple quality and format options.
- **Modern UI/UX:** Beautiful, responsive design with light/dark theme toggle and mobile-first layouts.
- **No Registration Required:** Use instantly without creating an account.
- **Safe & Secure:** No personal data collected, no ads, and no popups.
- **Open Source:** Easily customizable and extendable for your needs.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React Icons
- **Backend:** FastAPI (Python), yt-dlp (for video extraction)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.8+

### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/dyglo/TafDownloader.git
cd TafDownloader
```

#### 2. Install frontend dependencies
```sh
cd project
npm install
```

#### 3. Install backend dependencies
```sh
cd ../backend
pip install -r requirements.txt
```

### Running Locally

#### Start the backend (FastAPI)
```sh
cd backend
uvicorn main:app --reload
```

#### Start the frontend (Vite + React)
```sh
cd project
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173)
- The backend will run on [http://localhost:8000](http://localhost:8000)

## Deployment

- **Frontend:** Deploy easily to Vercel, Netlify, or any static hosting provider.
- **Backend:** Deploy to Render, Railway, Fly.io, Heroku, or any cloud provider that supports Python/FastAPI.
- Update the frontend API URL to point to your deployed backend.

## License

This project is licensed under the MIT License.

## Disclaimer

TafDownloader is intended for personal use only. Downloading copyrighted content without permission is prohibited. Please respect the terms of service of each platform.

---

**Made with ❤️ by dyglo and contributors.**
