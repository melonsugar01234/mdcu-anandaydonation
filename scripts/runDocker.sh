#!/bin/bash

# Setup for docker
if [ ! -f "$DB_FILE" ]; then
    echo "Seeding Database."
	cp "$SEED_DB_FILE" "$DB_FILE"
else
    echo "Database already exists, skip seeding."
fi

node server.js
