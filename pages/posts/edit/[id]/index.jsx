import React from "react";
import { useState } from "react";
import HeadComponent from "../../../../components/Head";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function index({ post }) {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.text);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsError(false);
      const response = await axios.patch(
        `http://localhost:3001/posts/${post._id}`,
        {
          title,
          text: content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      router.push(`/posts/${post._id}`);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  return (
    <div>
      <HeadComponent title="Edit an article" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-3xl tracking-wider">Edit</h2>
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

export const getStaticProps = async (context) => {
  const res = await fetch(`http://localhost:3001/posts/${context.params.id}`);

  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3001/posts`);

  const posts = await res.json();

  const ids = posts.map((post) => post._id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default index;
