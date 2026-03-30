import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class Post {
    @ObjectIdColumn()
    _id!: ObjectId

    @Column()
    title!: string

    @Column()
    body!: string

    @Column()
    author!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}