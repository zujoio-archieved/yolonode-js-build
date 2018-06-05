const opencvNodeJsBuild = require('opencvnode-js-build');

const {
    rootDir,
    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,

    yoloInclude,

    yoloLibDir,

    yoloModules
} = require('./config');
const {
    isCPU
} = require('./native');

module.exports = {
    rootDir,
    yoloRootDir,
    yoloSrcDir,
    yoloBuildDir,
    yoloInclude,
    yoloLibDir,
    yoloModules,

    isCPU: isCPU(),

    opencvNodeJsBuild: opencvNodeJsBuild
}