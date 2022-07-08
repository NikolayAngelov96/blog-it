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

React Context API is used for managing the global auth state.

Most pages use **Server Side Rendering** to fetch data to the server.

Also I used Next js [API routes](https://nextjs.org/docs/api-routes/introduction) for handling request for:

- **login**
- **register**
- **CRUD** operations for **post**

Posts can be written using [Markdown](https://www.markdownguide.org/) markup.

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

You can check the full post content on **`/[username]/[post-name]`**. Which contains **title**, **author** of the post, **date** of the post creation and the rendered **Markdown**.

If you're not sign in you'll see just the **Heart** count and sign up button.

```
Post Image no user here

```

Logged in users depending on that if the already liked the post will see **`Heart`** or **`Unheart`** button.

```
Post Image Logged in user NOT Owner

```

And if the user is **owner** of the post. He'll see **`Edit`** and **`Delete`** buttons

```
Post image owner of the post
```

### Public User Profile

The public profile is on **`/[username]`** and here you can see info about the user **email**, **username** and all posts written by that user.

```
Public profile image here
```

### Admin User Profile

On route **`/admin`** or if you click **`Write Post`** if there is currently logged in user you'll see all your post where you can manage them(**`edit`** button that sends you to **post edit page**) and a form where you can **create** new post by providing a title, after that you'll be redirected to **`/admin/[post-title]`** where you can edit your post content.

```
admin index image here
```

### Post edit

Here is the form for the **post content** where you can write **Markdown** and by clicking **Preview** you can see how the post will look like after it's rendered.

```
Post edit here

```

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
