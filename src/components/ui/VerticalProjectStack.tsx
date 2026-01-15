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
        // Trying to go forward at end
        if (hasReachedEndRef.current && now - exitCooldownRef.current > 600) {
          onScrollExit('down')
          return false
        }
        hasReachedEndRef.current = true
        exitCooldownRef.current = now
        return false
      }
      if (newDirection < 0 && isAtStart) {
        // Trying to go back at start
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

  // Desktop: scale offsets for larger cards
  const getCardStyle = (index: number) => {
    const total = projects.length
    if (total === 0) return { y: 0, scale: 1, opacity: 0, zIndex: 0, rotateX: 0 }

    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    // Larger offsets for desktop
    const yOffset = isDesktop ? 160 : 130
    const yOffset2 = isDesktop ? 280 : 230

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -yOffset, scale: 0.88, opacity: 0.5, zIndex: 4, rotateX: 5 }
    } else if (diff === -2) {
      return { y: -yOffset2, scale: 0.76, opacity: 0.25, zIndex: 3, rotateX: 10 }
    } else if (diff === 1) {
      return { y: yOffset, scale: 0.88, opacity: 0.5, zIndex: 4, rotateX: -5 }
    } else if (diff === 2) {
      return { y: yOffset2, scale: 0.76, opacity: 0.25, zIndex: 3, rotateX: -10 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -12 : 12 }
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
      <div className="flex h-[600px] lg:h-full items-center justify-center">
        <p className="text-nextpixel-gray">No projects found</p>
      </div>
    )
  }

  // How many technologies to show based on screen size
  const techLimit = isDesktop ? 5 : 3

  return (
    <div
      ref={containerRef}
      className="relative flex h-[600px] md:h-[680px] lg:h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Subtle ambient glow - larger on desktop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] lg:h-[700px] lg:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nextpixel-turquoise/5 blur-3xl" />
      </div>

      {/* Card Stack - responsive sizing */}
      <div
        className="relative flex h-[530px] md:h-[600px] lg:h-[640px] w-full max-w-[340px] md:max-w-[500px] lg:max-w-[720px] items-center justify-center px-4"
        style={{ perspective: "1400px" }}
      >
        {projects.map((project, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={project.id}
              className="absolute cursor-grab active:cursor-grabbing w-full max-w-[320px] md:max-w-[470px] lg:max-w-[680px]"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[500px] md:h-[560px] lg:h-[600px] w-full overflow-hidden rounded-2xl lg:rounded-3xl bg-white"
                style={{
                  boxShadow: isCurrent
                    ? "0 30px 60px -15px rgba(10, 36, 99, 0.3), 0 0 0 1px rgba(10, 36, 99, 0.05)"
                    : "0 15px 40px -12px rgba(10, 36, 99, 0.2)",
                }}
              >
                {/* Image - 55% height on desktop for more content space */}
                <div className="relative h-[50%] md:h-[52%] lg:h-[55%] w-full overflow-hidden bg-nextpixel-light">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    draggable={false}
                    priority={isCurrent}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/800x500/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 lg:top-5 lg:left-5">
                    <span className="inline-block px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-white bg-nextpixel-blue/90 rounded-full backdrop-blur-sm shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content - more space on desktop */}
                <div className="p-4 md:p-5 lg:p-7">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-nextpixel-dark mb-1.5 lg:mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm lg:text-base text-nextpixel-gray line-clamp-3 lg:line-clamp-4 mb-3 lg:mb-4">
                    {project.description}
                  </p>

                  {/* Technologies - show more on desktop */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                      {project.technologies.slice(0, techLimit).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs lg:text-sm px-2 py-0.5 lg:px-3 lg:py-1 bg-nextpixel-light text-nextpixel-blue rounded-md lg:rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > techLimit && (
                        <span className="text-xs lg:text-sm px-2 py-0.5 text-nextpixel-gray">
                          +{project.technologies.length - techLimit}
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Project Button - larger on desktop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onProjectClick(project)
                    }}
                    className="w-full py-2.5 lg:py-3.5 text-sm lg:text-base font-medium text-white bg-nextpixel-blue hover:bg-nextpixel-dark rounded-lg lg:rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {viewProjectText} →
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots - right side, larger on desktop */}
      <div className="absolute right-3 md:right-6 lg:right-12 top-1/2 flex -translate-y-1/2 flex-col gap-2 lg:gap-3 z-10">
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
                ? "w-2.5 lg:w-3 h-7 lg:h-10 bg-nextpixel-blue"
                : "w-2.5 lg:w-3 h-2.5 lg:h-3 bg-nextpixel-gray/30 hover:bg-nextpixel-gray/50"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter - left side, larger on desktop */}
      <div className="absolute left-3 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl lg:text-5xl font-light text-nextpixel-dark tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-1.5 lg:my-3 h-px w-6 lg:w-10 bg-nextpixel-gray/30" />
          <span className="text-xs md:text-sm lg:text-lg text-nextpixel-gray tabular-nums">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
