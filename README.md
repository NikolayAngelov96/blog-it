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

## Pages

### Login

Login page contains a form for user authentication.

![login](https://user-images.githubusercontent.com/103751145/177942111-ae062edd-496b-4da7-b336-488b7f6d385e.png)

After providing **`email`** and **`password`** request is send and the server checks in database for user with the provided email and compares the password with the encrypted password in the database.

If error occurs(either there is no such email or password is wrong) it gives you a toast with the message.

![login-error](https://user-images.githubusercontent.com/103751145/177942234-ce82b622-5810-4244-8efa-c0f5f781912c.png)

### Register

You can create an account by entering **`email`**, **`username`**, **`password`** and optionally **`avatar`**.

The **avatar** must be a valid URL. If the field is empty, the created profile will have default avatar image.

![register-avatarUrl](https://user-images.githubusercontent.com/103751145/183246225-7ae2db97-57cc-4a05-b2cb-d3a7c44e3e6c.png)

If any of the other field are empty or doesn't match the requirements the UI will display a message.

![register-form-validation](https://user-images.githubusercontent.com/103751145/177942291-c6f4f2f1-67b0-47b0-9d3e-5be9ed0c303d.png)

Then the server will take this data **hash** the password and save it to the database.

### Home

For this page I used **SSR** to get the data and display the most recent posts.
Which is **Preview card** that contains **title**, **hearts** and **username**(of the user, who created the post).

![home](https://user-images.githubusercontent.com/103751145/177942348-30b74874-206d-4fcc-97cc-1cc62713ea0e.png)

By clicking on the username you'll be redirected to that user public profile page.
And if you click on the post title you'll be redirected to that post page.

### Post

You can check the full post content on **`/[username]/[post-name]`**. Which contains **title**, **author** of the post, **date** of the post creation and the rendered **Markdown**.

If you're not sign in you'll see just the **Heart** count and sign up button.

![post-no-user](https://user-images.githubusercontent.com/103751145/177942427-c7c7c44d-d92d-4f20-9945-ca707c231dcc.png)

Logged in users depending on that if the already liked the post will see **`Heart`** or **`Unheart`** button.

![post-user-notOwner-heart](https://user-images.githubusercontent.com/103751145/177942475-fe01c435-f37a-4ff6-86f0-2faba5f64f81.png)

![post-user-notOwner-unheart](https://user-images.githubusercontent.com/103751145/177942518-7f8af242-3148-4132-aa39-2a87fd36e46a.png)

And if the user is **owner** of the post. He'll see **`Edit`** and **`Delete`** buttons

![post-owner](https://user-images.githubusercontent.com/103751145/177942554-56ac53b4-8e7e-43f1-a94f-866e62e9178d.png)

### Comments
Every post can have comments, which contains **content**, **createdAt date**, **username** and **avatar** of the user who placed the comment.

All users can browse the comments for every post, but in order to **place a comment on a post**, you must be logged in.

![comment-user](https://user-images.githubusercontent.com/103751145/180784839-c569c9a5-0ef2-4d3d-a205-4f812937bffa.png)

If you're not logged in in the comments section, there'll be a Link to the **Login page**.

![comment-no-user](https://user-images.githubusercontent.com/103751145/180785037-a4a6b655-21a0-4212-a130-a38b88be9bee.png)


### Public User Profile

The public profile is on **`/[username]`** and here you can see info about the user **email**, **username** and all posts written by that user.

![profile-public](https://user-images.githubusercontent.com/103751145/177942620-2ba46a35-d0d7-4473-8044-1d546b323539.png)

### Admin User Profile

On route **`/admin`** or if you click **`Write Post`** if there is currently logged in user you'll see all your post where you can manage them(**`edit`** button that sends you to **post edit page**) and a form where you can **create** new post by providing a title, after that you'll be redirected to **`/admin/[post-title]`** where you can edit your post content.

![admin-index](https://user-images.githubusercontent.com/103751145/177942661-bcb1dc01-cb17-4d95-ae32-cfc5da578eed.png)

### Post edit

Here is the form for the **post content** where you can write **Markdown** and by clicking **Preview** you can see how the post will look like after it's rendered.

![post-edit](https://user-images.githubusercontent.com/103751145/177942704-33e71a88-530d-46ab-a6b6-456c519e29cb.png)

## Getting Started

First install all dependencies, then create .env file containing

```
// A string for JSONWEBTOKEN
JWT_SECRET=
// Number of salt round for password hashing
SALT_ROUNDS=
// Connection string for MongoDB
MONGODB_URI=

```

then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
