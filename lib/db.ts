import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './entities/Post';
import { Comment } from './entities/Comment';

const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGODB_URI,
    database: 'blog',
    synchronize: true,
    logging: false,
    entities: [Post, Comment],
    ssl: true,
})

// singleton instance
declare global {
    var _dataSource: DataSource | undefined
}

export async function getDB(): Promise<DataSource> {
    if (global._dataSource?.isInitialized) {
        return global._dataSource
    }

    global._dataSource = await AppDataSource.initialize()
    return global._dataSource
}