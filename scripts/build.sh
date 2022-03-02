#!/usr/bin/env bash
set -e

./scripts/pre-build.sh
SKIP_NOTARIZATION=true CSC_IDENTITY_AUTO_DISCOVERY=false electron-builder build --mac --x64 --publish never