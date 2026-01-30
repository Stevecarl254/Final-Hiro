-- PostgreSQL Database Setup Script for Hiro
-- Run this in psql (PostgreSQL Command Line)

-- Step 1: Create the database
CREATE DATABASE hiro_db;

-- Step 2: Connect to the database
\c hiro_db

-- Step 3: Enable extensions (optional but recommended)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Done!
-- Now update your .env file with:
-- DB_HOST=localhost
-- DB_PORT=5432
-- DB_NAME=hiro_db
-- DB_USER=postgres
-- DB_PASSWORD=your_postgres_password
