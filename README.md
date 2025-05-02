# DST_FIGMA

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?logo=tailwindcss)

A sophisticated platform for Delaware Statutory Trust (DST) investments, providing expert due diligence and investment advice for 1031 exchanges and direct investments.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

DST_FIGMA is a comprehensive platform designed to simplify Delaware Statutory Trust investments. The platform connects accredited investors with institutional-quality real estate investment opportunities while providing the necessary tools and resources for informed decision-making.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React 18, Vite, TailwindCSS, Shadcn UI |
| Backend | Node.js 18, Express, TypeScript |
| Database | PostgreSQL via Neon Database |
| ORM | Drizzle ORM |
| Authentication | Passport-local, express-session, connect-pg-simple |
| State Management | TanStack Query (React Query) |
| Routing | Wouter |
| Validation | Zod, react-hook-form |
| Future Automation | n8n |

## Features

- **User Authentication**: Secure login and registration system for accredited investors
- **DST Investment Listings**: Browse available Delaware Statutory Trust investments
- **Accreditation Verification**: Process to verify accredited investor status
- **Investment Analytics**: Tools to analyze and compare potential investments
- **Educational Resources**: Comprehensive information about DST investments and 1031 exchanges
- **Interactive AI Assistant**: Get immediate answers to common DST investment questions

## Project Structure

```
DST_FIGMA/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility functions
│       ├── pages/          # Page components
│       └── main.tsx        # Application entry point
├── server/                 # Backend Express application
│   ├── auth.ts             # Authentication setup
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── index.ts            # Server entry point
├── shared/                 # Shared code between client/server
│   └── schema.ts           # Database schema and types
├── drizzle.config.ts       # Drizzle ORM configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## Quick Start

Follow these steps to get the application running locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/DST_FIGMA.git
cd DST_FIGMA

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Open in your browser
# http://localhost:5173
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database connection
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
SESSION_SECRET=your_session_secret

# OpenAI API (for AI assistant)
OPENAI_API_KEY=your_openai_api_key
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts the development server |
| `pnpm build` | Builds the app for production |
| `pnpm start` | Runs the built app in production mode |
| `pnpm check` | Runs TypeScript type-checking |
| `pnpm db:push` | Updates the database schema |

## Future Enhancements

- **Workflow Automation**: Integration with n8n for automated investment processes
- **Document Management**: Secure storage and handling of investment documents
- **Real-time Analytics**: Live investment performance tracking
- **Mobile Application**: Native mobile experience for iOS and Android
- **Advanced AI Features**: Enhanced AI capabilities for investment recommendations

## License

This project is licensed under the MIT License - see the LICENSE file for details.