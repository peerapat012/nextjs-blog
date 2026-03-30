import { getDB } from "@/lib/db";
import { Post } from "@/lib/entities/Post";
import { NextRequest } from "next/server";

export async function GET() {
    const db = await getDB()
    const posts = await db.getMongoRepository(Post).find({ order: { createdAt: 'DESC' } })
    return Response.json(posts)
}

export async function POST(request: NextRequest) {
    const { title, body, author } = await request.json()

    const db = await getDB();
    const repo = db.getMongoRepository(Post);

    const post = repo.create({ title, body, author })
    const saved = await repo.save(post)

    return Response.json(saved, { status: 201 })
}