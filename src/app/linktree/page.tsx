import { Metadata } from 'next'
import { LinktreeContent } from './linktree-content'
import siteMetadata from '../siteMetadata'

const description = 'Shatlyk Abdullayev - Linktree'

export const metadata: Metadata = {
  title: 'Shatlyk Abdullayev - Linktree',
  description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/linktree`,
  },
  openGraph: {
    type: 'article',
    url: `${siteMetadata.siteUrl}/linktree`,
    title: 'Shatlyk Abdullayev - Linktree',
    description,
    images: [
      {
        url: `${siteMetadata.siteUrl}/static/images/seo-card-linktree.png`,
        type: 'image/png',
      },
    ],
    siteName: 'Shatlyk1011',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shatlyk',
    creator: '@shatlyk',
  },
}

export default function LinksPage() {
  return <LinktreeContent />
}
