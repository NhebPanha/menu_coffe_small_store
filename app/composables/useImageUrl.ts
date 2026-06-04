import { useRuntimeConfig } from '#imports'

export const useImageUrl = () => {
  const config = useRuntimeConfig()
  
  const resolveImageUrl = (path?: string) => {
    if (!path) return ''
    
    // If it's already a full network URL or base64 data, return as-is
    if (
      path.startsWith('http://') || 
      path.startsWith('https://') || 
      path.startsWith('data:') ||
      path.startsWith('//')
    ) {
      return path
    }
    
    // Resolve local path relative to Nuxt baseURL
    const base = config.app.baseURL || '/'
    const cleanBase = base.endsWith('/') ? base : `${base}/`
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    
    return `${cleanBase}${cleanPath}`
  }

  return {
    resolveImageUrl
  }
}
