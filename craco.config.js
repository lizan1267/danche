const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f9c700' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
       [
         "import", 
         {
          "libraryName": "antd",  //哪个库
           "libraryDirectory": "es",  //哪个文件夹
            "style": true //设置为true即是less     "css"是css
          }
      ]
    ]
  },
};