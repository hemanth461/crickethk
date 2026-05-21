import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'zdr2k84w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-05-21',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return ''
  return builder.image(source)
}
