#!/usr/bin/env bash
set -e

rm -rf renderer/.next app dist
next build renderer
next export -o app renderer
mkdir app/server
cp renderer/.next/server/ssr-module-cache.js app/
rollup --config rollup.background.config.js
rm -rf node_modules/sharp # The folder causes an error and we don't need it.
