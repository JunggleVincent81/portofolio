"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const roles = [
  "Modern Web Applications",
  "Responsive Business Websites",
  "WordPress & React Solutions",
]

const projects = [
  {
    id: 1,
    title: "Hotel Booking Website",
    shortTitle: "Porto Hotel",
    url: "https://portohotel.tegarbs.site",
    description:
      "A modern hotel website interface designed to showcase hotel services and help visitors explore rooms, facilities, and booking information through a clean and responsive experience.",
    image: "https://projects/hotel.png",
    stack: ["WordPress", "Custom Theme", "Responsive UI"],
    type: "Business Website",
    role: "Web Developer",
    highlights: [
      "Responsive layout for desktop and mobile devices",
      "Clean room and facility presentation",
      "Structured interface for hotel information and booking flow",
    ],
  },
  {
    id: 2,
    title: "Jewelry Ecommerce Website",
    shortTitle: "Porto MJewel",
    url: "https://portomjewel.tegarbs.site",
    description:
      "A luxury ecommerce website concept built to demonstrate elegant product presentation and a user-friendly online shopping experience for jewelry products.",
    image: "/projects/mjewel.png",
    stack: ["WordPress", "WooCommerce", "Performance"],
    type: "Ecommerce Website",
    role: "Web Developer",
    highlights: [
      "Product-focused layout for premium visual presentation",
      "Organized browsing flow for product discovery",
      "Built with WordPress and WooCommerce structure",
    ],
  },
  {
    id: 3,
    title: "Learning Management System Prototype",
    shortTitle: "Porto LMS",
    url: "https://portolms.tegarbs.site",
    description:
      "A learning platform prototype built to demonstrate dashboard structure, course management flow, and role-based access between users and administrators.",
    image: "/projects/lms.png",
    stack: ["Laravel", "React", "Role-Based Access"],
    type: "Web Application Prototype",
    role: "Fullstack Web Developer",
    highlights: [
      "Dashboard-based interface for learning flow",
      "Role-based access structure",
      "Prototype architecture for educational platform use cases",
    ],
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.28em] text-white/40 md:text-xs md:tracking-[0.35em]">
      {children}
    </p>
  )
}

function PrimaryButton({
  href,
  children,
  target = "_self",
}: {
  href: string
  children: React.ReactNode
  target?: "_self" | "_blank"
}) {
  const external = target === "_blank"

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90 md:px-6"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90 md:px-6"
    >
      {children}
    </Link>
  )
}

function SecondaryButton({
  href,
  children,
  target = "_self",
}: {
  href: string
  children: React.ReactNode
  target?: "_self" | "_blank"
}) {
  const external = target === "_blank"

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10 md:px-6"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10 md:px-6"
    >
      {children}
    </Link>
  )
}

function SocialButton({
  href,
  label,
  children,
  highlight = false,
}: {
  href: string
  label: string
  children: React.ReactNode
  highlight?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch) return

    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const moveX = (x - centerX) / 10
    const moveY = (y - centerY) / 10

    el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px) scale(1)"
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      aria-label={label}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 backdrop-blur-2xl transition-all duration-300 md:h-14 md:w-14 ${
        highlight ? "bg-green-500/10" : "bg-white/5"
      } hover:bg-white/10`}
    >
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {!isTouch && (
        <div className="absolute -top-10 whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100">
          {label}
        </div>
      )}

      <div className="relative text-white/80 transition group-hover:text-white">
        {children}
      </div>
    </motion.a>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[number]
  onClick: () => void
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:rounded-3xl"
    >
      <button
        type="button"
        onClick={onClick}
        className="block w-full text-left"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="relative h-48 overflow-hidden sm:h-52 md:h-56">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
              {project.type}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              {project.role}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white md:text-xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
        >
          View Live Website
        </a>
      </div>
    </motion.article>
  )
}

function TechIcon({ type }: { type: string }) {
  const cls = "h-6 w-6"

  switch (type) {
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4 6h16M4 12h10M4 18h7" />
          <path d="M17 9l3 3-3 3" />
        </svg>
      )
    case "backend":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
        </svg>
      )
    case "cms":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M7 8h10M7 12h6M3 18h18" />
        </svg>
      )
    case "database":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
          <path d="M5 5.5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
          <path d="M5 10.5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
        </svg>
      )
    case "tools":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.6 5.6a2 2 0 1 0 2.8 2.8l5.6-5.6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.8-2.8 2.3-2.3Z" />
        </svg>
      )
    default:
      return null
  }
}

function TechCard({
  title,
  description,
  items,
  type,
  delay = 0,
}: {
  title: string
  description: string
  items: string[]
  type: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isTouch] = useState(() => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(hover: none), (pointer: coarse)").matches
})

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return

    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 3
    const rotateY = ((x - centerX) / centerX) * -3

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className="perspective-[1200px]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.38)] transition-transform duration-300 ease-out md:rounded-[28px] md:p-7 md:backdrop-blur-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.08] to-transparent opacity-60 md:rounded-[28px]" />
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/15 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100 md:h-28 md:w-28" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-indigo-500/15 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100 md:h-28 md:w-28" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-purple-300 shadow-[0_10px_30px_rgba(139,92,246,0.15)] md:h-14 md:w-14">
              <TechIcon type={type} />
            </div>

            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]"
            />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white md:mt-6 md:text-2xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/58">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5 md:mt-6 md:gap-3">
            {items.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: delay + index * 0.035 }}
                viewport={{ once: true }}
                whileHover={isTouch ? undefined : { scale: 1.04, y: -2 }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-purple-400/30 hover:bg-white/10 hover:text-white md:px-4 md:py-2 md:text-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scaleDown = useTransform(scrollYProgress, [0, 0.6], [1, 0.98])

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTouch = () => {
        setIsTouchDevice(window.matchMedia("(hover: none), (pointer: coarse)").matches)
      }

      checkTouch()
      window.addEventListener("resize", checkTouch)
      return () => window.removeEventListener("resize", checkTouch)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < roles[index].length) {
        setSubIndex((prev) => prev + 1)
        setText(roles[index].substring(0, subIndex + 1))
      } else if (deleting && subIndex > 0) {
        setSubIndex((prev) => prev - 1)
        setText(roles[index].substring(0, subIndex - 1))
      } else if (subIndex === roles[index].length) {
        const deleteTimeout = setTimeout(() => setDeleting(true), 1200)
        return () => clearTimeout(deleteTimeout)
      } else if (subIndex === 0 && deleting) {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % roles.length)
      }
    }, deleting ? 35 : 60)

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting])

  const [current, setCurrent] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current) return

      const containerWidth = sliderRef.current.offsetWidth
      let visible = 3

      if (window.innerWidth < 1024) visible = 2
      if (window.innerWidth < 640) visible = 1

      setVisibleCards(visible)
      setCardWidth(containerWidth / visible)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = useMemo(
    () => Math.max(projects.length - visibleCards, 0),
    [visibleCards]
  )

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return

    const card = imageRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * 5
    const rotateY = ((x - centerX) / centerX) * -5

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleImageMouseLeave = () => {
    if (!imageRef.current) return
    imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  return (
    <main className="relative overflow-hidden bg-[#0f0f14] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[360px] w-[360px] rounded-full bg-purple-600/15 blur-[100px] md:h-[480px] md:w-[480px] md:blur-[120px]" />
        <div className="absolute right-1/4 top-[30%] h-[300px] w-[300px] rounded-full bg-indigo-600/15 blur-[100px] md:h-[420px] md:w-[420px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-fuchsia-600/10 blur-[120px] md:h-[520px] md:w-[520px] md:blur-[150px]" />
      </div>

      <section
        id="home"
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-24 md:min-h-screen md:px-6 md:pb-0 md:pt-0"
      >
        <motion.div
          style={{ opacity: fadeOut, scale: scaleDown }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <SectionLabel>Web Developer Portfolio</SectionLabel>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl md:mt-6 md:text-7xl">
            Tegar{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Bagus Santoso
            </span>
          </h1>

          <p className="mt-5 text-base text-white/75 sm:text-lg md:mt-6 md:text-xl">
            Web Developer building modern, responsive, and maintainable digital products.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base md:mt-8 md:text-lg">
            I build <span className="font-semibold text-white">{text}</span>
            <span className="ml-1 animate-pulse text-purple-400">|</span>
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/55 md:mt-8 md:max-w-3xl md:text-base">
            I’m a web developer based in Indonesia focused on building clean, responsive,
            and user-friendly websites and web applications using WordPress, React, Laravel,
            and modern frontend tools.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10 md:gap-4">
            <PrimaryButton href="#projects">View Projects</PrimaryButton>
            <SecondaryButton href="/resume.pdf" target="_blank">
              Download Resume
            </SecondaryButton>
            <SecondaryButton href="https://wa.me/628885441465" target="_blank">
              Contact Me
            </SecondaryButton>
          </div>
        </motion.div>
      </section>

      <section id="about" className="relative px-5 py-20 md:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex justify-center perspective-[1200px]">
            <div className="absolute -inset-6 rounded-3xl bg-purple-500/20 blur-3xl opacity-60 md:-inset-8" />

            <div
              ref={imageRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-transform duration-300 ease-out md:p-5"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-[320px] w-[260px] overflow-hidden rounded-2xl sm:h-[380px] sm:w-[300px] md:h-[460px] md:w-[360px]">
                <Image
                  src="/about/ds.jpg"
                  alt="Portrait of Tegar Bagus Santoso"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 360px"
                  priority
                />
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>About Me</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:mt-6 md:text-5xl">
              Building Clean and Reliable
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Web Experiences
              </span>
            </h2>

            <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-white/68 sm:text-base md:mt-8 md:space-y-5 md:text-lg">
              <p>
                I’m a web developer who enjoys building modern websites and web applications
                that are responsive, easy to maintain, and aligned with real business needs.
              </p>
              <p>
                My experience includes freelance and internship projects where I worked on
                WordPress websites, ecommerce platforms, and web application prototypes using
                technologies like React and Laravel.
              </p>
              <p>
                I focus on writing clean code, designing structured interfaces, and creating
                digital products that help businesses present their services clearly and effectively.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-5">
              <SocialButton href="https://www.linkedin.com/in/tegar-bagus-santoso-693479330/" label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4V8h4v2" />
                  <rect x="2" y="9" width="4" height="11" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialButton>

              <SocialButton href="https://github.com/JunggleVincent81" label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.25 2.85.12 3.15.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </SocialButton>

              <SocialButton href="mailto:tegarbagussantoso1116@email.com" label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </SocialButton>

              <SocialButton href="https://wa.me/628885441465" label="WhatsApp" highlight>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M20.52 3.48A11.86 11.86 0 0012.02 0C5.39 0 .02 5.37.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0012.02 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.5-8.52zM12.02 21.82c-1.86 0-3.68-.5-5.27-1.45l-.38-.23-3.67.96.98-3.58-.25-.37a9.78 9.78 0 01-1.5-5.15c0-5.44 4.43-9.87 9.87-9.87 2.64 0 5.13 1.03 7 2.9a9.8 9.8 0 012.9 6.97c0 5.44-4.43 9.82-9.88 9.82zm5.52-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.68-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.37.45-.55.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                </svg>
              </SocialButton>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative overflow-hidden px-5 py-20 md:px-6 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8%] top-20 h-56 w-56 rounded-full bg-purple-600/10 blur-[110px]"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[10%] top-32 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[140px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_45%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>Tech Stack</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:mt-6 md:text-6xl">
              Tools and Technologies
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                I Work With
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/62 sm:text-base md:mt-6 md:text-lg">
              My workflow focuses on modern frontend development, WordPress implementation,
              backend fundamentals, and practical tools for building responsive and maintainable web products.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-5 md:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-12">
            <div className="xl:col-span-5">
              <TechCard
                title="Frontend"
                type="frontend"
                delay={0}
                description="Modern frontend development for responsive interfaces, reusable components, and smooth user interaction."
                items={["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"]}
              />
            </div>

            <div className="xl:col-span-4">
              <TechCard
                title="WordPress / CMS"
                type="cms"
                delay={0.08}
                description="Website building and customization using WordPress, WooCommerce, and plugin-based implementation."
                items={["WordPress", "WooCommerce", "Theme Customization", "Plugin Configuration"]}
              />
            </div>

            <div className="xl:col-span-3">
              <TechCard
                title="Database"
                type="database"
                delay={0.14}
                description="Basic database usage for local development, query handling, and application data structure."
                items={["PostgreSQL", "SQL", "XAMPP"]}
              />
            </div>

            <div className="xl:col-span-7">
              <TechCard
                title="Backend"
                type="backend"
                delay={0.18}
                description="Backend fundamentals for web application logic and project-based development."
                items={["PHP", "Laravel"]}
              />
            </div>

            <div className="xl:col-span-5">
              <TechCard
                title="Tools"
                type="tools"
                delay={0.24}
                description="Core tools for version control, deployment, and development workflow."
                items={["Git", "GitHub", "Vercel"]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative px-5 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Selected Projects</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:mt-6 md:text-5xl">
                Work That Reflects
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  My Development Approach
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-[15px] leading-relaxed text-white/60 md:text-base">
              These projects represent my work across business websites, ecommerce platforms,
              and web application prototypes with a focus on clean UI, responsive structure,
              and maintainable implementation.
            </p>
          </div>

          <div className="relative mt-10 md:mt-14">
            {current > 0 && (
              <button
                type="button"
                onClick={() => setCurrent((prev) => prev - 1)}
                className="absolute left-1 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base backdrop-blur-xl transition hover:bg-white/15 md:left-0 md:top-[45%] md:h-12 md:w-12 md:text-lg"
                aria-label="Previous projects"
              >
                ←
              </button>
            )}

            {current < maxIndex && (
              <button
                type="button"
                onClick={() => setCurrent((prev) => prev + 1)}
                className="absolute right-1 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base backdrop-blur-xl transition hover:bg-white/15 md:right-0 md:top-[45%] md:h-12 md:w-12 md:text-lg"
                aria-label="Next projects"
              >
                →
              </button>
            )}

            <div ref={sliderRef} className="overflow-hidden">
              <motion.div
                animate={{ x: -current * cardWidth }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
                className="flex"
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    style={{ width: cardWidth || undefined }}
                    className="shrink-0 p-2 md:p-4"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative px-5 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Experience</SectionLabel>

          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:mt-6 md:text-5xl">
            Practical Experience Through
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Freelance and Internship Work
            </span>
          </h2>

          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:rounded-3xl md:p-8">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 md:text-xs">
                Freelance
              </span>
              <h3 className="mt-4 text-xl font-semibold md:mt-5 md:text-2xl">
                Freelance Web Developer
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65 md:mt-4 md:text-base">
                Worked on small business and personal projects to build responsive websites
                using WordPress and modern frontend tools.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li>• Website customization and layout development</li>
                <li>• UI implementation and responsive adjustments</li>
                <li>• Basic performance and presentation optimization</li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:rounded-3xl md:p-8">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 md:text-xs">
                Internship
              </span>
              <h3 className="mt-4 text-xl font-semibold md:mt-5 md:text-2xl">
                Web Development Internship
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65 md:mt-4 md:text-base">
                Assisted in building and maintaining web projects while learning practical
                workflows for frontend implementation, CMS customization, and project structure.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li>• Frontend implementation support</li>
                <li>• CMS-based page setup and content structure</li>
                <li>• Exposure to real development workflow and revisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-6 md:py-40">
  <div className="pointer-events-none absolute inset-0">
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[8%] top-16 h-[320px] w-[320px] rounded-full bg-purple-600/18 blur-[110px] md:left-1/4 md:top-20 md:h-[500px] md:w-[500px] md:blur-[140px]"
    />
    <motion.div
      animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 right-[8%] h-[260px] w-[260px] rounded-full bg-indigo-600/18 blur-[110px] md:right-1/3 md:h-[400px] md:w-[400px] md:blur-[140px]"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_46%)]" />
  </div>

  <div className="relative mx-auto max-w-5xl text-center">
    <SectionLabel>Contact</SectionLabel>

    <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:mt-6 md:text-6xl">
      Let’s Build Something
      <br />
      <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Great Together
      </span>
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base md:mt-8 md:text-lg">
      I’m currently open to web development opportunities, freelance projects,
      and collaborations. If you’re building a product, improving a website,
      or need a reliable developer to support your ideas, feel free to reach out.
    </p>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, amount: 0.2 }}
      className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_40px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:mt-14 md:rounded-[32px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-70" />

      <div className="relative grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
        {/* Left side */}
        <div className="border-b border-white/10 p-6 text-left md:border-b-0 md:border-r md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-purple-300 uppercase">
            Available for Opportunities
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-white md:text-3xl">
            Start a Conversation
          </h3>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 md:text-base">
            I usually respond quickly for collaboration inquiries, freelance work,
            and web development opportunities. You can contact me by email or WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap md:mt-10 md:gap-4">
            <PrimaryButton
              href="mailto:tegarbagussantoso1116@email.com"
              target="_blank"
            >
              Start a Conversation
            </PrimaryButton>

            <SecondaryButton
              href="https://wa.me/628885441465"
              target="_blank"
            >
              Chat on WhatsApp
            </SecondaryButton>
          </div>
        </div>

        {/* Right side */}
        <div className="grid gap-0 text-left">
          <div className="border-b border-white/10 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Email
            </p>
            <a
              href="mailto:tegarbagussantoso1116@email.com"
              className="mt-3 block break-all text-base font-medium text-white transition hover:text-purple-300 md:text-lg"
            >
              tegarbagussantoso1116@email.com
            </a>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Location
            </p>
            <p className="mt-3 text-base font-medium text-white md:text-lg">
              Indonesia
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Open to remote work, freelance collaboration, and web development opportunities.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      <footer className="relative border-t border-white/10 px-5 py-14 md:px-6 md:py-20">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div>
              <h3 className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-xl font-semibold text-transparent">
                Tegar Bagus Santoso
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Web Developer focused on building modern websites, ecommerce platforms,
                and web applications using React, Laravel, and WordPress.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-white/60">
              <Link href="#home" className="transition hover:text-white">Home</Link>
              <Link href="#about" className="transition hover:text-white">About</Link>
              <Link href="#skills" className="transition hover:text-white">Skills</Link>
              <Link href="#projects" className="transition hover:text-white">Projects</Link>
              <Link href="#experience" className="transition hover:text-white">Experience</Link>
              <Link href="#contact" className="transition hover:text-white">Contact</Link>
            </div>

            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="mailto:tegarbagussantoso1116@email.com" className="break-all transition hover:text-white">
                tegarbagussantoso1116@email.com
              </a>
              <span>Indonesia</span>
              <span>Open to opportunities</span>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-white/40 md:mt-16 md:pt-8">
            © {new Date().getFullYear()} Tegar Bagus Santoso. All rights reserved.
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/628885441465"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8"
      >
        <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl opacity-70 transition duration-500 group-hover:opacity-100" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition duration-300 hover:scale-110 md:h-16 md:w-16">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M20.52 3.48A11.86 11.86 0 0012.02 0C5.39 0 .02 5.37.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0012.02 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.5-8.52zM12.02 21.82c-1.86 0-3.68-.5-5.27-1.45l-.38-.23-3.67.96.98-3.58-.25-.37a9.78 9.78 0 01-1.5-5.15c0-5.44 4.43-9.87 9.87-9.87 2.64 0 5.13 1.03 7 2.9a9.8 9.8 0 012.9 6.97c0 5.44-4.43 9.82-9.88 9.82zm5.52-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.68-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.37.45-.55.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </div>
      </a>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl md:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[24px] border border-white/10 bg-[#14141c] p-5 md:rounded-3xl md:p-10"
            >
              <div className="relative mb-6 h-[220px] w-full overflow-hidden rounded-2xl sm:h-[260px] md:mb-8 md:h-[420px]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                  {selectedProject.type}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  {selectedProject.role}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold md:text-3xl">
                {selectedProject.title}
              </h3>

              <p className="mt-5 text-[15px] leading-relaxed text-white/70 md:text-base">
                {selectedProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white">Project Highlights</h4>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65 md:text-base">
                  {selectedProject.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10 md:gap-4">
                <PrimaryButton href={selectedProject.url} target="_blank">
                  Visit Live Website
                </PrimaryButton>
                <SecondaryButton href="https://wa.me/628885441465" target="_blank">
                  Let’s Talk
                </SecondaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
