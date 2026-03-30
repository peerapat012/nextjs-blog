# learn-blog (Next.js + MongoDB + TypeORM)

A simple blog app built for learning Next.js (App Router) with MongoDB + TypeORM.

## What it does

- Home page lists blog posts (latest first).
- Create page lets you publish a new post.
- Post page shows the post and its comments.
- You can add comments to a post (the page refreshes after posting).

## Tech Stack

- `next` (App Router)
- `mongodb` (database)
- `typeorm` (MongoDB entity mapping + repository queries)
- `tailwindcss` (basic styling)

## Project Structure (high level)

- `app/`
  - `app/page.tsx`: list posts
  - `app/posts/new/page.tsx`: create a post
  - `app/posts/[id]/page.tsx`: view a post + its comments
  - `app/api/posts/*`: posts CRUD (GET/POST and GET/DELETE by id)
  - `app/api/comments`: list + create comments (`?postId=...`)
- `components/`
  - `CommentList.tsx`: renders comments
  - `CommentForm.tsx`: posts a comment + refreshes the page
- `lib/`
  - `lib/db.ts`: TypeORM `DataSource` (singleton) configured for MongoDB
  - `lib/entities/Post.ts`: `Post` entity
  - `lib/entities/Comment.ts`: `Comment` entity

## Install & Run

1. Install dependencies:

```bash
npm install
```

2. Configure MongoDB connection:

- Create a `.env.local` file in the project root.
- Add your MongoDB connection string:

```bash
MONGODB_URI="mongodb://<user>:<pass>@<host>/<db>?ssl=true"
```

Notes:

- The TypeORM config uses `database: "blog"` in `lib/db.ts`.
- `lib/db.ts` enables `synchronize: true` (creates collections based on entities; good for learning).

3. Start the dev server:

```bash
npm run dev
```

4. Open the app:

- `http://localhost:3000`

## API Endpoints (used by the UI)

- `GET /api/posts`: list posts (newest first)
- `POST /api/posts`: create a post
- `GET /api/posts/:id`: fetch a single post
- `DELETE /api/posts/:id`: delete a post
- `GET /api/comments?postId=...`: list comments for a post
- `POST /api/comments`: create a comment (`postId`, `author`, `body`)
