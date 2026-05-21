import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'zdr2k84w',
  dataset: 'production',
  useCdn: true, // Use CDN cache for fast response times and higher traffic capacity
  apiVersion: '2026-05-21',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return ''
  return builder.image(source)
}
