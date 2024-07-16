CREATE TABLE IF NOT EXISTS "tasknest_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"emoji" text,
	"userId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasknest_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"dueDate" timestamp,
	"created_at" timestamp DEFAULT now(),
	"userId" integer,
	"groupId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasknest_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkId" text NOT NULL,
	"fname" text NOT NULL,
	"lname" text NOT NULL,
	"email" text NOT NULL,
	"imageUrl" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasknest_groups" ADD CONSTRAINT "tasknest_groups_userId_tasknest_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tasknest_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasknest_todos" ADD CONSTRAINT "tasknest_todos_userId_tasknest_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tasknest_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasknest_todos" ADD CONSTRAINT "tasknest_todos_groupId_tasknest_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."tasknest_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
