const path = require('path');
const os = require('os');
const { isCPU } = require('./native');

// common modules required for compiling yolo
const commonModules = [
    'm',
    'pthread',
    'stdc++'
]

const rootDir = __dirname;
const yoloRootDir = path.join(rootDir, 'darknet');
const yoloSrcDir = path.join(yoloRootDir, 'darknet');
const yoloBuildDir = path.join(yoloSrcDir, 'obj');
const yoloInclude = path.join(yoloSrcDir, 'include');
const yoloIncludeSrc = path.join(yoloSrcDir, 'src');
const yoloLibDir = yoloSrcDir;
const yoloRepo  ="https://github.com/pjreddie/darknet.git";
const yoloModules =[
    'darknet'
];

let replacementsMakeFile = []

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
    yoloIncludeSrc,
    yoloLibDir,
    yoloRepo,
    numberOfCores: os.cpus().length,
    replacementsMakeFile,
    commonModules,
    yoloModules
}