module.exports = {
    mount: {
      public: '/',
      src: '/dist',
    },
    plugins: [
      '@snowpack/plugin-svelte',
      '@snowpack/plugin-dotenv',
      '@snowpack/plugin-sass'
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