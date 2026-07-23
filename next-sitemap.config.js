/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zaserandco.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/contact': 0.9,
      '/about': 0.8,
      '/insights': 0.8,
      '/breakpoint': 0.7,
      '/stockpulse': 0.7,
    }

    const freq = path.startsWith('/insights/') ? 'monthly' : 'weekly'

    return {
      loc: path,
      changefreq: freq,
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    }
  },
}
