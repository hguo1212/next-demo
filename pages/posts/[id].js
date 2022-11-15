import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/post";
import Layout from "../../components/layout";
import Date from "../../components/date";

export default function Post({postData}) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <Date dateString={postData.date}/>
    <br/>
    {postData.id}
    <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
  </Layout>
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id);
  return {
    props:{
      postData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}