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
import { getEvents } from '@/lib/events'
import { getNextEvent } from '@/lib/utils'

export default async function Home() {
  // Read once on the server so every section agrees on what "next" means.
  const events = await getEvents()
  const nextEvent = getNextEvent(events)

  return (
    <>
      <Hero nextEvent={nextEvent} events={events.slice(0, 3)} />
      <BrandStory />
      <FeaturedExperience event={nextEvent} />
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
