const { exec, execFile, spawn } = require('child_process');
const log = require('npmlog');

const packageJson = require('./package.json')

/**
 * execute native exec
 * @param {string} cmd 
 * @param {Object} opts 
 */
const exec_ = async (cmd, opts) => {
    log.silly("install", "executing", cmd);
    return new Promise((resolve, reject) => {
        exec(cmd, opts, (err, stdout, stderr) => {
            const err_ = err || stderr;
            if (err_) return reject(err_);
            return resolve(stdout);
        })
    })
}

/**
 * execute native execFile
 * @param {string} cmd 
 * @param {Array} args 
 * @param {Object} opts 
 */
const execFile_ = async (cmd, args, opts) => {
    log.silly("install", "executing", cmd, args);
    return new Promise((resolve, reject) => {
        const child_ = execFile(cmd, args, opts, (err, stdout, stderr) => {
            const err_ = err || stderr;
            if (err_) return reject(err_);
            return resolve(stdout);
        })
        child_.stdin.end()
    })
}

/**
 * executes native span command
 * @param {string} cmd 
 * @param {Array} args 
 * @param {object} opts 
 */
const spawn_ = async (cmd, args, opts) => {
    log.silly("install", "executing", cmd, args);
    return new Promise((resolve, reject) => {
        try {
            const stdioInherit = Object.assign({}, { stdio: 'inherit' }, opts);
            const child_ = spawn(cmd, args, stdioInherit);

            child_.on('exit', (code) => {
                const message = `child process exited with code: ${code.toString()}`;
                if (code !== 0) {
                    return reject(message);
                }
                return resolve(message);
            })
        } catch (err) {
            return reject(err);
        }
    });
}

/**
 * check whether user have defined to build on basis of GPU
 * default: CPU MODE
 */
const isCPU_ = () => {
    const isPackage = packageJson && packageJson.name;
    if(isPackage && packageJson.name == 'yolonode-js-build'){
        return 1
    }
    else if(isPackage && packageJson.name == 'yolonode-js-build-gpu') {
        return 0;
    }
    else{
        return 1;
    }
}

/**
 * check is target platefor is windows
 */
const isWindows_ = () => {
    return process.platform == 'win32';
}

/**
 * check is target platefor is osx
 */
const isOSX_ = () => {
    return process.platform == 'darwin';
}

/**
 * check is target platefor is linux
 */
const isUnix_ = () => {
    return !(isWindows_()) && !(isOSX_());
}

/**
 * check git installed
 */
const requireGit_ = async () => {
    const stdout = await exec_('git --version');
    log.silly('install', stdout);
    return stdout;
}
/**
 * check make installed
 */
const requireCmake_ = async () => {
    const stdout = await exec_('cmake --version');
    log.silly('install', stdout);
    return stdout;
}

/**
 * get command for making directory
 * @param {string} dirName 
 */
const getMakeDirCommand_ = (dirName) => {
    return `mkdir -p ${dirName}`;
}
/**
 * get command for remove directory
 * @param {string} dirName 
 */
const getRmDirCommand_ = (dirName) => {
    return `rm -rf ${dirName}`;
}

module.exports = {
    exec: exec_,
    execFile: execFile_,
    spawn: spawn_,

    isWindows:isWindows_,
    isOSX: isOSX_,
    isUnix: isUnix_,
    isCPU: isCPU_,

    requireGit: requireGit_,
    requireCmake: requireCmake_,

    getMakeDirCommand: getMakeDirCommand_,
    getRmDirCommand: getRmDirCommand_
}