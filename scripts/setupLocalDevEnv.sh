#!/bin/bash

# Normalize path if run in scripts folder
if [ "$(basename "$(pwd)")" == "scripts" ]; then
    cd ..
fi

# Setup .env file
if [ ! -f ".env" ]; then
    echo "Creating .env"
    echo "DB_FILE=local/database.db" > ".env"
else
    echo ".env already exists."
fi

# Setup for local developments
mkdir -p local/
if [ ! -f "local/database.db" ]; then
	npx drizzle-kit push
	npx tsx src/db/seed.ts
else
    echo "Database already exists."
fi
