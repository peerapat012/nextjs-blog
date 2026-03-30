// app/page.tsx
import Link from 'next/link'

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store'   // always fresh
  })
  return res.json()
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium">Blog</h1>
        <Link href="/posts/new"
          className="px-4 py-2 bg-black text-white rounded-lg text-sm">
          New post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/posts/${post._id}`}
            className="block p-5 border rounded-xl hover:bg-gray-50 transition">
            <h2 className="text-lg font-medium">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-1">by {post.author}</p>
            <p className="text-gray-600 mt-2 line-clamp-2">{post.body}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}