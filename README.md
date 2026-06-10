# Apex Automations

Premium AI automation agency site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file:

   ```bash
   copy .env.example .env.local
   ```

3. Set at least:

   ```env
   ADMIN_API_KEY=your-secret-admin-key
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open:

   - Website: `http://localhost:3000`
   - Admin console: `http://localhost:3000/admin`
   - Health check: `http://localhost:3000/api/health`

## Backend features

- `POST /api/consultations`
  - Validates consultation form input
  - Applies rate limiting
  - Stores submissions in `data/consultation-requests.json`
  - Optionally forwards every lead to `LEADS_WEBHOOK_URL`

- `GET /api/consultations`
  - Requires `Authorization: Bearer <ADMIN_API_KEY>` or `x-admin-key`
  - Returns all stored consultation requests plus summary stats

- `PATCH /api/consultations`
  - Requires admin auth
  - Updates a lead status in the admin console

- `GET /api/health`
  - Returns basic backend health and config state

## Environment variables

See [.env.example](./.env.example).

- `ADMIN_API_KEY`
  - Required for the internal admin dashboard and protected API reads

- `LEADS_WEBHOOK_URL`
  - Optional webhook destination for new consultation requests

- `LEADS_WEBHOOK_BEARER_TOKEN`
  - Optional bearer token used when posting to the webhook

## Storage note

This project currently uses a local JSON file for persistence so the backend works immediately without extra infrastructure. For production hosting, you will usually want to swap this to a real database or CRM integration.
