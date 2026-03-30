'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const [title, setTitle]   = useState('')
  const [body, setBody]     = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, author }),
    })

    const post = await res.json()
    router.push(`/posts/${post._id}`)  // redirect to the new post
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-8">New post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Your name"
          required
          className="w-full border rounded-lg px-3 py-2"
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your post..."
          required
          rows={10}
          className="w-full border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </main>
  )
}