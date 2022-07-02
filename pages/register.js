import Link from "next/link";

const Register = () => {
  return (
    <section className="bg-white border border-[#dfdfdf] w-1/2 mx-auto p-12 rounded-md">
      <h1 className="uppercse font-bold text-3xl text-center mb-8">
        Welcome to Dev Community
      </h1>
      <div className="pb-12">
        <form method="post" className="flex flex-col items-center gap-2">
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

          <label htmlFor="rePass" className="w-full font-bold">
            Repeat Password
          </label>
          <input
            type="password"
            name="rePass"
            id="rePass"
            className="px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df]"
          />

          <button
            type="submit"
            className="uppercase font-bold w-full bg-[#3b49df] rounded text-white py-2 px-4 mt-8"
          >
            Join
          </button>
        </form>

        <p className="text-center mt-8 font-bold">
          You have account already?{" "}
          <Link href={`/login`}>
            <a className="text-[#3b49df]">Login here</a>
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Register;
