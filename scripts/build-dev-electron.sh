#!/usr/bin/env bash
set -e

rollup --config rollup.background.config.js
SKIP_NOTARIZATION=true CSC_IDENTITY_AUTO_DISCOVERY=false electron-builder build --mac --x64 --publish never