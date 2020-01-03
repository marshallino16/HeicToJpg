const path = require('path')
const fs = require('fs')

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    pwa: {
        name: 'heictojpg',
        themeColor: '#00B7FF',
        msTileColor: '#ffffff',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#EBB12B',
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            msTileImage: 'img/icons/ms-icon-144x144.png'
        },
        workboxOptions: {
            swSrc: 'src/registerServiceWorker.js'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: loadGlobalStyles()
            }
        }
    },
    filenameHashing: false,

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null,
        before: app => {
        }
    }
}

function loadGlobalStyles() {
    const variables = fs.readFileSync('src/style/_variables.scss', 'utf-8')
    const mixins = fs.readFileSync('src/style/mixins/_mixins.scss', 'utf-8')
    const style = fs.readFileSync('src/style/style.scss', 'utf-8')
    return variables + mixins + style
}
