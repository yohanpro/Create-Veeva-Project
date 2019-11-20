import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import { DIRECTORIES } from './main';
import shell from 'shelljs';

export const makeRootFolder = async () => {
	fs.mkdirSync(DIRECTORIES.presentationDir);
	console.log(`%s Process.cwd() : ${process.cwd()}`, chalk.redBright.bold('hihihi'));
	return;
};

export const makeSubPresnetationFolder = async (options) => {
	if (!options.seperate) {
		return;
	}
	shell.cd(DIRECTORIES.presentationDir);
	shell.mkdir([ `${options.presentation}_MAIN`, `${options.presentation}_ADD` ]);
};

export const makeSlides = async (options) => {};
