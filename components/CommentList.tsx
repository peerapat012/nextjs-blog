// components/CommentList.tsx
export function CommentList({ comments }: { comments: any[] }) {
    if (comments.length === 0) {
      return <p className="text-gray-400 text-sm">No comments yet.</p>
    }
  
    return (
      <div className="space-y-4 mb-8">
        {comments.map((c) => (
          <div key={c._id} className="p-4 border rounded-xl">
            <p className="text-sm font-medium">{c.author}</p>
            <p className="text-gray-600 mt-1">{c.body}</p>
          </div>
        ))}
      </div>
    )
  }