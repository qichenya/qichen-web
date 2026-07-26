#!/bin/bash
set -e

echo "Installing dependencies with npm install (to handle optional dependencies)..."
npm install

echo "Building project..."
npm run build
