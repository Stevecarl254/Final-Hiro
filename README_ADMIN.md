Admin creation helper

This repository has a helper script to create an admin user using the backend's Sequelize models.

How to run:

1. Ensure `hiro-backend/.env` (or environment variables) contain the correct DB connection values: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and `JWT_SECRET`.
2. From `hiro-backend` folder run:

```powershell
npm run create-admin
```

This will create an admin with email `admin@hiro.co.ke` and password `hirocateringservices` (the password is hashed by the User model hook before saving).

If the admin already exists, the script will print a message and exit.

Note: This script uses the Sequelize models (the same models the running server uses) so the created admin will be usable by the live backend.

Duplicate files note
--------------------
There is a TypeScript variant `scripts/createAdmin.ts` present in the repo. It is deprecated and kept as a harmless no-op to avoid accidental use. Use `scripts/createAdmin.js` (or `npm run create-admin`) to create the admin.
