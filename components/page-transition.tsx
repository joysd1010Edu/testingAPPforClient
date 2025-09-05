"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Skip animation on first mount
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  // Simple side-to-side transition
  const variants = {
    hidden: {
      opacity: 0,
      x: pathname.includes("sell-multiple-items") ? 20 : -20,
      scale: 0.98,
    },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8, // Increased duration for slower animation
        ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier for smoother motion
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: pathname.includes("sell-multiple-items") ? -20 : 20,
      scale: 0.98,
      transition: {
        duration: 0.6, // Increased duration for slower animation
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial={isFirstMount ? "enter" : "hidden"}
      animate="enter"
      exit="exit"
      className="w-full h-full bg-background will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        transformOrigin: "center",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  )
}
