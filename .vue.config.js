const path = require('path')

process.env.VUE_APP_VERSION = process.env.npm_package_version

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/app.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Where is Zaq?',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  // devServer: {
  //   proxy: {
  //     '^/socket.io': {
  //       target: 'https://localhost:13230',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/_mixins.scss')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        // options.compilerOptions.preserveWhitespace = true
        options.compilerOptions.whitespace = 'preserve'
        return options
      })
  }
}
