
const { isCPU } = require('./native');

const {
    rootDir,
    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,

    yoloInclude,
    yoloIncludeSrc,

    yoloLibDir,

    commonModules,
    yoloModules
} = require('./config');

module.exports = {
    rootDir,
    yoloRootDir,
    yoloSrcDir,
    yoloBuildDir,
    yoloInclude,
    yoloIncludeSrc,
    yoloLibDir,

    libs: (yoloModules && yoloModules.length ? yoloModules : [] ).concat(commonModules && commonModules.length ? commonModules : [] ),

    isCPU: isCPU()
}