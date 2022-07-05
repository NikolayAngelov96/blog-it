import AuthCheck from "../../components/AuthCheck";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

const AdminCreatePage = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");

  const isValid = title.length > 3 && title.length < 50;

  const slug = encodeURI(kebabCase(title));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      slug,
      published: false,
      content: "# hello world",
    };

    const res = await fetch("http://localhost:3000/api/post/create", {
      headers: {
        "X-Authorization": user.token,
      },
      method: "POST",
      body: JSON.stringify(postData),
    });

    console.log(await res.json());
  };
  return (
    <div>
      <AuthCheck>
        <form onSubmit={onSubmitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Title"
            className="w-full p-4 mb-4 rounded focus:outline-[#3b49df]"
          />

          {/* FIX Button styles */}
          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 text-white bg-[#3b49df] rounded border border-[#3b49df] disabled:brightness-50"
          >
            Create New Post
          </button>
        </form>

        <p>
          <strong>Slug:</strong> {slug}
        </p>
      </AuthCheck>
    </div>
  );
};

export default AdminCreatePage;
