# ---------- FRONTEND BUILD ----------
FROM node:20 AS frontend

WORKDIR /app/frontend
COPY front-end/package*.json ./
RUN npm install
COPY front-end/ .
RUN npm run build


# ---------- BACKEND BUILD ----------
FROM node:20 AS backend

WORKDIR /app/backend
COPY back-end/package*.json ./
RUN npm install
COPY back-end/ .

# Copy frontend build into backend public folder
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 8000
ENV PORT=8000

CMD ["node", "src/server.js"]
