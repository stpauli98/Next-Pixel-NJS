"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import Image from "next/image"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  url?: string
  technologies?: string[]
  features?: string[]
}

interface VerticalProjectStackProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
  viewProjectText: string
  enableScrollLock?: boolean
  onScrollExit?: (direction: 'up' | 'down') => void
  onIndexChange?: (index: number, total: number) => void
}

export function VerticalProjectStack({
  projects,
  onProjectClick,
  viewProjectText,
  enableScrollLock = false,
  onScrollExit,
  onIndexChange
}: VerticalProjectStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 350
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const exitCooldownRef = useRef(0)
  const hasReachedEndRef = useRef(false)
  const hasReachedStartRef = useRef(false)

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Reset index when projects change
  useEffect(() => {
    setCurrentIndex(0)
    hasReachedEndRef.current = false
    hasReachedStartRef.current = false
  }, [projects])

  // Notify parent of index changes
  useEffect(() => {
    onIndexChange?.(currentIndex, projects.length)
  }, [currentIndex, projects.length, onIndexChange])

  // Scroll lock effect for desktop
  useEffect(() => {
    if (!enableScrollLock || !isDesktop || !isInView) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [enableScrollLock, isDesktop, isInView])

  const navigate = useCallback((newDirection: number): boolean => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return false

    const isAtEnd = currentIndex === projects.length - 1
    const isAtStart = currentIndex === 0

    // Handle exit logic for scroll lock mode
    if (enableScrollLock && isDesktop && onScrollExit) {
      if (newDirection > 0 && isAtEnd) {
        if (hasReachedEndRef.current && now - exitCooldownRef.current > 600) {
          onScrollExit('down')
          return false
        }
        hasReachedEndRef.current = true
        exitCooldownRef.current = now
        return false
      }
      if (newDirection < 0 && isAtStart) {
        if (hasReachedStartRef.current && now - exitCooldownRef.current > 600) {
          onScrollExit('up')
          return false
        }
        hasReachedStartRef.current = true
        exitCooldownRef.current = now
        return false
      }
    }

    lastNavigationTime.current = now
    hasReachedEndRef.current = false
    hasReachedStartRef.current = false

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === projects.length - 1 ? prev : prev + 1
      }
      return prev === 0 ? prev : prev - 1
    })
    return true
  }, [projects.length, currentIndex, enableScrollLock, isDesktop, onScrollExit])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInView) return
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault()
        e.stopPropagation()
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate, isInView],
  )

  // Intersection observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.3
        setIsInView(inView)
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Wheel listener
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = projects.length
    if (total === 0) return { y: 0, scale: 1, opacity: 0, zIndex: 0, rotateX: 0, filter: "blur(0px)" }

    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const yOffset = isDesktop ? 200 : 140
    const yOffset2 = isDesktop ? 360 : 260

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0, filter: "blur(0px)" }
    } else if (diff === -1) {
      return { y: -yOffset, scale: 0.88, opacity: 0.4, zIndex: 4, rotateX: 4, filter: "blur(1px)" }
    } else if (diff === -2) {
      return { y: -yOffset2, scale: 0.76, opacity: 0.15, zIndex: 3, rotateX: 8, filter: "blur(2px)" }
    } else if (diff === 1) {
      return { y: yOffset, scale: 0.88, opacity: 0.4, zIndex: 4, rotateX: -4, filter: "blur(1px)" }
    } else if (diff === 2) {
      return { y: yOffset2, scale: 0.76, opacity: 0.15, zIndex: 3, rotateX: -8, filter: "blur(2px)" }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -12 : 12, filter: "blur(4px)" }
    }
  }

  const isVisible = (index: number) => {
    const total = projects.length
    if (total === 0) return false
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-[540px] sm:h-[620px] md:h-[700px] lg:h-full items-center justify-center">
        <p className="text-nextpixel-gray">No projects found</p>
      </div>
    )
  }

  const techLimit = isDesktop ? 5 : 3

  return (
    <div
      ref={containerRef}
      className="relative flex h-[540px] sm:h-[620px] md:h-[700px] lg:h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Dual-tone ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] lg:h-[460px] lg:w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nextpixel-turquoise/[0.04] blur-3xl" />
        <div className="absolute left-[45%] top-[55%] h-[200px] w-[200px] lg:h-[340px] lg:w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nextpixel-navy/[0.03] blur-3xl" />
      </div>

      {/* Card Stack */}
      <div
        className="relative flex h-[560px] sm:h-[650px] md:h-[740px] lg:h-full w-full max-w-[340px] sm:max-w-[380px] md:max-w-[540px] lg:max-w-[780px] items-center justify-center px-4"
        style={{ perspective: "1200px" }}
      >
        {projects.map((project, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={project.id}
              className="absolute cursor-grab active:cursor-grabbing w-full max-w-[320px] sm:max-w-[360px] md:max-w-[510px] lg:max-w-[740px]"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
                filter: style.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 30,
                mass: 0.8,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[470px] sm:h-[540px] md:h-[620px] lg:h-[min(660px,68vh)] w-full overflow-hidden rounded-2xl lg:rounded-3xl bg-white"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(30, 58, 95, 0.25), 0 12px 24px -8px rgba(46, 139, 154, 0.08), 0 0 0 1px rgba(30, 58, 95, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)"
                    : "0 12px 32px -10px rgba(30, 58, 95, 0.15), 0 0 0 1px rgba(30, 58, 95, 0.04)",
                }}
              >
                {/* Image section */}
                <div className="relative h-[45%] sm:h-[48%] md:h-[50%] lg:h-[50%] w-full overflow-hidden bg-nextpixel-light">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    draggable={false}
                    priority={isCurrent}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/800x500/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  {/* Subtle bottom gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 lg:top-5 lg:left-5">
                    <span className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-white bg-nextpixel-navy/85 rounded-full backdrop-blur-md shadow-sm ring-1 ring-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-3 pb-4 sm:p-4 sm:pb-5 md:p-5 md:pb-6 lg:p-7 lg:pb-8 h-[55%] sm:h-[52%] md:h-[50%] lg:h-[50%]">
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-nextpixel-dark mb-1 sm:mb-1.5 lg:mb-2 line-clamp-1 sm:line-clamp-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-nextpixel-gray/80 line-clamp-2 sm:line-clamp-3 lg:line-clamp-3 mb-2 sm:mb-3 lg:mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
                        {project.technologies.slice(0, techLimit).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs lg:text-sm px-1.5 py-0.5 sm:px-2 lg:px-3 lg:py-1 bg-nextpixel-navy/[0.06] text-nextpixel-navy rounded-md lg:rounded-lg font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > techLimit && (
                          <span className="text-[10px] sm:text-xs lg:text-sm px-1.5 py-0.5 sm:px-2 text-nextpixel-gray/60">
                            +{project.technologies.length - techLimit}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* View Project Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onProjectClick(project)
                    }}
                    className="group/btn w-full py-2 sm:py-2.5 lg:py-3.5 mt-2 sm:mt-3 mb-1 sm:mb-1.5 lg:mb-2 text-xs sm:text-sm lg:text-base font-semibold text-white bg-nextpixel-navy hover:bg-nextpixel-dark rounded-lg lg:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-nextpixel-navy/20"
                  >
                    <span className="inline-flex items-center gap-2">
                      {viewProjectText}
                      <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots — right side, with active glow */}
      <div className="absolute right-1.5 sm:right-3 md:right-6 lg:right-12 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 lg:gap-3 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
                hasReachedEndRef.current = false
                hasReachedStartRef.current = false
              }
            }}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-2 sm:w-2.5 lg:w-3 h-5 sm:h-7 lg:h-10 bg-nextpixel-teal shadow-[0_0_8px_rgba(46,139,154,0.4)]"
                : "w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 bg-nextpixel-gray/25 hover:bg-nextpixel-gray/45"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter — left side, editorial style */}
      <div className="absolute left-1.5 sm:left-3 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-nextpixel-dark/90 tabular-nums tracking-tighter">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-1.5 sm:my-2 lg:my-3 h-6 sm:h-8 lg:h-12 w-px bg-gradient-to-b from-nextpixel-teal/50 via-nextpixel-gray/20 to-transparent" />
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-lg text-nextpixel-gray/50 tabular-nums tracking-tight">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
