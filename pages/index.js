import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Postcard from '../components/PostCard';
import Hero from '../components/Hero';

export default function Home(props) {
  return (
    <div className="">
      <Head>
        <title>Atharv's Blog</title>
      </Head>
      <Hero/>
      {
        props.posts.length > 0 ? (
          <div className="listing">
            {
              props.posts.map((post,index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                    <Postcard post={post} />
                </Link>
              ))
            }
          </div>
        ) : (
          <h2 className='font-sans text-3xl'>No posts yet</h2>
        )
      }
    </div>
  )
}

// fetching the posts.
export async function getStaticProps(){
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter(file => file.split('.')[1] == "mdx");
  const posts =  files.map(file => {
    const fileData = fs.readFileSync(path.join("posts",file),'utf-8');
    const {data} = matter(fileData);
    return {
      frontMatter:data,
      slug:file.split('.')[0],   
    }
  });
  return{
    props:{
      posts
    }
  }
}
