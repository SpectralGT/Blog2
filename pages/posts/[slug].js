import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

export default function Post(props) {
  return (
    <div className='post-container'>
        {
            props.frontMatter && props.mdxSource && (
                <div className='post-content'>
                    <Head>
                        <title >{props.frontMatter.title}</title>
                    </Head>
                <h1 className='post-title' id='post-title'>{props.frontMatter.title}</h1>
                
                <MDXRemote {...props.mdxSource} />
                </div>

                
            )
        }
        
    </div>
  )
}


export async function getStaticPaths(){
    const files = fs.readdirSync(path.join("posts"));
    const paths = files.map((file) => {
        return {
            params:{
                slug:file.replace(".mdx","")
            }
        }
    });
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params:{slug}}){
    const fileData = fs.readFileSync(path.join("posts",slug+'.mdx'),'utf-8');
    const {data,content} = matter(fileData);
    const mdxSource = await serialize(content);
    return {
        props:{
            frontMatter:data,
            slug,
            mdxSource
        }
    }
}