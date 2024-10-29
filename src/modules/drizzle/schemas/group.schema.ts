import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';
import { relations } from 'drizzle-orm';
import { timestamps } from '../helpers/timestamps-column.helper';

export const groupTable = table('group', {
  id: t.serial('id').primaryKey(),
  name: t.text('name').notNull(),
  // ownerId: t.integer('ownerId').references(() => userTable.id),
  // members: t.array('members').references(() => userTable.id),
});

//This is a many-to-many relationship between users and groups - The Joint table
export const userToGroupTable = table(
  'userToGroup',
  {
    userId: t
      .uuid('userId')
      .notNull()
      .references(() => userTable.id),
    groupId: t
      .uuid('groupId')
      .notNull()
      .references(() => groupTable.id),
  },
  (table) => ({
    pk: t.primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: t.index('userIdIndex').on(table.userId),
    ...timestamps,
    // groupIdIndex: t.index('groupIdIndex').on(table.groupId),
  }),
);

export const groupRelations = relations(groupTable, ({ many }) => ({
  userToGroup: many(userToGroupTable),
}));

export const userToGroupRelations = relations(userToGroupTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userToGroupTable.userId],
    references: [userTable.id],
  }),
  group: one(groupTable, {
    fields: [userToGroupTable.groupId],
    references: [groupTable.id],
  }),
}));
