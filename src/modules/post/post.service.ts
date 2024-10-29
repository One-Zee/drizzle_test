import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE_CLIENT } from '../drizzle/constants/drizzle-client.constant';
import { DrizzleDb } from '../drizzle/types/drizzle';
// import { postTable } from '../drizzle/schemas/post.schema';
// import { asc, desc, eq } from 'drizzle-orm';
// import { commentTable } from '../drizzle/schemas/comment.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE_CLIENT) private readonly db: DrizzleDb) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    // return await this.db
    //   .select()
    //   .from(postTable)
    //   .orderBy(desc(postTable.title));

    return await this.db.query.postTable.findMany({
      // orderBy: { table: postTable, , order: 'desc' },
      with: {
        author: { with: { userToGroup: { with: { group: true } } } },
        comments: { with: { post: true } },
      },
    });

    // Access your data
    // return await this.db
    //   .select()
    //   .from(postTable)
    //   .leftJoin(commentTable, eq(postTable.id, commentTable.post_id))
    //   .where(eq(postTable.id, 10));
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
