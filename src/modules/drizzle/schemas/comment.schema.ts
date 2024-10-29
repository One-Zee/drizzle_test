import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';
import { postTable } from './post.schema';
import { relations } from 'drizzle-orm';
import { primaryKey } from '../helpers/primary-key-gen.column.helper';
import { timestamps } from '../helpers/timestamps-column.helper';

export const commentTable = table('comment', {
  id: primaryKey,
  text: t.text('text').notNull(),
  authorId: t
    .uuid('userId')
    .notNull()
    .references(() => userTable.id),
  postId: t
    .uuid('postId')
    .references(() => postTable.id)
    .notNull(),
  ...timestamps,
});

export const commentRelations = relations(commentTable, ({ one }) => ({
  author: one(userTable, {
    fields: [commentTable.authorId],
    references: [userTable.id],
  }),
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
}));
