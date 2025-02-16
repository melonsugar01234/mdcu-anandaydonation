#!/bin/bash

# Setup for docker
if [ ! -f "$DB_FILE" ]; then
	npx drizzle-kit push
	npx tsx src/db/seed.ts
else
    echo "Database already exists."
fi
