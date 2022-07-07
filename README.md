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

```
Image here login page

```

After providing **`email`** and **`password`** request is send and the server checks in database for user with the provided email and compares the password with the encrypted password in the database.

If error occurs(either there is no such email or password is wrong) it gives you a toast with the message.

```
Image here login-toast

```

### Register

You can create an account by entering **`email`**, **`username`** and **`password`**. Then the server will take this data **hash** the password and save it to the database.

If there are empty fields the UI will display message with the required fields.

```
Image here register-form-validation

```

### Home

For this page I used **SSR** to get the data and display the most recent posts.
Which is **Preview card** that contains **title**, **hearts** and **username**(of the user, who created the post).

```
Image here home

```

By clicking on the username you'll be redirected to that user public profile page.
And if you click on the post title you'll be redirected to that post page.

### Post

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
