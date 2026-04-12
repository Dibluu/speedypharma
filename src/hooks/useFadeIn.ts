import { useEffect } from 'react'

export function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (entry.target.classList.contains('reveal-stagger')) {
              entry.target.querySelectorAll('.reveal').forEach((child) => child.classList.add('visible'))
            }
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-in, .reveal, .reveal-left, .reveal-right, .reveal-stagger').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
