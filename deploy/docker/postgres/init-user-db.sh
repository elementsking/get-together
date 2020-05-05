#!/bin/bash
# init-postgres-db.sh
#
# Copied into ./docker-entrypoint-initdb.d and executed upon PostgreSQL installation.
# Uses environment variables set in .env.

set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USER" <<-EOSQL
    CREATE DATABASE get_together;
    GRANT ALL PRIVILEGES ON DATABASE get_together TO postgres;
EOSQL
