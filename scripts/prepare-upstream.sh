#!/usr/bin/env bash
set -euo pipefail
# Download published upstream packages for source inspection and reconstruction.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p vendor
if ! command -v npm >/dev/null 2>&1; then echo "npm required" >&2; exit 1; fi
npm --prefix vendor install --no-save --ignore-scripts --no-audit --no-fund \
  @imgly/background-removal@1.7.0 \
  @imgly/background-removal-data@1.7.0 \
  onnxruntime-web@1.21.0
echo "Upstream npm packages downloaded to vendor/node_modules"
echo "Review license metadata and IMG.LY upstream build tooling before bundling."
