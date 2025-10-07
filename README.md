 # Seller Studio Frontend

 Vite + React + TypeScript app for Seller Studio. Connects to the Express backend in `server/`.

 ## Tech Stack
 - **Build tool**: Vite
 - **Framework**: React 18, TypeScript
 - **UI**: Tailwind CSS, shadcn/ui (Radix UI primitives)
 - **State & data**: Redux + Redux-Saga, TanStack Query
 - **Routing**: React Router
 - **HTTP**: Axios

 ## Project Structure (root)
 - `src/` — application code
 - `public/` — static assets
 - `server/` — backend (Node/Express + MongoDB)
 - `index.html` — Vite HTML entry

 ## Scripts
 - `npm run dev` — start Vite dev server (default `http://localhost:5173`)
 - `npm run build` — production build
 - `npm run build:dev` — development-mode build
 - `npm run preview` — preview production build
 - `npm run lint` — run ESLint

 ## Setup
 1. Install dependencies at the repo root:
    ```bash
    npm install
    ```
 2. Start the backend in `server/`:
    ```bash
    cd server
    npm install
    npm run dev
    # serves on http://localhost:5000 by default
    ```
 3. In another terminal, run the frontend from the repo root:
    ```bash
    npm run dev
    # opens http://localhost:5173
    ```

 ## API Base URL
 The API client at `src/Api/api.tsx` is configured with:
 - Base URL: `http://localhost:5000/api`

 If you change the server port or deploy to another host, update `src/Api/api.tsx` accordingly. Example:
 ```ts
 // src/Api/api.tsx
 const api = axios.create({
   baseURL: "http://your-server:PORT/api",
   headers: { "Content-Type": "application/json" },
 });
 ```

 Consider refactoring to use an environment variable (e.g., `VITE_API_URL`) for easier configuration across environments.

 ## Build & Preview
 ```bash
 npm run build
 npm run preview
 ```
 This produces optimized assets in `dist/` and serves them locally for verification.

 ## Styling
 - Tailwind configuration: `tailwind.config.ts`
 - Global styles: `src/index.css`
 - Component styles: `src/components/`

 ## Linting
 ESLint is configured via `eslint.config.js` with React and TypeScript plugins.

 ## Troubleshooting
 - **CORS errors**: ensure server `CORS_ORIGIN` matches `http://localhost:5173` (or your frontend URL).
 - **API errors**: verify the server is running on port 5000 and that `src/Api/api.tsx` has the correct `baseURL`.
 - **Port conflicts**: set a different Vite port via `vite --port <port>` or update your `vite.config.ts`.

 ## License
 Private project. All rights reserved.

