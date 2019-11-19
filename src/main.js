import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {
	promisify
} from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

let DIRECTORIES = {
	rootDir: '',
	presentationDir: ''
};

async function copyTemplateFiles(options) {
	fs.mkdirSync(DIRECTORIES.presentationDir)
	copy(options.templateDirectory, DIRECTORIES.rootDir);
	return;
}
export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}/${options.template}`
	};
	const currentUrl = `${process.cwd()}/${options.template}`;
	const currentFileUrl =
		import.meta.url; // file:///Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
	const templateDir = path.resolve(
		new URL(currentFileUrl).pathname, // /Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
		'../../templates'
	);
	options.templateDirectory = templateDir;
	try {
		fs.mkdirSync(currentUrl);
	} catch (err) {
		if (err.code === 'EEXIST') {
			console.log('%s Project is already exist or Duplicate', chalk.red.bold('ERROR'));
			process.exit(1);
		}
	}
	DIRECTORIES = {
		rootDir: `${process.cwd()}/${options.template}`,
		presentationDir: `${process.cwd()}/${options.template}/${options.presentation}`
	}
	await copyTemplateFiles(options);
	console.log('%s Project ready', chalk.green.bold('DONE'));
}