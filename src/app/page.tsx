import { Hero } from '@/components/sections/Hero'
import { BrandStory } from '@/components/sections/BrandStory'
import { FeaturedExperience } from '@/components/sections/FeaturedExperience'
import { ExperienceCategories } from '@/components/sections/ExperienceCategories'
import { Gallery } from '@/components/sections/Gallery'
import { OasisPreview } from '@/components/sections/OasisPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { SocialFeed } from '@/components/sections/SocialFeed'
import { SubscriptionPreview } from '@/components/sections/SubscriptionPreview'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedExperience />
      <ExperienceCategories />
      <Gallery />
      <OasisPreview />
      <SubscriptionPreview />
      <Testimonials />
      <SocialFeed />
      <FinalCTA />
    </>
  )
}
