# email-handler

Serverless contact form email handler for SBC.

## Local development

1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies.
3. Start the function locally.

```bash
npm install
npm start
```

The local endpoint is `http://localhost:8080`.

## Production deployment (Google Cloud Functions Gen 2)

1. Copy `env.production.yaml.example` to `env.production.yaml` and fill in real values.
2. Copy `deploy.local.env.example` to `deploy.local.env` and set your project values.
3. Authenticate and set the correct project in gcloud if needed.
4. Run deploy.

```bash
cp env.production.yaml.example env.production.yaml
cp deploy.local.env.example deploy.local.env
npm run deploy:gcp
```

## Required env vars

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `ALLOWED_ORIGIN`
- `LIVE_ALLOWED_ORIGIN` (optional)
- `ALLOWED_ORIGINS` (optional comma-separated)

## Frontend integration

Set `GATSBY_CONTACT_FORM_ENDPOINT` in Gatsby to the deployed HTTPS function URL.

## Security notes

- Never commit `.env`, `env.production.yaml`, or API keys.
- Rotate `RESEND_API_KEY` if it has been exposed.
