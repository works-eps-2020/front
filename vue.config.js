module.exports = {
  lintOnSave: false,

  pluginOptions: {
    i18n: {
      enableInSFC: true,
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },

  transpileDependencies: [
    'quasar',
  ],
};
