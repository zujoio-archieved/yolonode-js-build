const path = require('path');
const os = require('os');
const { isCPU } = require('./native');

// common modules required for compiling yolo
const commonModules = [
    'm',
    'pthread',
    'stdc++'
]

const cudaModules = [
    "cuda",
    "cudart",
    "cublas", 
    "curand"
]
const cudaInclude = "/usr/local/cuda/include";
const cudaTargetInclude = "/usr/local/cuda/targets/x86_64-linux/include";
const cudaLib = "/usr/local/cuda/lib64";
const cudaTargetLib = "/usr/local/cuda/targets/x86_64-linux/lib";

const rootDir = __dirname;
const yoloRootDir = path.join(rootDir, 'darknet');
const yoloSrcDir = path.join(yoloRootDir, 'darknet');
const yoloBuildDir = path.join(yoloSrcDir, 'obj');
const yoloInclude = path.join(yoloSrcDir, 'include');
const yoloIncludeSrc = path.join(yoloSrcDir, 'src');
const yoloData = path.join(yoloSrcDir, 'data');
const yoloExamples = path.join(yoloSrcDir, 'examples');
const yoloCfg = path.join(yoloSrcDir, 'cfg');
const yoloLibDir = yoloSrcDir;
const yoloRepo  ="https://github.com/pjreddie/darknet.git";
const yoloModules =[
    'darknet'
];

let replacementsMakeFile = [
    //OPENMP
    {
        original: "OPENMP=0",
        replace: "OPENMP=1"
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
    // ARCHITECTURE
    replacementsMakeFile.push({
        original: "# ARCH= -gencode arch=compute_52,code=compute_52",
        replace: "ARCH= -gencode arch=compute_37,code=[sm_37]"
    })
}

module.exports = {
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
    yoloRepo,
    numberOfCores: os.cpus().length,
    replacementsMakeFile,
    yoloModules,

    yoloData,
    yoloExamples,
    yoloCfg
}