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
      '/free-business-audit': 0.95,
      '/free-ai-audit': 0.95,
      '/contact': 0.9,
      '/services/ai-audit-implementation': 0.9,
      '/services/management-operations': 0.9,
      '/industries/ecommerce': 0.85,
      '/industries/education-businesses': 0.85,
      '/industries/service-businesses': 0.85,
      '/industries/retail-businesses': 0.85,
      '/business-consultancy-bangladesh': 0.9,
      '/business-consultant-dhaka': 0.9,
      '/about': 0.8,
      '/insights': 0.8,
      '/policies': 0.6,
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
