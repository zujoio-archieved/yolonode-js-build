const log = require('npmlog')
const fs = require('fs');

const {
    exec,
    spawn,

    getMakeDirCommand,
    getRmDirCommand,

    isCPU
} = require('./native');
const {
    rootDir,
    yoloRootDir,
    yoloSrcDir,

    yoloBuildDir,
    
    yoloInclude,

    yoloLibDir,

    yoloRepo,

    numberOfCores,

    replacementsMakeFile
} = require('./config');

const modifyMakeFile = async () => {
    const makeFileConfigPath = `${yoloSrcDir}/Makefile`;
    try {
        let makeFile = fs.readFileSync(makeFileConfigPath, 'utf8');
        replacementsMakeFile.forEach(config => {
                makeFile = makeFile.replace(`${config.original}`, `${config.replace}`);
        })
        fs.writeFileSync(makeFileConfigPath, makeFile, 'utf8');
        return;
    }
    catch (err) {
        throw err;
    }
}

const build = async () => {

    log.silly('install', 'installing yolo');
 
    if (!fs.existsSync(yoloRootDir)) {
        await exec(getMakeDirCommand('darknet'), { cwd: rootDir });
    }
  
    if (!fs.existsSync(yoloSrcDir)) {
        await exec(getRmDirCommand('darknet'), { cwd: yoloRootDir });
        await spawn('git', ['clone', '--progress', yoloRepo], { cwd: yoloRootDir });
    }

    await modifyMakeFile();

    await spawn('make', [`-j${numberOfCores}`], { cwd: yoloSrcDir });
}

module.exports = {
    build: build
}