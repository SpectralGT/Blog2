import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="post-card upper-text">
      {/* <img className='h-40 w-64' src={post.frontMatter.thumbnail} alt="postCardImage" /> */}
      <div className="">
        <h2 className="title pink-glow-100">{post.frontMatter.title}</h2>
        <p className="description white-glow">
          {post.frontMatter.description}
        </p>
        <div className="spacer"></div>
      </div>
      <div className="date-time white-glow-100">
        <h2 className="date">{post.frontMatter.date}</h2>
        <p className="time">{post.frontMatter.readTime} min read</p>
      </div>
    </div>
  );
}
