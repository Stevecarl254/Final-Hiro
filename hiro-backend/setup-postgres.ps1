# PostgreSQL Setup Script for Windows
# This script will help you set up PostgreSQL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PostgreSQL Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
$pgPath = "C:\Program Files\PostgreSQL"
if (Test-Path $pgPath) {
    Write-Host "PostgreSQL is already installed!" -ForegroundColor Green
} else {
    Write-Host "PostgreSQL is not installed." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please choose an installation method:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Option 1: Download from https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "         Run the installer and use these settings:" -ForegroundColor White
    Write-Host "         - Installation directory: C:\Program Files\PostgreSQL" -ForegroundColor Gray
    Write-Host "         - Superuser password: (set something secure)" -ForegroundColor Gray
    Write-Host "         - Port: 5432" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Use Chocolatey: choco install postgresql" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Use Windows Package Manager: winget install PostgreSQL.PostgreSQL" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter after installing PostgreSQL"
}

Write-Host ""
Write-Host "After PostgreSQL is installed:" -ForegroundColor Cyan
Write-Host "1. Open PostgreSQL Command Line (psql)" -ForegroundColor White
Write-Host "2. Connect with: psql -U postgres" -ForegroundColor Gray
Write-Host "3. Run: CREATE DATABASE hiro_db;" -ForegroundColor Gray
Write-Host "4. Verify: \l" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see: POSTGRESQL_SETUP_COMPLETE.md" -ForegroundColor Cyan
