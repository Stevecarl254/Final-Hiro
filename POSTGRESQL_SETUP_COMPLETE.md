# PostgreSQL Setup Complete ✅

Your backend is now **fully configured to use PostgreSQL** with Sequelize ORM. MongoDB has been completely removed.

## 📋 What Was Done

### 1. ✅ MongoDB Removed
- **Deleted references** from `src/config/db.js` (kept as reference only)
- **Removed** `mongoose` imports from all scripts and seeders
- **Updated** `scripts/createAdmin.js` to use PostgreSQL/Sequelize
- **Updated** `src/seeders/seedService.js` to use PostgreSQL/Sequelize
- **Updated** `src/seeders/seedStaff.js` to use PostgreSQL/Sequelize

### 2. ✅ PostgreSQL/Sequelize Configured
- **Database config**: `src/config/database.js` (already present)
- **Models**: All 8 models using Sequelize (User, Staff, Service, Booking, EquipmentBooking, Gallery, Quote, Message)
- **Associations**: Properly defined in `src/models/index.js`
- **Controllers**: Updated to use Sequelize queries
- **Routes**: Properly configured for PostgreSQL

### 3. ✅ Code Cleanup
- **staffController.js**: Changed `require()` to ES6 `import` for User model
- **bookingController.js**: Changed `require()` to ES6 `import` for User, Staff, Service models
- **All scripts**: Updated to use PostgreSQL connection

## 🚀 Quick Start

### Step 1: Install PostgreSQL Locally (for development)

**Windows:**
```powershell
# Using Chocolatey
choco install postgresql

# Or download from https://www.postgresql.org/download/windows/
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL terminal:
CREATE DATABASE hiro_db;

# Verify it was created
\l
```

### Step 3: Set Environment Variables

Create or update `.env` file in `hiro-backend`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=hiro_db
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
PORT=5000
```

**Important**: Change these values to match your PostgreSQL setup!

### Step 4: Install Dependencies

```bash
cd hiro-backend
npm install
```

### Step 5: Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Or production mode
npm start
```

**Expected output:**
```
PostgreSQL connected successfully!
Database synchronized!
Server is running on port 5000
```

### Step 6: (Optional) Seed Initial Data

```bash
# Create admin user
node scripts/createAdmin.js

# Seed services
node src/seeders/seedService.js

# Seed staff
node src/seeders/seedStaff.js
```

## 📊 Database Structure

### Models with Sequelize

```
User
├── id (UUID, Primary Key)
├── name
├── email (unique)
├── password (hashed with bcrypt)
├── phoneNumber
├── role (ENUM: user, admin)
└── timestamps (createdAt, updatedAt)

Staff
├── id (UUID, Primary Key)
├── name
├── role
├── specialty
├── experience
├── bio
├── isAvailable
├── unavailableDates (array)
├── addedById (Foreign Key → User)
└── timestamps

Service
├── id (UUID, Primary Key)
├── name (unique)
├── description
├── basePrice (decimal)
├── isActive
└── timestamps

Booking
├── id (UUID, Primary Key)
├── date
├── status (ENUM: pending, confirmed, completed, cancelled)
├── notes
├── userId (Foreign Key → User)
├── staffId (Foreign Key → Staff)
├── serviceId (Foreign Key → Service)
└── timestamps

EquipmentBooking
├── id (UUID, Primary Key)
├── fullName
├── phone
├── location
├── date
├── items (JSON)
├── status (ENUM: pending, approved, rejected)
└── timestamps

Gallery
├── id (UUID, Primary Key)
├── title
├── description
├── imageUrl
└── timestamps

Quote
├── id (UUID, Primary Key)
├── fullName
├── email
├── phoneNumber
├── eventType
├── eventDate
├── guests (integer)
├── location
├── details
├── read (boolean)
└── timestamps

Message
├── id (UUID, Primary Key)
├── fullName
├── email
├── subject
├── message
└── timestamps
```

## 🔗 API Endpoints (Still the Same)

All your existing API endpoints work exactly the same way! The database change is **transparent** to the frontend.

**User Routes:**
- `GET /api/users` - Get all users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Staff Routes:**
- `GET /api/staff` - Get all staff
- `GET /api/staff/admin` - Get staff with details (admin only)
- `POST /api/staff` - Add staff (admin only)
- `PUT /api/staff/:id` - Update staff (admin only)
- `DELETE /api/staff/:id` - Delete staff (admin only)

**Booking Routes:**
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

**Service Routes:**
- `GET /api/services` - Get all services
- `POST /api/services` - Add service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

**Equipment Booking Routes:**
- `POST /api/equipment-bookings` - Create equipment booking
- `GET /api/equipment-bookings` - Get all equipment bookings (admin only)
- `PUT /api/equipment-bookings/:id` - Update booking status (admin only)

**Gallery Routes:**
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add image (admin only, with multer)
- `DELETE /api/gallery/:id` - Delete image (admin only)

**Quote Routes:**
- `POST /api/quotes` - Submit quote request
- `GET /api/quotes` - Get all quotes (admin only)
- `PUT /api/quotes/:id/read` - Mark quote as read (admin only)

**Message Routes:**
- `POST /api/messages` - Submit contact message
- `GET /api/messages` - Get all messages (admin only)

## ✨ What Changed Under the Hood

### Before (MongoDB)
```javascript
const user = await User.findOne({ email });
const staff = await Staff.find();
await staff.deleteMany();
```

### After (Sequelize/PostgreSQL)
```javascript
const user = await User.findOne({ where: { email } });
const staff = await Staff.findAll();
await Staff.destroy({ where: {} });
```

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
**Solution**: PostgreSQL is not running. Start it:
```bash
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
```

### Error: "Database connection failed"
**Solution**: Check your `.env` file:
```bash
# Make sure these match your PostgreSQL setup
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_actual_password
DB_NAME=hiro_db
```

### Error: "relation \"users\" does not exist"
**Solution**: Database hasn't synced yet. Sequelize will auto-create tables on first run.
If needed, drop and recreate:
```bash
psql -U postgres

# In PostgreSQL terminal:
DROP DATABASE hiro_db;
CREATE DATABASE hiro_db;
```

Then restart the server.

### Error: "password authentication failed"
**Solution**: Your PostgreSQL password is wrong. Reset it:
```bash
# Windows (in admin command prompt):
psql -U postgres -c "ALTER USER postgres PASSWORD 'new_password';"

# macOS/Linux:
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'new_password';"
```

## 📝 Environment Variables Reference

```bash
# Database Connection
DB_HOST              # PostgreSQL host (localhost for dev)
DB_PORT              # PostgreSQL port (5432 default)
DB_USER              # PostgreSQL username (postgres default)
DB_PASSWORD          # PostgreSQL password
DB_NAME              # Database name (hiro_db)

# Server
PORT                 # Server port (5000)
NODE_ENV             # Environment (development/production)

# Authentication
JWT_SECRET           # Secret key for JWT tokens

# Redis (for caching)
REDIS_URL            # Redis connection string

# Frontend
FRONTEND_URL         # Frontend URL for CORS

# Optional
UPLOAD_PATH          # Path for file uploads
ADMIN_EMAIL          # Admin email address
```

## 🎯 Next Steps

1. **✅ PostgreSQL installed locally** (for development)
2. **✅ Database created** (hiro_db)
3. **✅ `.env` file configured** with PostgreSQL credentials
4. **✅ Dependencies installed** (`npm install`)
5. **✅ Server started** (`npm run dev`)
6. **✅ Optional: Seed initial data** (admin user, services, staff)

## 🚀 Production Deployment

When you deploy to production, use a cloud-hosted PostgreSQL service:

**Recommended Options:**
- **Supabase** (PostgreSQL as a service, free tier available)
- **Railway.app** (Simple deployment, $5-30/month)
- **Render** (Free tier with limitations, $7-100/month)
- **AWS RDS** (Enterprise, $20+/month)

Simply change your `DB_HOST` to the cloud service host, and everything else works the same!

## 📚 Useful Resources

- **Sequelize Docs**: https://sequelize.org/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Supabase Docs**: https://supabase.com/docs
- **Railway Docs**: https://docs.railway.app/

---

**Status**: ✅ PostgreSQL fully integrated, MongoDB completely removed.

**Your backend is ready to use PostgreSQL!**
