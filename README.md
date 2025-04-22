# afwt-clean-ecommerce-frontend

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [License](#license)

## Description
This project is the front-end application for a basic e-commerce platform built with React, TypeScript, and Vite. It allows users to register, log in, browse products, manage a shopping cart, simulate checkout, and view their purchase history.

## Features
- **User Authentication**: Sign up and log in forms with client-side validation.
- **Product Listing**: Browse a paginated list of products and add items to the cart.
- **Cart Management**: View cart contents, adjust quantities, or remove products.
- **Checkout Simulation**: Complete a purchase flow (simulated payment).
- **Purchase History**: View a history of all past purchases.
- **Responsive Design**: Mobile-first layout and optimal user experience across devices.

## Architecture Overview
The front-end follows an atomic design pattern and clean separation of concerns:

```
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Root App component and global layout
│   ├── components/          # Atoms, Molecules, Organisms
│   ├── context/             # React Contexts (e.g., AuthContext)
│   ├── guards/              # Route guards (AdminRoute, CustomerRoute)
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Route-based page components
│   ├── services/            # HTTP adapters and API calls
│   ├── types/               # Shared TypeScript interfaces
│   ├── utils/               # Utility functions (e.g., JWT decoding)
│   ├── styles/              # Global CSS/Tailwind configuration
│   └── main.tsx             # Application entrypoint
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   # or yarn install
   ```
2. **Run in development mode**
   ```bash
   npm run dev
   # or yarn dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables
Create a `.env` file in the project root with the following variables:
```
VITE_API_BASE_URL=http://localhost:9080/api/v1
```

## Available Scripts
- `npm run dev` — Runs the app in development mode with HMR.
- `npm run build` — Bundles the app for production.
- `npm run serve` — Serves the production build locally.
- `npm run lint` — Runs ESLint checks.
- `npm run test` — Runs unit tests.

## API Reference
The front-end communicates with the back-end API for all data operations. See the back-end [README](../afwt-clean-ecommerce-mngr/README.md) for detailed endpoint documentation under **Products**, **Cart**, **Authentication**, and **Purchases**.

## License
This project is MIT licensed. Feel free to use and modify as needed.

