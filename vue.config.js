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

  pwa: {
    name: 'Eschool',
    themeColor: '#027BE3',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: '#027BE3',
      icons: [
        {
         src: "img\/icons\/android-icon-36x36.png",
         sizes: "36x36",
         type: "image\/png",
         density: "0.75"
        },
        {
         src: "img\/icons\/android-icon-48x48.png",
         sizes: "48x48",
         type: "image\/png",
         density: "1.0"
        },
        {
         src: "img\/icons\/android-icon-72x72.png",
         sizes: "72x72",
         type: "image\/png",
         density: "1.5"
        },
        {
         src: "img\/icons\/android-icon-96x96.png",
         sizes: "96x96",
         type: "image\/png",
         density: "2.0"
        },
        {
         src: "img\/icons\/android-icon-144x144.png",
         sizes: "144x144",
         type: "image\/png",
         density: "3.0"
        },
        {
         src: "img\/icons\/android-icon-192x192.png",
         sizes: "192x192",
         type: "image\/png",
         density: "4.0"
        }
       ]
    }
  }
};
