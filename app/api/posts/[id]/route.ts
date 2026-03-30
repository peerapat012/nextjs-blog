import { getDB } from '@/lib/db'
import { Post } from '@/lib/entities/Post'
import { ObjectId } from 'mongodb'
import { NextRequest } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const db = await getDB()
    const post = await db.getMongoRepository(Post)
        .findOneBy({ _id: new ObjectId(id) })

    if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(post)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const db = await getDB()
    await db.getMongoRepository(Post)
        .deleteOne({ _id: new ObjectId(id) })
    return Response.json({ success: true })
}