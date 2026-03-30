'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function CommentForm({ postId }: { postId: string }) {
  const [author, setAuthor] = useState('')
  const [body, setBody]     = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, author, body }),
    })

    setAuthor('')
    setBody('')
    setLoading(false)
    router.refresh()   // re-fetches server component data
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h3 className="font-medium">Leave a comment</h3>
      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Your name"
        required
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Write a comment..."
        required
        rows={4}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  )
}