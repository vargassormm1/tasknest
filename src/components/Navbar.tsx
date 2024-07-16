import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-4 items-center border-b-2 border-black min-h-28">
      <h1 className="text-2xl font-bold">TaskNest</h1>
      <ul className="flex">
        <SignedOut>
          <li className="px-2 py-4">
            <Link href={"/sign-in"}>Signin</Link>
          </li>
          <li className="px-2 py-4">
            <Link href={"/sign-up"}>Signup</Link>
          </li>
        </SignedOut>
        <SignedIn>
          <li className="px-2 py-4">
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </div>
  );
};

export default Navbar;
