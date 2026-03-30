import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn } from 'typeorm'

@Entity('comments')
export class Comment {
    @ObjectIdColumn()
    _id!: ObjectId

    @Column()
    postId!: string

    @Column()
    body!: string

    @Column()
    author!: string

    @CreateDateColumn()
    createdAt!: Date
}