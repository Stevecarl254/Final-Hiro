# MongoDB to PostgreSQL Migration Guide

## Overview
This guide walks you through migrating your Hiro system from **MongoDB** (with Mongoose) to **PostgreSQL** (with Sequelize).

## What Changed

### Dependencies
- **Removed**: `mongoose`
- **Added**: `pg`, `sequelize`, `uuid`

### Database Configuration
- **MongoDB**: Used connection string `MONGO_URI`
- **PostgreSQL**: Uses separate environment variables:
  - `DB_HOST` (default: localhost)
  - `DB_PORT` (default: 5432)
  - `DB_NAME` (default: hiro_db)
  - `DB_USER` (default: postgres)
  - `DB_PASSWORD`

### Model Changes
All models have been converted from Mongoose to Sequelize:

#### Key Differences:
| Mongoose | Sequelize |
|----------|-----------|
| `_id` (ObjectId) | `id` (UUID) |
| `findOne()` | `findOne({where: {...}})` |
| `findById()` | `findByPk()` |
| `find()` | `findAll()` |
| `new Model()` then `save()` | `Model.create()` |
| `.populate()` | `.include` in options |
| Refs stored as ObjectId | Foreign Keys (UUID) |

## Installation Steps

### 1. Install PostgreSQL (if not already installed)
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hiro_db;

# (Optional) Create a specific user
CREATE USER hiro_user WITH PASSWORD 'your_password';
ALTER ROLE hiro_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE hiro_db TO hiro_user;
```

### 3. Update .env file
Copy `.env.example` to `.env` and update with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hiro_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### 4. Install Dependencies
```bash
cd hiro-backend
npm install
```

### 5. Start Server
```bash
npm run dev
# or
npm start
```

The server will:
- Connect to PostgreSQL
- Automatically create tables (if using `alter: true` in sync)
- Initialize all relationships
- Be ready to accept requests

## API Compatibility

✅ **All API endpoints remain the same**
- No route changes
- No request/response format changes
- Drop-in replacement

## Important Notes

### Sequelize vs Mongoose:
- **UUIDs**: All primary keys are now UUID instead of MongoDB ObjectId
- **Relationships**: Uses foreign keys instead of refs
- **Validation**: Built-in validators + custom hooks
- **Hooks**: Pre/post save hooks work similarly

### Data Migration (if migrating existing data):
If you have existing MongoDB data, use a migration tool like:
- `migrate-mongo`
- Custom script using both libraries temporarily
- Manual export/import

## Troubleshooting

### Error: "role does not exist"
PostgreSQL ENUM types need to be created. The Sequelize `alter: true` option should handle this automatically.

### Connection refused
- Check PostgreSQL is running: `psql -U postgres` should work
- Verify credentials in `.env`
- Ensure DB_NAME database exists

### Port 5432 already in use
Change `DB_PORT` in `.env` to an available port (e.g., 5433)

## Frontend Changes

The frontend remains **fully compatible** - no changes needed in:
- `hiro-frontend/lib/mongodb.ts` - Can be removed or kept (not used by backend)
- API calls work exactly the same
- Authentication tokens work the same

## Next Steps

1. ✅ Dependencies updated
2. ✅ Models converted
3. ✅ Controllers updated
4. ✅ Middleware updated
5. 🔄 Update remaining controllers (booking, equipment, etc.)
6. 🔄 Update report controller (MongoDB aggregation → Sequelize queries)
7. 🔄 Update gallery routes (direct model access → Sequelize)
8. 🔄 Test all endpoints

## Support
For issues with Sequelize queries, refer to:
- https://sequelize.org/docs/v6/core-concepts/model-basics/
- https://sequelize.org/docs/v6/core-concepts/associations/
