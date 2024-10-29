import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';
import { relations } from 'drizzle-orm';
import { primaryKey } from '../helpers/primary-key-gen.column.helper';
import { timestamps } from '../helpers/timestamps-column.helper';

export const profileInfoTable = table('profileInfo', {
  id: primaryKey,
  metadata: t.jsonb('metadata'),
  userId: t
    .uuid('userId')
    .notNull()
    .references(() => userTable.id),
  ...timestamps,
});

export const profileInfoRelations = relations(profileInfoTable, ({ one }) => ({
  author: one(userTable, {
    fields: [profileInfoTable.userId],
    references: [userTable.id],
  }),
}));
