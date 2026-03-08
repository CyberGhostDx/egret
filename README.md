<p align="center">
  <img src="https://lh3.googleusercontent.com/d/1vRrDe-028hDsVOTA6Ul6zMQhOaG5oXVB" alt="egret" width="200" height="200">
</p>

# EGRET Frontend

This is the frontend application for the EGRET project, built with **Next.js**, **React**, **Tailwind CSS v4**, and leveraging **HeroUI** components for a beautiful, responsive user interface.

## 📋 Prerequisites

- [Bun](https://bun.sh/) (Version >= 1.3.0)

## 🚀 Quick Start

1. **Install Dependencies**

   ```bash
   bun install
   ```

2. **Environment Variables Setup**
   Copy the `.env.example` file to create your `.env`

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and define the correct URLs:
   - `NEXT_PUBLIC_API_URL`: The URL of your backend services
   - `BACKEND_URL`: Used for the reverse proxy (this can be the same as `NEXT_PUBLIC_API_URL`)

3. **Start Development Server**

   ```bash
   bun run dev
   ```

   Once the server starts, open your browser and navigate to `http://localhost:3000` (or the port specified by Next.js) to view the application.

   > [!TIP]
   > For local development, **`bun run dev`** is recommended to avoid hostname and environment variable synchronization issues within Docker.

## 🐳 Running with Docker

If you prefer to run the application in a containerized environment:

1. **Build and Start:**

   ```bash
   docker compose up -d --build
   ```

2. **Important Note on `BACKEND_URL`:**
   Since the frontend runs inside a container, **`localhost`** will point to the container itself, not your host machine.
   - If your backend is running on your host machine (not in Docker), change your `.env` to:
     `BACKEND_URL=http://host.docker.internal:8000` (for Mac/Windows)
   - If you experience issues with API rewrites, ensure you rebuild the image after changing high-level environment variables:
     `docker compose build --no-cache`

## 🛠️ Tech Stack

- **Framework:** Next.js
- **UI & Styling:** HeroUI (v3), Tailwind CSS v4, Framer Motion
- **Data Fetching & State Management:** SWR, Zustand, Axios
- **Calendar & Icons:** FullCalendar, React Icons

## Authentication

The main application supports login via Google. However, if you do not have `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` set up in the backend:

- Navigate directly to the **`/admin/login`** route in your browser.
- Log in using the email and password you configured in the backend's `.env` file (`ADMIN_EMAIL` and `ADMIN_PASSWORD`).
  _(Note: Ensure you have run the database seed command on the backend first!)_

## 🔗 Backend Repository

[EGRET-Backend](https://github.com/cyberghostdx/egret-backend)

## Database Design

[PDF](https://github.com/CyberGhostDx/egret-backend/blob/develop/docs/EGRET%20Database%20Design.pdf)
