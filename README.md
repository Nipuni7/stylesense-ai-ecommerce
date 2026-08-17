\# StyleSense AI 👗✨

> \*\*Next-Generation AI-Powered Fashion E-Commerce Platform\*\*



\[!\[License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

\[!\[React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react\&logoColor=black)](https://react.dev/)

\[!\[Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev/)

\[!\[TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)

\[!\[Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)

\[!\[FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)



\---



\## 🌟 Overview

\*\*StyleSense AI\*\* is an intelligent e-commerce ecosystem designed to transform how users discover, style, and purchase apparel. By combining modern web engineering with microservice-backed machine learning, the platform offers hyper-personalized styling advisory, smart sizing recommendations, and reverse-image visual discovery.



\---



\## 🚀 Key Features



\* \*\*🤖 AI Personal Stylist:\*\* Interactive conversational assistant delivering tailored fashion recommendations based on events, style aesthetics, and body preferences.

\* \*\*📸 Visual Image Search:\*\* Upload or drag-and-drop outfit imagery to extract visual features and locate matching catalog items instantly.

\* \*\*📏 Smart Size Predictor:\*\* Machine learning heuristic model that accurately predicts apparel fit (S/M/L/XL) using height, weight, and fit preferences.

\* \*\*⚡ Modern Responsive UI:\*\* Ultra-fast React + Vite frontend styled with modern Tailwind CSS dark-mode glassmorphism.

\* \*\*🔌 Microservices Architecture:\*\* Decoupled Express.js REST API for core commerce and Python FastAPI for AI/ML inference.



\---



\## 🏗️ System Architecture



```text

stylesense-ai-ecommerce/

├── frontend/             # React 18 + Vite + Tailwind CSS + Lucide Icons

│   ├── src/

│   │   ├── components/   # AI Modals \& Drawers (Stylist, Visual Search, Sizing)

│   │   ├── data/         # Mock Product Catalogs \& Metadata

│   │   └── App.jsx       # Root Application Shell

├── backend/              # Node.js + Express.js REST API

│   ├── server.js         # API Server \& Product/Health Routes

│   └── package.json

├── ai-service/           # Python 3 + FastAPI Machine Learning Microservice

│   ├── main.py           # Size Predictor \& Outfit Recommendation Endpoints

│   └── requirements.txt

└── docs/                 # System Architecture \& Specifications

