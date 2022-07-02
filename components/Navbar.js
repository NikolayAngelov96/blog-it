import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const user = null;

  return (
    <nav className="bg-white py-2">
      <ul className="px-[10vw] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <li>
            <Link href="/">
              <button className="px-4 py-2 bg-black text-white rounded text-2xl font-bold hover:brightness-90">
                BLOG
              </button>
            </Link>
          </li>

          <li className="hidden md:block">
            <form method="get" className="relative">
              <input
                type="text"
                placeholder="Search..."
                name="search"
                className="border border-[#dfdfdf] rounded px-4 py-2 lg:pr-20 focus:outline-[#3b49df]"
              />
            </form>
          </li>
        </div>

        {user && (
          <div className="flex gap-2 items-center">
            <li>
              <button className="px-4 py-2 rounded text-[#7f8893] hover:underline hover:bg-[#e5e5e5] hover:text-[#3b49df]">
                Sign out
              </button>
            </li>

            <li>
              <a
                href="#"
                className="text-[#3b49df] font-semibold border border-[#3b49df] rounded px-4 py-3 hover:underline hover:text-white hover:bg-[#3b49df]"
              >
                Write Post
              </a>
            </li>

            <li>
              <Image
                src={`/img/hacker.jpg`}
                width={60}
                height={60}
                alt="profile img"
              />
            </li>
          </div>
        )}

        {!user && (
          <div className="flex gap-2 items-center">
            <li className="hidden md:block">
              <Link href={`/login`}>
                <a className="text-[#626262] text-lg hover:bg-[#EBECFC] px-4 py-2 rounded hover:text-[#3b49df] hover:underline">
                  Log in
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/register`}>
                <a className="text-[#3b49df] font-semibold border border-[#3b49df] rounded px-4 py-3 hover:underline hover:text-white hover:bg-[#3b49df]">
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
