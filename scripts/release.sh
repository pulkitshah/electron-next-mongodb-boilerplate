#!/usr/bin/env bash
set -e

if ! command -v jq &> /dev/null
then
  echo ""
  echo "\`jq\` could not be found."
  echo ""
  echo "  > brew install jq"
  echo ""
  exit
fi

read -p 'Next Version: ' nextVersion
jq ".version = \"$nextVersion\"" package.json > temp.json && mv temp.json package.json

yarn run changelog

code CHANGELOG.md

read -p 'Is the changelog okay? (y/N): ' changelogConfirmed

if [ "$changelogConfirmed" != "Y" ] && [ "$changelogConfirmed" != "y" ]; then
  echo "quitting..."
  exit
fi

open "https://github.com/eunjae-lee/gomscope-releases/edit/master/CHANGELOG.md"

git add .
git commit -m "chore: release v$nextVersion"
git tag v$nextVersion
git push
git push --tags

./scripts/pre-build.sh
electron-builder build --mac --x64 --publish always