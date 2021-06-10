import React from "react";
import Link from "next/link";
import styles from "../styles/Posts.module.css";

function Post({ post }) {
  return (
    <div className="p-4">
      <Link href="/posts/[id]" as={`/posts/${post._id}`}>
        <a className="hover:text-blue-500 transition">
          <h2 className="text-xl font-semibold">{post.title}</h2>
        </a>
      </Link>
      <div className="text-gray-300 font-light">
        <small className="mr-2">{post.user.userName}</small>
      </div>
      <p className={styles.truncated}>{post.text}</p>
    </div>
  );
}

export default Post;
