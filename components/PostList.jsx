import React from "react";
import Post from "./Post";

function PostList({ posts }) {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-wider mb-10">
        See what's new!
      </h1>
      <div className="flex justify-between items-center flex-wrap gap-y-10 dark:bg-blue-900 dark:text-gray-200 rounded-xl p-2">
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </>
  );
}

export default PostList;
