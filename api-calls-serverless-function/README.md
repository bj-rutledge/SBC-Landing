# Google Maps API Serverless Function

This is a Google Cloud Function that proxies requests to Google Maps APIs (Aerial View and Street View) to keep API keys secure.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the TypeScript:
   ```bash
   npm run build
   ```

3. Set your Google Maps API key in `.env`:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

## Local Testing

To test locally (requires Functions Framework):
```bash
npm start
```

Then make requests to `http://localhost:8080?type=aerial&address=1600%20Amphitheatre%20Parkway%2C%20Mountain%20View%2C%20CA`

## Deployment to Google Cloud

1. Install Google Cloud CLI if not already installed.

2. Authenticate:
   ```bash
   gcloud auth login
   ```

3. Set your project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

4. Deploy the function (use your nearest region, e.g. `us-west1`):

   **Option A (recommended): pass the key directly during deploy**
   ```bash
   gcloud functions deploy apiCall \
     --runtime nodejs20 \
     --trigger-http \
     --source . \
     --entry-point apiCall \
     --allow-unauthenticated \
     --region us-west1 \
     --set-env-vars "GOOGLE_MAPS_API_KEY=your_actual_api_key_here"
   ```

   **Option B (YAML file):** create `env.yaml` with:
   ```yaml
   GOOGLE_MAPS_API_KEY: "your_actual_api_key_here"
   ```

   Then deploy with:
   ```bash
   gcloud functions deploy apiCall \
     --runtime nodejs20 \
     --trigger-http \
     --source . \
     --entry-point apiCall \
     --allow-unauthenticated \
     --region us-west1 \
     --env-vars-file env.yaml
   ```

5. Note the function URL from the output.

## Usage

Make GET requests to the function URL with query parameters:
- `type`: 'aerial' or 'streetview'
- `address`: The address to query

Example:
```
GET https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/apiCall?type=aerial&address=123%20Main%20St%2C%20City%2C%20State
```

For aerial: Returns JSON response from Aerial View API.
For streetview: Returns the image data directly.

Errors are returned as JSON with a sanitized error message (API key redacted).