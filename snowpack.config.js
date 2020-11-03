module.exports = {
    mount: {
      public: '/',
      src: '/_dist_',
    },
    plugins: [
      '@snowpack/plugin-svelte',
      '@snowpack/plugin-dotenv',
      [
        '@snowpack/plugin-run-script',
        {cmd: 'svelte-check --output human', watch: '$1 --watch', output: 'stream'},
      ],
      '@snowpack/plugin-sass',
      '@snowpack/plugin-webpack'
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