import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const createNewUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      redirect("/sign-in");
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;

    const userExists = await db
      .select({
        clerkId: users.clerkId,
        email: users.email,
      })
      .from(users)
      .where(
        and(
          eq(users.clerkId, user.id),
          eq(users.email, user?.emailAddresses[0].emailAddress)
        )
      );

    if (!userExists.length) {
      await db.insert(users).values({
        clerkId: String(user.id),
        fname: String(user.firstName),
        lname: String(user.lastName),
        email: String(userEmail),
        imageUrl: String(user.imageUrl),
      });
    }
  } catch (error) {
    console.error("Error creating new user:", error);
  } finally {
    redirect("/todo");
  }
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUser;
