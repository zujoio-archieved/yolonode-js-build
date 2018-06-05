const path = require('path');
const os = require('os');
const cvBuild = require('opencvnode-js-build');

const { isCPU } = require('./native');

const rootDir = __dirname;
const yoloRootDir = path.join(rootDir, 'darknet');
const yoloSrcDir = path.join(yoloRootDir, 'darknet');
const yoloBuildDir = path.join(yoloSrcDir, 'obj');
const yoloInclude = path.join(yoloSrcDir, 'include');
const yoloLibDir = yoloSrcDir;
const yoloRepo  ="https://github.com/pjreddie/darknet.git";
const yoloModules =[
    'darknet'
];

let replacementsMakeFile = [
    //OPENCV=0
    {
        original: "OPENCV=0",
        replace: "OPENCV=1"
    },
    // cv --libs
    {
        original: "`pkg-config --libs opencv`",
        replace: `-L${cvBuild.opencvLibDir} ${cvBuild.libs.map( lib => `-l${lib}` ).join(' ')}`
    },
    // cv --include
    {
        original: "`pkg-config --cflags opencv`",
        replace: `-I${cvBuild.opencvIncludeCC} -I${cvBuild.opencvInclude}`
    }
]

if(!isCPU()){
    //GPU
    replacementsMakeFile.push({
        original: "GPU=0",
        replace: "GPU=1"
    })
    //CUDNN
    replacementsMakeFile.push({
        original: "CUDNN=0",
        replace: "CUDNN=1"
    })
}

module.exports = {
    rootDir,
    yoloRootDir,
    yoloSrcDir,
    yoloBuildDir,
    yoloInclude,
    yoloLibDir,
    yoloRepo,
    numberOfCores: os.cpus().length,
    replacementsMakeFile,
    yoloModules
}