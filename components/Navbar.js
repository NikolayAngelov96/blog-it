import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, removeUserData } = useAuthContext();
  const router = useRouter();

  const logoutHandler = () => {
    removeUserData();

    router.push("/");
  };

  return (
    <nav className="bg-white py-2">
      <ul className="px-[10vw] flex justify-between items-center">
        <li>
          <Link href="/">
            <button className="px-4 py-2 bg-black text-white rounded text-2xl font-bold hover:brightness-90">
              BLOG
            </button>
          </Link>
        </li>

        {user && (
          <div className="flex gap-2 items-center">
            <li>
              <button
                className="px-4 py-2 rounded text-[#7f8893] hover:underline hover:bg-[#e5e5e5] hover:text-[#3b49df]"
                onClick={logoutHandler}
              >
                Sign out
              </button>
            </li>

            <li>
              <Link href="/admin">
                <a className="text-[#3b49df] font-semibold border border-[#3b49df] rounded px-4 py-3 hover:underline hover:text-white hover:bg-[#3b49df]">
                  Write Post
                </a>
              </Link>
            </li>

            <li className="hidden md:block rounded-full overflow-hidden">
              <Link href={`/admin`}>
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer">
                  <img
                    src={user.avatar || `/img/hacker.jpg`}
                    alt="profile img"
                  />
                </div>
              </Link>
            </li>
          </div>
        )}

        {!user && (
          <div className="flex gap-2 items-center">
            <li className="">
              <Link href={`/login`}>
                <a className="text-[#626262] text-lg hover:bg-[#EBECFC] px-2 md:px-4 py-2 rounded hover:text-[#3b49df] hover:underline">
                  Log in
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/register`}>
                <a className="text-[#3b49df] font-semibold border border-[#3b49df] rounded px-1 md:px-4 py-3 hover:underline hover:text-white hover:bg-[#3b49df]">
                  Create account
                </a>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
