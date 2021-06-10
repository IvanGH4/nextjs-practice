import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../../HOC/withAuth";
import HeadComponent from "../../components/Head";

function index() {
  const user = useSelector((state) => state.user);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsError(false);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/posts",
        { title, text: content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  return (
    <div>
      <HeadComponent title="Create a new article" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-3xl tracking-wider">
          Create a new article
        </h2>
        {isError && (
          <p className="bg-red-400 p-4 text-white">
            Oops... something went wrong, please try again
          </p>
        )}
        <form className="w-1/2" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col justify-start items-start my-4">
            <label htmlFor="title" className="mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="content" className="mb-2">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              placeholder="Content"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col justify-start items-start">
            <button
              className="w-1/4 rounded-md shadow text-white hover:text-blue-500 hover:bg-white transition py-1 mt-2 bg-blue-500"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuth(index);
