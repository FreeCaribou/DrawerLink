# Drawer link

An app to simply keep some link (newspaper article for exemple) to be retrieve easily later

## TODO

- the theme
- i18n
- better test for the auth
- try delete js ref and pass all in TS
- rebase the migration before kind of v0.1
- just finish the app ...
- no async / await

## TypeOrm

Typeorm migration:

We have the script migration generate and run in package.json

We need two data source file, the .ts for the nextjs and the .js for the migration script

// TODO avoid duplicate

## Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Also using Tailwind and TypeOrm and Mantine

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

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
