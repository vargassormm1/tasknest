import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-4 items-center border-b-2 border-black min-h-28">
      <h1 className="text-2xl font-bold">TaskNest</h1>
      {/* <ul className="flex">
        <li className="px-2 py-4">
          <Link href={"/signup"}>Signin</Link>
        </li>
        <li className="px-2 py-4">
          <Link href={"/signup"}>Signup</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Navbar;
