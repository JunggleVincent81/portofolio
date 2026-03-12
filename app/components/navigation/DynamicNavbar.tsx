"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
]

export default function DynamicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 80)

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[]

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= 140 && rect.bottom >= 140
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }

      if (scrollY <= 80 && !isMobile) {
        setIsExpanded(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-navbar-root]")) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  const isFull = useMemo(() => {
    if (isMobile) return false
    return !isScrolled || isExpanded
  }, [isScrolled, isExpanded, isMobile])

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const offset = isMobile ? 80 : 100
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset

    window.scrollTo({
      top: y,
      behavior: "smooth",
    })

    setIsExpanded(false)
  }

  const activeLabel =
    navItems.find((item) => item.id === activeSection)?.label || "HOME"

  return (
    <div
      data-navbar-root
      className="fixed left-1/2 top-4 z-[100] -translate-x-1/2 md:top-8"
    >
      <motion.div
        animate={{
          opacity: isExpanded || isFull ? 0.6 : 0.35,
          scale: isExpanded || isFull ? 1.05 : 0.96,
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl"
      />

      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 24,
          mass: 0.85,
        }}
        className={`relative rounded-full border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${
          isFull
            ? "px-3 py-2.5"
            : "px-2.5 py-2 md:px-3 md:py-2"
        }`}
      >
        {isMobile ? (
          <>
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label="Open navigation menu"
              aria-expanded={isExpanded}
              className="flex min-w-[148px] items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_14px_rgba(139,92,246,0.8)]"
                  />
                </div>

                <div className="flex flex-col leading-none text-left">
                  <span className="text-[9px] uppercase tracking-[0.32em] text-white/45">
                    Menu
                  </span>
                  <span className="mt-1 max-w-[78px] truncate text-[10px] font-semibold tracking-[0.18em] text-white/90">
                    {activeLabel}
                  </span>
                </div>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.22 }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/80"
              >
                +
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute left-1/2 top-[calc(100%+10px)] w-[220px] -translate-x-1/2 rounded-[24px] border border-white/12 bg-[#14141c]/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          className={`rounded-2xl px-3 py-3 text-center text-[10px] font-semibold tracking-[0.18em] transition ${
                            isActive
                              ? "border border-white/10 bg-white/10 text-white"
                              : "bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <AnimatePresence mode="wait">
            {isFull ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-1"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`relative rounded-full px-3 py-2 text-[11px] font-semibold tracking-[0.2em] transition whitespace-nowrap ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavDesktop"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 190,
                            damping: 24,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  )
                })}
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                type="button"
                onClick={() => setIsExpanded(true)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-white/85"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_14px_rgba(139,92,246,0.8)]"
                  />
                </div>

                <div className="flex flex-col leading-none text-left">
                  <span className="text-[9px] uppercase tracking-[0.34em] text-white/45">
                    Menu
                  </span>
                  <span className="max-w-[96px] truncate text-[11px] font-semibold tracking-[0.2em] text-white/90">
                    {activeLabel}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs"
                >
                  +
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )
}