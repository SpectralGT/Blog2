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
  // Track loading percentage
  const [loading, setLoading] = useState(0);
  // Track if loading screen should be shown
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if the loading screen has already been shown
    const hasShownLoading = sessionStorage.getItem("showLoading");

    if (hasShownLoading) {
      // Skip loading screen if it has been shown before
      setShowLoading(false);
      return;
    }

    // Display the loading screen and update the percentage
    const id = setInterval(() => {
      setLoading((loading) => loading + 1);
    }, 20);

    // Stop the loading animation at 100%
    if (loading >= 100) {
      clearInterval(id);
      sessionStorage.setItem("showLoading", "true");
      setShowLoading(false);
    }

    return () => clearInterval(id);
  }, [loading]);

  let body = <div></div>;

  // Conditional rendering based on showLoading state
  if (showLoading && loading <= 100) {
    body = <LoadingScreen percentage={loading} />;
  } else {
    body = (
      <div>
        <Hero />
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

// Fetching the posts.
export async function getStaticProps() {
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter((file) => file.split(".")[1] === "mdx");
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
