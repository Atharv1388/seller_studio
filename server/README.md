 # Seller Studio Server

 Express + MongoDB backend for Seller Studio. Provides authentication (admin/seller) and product/seller management APIs consumed by the frontend.

 ## Tech Stack
 - **Runtime**: Node.js (ESM)
 - **Framework**: Express
 - **Database**: MongoDB (Mongoose)
 - **Auth**: JWT
 - **Utilities**: `dotenv`, `cors`, `morgan`, `express-validator`

 ## Prerequisites
 - Node.js 18+
 - MongoDB connection string (Atlas or local)

 ## Setup
 1. Install dependencies
    ```bash
    npm install
    ```
 2. Create an environment file by copying `.env.example`
    ```bash
    cp .env.example .env
    ```
 3. Update `.env` values for your environment:
    - `PORT` (default 5000)
    - `CORS_ORIGIN` (e.g. http://localhost:5173 for Vite dev)
    - `JWT_SECRET` and `JWT_EXPIRES_IN`
    - `MONGODB_URI` and `MONGODB_DB_NAME`

 IMPORTANT: The values in `.env.example` are placeholders for local development. Replace them with your own secrets. Never commit real secrets.

 ## Scripts
 - `npm run dev` — start with nodemon (hot reload)
 - `npm start` — start with Node
 - `npm run lint` — placeholder

 Entry file: `src/server.js`

 ## Running locally
 ```bash
 # in server/
 npm run dev
 # Server listens on PORT (default 5000)
 ```

 With the default `baseURL` used by the frontend, APIs are expected at:
 - `http://localhost:5000/api`

 If you change `PORT`, also update the frontend base URL in `src/Api/api.tsx` on the frontend side.

 ## CORS
 Allowed origin is controlled by `CORS_ORIGIN` in `.env`. Set this to your frontend URL during development (e.g., `http://localhost:5173`).

 ## API Overview (as used by the frontend)
 Base: `/api`
 - `POST /admin/login`
 - `GET /admin/sellers`
 - `POST /admin/sellers`
 - `GET /admin/sellers/:id`
 - `DELETE /admin/sellers/:id`
 - `POST /seller/login`
 - `GET /seller/products`
 - `POST /seller/products`
 - `DELETE /seller/products/:id`

 Note: Authenticated routes expect `Authorization: Bearer <token>` header. The frontend stores the token in `localStorage` under `authToken`.

 ## Environment variables
 Example (`.env.example`):
 ```bash
 PORT=5000
 JWT_SECRET=your_jwt_secret
 JWT_EXPIRES_IN=7d
 CORS_ORIGIN=http://localhost:5173
 DB_USER=your_db_user
 DB_PASSWORD=your_db_password
 MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
 MONGODB_DB_NAME=seller_studio
 ```

 Replace with your own values before running. Do not expose real secrets in version control or screenshots.

 ## Project Structure (server/)
 - `src/` — server source code
 - `scripts/` — helper scripts (if any)
 - `.env.example` — example environment variables
 - `package.json` — scripts and dependencies

 ## Troubleshooting
 - Port in use: change `PORT` in `.env` or stop the conflicting process
 - CORS errors: ensure `CORS_ORIGIN` matches your frontend URL exactly
 - Mongo connection errors: verify `MONGODB_URI` and network access rules in your MongoDB provider

 ## License
 Private project. All rights reserved.

