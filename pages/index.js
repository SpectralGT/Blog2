import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import Postcard from "../components/PostCard";
import Hero from "../components/Hero";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLoading((loading) => loading + 1), 20);

    return () => {
      clearInterval(id);
    };
  }, []);
  let body = <div></div>;
  if (loading <= 100) {
    body = <LoadingScreen percentage={loading} />;
  } else {
    body = (
      <div>
        <Hero />;
        {props.posts.length > 0 ? (
          <div className="listing">
            {props.posts.map((post, index) => (
              <Link href={`/posts/${post.slug}`} key={index}>
                <Postcard post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h2 className="font-sans text-3xl">No posts yet</h2>
        )}
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <title>Atharv&apos;s Blog</title>
        <meta
          name="google-site-verification"
          content="kRbwjumXat52-e3mUB7tt-faI1jx9mY0x1EMOPC5egE"
        />
      </Head>
      {body}
    </div>
  );
}

// fetching the posts.
export async function getStaticProps() {
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter((file) => file.split(".")[1] == "mdx");
  const posts = files.map((file) => {
    const fileData = fs.readFileSync(path.join("posts", file), "utf-8");
    const { data } = matter(fileData);
    return {
      frontMatter: data,
      slug: file.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
}
