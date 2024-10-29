import { relations } from 'drizzle-orm';
import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import { profileInfoTable } from './profileInfo.schema';
import { userToGroupTable } from './group.schema';
import { commentTable } from './comment.schema';
import { postTable } from './post.schema';
import { primaryKey } from '../helpers/primary-key-gen.column.helper';
import { timestamps } from '../helpers/timestamps-column.helper';

export const userTable = table(
  'user',
  {
    id: primaryKey,
    name: t.text('name').notNull(),
    email: t.text('email').notNull(),
    password: t.text('password').notNull(),
    ...timestamps,
  },
  (tab) => ({
    idIndex: t.index('idIndex').on(tab.id),
  }),
);

export const userRelations = relations(userTable, ({ one, many }) => ({
  profile: one(profileInfoTable), // you dont need to specify the fields here beacuse the profile info has foreign key userId
  userToGroup: many(userToGroupTable),
  comments: many(commentTable),
  posts: many(postTable),
}));
