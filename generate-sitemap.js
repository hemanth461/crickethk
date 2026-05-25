import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: 'zdr2k84w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-05-21',
})

async function generate() {
  try {
    console.log('Generating sitemap...')
    
    // Fetch dynamic posts from Sanity
    const query = `*[_type == "post" && defined(slug.current)] { slug }`
    const posts = await client.fetch(query)
    
    const domain = 'https://crickethk.vercel.app'
    
    // Define static pages
    const staticPages = [
      '',
      '/squad',
      '/trade-rumors',
      '/category/ipl-news',
      '/category/international-cricket',
      '/category/injury-news',
      '/category/squad-news'
    ]
    
    // Build sitemap items
    const urls = []
    
    // Add static pages
    staticPages.forEach(p => {
      urls.push(`${domain}${p}`)
    })
    
    // Add dynamic article pages
    posts.forEach(post => {
      if (post.slug && post.slug.current) {
        urls.push(`${domain}/news/${post.slug.current}`)
      }
    })
    
    // Format XML string
    const xmlItems = urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === domain ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`

    // Ensure directory paths exist and write file
    const publicPath = path.join(__dirname, 'public', 'sitemap.xml')
    const distPath = path.join(__dirname, 'dist', 'sitemap.xml')
    
    fs.writeFileSync(publicPath, xml)
    console.log(`Sitemap written to public/sitemap.xml`)
    
    // Also write directly to dist folder if it exists (so it is copied immediately on build)
    if (fs.existsSync(path.join(__dirname, 'dist'))) {
      fs.writeFileSync(distPath, xml)
      console.log(`Sitemap written to dist/sitemap.xml`)
    }
    
    console.log('Sitemap generated successfully!')
  } catch (e) {
    console.error('Error generating sitemap:', e)
    process.exit(1)
  }
}

generate()
