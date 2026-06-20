import { Great_Vibes } from 'next/font/google'
import { MessageCircle, Camera, Globe } from 'lucide-react'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
})

const WHATSAPP_NUMBER = '573001234567'

const socialLinks = [
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: MessageCircle,
    label: 'WhatsApp',
    color: 'hover:bg-green-600 hover:text-white hover:shadow-green-600/25',
  },
  {
    href: '#',
    icon: Camera,
    label: 'Instagram',
    color: 'hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-orange-400 hover:text-white hover:shadow-pink-500/25',
  },
  {
    href: '#',
    icon: Globe,
    label: 'Facebook',
    color: 'hover:bg-blue-600 hover:text-white hover:shadow-blue-600/25',
  },
]

export default function ContactoPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1
          className={`${greatVibes.className} text-center text-5xl text-charcoal sm:text-7xl`}
        >
          Contacto
        </h1>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-terracotta-300/60" />
          <span className="text-[10px] text-terracotta-400/60">&#10022;</span>
          <span className="h-px w-6 bg-terracotta-300/60" />
        </div>

        <div className="mt-10 space-y-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30 transition-all ${link.color} active:scale-[0.98]`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream transition-colors group-hover:bg-white/20">
                <link.icon className="h-6 w-6 text-stone transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="font-display text-base text-charcoal transition-colors group-hover:text-white">
                  {link.label}
                </p>
                <p className="mt-0.5 text-sm text-stone transition-colors group-hover:text-white/80">
                  {link.label === 'WhatsApp'
                    ? 'Escríbenos para coordinar tu pedido'
                    : 'Síguenos para ver nuestras novedades'}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
