import type { Metadata } from 'next'
import { ExperiencesHero } from './ExperiencesHero'
import { ExperienceDetail } from './ExperienceDetail'
import { experienceTypes } from '@/data/site'

export const metadata: Metadata = {
  title: 'Creative Experiences | Sip and Paint, Flowers, Book Club, Corporate — Nairobi',
  description:
    'Explore all creative experiences at Lakiyo\'s Oasis — sip and paint, flower arrangement workshops, book clubs, and corporate team-building in Nairobi.',
}

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      {experienceTypes.map((exp, index) => (
        <ExperienceDetail key={exp.id} experience={exp} index={index} />
      ))}
    </>
  )
}
