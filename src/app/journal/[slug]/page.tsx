import type { Metadata } from 'next'
import { ArticleDetail } from './ArticleDetail'

export const metadata: Metadata = {
  title: 'Article | Lakiyo\'s Oasis Journal',
  description: 'Read stories, guides, and inspiration from the YOASIS community.',
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ArticleDetail slug={slug} />
}
