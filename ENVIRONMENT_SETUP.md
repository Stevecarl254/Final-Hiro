# Environment Configuration Examples

## Local Development (.env)

```env
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hiro_db
DB_USER=postgres
DB_PASSWORD=your_local_password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_development_only

# Redis (for caching/sessions)
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Logging (optional)
LOG_LEVEL=debug
```

## Staging Environment (.env.staging)

```env
# PostgreSQL Configuration
DB_HOST=postgres.staging.internal
DB_PORT=5432
DB_NAME=hiro_db_staging
DB_USER=hiro_user_staging
DB_PASSWORD=${STAGING_DB_PASSWORD}

# Server
PORT=5000
NODE_ENV=staging

# JWT
JWT_SECRET=${STAGING_JWT_SECRET}

# Redis
REDIS_HOST=redis.staging.internal
REDIS_PORT=6379

# Frontend URL
FRONTEND_URL=https://staging.hiroapplication.com

# Logging
LOG_LEVEL=info
```

## Production Environment (.env.production)

```env
# PostgreSQL Configuration (use environment variables for secrets!)
DB_HOST=${PROD_DB_HOST}
DB_PORT=5432
DB_NAME=hiro_db_prod
DB_USER=${PROD_DB_USER}
DB_PASSWORD=${PROD_DB_PASSWORD}

# Server
PORT=5000
NODE_ENV=production

# JWT
JWT_SECRET=${PROD_JWT_SECRET}

# Redis (use managed service)
REDIS_HOST=${PROD_REDIS_HOST}
REDIS_PORT=6379

# Frontend URL
FRONTEND_URL=https://hiroapplication.com

# Logging
LOG_LEVEL=warn

# Optional: CDN, Email Service, etc.
CDN_URL=https://cdn.hiroapplication.com
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=${SENDGRID_API_KEY}
```

## Docker Environment (.env.docker)

```env
# PostgreSQL Configuration (service names match docker-compose)
DB_HOST=postgres
DB_PORT=5432
DB_NAME=hiro_db
DB_USER=hiro_user
DB_PASSWORD=docker_password_change_in_prod

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=docker_jwt_secret_change_in_prod

# Redis (service name matches docker-compose)
REDIS_HOST=redis
REDIS_PORT=6379

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

---

## Docker Compose Example (docker-compose.yml)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: hiro_postgres
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: hiro_redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Node.js Backend
  backend:
    build:
      context: ./hiro-backend
      dockerfile: Dockerfile
    container_name: hiro_backend
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - PORT=5000
      - NODE_ENV=development
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "5000:5000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./hiro-backend:/app
      - /app/node_modules
    command: npm run dev

  # Next.js Frontend
  frontend:
    build:
      context: ./hiro-frontend
      dockerfile: Dockerfile
    container_name: hiro_frontend
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./hiro-frontend:/app
      - /app/node_modules

volumes:
  postgres_data:

networks:
  default:
    name: hiro_network
```

## Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

---

## Environment Variables Explanation

### Database Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_HOST` | PostgreSQL server address | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | hiro_db |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | secure_password |

### Server Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Express server port | 5000 |
| `NODE_ENV` | Environment | development/staging/production |

### JWT Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `JWT_SECRET` | JWT signing secret | min 32 chars, random |

### Redis Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `REDIS_HOST` | Redis server address | localhost |
| `REDIS_PORT` | Redis port | 6379 |

### Frontend Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

---

## Setting Environment Variables on Different Platforms

### Windows Command Prompt
```cmd
set DB_HOST=localhost
set DB_PORT=5432
set DB_NAME=hiro_db
npm run dev
```

### Windows PowerShell
```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_NAME="hiro_db"
npm run dev
```

### Mac/Linux
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=hiro_db
npm run dev
```

### Using .env file (Recommended)
```bash
# Create .env file in hiro-backend/
# Node.js with dotenv will auto-load variables
npm run dev
```

---

## Generating Secure Secrets

### Generate JWT Secret
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

### Generate Database Password
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# OpenSSL
openssl rand -base64 16
```

---

## Environment Variable Best Practices

### ✅ DO
- ✅ Use `.env` file for development
- ✅ Never commit `.env` to git
- ✅ Use strong secrets (min 32 chars for JWT)
- ✅ Rotate secrets regularly in production
- ✅ Use environment-specific files (`.env.staging`, `.env.production`)
- ✅ Document all variables with examples

### ❌ DON'T
- ❌ Hard-code secrets in code
- ❌ Store `.env` in git
- ❌ Use same secret for all environments
- ❌ Use predictable secrets
- ❌ Log sensitive variables
- ❌ Share secrets via chat/email

---

## Using Environment Variables in Code

```javascript
// In your code
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

// With dotenv (auto-loaded)
import dotenv from 'dotenv';
dotenv.config();

const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'hiro_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
```

---

## Verification Checklist

- [ ] `.env` file created in `hiro-backend/`
- [ ] All required variables set
- [ ] `DB_PASSWORD` matches your postgres password
- [ ] `JWT_SECRET` is 32+ characters
- [ ] `.env` is in `.gitignore`
- [ ] No secrets committed to git
- [ ] All variables validated on startup
- [ ] Error messages clear for missing vars

---

## Need Help?

See related documentation:
- `README_MIGRATION.md` - Migration overview
- `POSTGRESQL_QUICK_REFERENCE.md` - Quick start
- `MIGRATION_GUIDE.md` - Detailed setup
