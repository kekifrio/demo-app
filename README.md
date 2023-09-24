# Personal Information Management and Display Application with Next.js and React Demo

This is a demo of a **web application using the [Next.js](https://nextjs.org/) and [React](https://reactjs.org/) programming stack** that allows users to authenticate, enter personal information, and view it in a list.

The application has the following features:

1. Authentication and Session Management

2. Relational database

3. Management of Forms with Validations

4. Database Data Presentation

This application will showcase the implementation of a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** with the following stack:

- [React](https://reactjs.org/) (frontend)
- [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend).
- [NextAuth.js](https://next-auth.js.org/) for authentication. 
- [PostgreSQL](http://postgresql.org/) as the database of choice.

## Getting started

### 1. Download and install dependencies

Clone this repository:

```
git clone git@github.com:kekifrio/demo-app.git
```

Install npm dependencies:

```
cd prisma-nextjs-blog
npm install
```

</details>

### 2. Create .env file and configure environment variables

Create a .env file following the instructions inside the .env.example to set the environment variables.

### 3. Create and seed the database

Run the following command in order to sync your Prisma schema with your database and it will generate the TypeScript types for the Prisma Client based on your schema. 

```
npx prisma db push
```

Run the following command to create your PostgreSQL database. This also creates the `User`, `Account`, `Session` and `VerificationToken` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```


### 3. Configuring your authentication provider

In order to get this example to work, you need to configure the [Discord](https://next-auth.js.org/providers/discord) authentication provider from NextAuth.js.

#### Configuring the Discord authentication provider

<details><summary>Expand to learn how you can configure the Discord authentication provider</summary>

1. You will need a [Discord](https://discord.com/register) account, so register one if you haven’t already.

2. Navigate to https://discord.com/developers/applications↗ and click “New Application” in the top right corner. Give your application a name and agree to the Terms of Service.

3. Once your application has been created, navigate to “Settings → OAuth2 → General”.

4. Copy the “Client ID” and add it to your **.env** as **DISCORD_CLIENT_ID**.
   
5. Click “Reset Secret”, copy the new secret, and add it to your **.env** as **DISCORD_CLIENT_SECRET**.
   
6. Click “Add Redirect” and type in **http://localhost:3000/api/auth/callback/discord**.
   
7. Save Changes.
   
8. Set the **NEXTAUTH_SECRET** in **.env**. In development any string will work, for production see the note in **.env** on generating a secure secret.
   
You should now be able to log in.

</details>


### 4. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.


</details>

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Check out the [Next-auth docs](https://next-auth.js.org/getting-started/introduction)