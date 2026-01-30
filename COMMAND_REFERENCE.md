# 🚀 PostgreSQL - Ready to Go Commands

## Step 1: Install PostgreSQL (One-Time)

### Windows
```powershell
# Download from: https://www.postgresql.org/download/windows/
# Or use Chocolatey:
choco install postgresql
```

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

---

## Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside PostgreSQL terminal, run:
CREATE DATABASE hiro_db;

# Verify it was created:
\l

# Exit
\q
```

---

## Step 3: Configure Environment Variables

Create `.env` file in `hiro-backend/` folder:

```bash
# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=hiro_db

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# Frontend
FRONTEND_URL=http://localhost:3000
```

⚠️ **Important**: Replace `your_password_here` with your actual PostgreSQL password!

---

## Step 4: Start Backend

```bash
# Navigate to backend directory
cd hiro-backend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
PostgreSQL connected successfully!
Database synchronized!
Server is running on port 5000
Connected to Redis
```

✅ **Backend is now running on http://localhost:5000**

---

## Step 5: Optional - Seed Initial Data

### Create Admin User
```bash
node scripts/createAdmin.js
```

**Expected Output:**
```
✔ Super admin created successfully
Email: mediakenyahome@gmail.com
```

### Seed Services
```bash
node src/seeders/seedService.js
```

**Expected Output:**
```
✅ Services seeded successfully!
```

### Seed Staff
```bash
node src/seeders/seedStaff.js
```

**Expected Output:**
```
✅ Staff profiles seeded successfully!
```

---

## Step 6: Test Backend is Working

```bash
# Test if server is running
curl http://localhost:5000/api/services

# Or use any API testing tool (Postman, Thunder Client, etc.)
# GET http://localhost:5000/api/services
```

**Expected Response:**
```json
[]
```
(Empty array if no services seeded yet)

---

## 🎯 Alternative: Use Cloud PostgreSQL (No Local Installation!)

### Using Supabase (Recommended - FREE)

**1. Sign up:**
- Go to https://supabase.com
- Click "Start your project"
- Sign in with GitHub/Google

**2. Create project:**
- Project name: `hiro`
- Region: Choose closest to your location
- Password: Create and save
- Click "Create new project"

**3. Get connection string:**
- Go to Project Settings → Database
- Under "Connection Info" find the PostgreSQL connection string
- Copy it

**4. Update `.env` file:**
```bash
# From Supabase connection string, extract:
DB_HOST=xxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_from_supabase
DB_NAME=postgres
```

**5. Start backend:**
```bash
npm run dev
```

✅ **That's it! No local PostgreSQL needed!**

---

## Daily Development Commands

```bash
# Start backend
npm run dev

# Stop backend
# Press Ctrl+C in terminal

# Run in production mode
npm start

# Create admin user
node scripts/createAdmin.js

# Seed services
node src/seeders/seedService.js

# Seed staff
node src/seeders/seedStaff.js
```

---

## 📊 Project Structure

```
Final-Hiro/
├── hiro-backend/          ← Start here!
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── database.js    (PostgreSQL config)
│   │   │   ├── redis.js
│   │   │   └── jwt.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Staff.js
│   │   │   ├── Service.js
│   │   │   ├── Booking.js
│   │   │   ├── EquipmentBooking.js
│   │   │   ├── Gallery.js
│   │   │   ├── Quote.js
│   │   │   ├── Message.js
│   │   │   └── index.js       (Associations)
│   │   ├── controllers/       (API endpoints)
│   │   ├── routes/           (API routes)
│   │   └── middleware/       (Auth, etc)
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── seeders/
│   │   ├── seedService.js
│   │   └── seedStaff.js
│   ├── package.json
│   ├── .env                  (Create this)
│   └── .env.example          (Reference)
├── hiro-frontend/          (Next.js - no changes needed!)
└── Documentation files...
```

---

## 🎨 Frontend (No Changes Needed!)

The frontend works exactly the same! Start it normally:

```bash
cd hiro-frontend
npm install
npm run dev
```

✅ It will connect to your backend at `http://localhost:5000`

---

## ✨ API Endpoints (Unchanged)

All endpoints work the same way:

**User Endpoints:**
- `GET /api/users` - Get all users
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login

**Staff Endpoints:**
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Add staff (admin only)
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

**Service Endpoints:**
- `GET /api/services` - Get all services
- `POST /api/services` - Add service (admin only)

**Booking Endpoints:**
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin only)

...and more! All still work! ✅

---

## 🆘 Troubleshooting

### Port 5432 refused (PostgreSQL not running)
```bash
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
```

### Wrong password
```bash
# Reset PostgreSQL password
psql -U postgres -c "ALTER USER postgres PASSWORD 'new_password';"

# Update .env with new password
```

### Database connection error
```bash
# Check if database exists
psql -U postgres -l

# If hiro_db doesn't exist, create it:
psql -U postgres -c "CREATE DATABASE hiro_db;"
```

### Port already in use
```bash
# Change PORT in .env to different number (e.g., 5001)
PORT=5001

# Then restart with: npm run dev
```

---

## 📚 Documentation

- **QUICK_START.md** - Super quick reference
- **POSTGRESQL_SETUP_COMPLETE.md** - Full guide with details
- **POSTGRESQL_MIGRATION_FINAL.md** - Complete summary
- **VERIFICATION_REPORT.md** - What was changed
- **.env.example** - Environment variables reference

---

## 🎉 You're All Set!

Just run:
```bash
cd hiro-backend
npm run dev
```

Backend will start! 🚀

Questions? Check the documentation files above.
