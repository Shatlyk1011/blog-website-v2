import { MetadataRoute } from 'next'
import { getPosts } from '@/utils/mdx'
import siteMetadata from './siteMetadata'

// Helper function to build URLs based on locale
const buildUrl = (path: string): string => {
  return `${siteMetadata.siteUrl}/${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  const staticPages = ['', 'blog', 'about', 'linktree']

  // Generate static pages (one entry per page with alternates)
  for (const page of staticPages) {
    const pageUrl = page === '' ? '' : `${page}`

    entries.push({
      url: buildUrl(pageUrl), // Default locale URL
      lastModified: new Date(),
      changeFrequency:
        page === '' ? 'weekly' : page === 'blog' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : page === 'blog' ? 0.9 : 0.8,
      alternates: {
        languages: {
          'x-default': buildUrl(pageUrl),
        },
      },
    })
  }

  // Fetch posts from both locales
  const enPosts = getPosts()

  // Create a map of slug -> {pt: Post, en: Post}
  const postsBySlug = new Map()

  enPosts.forEach((post) => {
    const slug = post.filePath.replace('.mdx', '')
    const existing = postsBySlug.get(slug)
    if (existing) {
      existing.en = post
    } else {
      postsBySlug.set(slug, { en: post })
    }
  })

  // Generate blog post URLs (one entry per post with alternates)
  for (const [slug, variants] of Array.from(postsBySlug.entries())) {
    const enPost = variants.en

    // Use Portuguese version as default (or English if PT doesn't exist)
    const defaultPost = enPost

    // Build alternates object
    const languages: { [key: string]: string } = {}

    if (enPost) {
      languages.en = buildUrl(`blog/${slug}`)
    }

    languages['x-default'] = buildUrl(`blog/${slug}`)

    entries.push({
      url: buildUrl(`blog/${slug}`),
      lastModified: new Date(defaultPost.data.modifiedTime),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages,
      },
    })
  }

  return entries
}
