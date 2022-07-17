import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../contexts/AuthContext";
import * as request from "../lib/request";

const errorStyles = "border-red-500";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password required")
    .min(6, "Password must be at least 6 characters"),
  rePass: yup.string().required("Please confirm your password"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

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
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
            <p className="text-red-500 text-sm">{errors.username.message}</p>
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
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
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
            <p className="text-red-500 text-sm">{errors.rePass?.message}</p>
          )}
          <input
            type="password"
            {...register("rePass", { required: true })}
            id="rePass"
            className={`px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent ${
              errors.rePass && errorStyles
            }`}
          />

          <label htmlFor="avatar" className="w-full font-bold">
            Avatar URL
          </label>
          <input
            type="text"
            {...register("avatar")}
            id="avatar"
            className="px-4 py-3 rounded-lg border border-[#dfdfdf] w-full focus:outline-[#3b49df] focus:border-transparent"
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
