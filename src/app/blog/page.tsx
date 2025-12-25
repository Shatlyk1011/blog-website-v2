import { Layout } from '@/components'
import { Metadata } from 'next'
import { getPosts } from '@/utils/mdx'
import { BlogContent } from './blog-content'
import { Suspense } from 'react'
import siteMetadata from '../siteMetadata'

export async function generateMetadata(): Promise<Metadata> {

  const canonicalUrl = `${siteMetadata.siteUrl}/blog`

  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      locale: 'en_US',
      alternateLocale: 'en_US',
      images: [
        {
          url: `${siteMetadata.siteUrl}/static/images/seo-card-blog.png`,
          type: 'image/png',
        },
      ],
      siteName: siteMetadata.siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@blog.shatlykabdullayev',
      creator: '@blog.shatlykabdullayev',
    },
  }
}

export default async function Blog() {
  const posts = getPosts()

  const blogUrl = '/blog'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteMetadata.title,
    url: `${siteMetadata.siteUrl}${blogUrl}`,
    description: 'description',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Person',
      name: 'Shatlyk Abdullayev',
      url: siteMetadata.siteUrl,
      image: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/static/seo/profile.png`,
        width: 460,
        height: 460,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}${blogUrl}`,
    },
    blogPost: posts.map(({ data }) => ({
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.description,
      image: `${siteMetadata.siteUrl}/static/images/${data.image.src}`,
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime,
      inLanguage: 'en-US',
      author: {
        '@type': 'Person',
        name: 'Shatlyk Abdullayev',
        jobTitle: 'Senior Software Engineer',
        url: `${siteMetadata.siteUrl}/static/seo/profile.png`,
      },
      publisher: {
        '@type': 'Person',
        name: 'Shatlyk Abdullayev',
        jobTitle: 'Senior Software Engineer',
        url: `${siteMetadata.siteUrl}/static/seo/profile.png`,
      },
      url: `${siteMetadata.siteUrl}${data.href}`,
    })),
  }

  const priorityPosts = posts.slice(0, 3)

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {priorityPosts.map((post) =>
        post.data.image ? (
          <link
            key={`preload-${post.data.id}`}
            rel="preload"
            as="image"
            href={`/static/images/${post.data.image.src}`}
            crossOrigin="anonymous"
          />
        ) : null,
      )}

      <main className="sm:px-2 mt-8">
        <Suspense fallback={null}>
          <BlogContent posts={posts} />
        </Suspense>
      </main>
    </Layout>
  )
}
