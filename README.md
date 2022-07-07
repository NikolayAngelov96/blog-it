# Blog It

Blog it is full-stack **Social Bloging Platform** inspired by [Dev.to](https://dev.to/).

Everyone can access and read all **published** blog posts.

But only registered **Users** can:

- **`Create`** posts
- **`Like`** 💞 posts
- **`Edit`** and **`Delete`** their own posts

## Implementation Details

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I used for:

- Database: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM.

- Styling: [TailwindCSS](https://tailwindcss.com/).

- Hashing passwords: [bcrypt](https://www.npmjs.com/package/bcrypt).

- Tokens: [JWT](https://www.npmjs.com/package/jsonwebtoken).

Also I used Next js [API routes](https://nextjs.org/docs/api-routes/introduction) for handling request for:

- **login**
- **register**
- CRUD operations for **post**

### Login

Login page contains a form for user authentication.

After providing **`email`** and **`password`** request is send and the server checks in database for user with the provided email and compares the password with the encrypted password in the database.

If error occurs(either there is no such email or password is wrong) it gives you a toast with the message.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
