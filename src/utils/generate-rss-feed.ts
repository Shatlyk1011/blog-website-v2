import { getPosts } from '@/utils/mdx'
import RSS from 'rss'
import fs from 'fs'

export const generateRssFeed = async () => {
  const site_url =
    process.env.LOCAL === 'true'
      ? 'http://localhost:3000'
      : 'https://blog.shatlykabdullayev.com'

  const posts = getPosts()

  const feed = new RSS({
    title: 'Shatlyk Abdullayev, Blog and Thoughts',
    description: 'Content about technology and thoughts',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/favicon-32x32.png`,
    language: 'en-US',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    pubDate: new Date(),
  })

  posts.forEach((post) => {
    feed.item({
      title: post.data.title,
      description: post.data.description,
      url: `${site_url}/blog/${post.filePath.replace('.mdx', '')}`,
      date: post.data.publishedTime,
      categories: post.data.tags,
      author: 'Shatlyk Abdullayev',
    })
  })

  fs.writeFileSync(`./public/rss.xml`, feed.xml({ indent: true }))
}
