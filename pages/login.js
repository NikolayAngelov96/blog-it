import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { setUserData } = useAuthContext();
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok != true) {
        throw new Error(data.message);
      }

      setUserData(data);

      toast.success("You logged in successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white border border-[#dfdfdf] md:w-1/2 mx-auto p-12 rounded-md">
      <h1 className="uppercse font-bold text-3xl text-center mb-8">
        Welcome to Dev Community
      </h1>
      <div className="pb-12">
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={onSubmitHandler}
        >
          <label htmlFor="email" className="w-full font-bold">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            className="px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df]"
          />
          <label htmlFor="password" className="w-full font-bold">
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            className="px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df]"
          />

          <button
            type="submit"
            className="uppercase font-bold w-full bg-[#3b49df] rounded text-white py-2 px-4 mt-8"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-8 font-bold">
          Don&apos;t have account yet?{" "}
          <Link href="/register">
            <a className="text-[#3b49df]">Register here</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
