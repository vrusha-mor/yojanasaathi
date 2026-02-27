<div align="center">

# 🇮🇳 YojanaSaathi
### *Your Trusted Companion for Government Schemes*

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**YojanaSaathi** is a full-stack web platform that bridges the gap between Indian citizens and government welfare schemes. It helps users discover, understand, and apply for schemes (yojanas) they are eligible for — in a simple, accessible, and guided manner.

[🚀 Live Demo](https://yojanasaathi-1.onrender.com) · [🐛 Report Bug](https://github.com/vrusha-mor/yojanasaathi/issues) · [✨ Request Feature](https://github.com/vrusha-mor/yojanasaathi/issues)

</div>

---


## 🧭 About the Project

Millions of Indians are unaware of the government schemes they are eligible for — whether it's scholarships, health benefits, agricultural subsidies, housing schemes, or financial assistance. The information is scattered, often in complex language, and difficult to navigate.

**YojanaSaathi** (meaning *Scheme Companion* in Marathi/Hindi) solves this by:

- Acting as a single platform to **search and discover** relevant government schemes
- Providing **eligibility-based filtering** so users only see what applies to them
- Offering **simplified explanations** of each scheme in plain language
- Guiding users through **how to apply** step by step

Whether you're a farmer, student, woman entrepreneur, senior citizen, or someone from an economically weaker section — YojanaSaathi helps you find the support you deserve.

---

## ✨ Features

- 🔍 **Smart Scheme Discovery** — Search across central and state government schemes
- 🎯 **Eligibility Filtering** — Filter schemes by category, age, income, gender, occupation, and state
- 📋 **Scheme Detail Pages** — Each scheme has a clear overview, benefits, eligibility criteria, and documents required
- 🗺️ **Step-by-Step Application Guide** — Know exactly how to apply, both online and offline
- 🌐 **Multilingual-Ready Architecture** — Designed with regional language support in mind
- 📱 **Responsive Design** — Works seamlessly across desktop and mobile
- 🔒 **Secure Backend** — RESTful API with proper validation and error handling
- 🚀 **Fast & Lightweight** — Optimized TypeScript codebase on both frontend and backend

---

## 🛠️ Tech Stack

### Frontend (`frontend_web`)
| Technology | Purpose |
|---|---|
| **React** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **CSS** | Styling and responsive layout |
| **HTML** | Base markup structure |

### Backend (`backend`)
| Technology | Purpose |
|---|---|
| **Node.js** | Server runtime environment |
| **TypeScript** | Type-safe server logic |
| **Express.js** | REST API framework |
| **JSON / Database** | Data storage for scheme information |

---

## 📁 Project Structure

```
yojanasaathi/
│
├── backend/                  # Server-side application
│   ├── src/
│   │   ├── routes/           # API route definitions
│   │   ├── controllers/      # Business logic handlers
│   │   ├── models/           # Data models / schema
│   │   ├── middleware/        # Auth, error handling, etc.
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend_web/             # Client-side web application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── services/         # API call functions
│   │   ├── types/            # TypeScript interfaces & types
│   │   └── App.tsx           # Root app component
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── package.json              # Root package config
├── .gitignore
└── README.md
```

---

## 🔄 Workflow

Here's how YojanaSaathi works from a user's perspective:

```
User visits YojanaSaathi
         │
         ▼
  Lands on Home Page
  (Search bar + Browse by Category)
         │
    ┌────┴────┐
    │         │
  Search   Browse
  by name  by category
  (e.g.,    (Agriculture,
  "PM       Education,
  Awas")    Health, etc.)
    │         │
    └────┬────┘
         │
         ▼
  View List of Matching Schemes
  (Name, brief description, ministry)
         │
         ▼
  Click on a Scheme
         │
         ▼
  Scheme Detail Page:
  ├── 📌 What is this scheme?
  ├── ✅ Who is eligible?
  ├── 💰 What are the benefits?
  ├── 📄 Documents required
  └── 🗺️ How to apply (step-by-step)
         │
         ▼
  User applies with full clarity!
```

### Backend Flow

```
Frontend Request
      │
      ▼
Express API Server
      │
      ▼
Route Handler → Controller → Data Layer
      │
      ▼
JSON Response sent back to Frontend
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/vrusha-mor/yojanasaathi.git
cd yojanasaathi
```

2. **Install root dependencies** (if any)

```bash
npm install
```

3. **Install Backend dependencies**

```bash
cd backend
npm install
```

4. **Install Frontend dependencies**

```bash
cd ../frontend_web
npm install
```

### Running the App

#### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000` (or whichever port is configured).

#### Start the Frontend

```bash
cd frontend_web
npm run dev
```

The frontend will start on `http://localhost:3000`.

> Open your browser and visit `http://localhost:3000` to use the app.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory and configure the following:

```env
PORT=5000
NODE_ENV=development
# Add your database URL or API keys here
DATABASE_URL=your_database_url
```

Create a `.env` file in the `frontend_web/` directory if needed:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files to version control. They are already listed in `.gitignore`.

---

## 📡 API Overview

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/schemes` | Get all government schemes |
| `GET` | `/schemes/:id` | Get details of a specific scheme |
| `GET` | `/schemes/search?q=keyword` | Search schemes by keyword |
| `GET` | `/schemes/category/:category` | Filter schemes by category |
| `GET` | `/schemes/eligible?age=&income=&state=` | Get eligible schemes by filters |

> More endpoints may be available — check the `backend/src/routes/` directory for the full list.

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

1. **Fork** the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add: your meaningful commit message"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** and describe what you've done

### Ideas for Contribution
- Add more government schemes to the database
- Add regional/vernacular language support
- Improve UI/UX design
- Add user authentication for saving favourite schemes
- Add notifications for new/updated schemes

---

<div align="center">

</div>
