import Link from "next/link";
import { useAuthContext } from "../contexts/AuthContext";

const AuthCheck = (props) => {
  const { user } = useAuthContext();

  return user
    ? props.children
    : props.fallback || (
        <div className="flex flex-col items-center">
          <strong>You must be sign in in order to access this page.</strong>{" "}
          <Link href={`/login`}>
            <a className="px-4 py-2 bg-[#3b49df] rounded text-white mt-8">
              Log in
            </a>
          </Link>
        </div>
      );
};

export default AuthCheck;
