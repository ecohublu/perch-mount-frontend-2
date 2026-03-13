#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_ENV__ = {
  API_BASE_URL: "${API_BASE_URL:-http://localhost:5000/api}",
  GOOGLE_CLIENT_ID: "${GOOGLE_CLIENT_ID:-}"
};
EOF
