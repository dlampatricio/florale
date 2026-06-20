import {
  MessageCircle,
  User,
  Heart,
  Calendar,
  Truck,
  CreditCard,
  Clock,
  ClipboardList,
} from 'lucide-react'

const WHATSAPP_NUMBER = '573001234567'

export default function ContactoPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
          Contacto
        </h1>

        <div className="mt-10 space-y-6">
          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-400" />
              <div className="space-y-4 text-stone">
                <p className="leading-relaxed">
                  ¡Hola! Gracias por comunicarte con Florale.
                </p>
                <p className="leading-relaxed">
                  Puedes ver nuestro catálogo en el ícono de la casita en la
                  parte superior.
                </p>
                <p className="leading-relaxed">
                  Una vez elijas tu producto, indícanos cómo deseas
                  personalizarlo (colores, frases, tarjeta, etc.).
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-400" />
              <div className="w-full">
                <h2 className="font-display text-lg text-charcoal">
                  Para agendar tu pedido necesitamos:
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: User, label: 'Nombre de quien envía' },
                    { icon: Heart, label: 'Nombre de quien recibe' },
                    { icon: Calendar, label: 'Fecha de entrega' },
                    {
                      icon: Truck,
                      label: 'Modalidad: envío o retiro',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-terracotta-400" />
                      <span className="text-sm text-stone">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-light/30">
            <div className="flex items-start gap-4">
              <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-400" />
              <div>
                <h2 className="font-display text-lg text-charcoal">
                  Confirmación
                </h2>
                <p className="mt-3 leading-relaxed text-stone">
                  Para confirmar tu pedido, solicitamos una seña del 50% del
                  valor total.
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-cream px-4 py-3">
                  <Clock className="h-4 w-4 shrink-0 text-terracotta-400" />
                  <span className="text-sm text-stone">
                    Los pedidos se realizan de 24 a 48 horas antes
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-light/30">
            <MessageCircle className="mx-auto h-8 w-8 text-green-600" />
            <p className="mt-4 text-sm text-stone">
              Escríbenos por WhatsApp para coordinar tu pedido
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-green-600 px-6 text-sm font-medium text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar WhatsApp
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}
