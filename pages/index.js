import { getSortedPostsData } from '../lib/posts';
import Head from 'next/head';
import Layout, { siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const Home =({ allPostsData })=> {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to DJ Daddy Bug's Site! #BookABug</p>
        <p>
          (This is a sample website - you'll be building a site like this on 
          <a href="https://nextjs.org/learn"> our next.js tutorial.)</a>
          </p>
      </section>

      {/* new code here */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Daddy Blog</h2>
        <ul className={utilStyles.lists}>
          {allPostsData.map(({ id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home
