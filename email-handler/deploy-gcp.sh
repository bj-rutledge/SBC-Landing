#!/usr/bin/env bash
set -euo pipefail

if [[ -f "./deploy.local.env" ]]; then
  # shellcheck disable=SC1091
  source "./deploy.local.env"
fi

PROJECT_ID="${PROJECT_ID:-}"
REGION="${REGION:-us-west1}"
FUNCTION_NAME="${FUNCTION_NAME:-contact-us-email-handler}"
RUNTIME="${RUNTIME:-nodejs20}"
ENTRY_POINT="${ENTRY_POINT:-contactUsEmailHandler}"
ENV_FILE="${ENV_FILE:-env.production.yaml}"
ALLOW_UNAUTH="${ALLOW_UNAUTH:-true}"

if [[ -z "${PROJECT_ID}" ]]; then
  echo "PROJECT_ID is required. Set it in deploy.local.env or your shell." >&2
  exit 1
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}. Copy env.production.yaml.example to ${ENV_FILE} and fill it in." >&2
  exit 1
fi

ALLOW_FLAG=""
if [[ "${ALLOW_UNAUTH}" == "true" ]]; then
  ALLOW_FLAG="--allow-unauthenticated"
fi

echo "Deploying ${FUNCTION_NAME} to project ${PROJECT_ID} (${REGION})"

gcloud functions deploy "${FUNCTION_NAME}" \
  --project="${PROJECT_ID}" \
  --gen2 \
  --region="${REGION}" \
  --runtime="${RUNTIME}" \
  --source=. \
  --entry-point="${ENTRY_POINT}" \
  --trigger-http \
  --env-vars-file="${ENV_FILE}" \
  ${ALLOW_FLAG}

echo "Deployment complete."
