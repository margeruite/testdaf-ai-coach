/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'placeholder',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'placeholder',
    GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY || 'placeholder',
  },
}

module.exports = nextConfig