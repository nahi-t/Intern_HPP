# Harari Regional State Prison Police Commission - CMS & Website

## Architecture
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4
- **Backend**: NestJS, PostgreSQL, Prisma ORM
- **Deployment**: Docker Compose

## Prerequisites
- Node.js v20+
- Docker & Docker Compose

## Quick Start (Docker)

1. **Start the infrastructure and applications**:
   ```bash
   docker-compose up -d --build
   ```

2. **Access the applications**:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:3000/api`
   - Swagger Docs: `http://localhost:3000/api/docs`

## Local Development (Without Docker)

### 1. Database Setup
```bash
docker-compose up -d db
```

### 2. Backend Setup
```bash
cd backend
npm install


npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Admin Credentials

- **Password**: password123
