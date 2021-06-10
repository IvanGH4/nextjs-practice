import React, { useState } from "react";
import HeadComponent from "../../../components/Head";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

function SinglePost({ post }) {
  const user = useSelector((state) => state.user);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsError(false);
      await axios.delete(`http://localhost:3001/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  return (
    <div>
      <HeadComponent title={post.title} />

      <Link href="/">
        <a className="text-blue-700">Back</a>
      </Link>
      {isError && (
        <p className="bg-red-400 text-white">Oops... something went wrong!</p>
      )}
      <h2 className="text-4xl font-semibold tracking-wider my-4">
        {post.title}
      </h2>
      <div>
        <h3 className="font-light italic mb-2">
          {post.user.userName} - {post.createdAt}
        </h3>
        <p>{post.text}</p>
      </div>
      <div>
        {user && user.user.userName === post.user.userName ? (
          <>
            <button
              className="hover:bg-red-500 hover:text-white text-red-500 bg-white px-6 py-1 rounded transition"
              onClick={handleClick}
            >
              Delete
            </button>
            <Link href="/posts/edit/[id]" as={`/posts/edit/${post._id}`}>
              <a className="px-2 py-1 text-blue-500">Edit</a>
            </Link>
          </>
        ) : null}
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

export default SinglePost;
