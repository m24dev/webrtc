module.exports = {
    mount: {
      public: '/',
      src: '/dist',
    },
    plugins: [
      '@snowpack/plugin-svelte',
      '@snowpack/plugin-dotenv',
      '@snowpack/plugin-sass',
      ["@snowpack/plugin-webpack", {/* ... */}]
    ],
    install: [
      /* ... */
    ],
    installOptions: {
      /* ... */
    },
    devOptions: {
      /* ... */
    },
    buildOptions: {
      out: 'docs',
      clean: true
    },
    proxy: {
      /* ... */
    },
    alias: {
      /* ... */
    },
};