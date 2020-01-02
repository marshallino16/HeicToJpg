module.exports = {
    getImageDimensions(file) {
        return new Promise(function (resolved, rejected) {
            let i = new Image();
            i.onload = function () {
                resolved({w: i.width, h: i.height})
            };
            i.src = file
        })
    }
};