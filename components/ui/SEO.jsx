'use client'

import { useEffect } from 'react'

/**
 * Componente SEO para páginas con metadata dinámico (ej: artículos del blog)
 * En Next.js el metadata estático se maneja en page.js con `export const metadata`
 * Este componente es para cuando el título/descripción cambian dinámicamente en el cliente
 */
const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  articlePublishedTime,
  articleAuthor 
}) => {
  useEffect(() => {
    // Actualizar título dinámicamente
    if (title) {
      document.title = title
    }

    // Actualizar meta tags dinámicamente
    const updateMeta = (name, content) => {
      if (!content) return
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`)
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('article:')) {
          element.setAttribute('property', name)
        } else {
          element.setAttribute('name', name)
        }
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    updateMeta('description', description)
    updateMeta('keywords', keywords)
    updateMeta('og:title', title)
    updateMeta('og:description', description)
    updateMeta('og:image', ogImage)
    updateMeta('og:type', ogType)
    if (articlePublishedTime) updateMeta('article:published_time', articlePublishedTime)
    if (articleAuthor) updateMeta('article:author', articleAuthor)

  }, [title, description, keywords, ogImage, ogType, articlePublishedTime, articleAuthor])

  return null
}

export default SEO
