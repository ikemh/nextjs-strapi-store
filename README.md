# Laser Cutting Product Catalog – Next.js + Strapi

An online **catalog platform** built with **Next.js** and **Strapi**, designed for showcasing **hundreds of laser-cut blade models and collections**.  
This project supports scalable browsing, variant management, and a performant frontend tailored for the laser cutting industry.

---

## Technologies

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Backend**: [Strapi](https://strapi.io/) v5 (Headless CMS)
- **Styling**: Tailwind CSS
- **Database**: SQLite (for local dev)

---

## Project Structure

```
my-ecommerce/
├── frontend/         # Next.js frontend
├── src/              # Strapi backend
├── database/         # Local SQLite DB
├── config/           # Strapi config
├── public/           # Media assets
├── .env.example      # Environment variables (template)
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:ikemh/nextjs-strapi-store.git
cd nextjs-strapi-store
```

---

### 2. Environment Setup

#### Backend (`.env`)

```env
NODE_ENV=development
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_jwt
JWT_SECRET=your_jwt
```

#### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

---

### 3. Install dependencies

```bash
npm install
cd frontend && npm install
cd ..
```

---

### 4. Start development servers

#### Backend (Strapi)

```bash
npm run develop
```

#### Frontend (Next.js)

```bash
cd frontend
npm run dev
```

---

## Features

- Visual catalog of blade collections and variants
- Infinite scrolling for large datasets
- Quantity and variant selection per model
- Tailored for laser cutting product management
- REST API integration with Strapi

---

## Notes

- Monorepo structure for unified backend/frontend
- Uses SQLite for local development
- Frontend can be deployed to Vercel
- Backend can be deployed to Render, Railway, or any Node-compatible server

---

## License

MIT
