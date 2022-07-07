import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContext";
import * as request from "../lib/request";

const errorStyles = "border-red-500";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData } = useAuthContext();

  const router = useRouter();

  const onSubmitHandler = async (data) => {
    try {
      const resData = await request.post("/register", data);

      setUserData(resData);

      toast.success("You registered successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-white border border-[#dfdfdf] md:w-1/2 mx-auto p-12 rounded-md">
      <h1 className="uppercse font-bold text-3xl text-center mb-8">
        Welcome to Dev Community
      </h1>
      <div className="pb-12">
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <label htmlFor="email" className="w-full font-bold">
            Email
          </label>

          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className={`px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent ${
              errors.email && errorStyles
            }`}
          />

          <label htmlFor="username" className="w-full font-bold">
            Username
          </label>

          {errors.username && (
            <p className="text-red-500 text-sm">Username is required</p>
          )}
          <input
            type="text"
            {...register("username", { required: true })}
            id="username"
            className={`px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent ${
              errors.username && errorStyles
            }`}
          />

          <label htmlFor="password" className="w-full font-bold">
            Password
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className={`px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent ${
              errors.password && errorStyles
            }`}
          />

          <label htmlFor="rePass" className="w-full font-bold">
            Repeat Password
          </label>
          {errors.rePass && (
            <p className="text-red-500 text-sm">Repeat password is required</p>
          )}
          <input
            type="password"
            {...register("rePass", { required: true })}
            id="rePass"
            className={`px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent ${
              errors.rePass && errorStyles
            }`}
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
