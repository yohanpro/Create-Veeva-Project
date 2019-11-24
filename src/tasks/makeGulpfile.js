import fs from 'fs';
import shell from 'shelljs';
import {
  DIRECTORIES
} from '../main';

export const makeGulpfileJs = async options => {
  const gulpfile = `
/**********************************************************/
/* gulp task */
/**********************************************************/
/* File version              1.0                      */
/* Last modified            2019/11/21                   */
/* Last modified by          yohan                         */
/**********************************************************/

const gulp = require('gulp'),
  shell = require("shelljs");
const {
  watch
} = require('gulp');
const path = require('path');
const baseDir = path.resolve(process.cwd());

const rootFolder = path.join(baseDir, ${options.presentation})

//gulp로 shared파일 자동 생성

gulp.task("watch", function () {
    watch(baseDir + "/shared/**/*", gulp.series("gen-shared", done => done()));
});

gulp.task("gen-shared", function(done) {
  shell.ls(rootFolder).forEach(presentation => {
    shell.cd(rootFolder);
    shell.cp("-Rf", baseDir + "/shared", presentation);
  });
  done();
});
gulp.task("default", gulp.series("gen-shared"));
`;
  shell.cd(DIRECTORIES.rootDir);
  fs.writeFileSync('gulpfile.js', gulpfile, 'utf8', err => console.log(err))
}

const getPresentation = (options) => {
  let presentation = [];
  if (options.seperate) {
    presentation.push(`${options.presentation}_MAIN`)
    presentation.push(`${options.presentation}_ADD`)
  } else {
    presentation.push(`${options.presentation}`)
  }
  presentation = presentation.map(el => {
    el = `'${el}'`;
    return el
  });
  console.log(presentation)
  return presentation;
}