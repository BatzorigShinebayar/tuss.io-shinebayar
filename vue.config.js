module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    // proxy:'https://api.nytimes.com'
    proxy: {
      '/rss': {
        target: 'https://ikon.mn/rss',
        pathRewrite: { '^/rss': '' },
      },
      '': {
        target: 'https://api.nytimes.com',
      },
    },
  },
  pages: {
    index: {
      entry: './src/main.js',
      title: 'TUSS D+',
    },
  },
};
