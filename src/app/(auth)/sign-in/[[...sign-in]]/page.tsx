import { SignIn } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg rounded-2xl',
            headerTitle: 'font-heading text-charcoal',
            headerSubtitle: 'text-warm-gray',
            formButtonPrimary: 'bg-coral hover:bg-coral-dark text-white',
            footerActionLink: 'text-coral hover:text-coral-dark',
          },
        }}
      />
    </div>
  )
}
