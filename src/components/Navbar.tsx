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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">TaskNest</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <SignedOut>
            <li>
              <Link href={"/sign-in"}>Signin</Link>
            </li>
            <li>
              <Link href={"/sign-up"}>Signup</Link>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <UserButton />
            </li>
          </SignedIn>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
