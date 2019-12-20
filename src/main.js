import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import execa from 'execa';
import Listr from 'listr';
import {
	projectInstall
} from 'pkg-install';
import {
	promisify
} from 'util';
import * as makeFolder from './tasks/makeFolder';
import {
	makeSlides
} from './tasks/makeSlides';
import {
	makeGulpfileJs
} from './tasks/makeGulpfile';
import {
	inputAssets
} from './tasks/inputAssets';
import {
	makeSharedJS
} from './tasks/makeSharedJs';
import {
	makeShfilesJS
} from './tasks/makeShfile';
import {
	makeCSVFile
} from './tasks/makeCSVFile';
const access = promisify(fs.access);
const copy = promisify(ncp);

export let DIRECTORIES = {
	rootDir: '',
	presentationDir: ''
};


const initGit = async options => {
	const result = await execa('git', ['init'], {
		cwd: options.targetDirectory,
	});
	if (result.failed) {
		return Promise.reject(new Error('Faild to initalize Git'))
	}
	return;
}

const copyGeneralFile = async options => {
	return copy(options.templateDirectory, options.targetDirectory);
}

//make main createProject
export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}/${options.rootFolder}`
	};

	const currentUrl = `${process.cwd()}/${options.rootFolder}`;
	const currentFileUrl =
		import.meta.url; // file:///Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
	const templateDir = path.resolve(
		new URL(currentFileUrl).pathname, // /Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
		'../../templates'
	);
	options.templateDirectory = templateDir;
	try {
		await access(currentUrl, fs.constants.R_OK);
	} catch (err) {
		if (err.code === 'EEXIST') {
			console.log('%s Project is already exist or Duplicate', chalk.red.bold('ERROR'));
			process.exit(1);
		}
	}
	fs.mkdirSync(currentUrl);
	DIRECTORIES = {
		rootDir: `${process.cwd()}/${options.rootFolder}`,
		presentationDir: `${process.cwd()}/${options.rootFolder}/${options.presentation}`
	};

	const tasks = new Listr([{
			title: 'Make Root Folder & Sub presentation Folder',
			task: () => {
				makeFolder.makeRootFolder(options);
				makeFolder.makeSubPresnetationFolder(options)
			}
		},
		{
			title: "Copy General files",
			task: () => copyGeneralFile(options),
		},
		{
			title: "Make Gulpfile.js",
			task: () => makeGulpfileJs(options),
		},
		{
			title: "Make Slides Folders",
			task: () => makeSlides(options),
		},
		{
			title: "Input Assets(Html, Css, Js basic setting)",
			task: () => inputAssets(options),
		},
		{
			title: "Make shared folder inside js, ex)config.js, mt.js)",
			task: () => makeSharedJS(options),
		},
		{
			title: "Make sh files",
			task: () => makeShfilesJS(options)
		},
		{
			title: "Make a CSV file",
			task: () => makeCSVFile(options)
		},
		{
			title: 'Initalize git',
			task: () => initGit(options),
		}, {
			title: 'Install dependencies',
			task: () => projectInstall({
				cwd: options.targetDirectory
			}),
			skip: () => !options.runInstall ? 'Pass -- install to automatically install dependencies' : undefined
		},
	])

	await tasks.run();
	console.log('%s Project ready', chalk.greenBright.bold('Done'));
	return true;
}