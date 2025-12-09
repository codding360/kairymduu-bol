import Link from 'next/link'

import {studioUrl} from '@/sanity/lib/api'

export default function SupportCTA() {
  const steps = [
    {
      title: 'Share the need',
      body: 'Tell the story, upload proof, and verify your identity in minutes.',
    },
    {
      title: 'Verified by neighbors',
      body: 'Our volunteer team contacts organizers and beneficiaries before launch.',
    },
    {
      title: 'Funds move fast',
      body: 'Direct payouts via bank transfer or mobile wallet with transparent tracking.',
    },
  ]

  return (
    <section className="container grid gap-8 rounded-[32px] bg-forest-600/95 p-10 text-white lg:grid-cols-[1fr,1fr]" id="start">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-white/70">Start a fundraiser</p>
        <h2 className="text-4xl font-display">Launch in less than 10 minutes</h2>
        <p className="text-white/80">
          Local heroes deserve trusted tools. We built Kairymduu Bol so villages, classrooms, and
          families can mobilize support quickly with full transparency.
        </p>
        <div className="flex gap-4">
          <Link
            className="rounded-full bg-white px-6 py-3 text-forest-700 font-semibold shadow-card"
            href={studioUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Studio
          </Link>
          <Link
            className="rounded-full border border-white/50 px-6 py-3 font-semibold text-white"
            href="mailto:hello@kairymduu-bol.org"
          >
            Talk to our team
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl border border-white/30 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
              Step {index + 1}
            </p>
            <h3 className="text-xl font-display">{step.title}</h3>
            <p className="text-white/80 text-sm">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

