import { getDB } from "@/lib/db";
import { Comment } from "@/lib/entities/Comment";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const postId = request.nextUrl.searchParams.get('postId');
    const db = await getDB();
    const comments = await db.getMongoRepository(Comment).find({ where: { postId }, order: { createdAt: 'ASC' } });

    return Response.json(comments);
}

export async function POST(request: NextRequest) {
    const { postId, body, author } = await request.json();
    const db = await getDB();
    const repo = db.getMongoRepository(Comment);

    const comment = repo.create({ postId, body, author });
    const saved = await repo.save(comment);
    return Response.json(saved, { status: 201 });
}