import HeadComponent from "../components/Head";
import PostList from "../components/PostList";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <HeadComponent title="Home" />

      <main>
        <PostList posts={posts} />
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3001/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
