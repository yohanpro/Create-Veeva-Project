import {
	DIRECTORIES
} from '../main';
import shell from 'shelljs';

export const makeRootFolder = async (options) => {
	shell.cd(DIRECTORIES.rootDir);
	shell.mkdir(options.presentation)
	return;
};

export const makeSubPresnetationFolder = async (options) => {
	if (!options.seperate) {
		return;
	}
	shell.cd(DIRECTORIES.presentationDir);
	shell.mkdir([`${options.presentation}_MAIN`, `${options.presentation}_ADD`]);
};