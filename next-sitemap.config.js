/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.tiqora.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  
  // Exclude dynamic routes that shouldn't be in sitemap
  exclude: [
    '/[slug]', // Exclude subdomain routing
    '/track/*',
    '/upload/*',
    '/api/*',
    '/error',
  ],
  
  // Additional paths to include in sitemap (only main domain pages)
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/privacy-policy'),
    await config.transform(config, '/terms'),
    await config.transform(config, '/data-deletion'),
    await config.transform(config, '/help'),
  ],
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/track/',
          '/upload/',
          '/error',
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.tiqora.in/sitemap.xml',
    ],
  },
  
  // Transform function to customize URLs
  transform: async (config, path) => {
    // Skip all dynamic routes with parameters
    if (path.includes('[') && path.includes(']')) {
      return null;
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
