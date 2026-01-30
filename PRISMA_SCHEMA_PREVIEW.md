# Preview: Prisma Schema for Your App

This is what your `prisma/schema.prisma` will look like.

---

## Full Prisma Schema

```prisma
// This is your database schema
// Prisma will generate the PostgreSQL tables from this

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// =====================
// USER MODEL
// =====================
model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  phoneNumber String
  role      Role       @default(USER)
  
  // Relations
  staffMembers Staff[]
  bookings     Booking[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

// =====================
// STAFF MODEL
// =====================
model Staff {
  id        String     @id @default(uuid())
  name      String
  role      StaffRole
  specialty String?
  experience String?
  imageUrl  String?
  bio       String?
  isAvailable Boolean   @default(true)
  unavailableDates DateTime[]
  
  // Foreign key
  addedById String?
  addedBy   User?      @relation(fields: [addedById], references: [id], onDelete: SetNull)
  
  // Relations
  bookings  Booking[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum StaffRole {
  CHEF
  HEAD_WAITER
  MIXOLOGIST
  PHOTOGRAPHER
  DECORATOR
  MC
  DJ
  HEAD_CLEANER
}

// =====================
// SERVICE MODEL
// =====================
model Service {
  id        String     @id @default(uuid())
  name      String     @unique
  description String?
  basePrice Decimal?   @db.Decimal(10, 2)
  imageUrl  String?
  isActive  Boolean    @default(true)
  
  // Relations
  bookings  Booking[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// =====================
// BOOKING MODEL
// =====================
model Booking {
  id        String     @id @default(uuid())
  date      DateTime
  status    BookingStatus @default(PENDING)
  notes     String?
  
  // Foreign keys
  userId    String
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  staffId   String
  staff     Staff      @relation(fields: [staffId], references: [id], onDelete: SetNull)
  
  serviceId String
  service   Service    @relation(fields: [serviceId], references: [id], onDelete: SetNull)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

// =====================
// EQUIPMENT BOOKING MODEL
// =====================
model EquipmentBooking {
  id        String     @id @default(uuid())
  fullName  String
  phone     String
  location  String
  date      DateTime
  items     Json       // Array of {id, name, quantity}
  status    EquipmentStatus @default(PENDING)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum EquipmentStatus {
  PENDING
  APPROVED
  REJECTED
}

// =====================
// GALLERY MODEL
// =====================
model Gallery {
  id          String    @id @default(uuid())
  title       String
  description String?
  imageUrl    String
  createdAt   DateTime  @default(now())
}

// =====================
// QUOTE MODEL
// =====================
model Quote {
  id          String    @id @default(uuid())
  fullName    String
  email       String
  phoneNumber String
  eventType   String
  eventDate   DateTime
  guests      Int
  location    String?
  details     String?
  read        Boolean   @default(false)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// =====================
// MESSAGE MODEL
// =====================
model Message {
  id        String    @id @default(uuid())
  fullName  String
  email     String
  subject   String
  message   String
  
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

---

## What This Schema Includes

### 8 Models
✅ User - With roles and relationships
✅ Staff - With availability tracking
✅ Service - With pricing
✅ Booking - With complex relationships
✅ EquipmentBooking - With JSONB items
✅ Gallery - For images
✅ Quote - For quote requests
✅ Message - For contact messages

### Features
✅ UUID primary keys (globally unique)
✅ Relationships defined (User → Staff → Booking)
✅ Enums for status/role fields
✅ Timestamps (createdAt, updatedAt)
✅ Proper cascading rules (onDelete)
✅ JSON fields for complex data

### Automatic by Prisma
✅ Type-safe queries
✅ Automatic migrations
✅ Database schema generation
✅ Prisma Client generation

---

## How to Use This Schema

### Step 1: Create prisma/schema.prisma
Copy the above schema to `prisma/schema.prisma`

### Step 2: Set DATABASE_URL
Edit `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Step 3: Create Tables
```bash
npx prisma migrate dev --name init
```

Prisma will:
- Create all tables
- Create all relationships
- Create enums
- Generate TypeScript types

### Step 4: Use in Code
```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Query examples
const user = await prisma.user.findUnique({ where: { id: "uuid" } });
const bookings = await prisma.booking.findMany({
  include: { user: true, staff: true, service: true }
});
```

---

## Query Examples

### Create
```javascript
const user = await prisma.user.create({
  data: {
    name: "John",
    email: "john@example.com",
    password: "hashed",
    phoneNumber: "123456",
    role: "ADMIN"
  }
});
```

### Read
```javascript
const user = await prisma.user.findUnique({
  where: { email: "john@example.com" }
});

const allBookings = await prisma.booking.findMany({
  include: { user: true, staff: true }
});
```

### Update
```javascript
const user = await prisma.user.update({
  where: { id: userId },
  data: { name: "Jane" }
});
```

### Delete
```javascript
await prisma.booking.delete({
  where: { id: bookingId }
});
```

### Complex Queries
```javascript
// Find bookings for a user with details
const bookings = await prisma.booking.findMany({
  where: { userId: "user-id" },
  include: {
    user: { select: { name: true, email: true } },
    staff: true,
    service: true
  },
  orderBy: { createdAt: 'desc' }
});
```

---

## Benefits of This Schema

✅ **Type-Safe**: TypeScript knows all fields
✅ **Auto Migrations**: Prisma handles schema changes
✅ **Relationships**: Clear and enforced
✅ **Enums**: Status/role values type-safe
✅ **Timestamps**: Automatic createdAt/updatedAt
✅ **UUID**: Globally unique IDs
✅ **Cascading**: Proper deletion rules

---

## Next: Controller Updates

Once this schema exists, all controllers will use Prisma like:

```javascript
// OLD (Sequelize)
const user = await User.findByPk(id);

// NEW (Prisma)
const user = await prisma.user.findUnique({
  where: { id }
});
```

Much cleaner! ✨

---

## Questions About Schema?

This schema perfectly fits your app with:
- All 8 models
- All relationships
- All status tracking
- Type-safe queries

Ready to implement? Just confirm your cloud service choice!
