import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {
	promisify
} from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

// async function copyTemplateFiles(options) {
//   return copy(options.templateDirectory, options.targetDirectory);
// }

// export async function createProject(options) {
//   options = {
//     ...options,
//     targetDirectory: options.targetDirectory || process.cwd()
//   };

//   const currentFileUrl =
//     import.meta.url; // file:///Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
//   const templateDir = path.resolve(
//     new URL(currentFileUrl).pathname, // /Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/src/main.js
//     '../../templates'
//   );
//   options.templateDirectory = templateDir; // /Users/gim-yohan/Projects/Veeva_CLM-boilerplate_3.0/templates/yohan
//   console.log(`currentFileUrl : ${currentFileUrl}`);
//   console.log(`new URL  : ${new URL(currentFileUrl).pathname}`);
//   console.log(`templateDir  : ${templateDir}`);
//   try {
//     await access(templateDir, fs.constants.R_OK);
//   } catch (err) {
//     console.error('%s Invalid template name', chalk.red.bold('ERROR'));
//     process.exit(1);
//   }

//   console.log('Copy project files');
//   await copyTemplateFiles(options);

//   console.log('%s Project ready', chalk.green.bold('DONE'));
//   return true;
// }

async function copyTemplateFiles(options) {
	return copy(options.templateDirectory, options.targetDirectory);
}
export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
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
	await copyTemplateFiles(options);
	console.log('%s Project ready', chalk.green.bold('DONE'));
}