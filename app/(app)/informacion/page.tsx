import { Store, ShoppingBag, MessageCircle, Clock, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function InfoPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
          Información
        </h1>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <Store className="mt-1 h-5 w-5 shrink-0 text-terracotta-400" />
              <div>
                <h2 className="font-display text-lg text-charcoal">
                  Sobre Florale
                </h2>
                <p className="mt-3 leading-relaxed text-stone">
                  Florale nace del amor por lo hecho a mano. Creemos en el valor
                  de los objetos creados con dedicación, en la belleza de lo
                  imperfecto y en el poder de un regalo pensado con el corazón.
                </p>
                <p className="mt-3 leading-relaxed text-stone">
                  Trabajamos con artesanos locales que ponen su alma en cada
                  pieza, utilizando materiales naturales y técnicas
                  tradicionales que se transmiten de generación en generación.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <ShoppingBag className="mt-1 h-5 w-5 shrink-0 text-terracotta-400" />
              <div>
                <h2 className="font-display text-lg text-charcoal">
                  Cómo comprar
                </h2>
                <div className="mt-5 space-y-5">
                  {[
                    {
                      number: '01',
                      title: 'Explora el catálogo',
                      desc: 'Navega por nuestras categorías y descubre los productos que más te gusten.',
                    },
                    {
                      number: '02',
                      title: 'Arma tu pedido',
                      desc: 'Agrega los productos a tu carrito y ajusta las cantidades según necesites.',
                    },
                    {
                      number: '03',
                      title: 'Personaliza',
                      desc: 'Indícanos colores, frases o detalles especiales para tu regalo.',
                    },
                    {
                      number: '04',
                      title: 'Confirma por WhatsApp',
                      desc: 'Envíanos tu pedido por WhatsApp y coordinamos la entrega o el retiro.',
                    },
                  ].map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-xs font-medium text-terracotta-600">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium text-charcoal">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-stone">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <Leaf className="mt-1 h-5 w-5 shrink-0 text-terracotta-400" />
              <div>
                <h2 className="font-display text-lg text-charcoal">
                  Hecho a mano
                </h2>
                <p className="mt-3 leading-relaxed text-stone">
                  Cada pieza es única. Al ser productos artesanales, pueden
                  existir pequeñas variaciones en color, forma y textura que los
                  hacen especiales e irrepetibles.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-terracotta-400" />
              <div>
                <h2 className="font-display text-lg text-charcoal">
                  Entregas
                </h2>
                <p className="mt-3 leading-relaxed text-stone">
                  Realizamos entregas en la ciudad con un costo adicional.
                  También puedes retirar tu pedido sin costo adicional.
                </p>
                <p className="mt-2 leading-relaxed text-stone">
                  Los pedidos se preparan con 24 a 48 horas de anticipación.
                  Para fechas especiales, te recomendamos realizar tu pedido con
                  mayor anticipación.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link
              href="/contacto"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-terracotta-500 px-6 text-sm font-medium text-white transition-all hover:bg-terracotta-600 hover:shadow-lg hover:shadow-terracotta-500/25 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Consultanos
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
