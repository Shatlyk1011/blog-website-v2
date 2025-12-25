import { Layout } from '@/components'
import { Metadata } from 'next'
import { getPosts } from '@/utils/mdx'
import { HomeContent } from './home-content'
import siteMetadata from './siteMetadata'

export async function generateMetadata(): Promise<Metadata> {
  const description = siteMetadata.description

  const canonicalUrl = siteMetadata.siteUrl

  return {
    title: siteMetadata.author + ' - Blog',
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: siteMetadata.author + 'blog',
      description,
      locale:'en_US',
      images: [
        {
          url: `${siteMetadata.siteUrl}/static/images/seo-card-home.png`,
          type: 'image/png',
        },
      ],
      siteName: `Shatlyk's Blog`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@shatlyk1011',
      creator: '@shatlyk1011',
    },
  }
}

export default async function IndexPage() {
  const posts = getPosts()
  const description = siteMetadata.description

  // Enhanced Person Schema for LLM/AI discoverability
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteMetadata.siteUrl}/#person`,
    name: siteMetadata.authorShort,
    url: `${siteMetadata.siteUrl}`,
    image: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}/static/seo/profile.png`,
      width: 460,
      height: 460,
      caption: `${siteMetadata.author} Profile Picture`,
    },
    jobTitle: 'Senior Software Engineer',
    description: description,
    sameAs: [
      siteMetadata.github,
      siteMetadata.linkedin,
    ],
    knowsAbout: [
      'TypeScript',
      'Next.js',
      'React',
      'Node.js',
      'Tailwind',
      'Software Architecture',
      'Full-Stack Development',
      'Web Performance',
      'PWA Development',
      'SEO',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Brand'],
    '@id': `${siteMetadata.siteUrl}/#organization`,
    name: siteMetadata.authorShort,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}/static/seo/profile.png`,
    sameAs: [
      siteMetadata.website,
      siteMetadata.github,
      siteMetadata.linkedin,
    ],
    description: 'Blog about software development, TypeScript, Next.js, and architecture',
  }

  const webPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': siteMetadata.siteUrl,
    url: siteMetadata.siteUrl,
    name: 'Shatlyk Abdullayev - Home',
    description: description,
    inLanguage: 'en-US',
    author: { '@id': `${siteMetadata.siteUrl}/#person` },
    image: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}/static/seo/profile.png`,
      width: 460,
      height: 460,
      caption: `${siteMetadata.author} Profile Picture`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteMetadata.siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item:
           siteMetadata.siteUrl
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'LinkTree',
          item:
            siteMetadata.siteUrl
        },
      ],
    },
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />

      <main className="max-w-4xl mx-auto py-4 px-4 sm:px-24">
        <HomeContent posts={posts} />
      </main>
    </Layout>
  )
}
