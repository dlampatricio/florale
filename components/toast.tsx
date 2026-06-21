'use client'

import { useToastStore } from '@/lib/toast-store'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex max-w-xs flex-col items-center gap-2 sm:right-4 sm:left-auto sm:items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            onClick={() => removeToast(t.id)}
            className="pointer-events-auto flex w-full cursor-pointer items-center gap-2.5 rounded-xl bg-sage-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            <Check className="h-4 w-4 shrink-0" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
