import {
  integer,
  text,
  boolean,
  pgTableCreator,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `tasknest_${name}`);

export const users = createTable("users", {
  id: integer("id").primaryKey(),
  clerkId: text("clerkId").notNull(),
  fname: text("fname").notNull(),
  lname: text("lname").notNull(),
  email: text("email").notNull(),
  imageUrl: text("imageUrl").notNull(),
});

export const groups = createTable("groups", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  emoji: text("emoji"),
  userId: integer("userId").references(() => users.id),
});

export const todos = createTable("todos", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("done").default(false).notNull(),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("userId").references(() => users.id),
  groupId: integer("groupId")
    .references(() => groups.id)
    .notNull(),
});
