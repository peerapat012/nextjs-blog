import { CommentForm } from "@/components/CommentForm"
import { CommentList } from "@/components/CommentList"

async function getPost(id: string) {
    if (!id) return;

    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        console.error("API Error");
        return;
    }
    
    return res.json()
}

async function getComments(postId: string) {
    if (!postId) return;

    const res = await fetch(
        `http://localhost:3000/api/comments?postId=${postId}`,
        { cache: 'no-store' }
    )

    if (!res.ok) {
        console.error("API Error");
        return;
    }

    return res.json()
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;


    const [post, comments] = await Promise.all([
        getPost(id),
        getComments(id),
    ])

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-medium mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-8">by {post.author}</p>
            <p className="text-gray-700 leading-relaxed mb-12">{post.body}</p>

            <hr className="mb-8" />

            <h2 className="text-xl font-medium mb-6">
                Comments ({comments.length})
            </h2>

            <CommentList comments={comments} />
            <CommentForm postId={id} />
        </main>
    )
}