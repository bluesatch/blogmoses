import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData =()=> {

    /**
     * To fetch data from an external api endpoint or DB,
     * 
     * const res = await fetch('..')
     * return res.json()
     * 
     * Next.js polyfills fetch() on both the client and server. It does not need to be imported
     * 
     * From DB:
     *
     * import someDatabaseSDK from 'someDatabaseSDK'
     * 
     * const databaseClient = someDatabaseSDK.createClient(...)
     * 
     * export async function getSortedPostsData() {
     *  return databaseClient.query('SELECT posts...')
     * }
     * 
     */
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id 
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string 
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        // use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id 
        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export const getAllPostIds =()=> {
    const fileNames = fs.readdirSync(postsDirectory)

    /**
     * Returns an arry that looks like this:
     * 
     * [
        *  {
        *      params: {
        *          id: 'ssg-ssr'
        *      }
        * },
        * {
        *       params: {
        *           id: 'pre-rendering'
        *       }
        * }
     * ]
     */

    // The returned list is not just an array of strings, it MUST be an array of objects
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //use gray-matter to parse the post metadata section 
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string 
    const processedContent = await remark().use(html).process(matterResult.content)

    const contentHtml = processedContent.toString()

    // Combine the data with the id 
    return {
        id,
        contentHtml,
        ...matterResult.data 
    }
}
