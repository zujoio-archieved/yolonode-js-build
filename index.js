
const { isCPU } = require('./native');
const cvBuild =  require(isCPU() ? 'opencvnode-js-build': 'opencvnode-js-build-gpu' );

const {
    rootDir,
    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,

    yoloInclude,

    yoloLibDir,

    yoloModules
} = require('./config');

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