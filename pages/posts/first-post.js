import Link from "next/link"
import Head from "next/head"
// adding Script component
// import Script from "next/script"
import Layout from "../../components/layout"


const FirstPost =()=> {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
                <link rel="icon" href="/images/daddybug-icon.png" />
            </Head>
            {/* <Script 
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => 
                    console.log(`script loaded correctly, window.FB has been populated`)
                }
            /> */}
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
            <h2>
                <Link href="/posts/second-post">Second Post</Link>
            </h2>
        </Layout>
    )
}

export default FirstPost