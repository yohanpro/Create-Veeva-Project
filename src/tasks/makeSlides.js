import {
    DIRECTORIES
} from '../main';
import shell from 'shelljs';
import path from 'path';


/*
 1. options에 있는 슬라이드 개수를 가져온다.
2. main과 Add가 나누어져 있는지 확인한다.
3. main과 ADD가 나누어져 있을 경우 
 - 
4. 나누어져 있지 않을 경우 
- 
5. 
6. 슬라이드를 만들어준다.개수에 맞게끔..
*/
export const makeSlides = async (options) => {
    if (options.seperate) {
        DIRECTORIES = {
            ...DIRECTORIES,
            pres_MAIN_Dir: path.join(DIRECTORIES.presentationDir, `${options.presentation}_MAIN`),
            pres_ADD_Dir: path.join(DIRECTORIES.presentationDir, `${options.presentation}_ADD`)
        }
    }
    await makeRefAndPI(options);
    await makeSlidesFolders(options);
};


const makeRefAndPI = async options => {

    if (options.seperate) {
        shell.cd(DIRECTORIES.pres_ADD_Dir);
    } else {
        shell.cd(DIRECTORIES.presentationDir);
    }
    shell.mkdir([`${options.presentation}_REFS`, `${options.presentation}_PI`])
    shell.cd('..');
    return;
}

const makeSlidesFolders = async (options) => {
    const numOfSlideCount = options.slide;
    if (options.seperate) {
        shell.cd(DIRECTORIES.pres_MAIN_Dir);
    } else {
        shell.cd(DIRECTORIES.presentationDir);
    }
    // I didn't consider slides more than 999. if larger than that, that means your project is insane.
    for (let i = 0; i < numOfSlideCount; i++) {
        let name = "";
        if (i < 10) {
            name = "00" + i;
        } else if (i >= 10 && i < 100) {
            name = "0" + i;
        } else if (i > 100) {
            name = +i;
        }
        shell.mkdir(`${options.presentation}_${name}`);
    }
}