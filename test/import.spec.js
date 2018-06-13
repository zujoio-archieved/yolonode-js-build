const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const yoloNodeJSBuild = require('../index');

const indexZero = 0;

/**
 * check path is not undefined as well as actually exists,
 * @param {string} dirPath 
 */
const resolvePath = (dirPath) => {
    expect(dirPath).to.not.eql(undefined);
    const resolvedDirPath = path.resolve(dirPath);
    expect(resolvedDirPath).to.not.eql(undefined);
    expect(fs.existsSync(resolvedDirPath)).to.not.eql(undefined);
    expect(fs.existsSync(resolvedDirPath)).to.eql(true);
}

/**
 * check array defined and have elements
 * @param {Array} array 
 */
const checkArrayHaveEle = (array) => {
    expect(array).to.not.eql(undefined);
    expect(array).to.be.an('array');
    expect(array[indexZero]).to.not.eql(undefined);
}

describe('check CPU / GPU mode', () => {
    it('should have either CPU / GPU mode', () => {
        expect(yoloNodeJSBuild.isCPU).to.not.eql(undefined);
    })
})

describe('yolo import libs and includes', () => {
    it('should check rootDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.rootDir);
    });
    it('should check yoloRootDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloRootDir);
    });
    it('should check yoloSrcDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloSrcDir);
    });
    it('should check yoloBuildDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloBuildDir);
    });
    it('should check yoloInclude is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloInclude);
    });
    it('should check yoloIncludeSrc is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloIncludeSrc);
    });
    it('should check yoloLibDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloLibDir);
    });
    it('should check yoloLibDir is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloLibDir);
    });
    it('should check yoloData is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloData);
    });
    it('should check yoloExamples is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloExamples);
    });
    it('should check yoloCfg is not undefined.', () => {
        resolvePath(yoloNodeJSBuild.yoloCfg);
    });

    it('should check libs is not undefined and have element.', () => {
        checkArrayHaveEle(yoloNodeJSBuild.libs);
    });
});

if(yoloNodeJSBuild && yoloNodeJSBuild.isCPU){
    describe('cuda import libs and includes', () => {
        it('should check cudaInclude is not undefined.', () => {
            resolvePath(yoloNodeJSBuild.cudaInclude);
        });
        it('should check cudaTargetInclude is not undefined.', () => {
            resolvePath(yoloNodeJSBuild.cudaTargetInclude);
        });
        it('should check cudaLib is not undefined.', () => {
            resolvePath(yoloNodeJSBuild.cudaLib);
        });
        it('should check cudaTargetLib is not undefined.', () => {
            resolvePath(yoloNodeJSBuild.cudaTargetLib);
        });
    });
}