This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Axios Integration & axiosInstance Explained

### Why We Use axiosInstance Instead of Hardcoding Requests
axiosInstance is a pre-configured Axios client that lets you:
- Set a base URL once: No need to hardcode "http://localhost:5000/api" everywhere. All API calls automatically prepend the base URL.
- Attach auth tokens automatically: If a user is logged in, their JWT token is added to every request header (Authorization: Bearer <token>), so protected routes just work.
- Centralized error handling: If a token expires or becomes invalid (401 Unauthorized), the user is logged out and redirected to /login. This avoids repeating token logic in every component.

Basically, axiosInstance acts as a ready-to-use bridge between your frontend and backend with all repetitive setup handled in one place.

### Example 1: Login Page (/login)
- How it works:
  - Sends a POST request to /auth/login via axiosInstance.
  - On success:
       - Saves the token and user role in localStorage.
       - Redirects based on role (admin → /admin, regular users → previous page or /).
  - Handles errors (server messages or generic login failures) automatically
```
const res = await axiosInstance.post("/auth/login", formData);
const { token, user } = res.data;
localStorage.setItem("authToken", token);
localStorage.setItem("userRole", user.role);
```

This demonstrates how axiosInstance makes authenticated requests seamless and reduces boilerplate.