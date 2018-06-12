
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
    yoloModules,

    yoloData,
    yoloExamples,
    yoloCfg
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

    isCPU: isCPU(),

    yoloData,
    yoloExamples,
    yoloCfg
}