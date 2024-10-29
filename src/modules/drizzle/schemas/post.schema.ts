import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';
import { relations } from 'drizzle-orm';
import { commentTable } from './comment.schema';
import { primaryKey } from '../helpers/primary-key-gen.column.helper';
import { timestamps } from '../helpers/timestamps-column.helper';

export const postTable = table('post', {
  id: primaryKey,
  title: t.text('title').notNull(),
  content: t.text('content').notNull(),
  authorId: t
    .uuid('userId')
    .notNull()
    .references(() => userTable.id),
  ...timestamps,
});

export const postRelations = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
  comments: many(commentTable),
}));
