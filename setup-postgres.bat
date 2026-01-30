@echo off
REM PostgreSQL Migration Setup Script for Windows
REM This script helps set up your PostgreSQL database quickly

echo ==================================================
echo PostgreSQL Migration Setup Script (Windows)
echo ==================================================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not installed!
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

echo ✅ PostgreSQL found
echo.

REM Create database
echo Creating database 'hiro_db'...
psql -U postgres -c "CREATE DATABASE hiro_db;" 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Database might already exist (that's ok)
)

echo ✅ Database created/verified
echo.

REM Check if .env exists
if not exist "hiro-backend\.env" (
    echo Creating .env file from .env.example...
    copy hiro-backend\.env.example hiro-backend\.env
    echo ✅ .env created - PLEASE EDIT WITH YOUR POSTGRES PASSWORD!
    echo.
    echo Edit hiro-backend\.env and update:
    echo   DB_PASSWORD=your_postgres_password
    echo   DB_HOST=localhost
    echo   DB_PORT=5432
    pause
    exit /b 0
)

echo ✅ .env file already exists
echo.

REM Install dependencies
echo Installing dependencies...
cd hiro-backend
call npm install
cd ..

if %errorlevel% neq 0 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

echo ==================================================
echo ✨ Setup Complete!
echo ==================================================
echo.
echo Next steps:
echo 1. Edit hiro-backend\.env (if needed)
echo 2. Open terminal in hiro-backend folder
echo 3. Run: npm run dev
echo.
echo Your PostgreSQL database is ready to use!
echo.
pause
