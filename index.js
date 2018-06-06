
const { isCPU } = require('./native');
const opencvNodeJsBuild =  require(isCPU() ? 'opencvnode-js-build': 'opencvnode-js-build-gpu' );

const {
    rootDir,
    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,

    yoloInclude,
    yoloIncludeSrc,

    yoloLibDir,

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
    yoloModules,

    libs: yoloModules,

    isCPU: isCPU(),

    opencvNodeJsBuild: opencvNodeJsBuild
}