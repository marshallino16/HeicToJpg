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
    filenameHashing: false
}

function loadGlobalStyles() {
    const variables = fs.readFileSync('src/style/_variables.scss', 'utf-8')
    const mixins = fs.readFileSync('src/style/mixins/_mixins.scss', 'utf-8')
    const style = fs.readFileSync('src/style/style.scss', 'utf-8')
    return variables + mixins + style
}
