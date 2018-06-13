
const { 
    isCPU,
    isUnix 
} = require('./native');

const {
    rootDir,

    commonModules,

    cudaModules,
    cudaInclude,
    cudaTargetInclude,
    cudaLib,
    cudaTargetLib,

    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,

    yoloInclude,
    yoloIncludeSrc,

    yoloLibDir,

    yoloModules,

    yoloData,
    yoloExamples,
    yoloCfg
} = require('./config');

let libs = (yoloModules && yoloModules.length ? yoloModules : [] )
            .concat(commonModules && commonModules.length ? commonModules : [] )
            .concat(cudaModules && cudaModules.length && !isCPU() ? cudaModules : [] )

module.exports = {
    rootDir,

    cudaInclude,
    cudaTargetInclude,
    cudaLib,
    cudaTargetLib,

    yoloRootDir,
    yoloSrcDir,
    yoloBuildDir,
    yoloInclude,
    yoloIncludeSrc,
    yoloLibDir,

    libs: libs,

    isCPU: isCPU(),

    yoloData,
    yoloExamples,
    yoloCfg
}