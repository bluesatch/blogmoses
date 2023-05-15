import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css'

const Post =({ postData })=> {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>
                    {postData.title}
                </h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
            </article>
            {/* {postData.id} */}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>

    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    // paths contains the array of known paths returned by getAllPostsIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}



export default Post