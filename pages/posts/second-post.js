import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/layout";

const SecondPost =()=> {
    return (
        <Layout>
            <Head>
                <title>Second Post</title>
                <link rel="icon" href="/images/daddybug-icon.png" />
            </Head>
            <h1>Second Post</h1>
            <h2>
                Back to <Link href="/">home</Link>
            </h2>
            <h2>
                Back to <Link href="/posts/first-post">First Post</Link>
            </h2>
        </Layout>
    )
}

export default SecondPost