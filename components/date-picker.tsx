'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const weekdays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
  const dd = String(day).padStart(2, '0')
  const mm = String(month + 1).padStart(2, '0')
  return `${dd}/${mm}/${year}`
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [upward, setUpward] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const today = new Date()
  const parsed = value ? parseDate(value) : null
  const [viewYear, setViewYear] = useState(parsed?.year ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsed?.month ?? today.getMonth())

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleOpen() {
    const rect = inputRef.current?.getBoundingClientRect()
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom
      setUpward(spaceBelow < 340)
    }
    setOpen(true)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  function selectDay(day: number) {
    onChange(formatDate(viewYear, viewMonth, day))
    setOpen(false)
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11) }
    else setViewMonth(viewMonth - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0) }
    else setViewMonth(viewMonth + 1)
  }

  return (
    <div ref={ref} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleOpen}
        placeholder=" "
        readOnly
        className="peer w-full rounded-lg border border-stone-light/30 bg-white px-3 pt-5 pb-1.5 text-xs text-charcoal transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20 cursor-pointer"
      />
      <span className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium text-stone transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:text-stone-light peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-charcoal">
        Fecha de entrega
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: upward ? 4 : -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: upward ? 4 : -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 z-50 mt-1 w-72 rounded-xl bg-white p-4 shadow-lg ring-1 ring-stone-light/20 ${
              upward ? 'bottom-full mb-1' : 'top-full'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-md text-stone transition-colors hover:bg-stone-light/20 hover:text-charcoal"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-charcoal">
                {months[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-md text-stone transition-colors hover:bg-stone-light/20 hover:text-charcoal"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-xs font-medium text-stone">
              {weekdays.map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
              {days.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} />
                const isSelected =
                  parsed?.day === day && parsed?.month === viewMonth && parsed?.year === viewYear
                const isToday =
                  day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDay(day)}
                    className={`rounded-lg py-1.5 transition-colors ${
                      isSelected
                        ? 'bg-terracotta-500 text-white'
                        : isToday
                          ? 'text-terracotta-600 font-medium'
                          : 'text-charcoal hover:bg-stone-light/20'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function parseDate(dateStr: string) {
  const parts = dateStr.split('/')
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return { day, month, year }
}
