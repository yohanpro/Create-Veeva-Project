import fs from 'fs';
import {
    DIRECTORIES
} from '../main';
import shell from 'shelljs';
import path from 'path';

//this function makes html and  css, js folder
export const inputAssets = async (options) => {
    shell.cd(DIRECTORIES.presentationDir);
    shell.ls(DIRECTORIES.presentationDir).forEach(el => {
        if (options.seperate) {
            const subPresentationDir = path.join(DIRECTORIES.presentationDir, el)
            shell.ls(subPresentationDir).forEach(slide => {
                const slidesDir = path.join(subPresentationDir, slide);
                shell.cd(slidesDir);
                fs.writeFileSync("index.html", makeHtml(slide), "utf8");
                shell.mkdir(['css', 'js']);
                shell.cd('css');
                fs.writeFileSync("styles.css", "", "utf8");
                shell.cd('..');
                shell.cd('js');
                fs.writeFileSync('local.js', "", 'utf8');
                shell.cd('../..')
            });
        } else {
            const slidesDir = path.join(DIRECTORIES.presentationDir, el);
            shell.cd(slidesDir);
            fs.writeFileSync("index.html", makeHtml(el), "utf8");
            shell.mkdir(['css', 'js']);
            shell.cd('css');
            fs.writeFileSync("styles.css", "", "utf8");
            shell.cd('..');
            shell.cd('js');
            fs.writeFileSync('local.js', "", 'utf8');
            shell.cd('..')
        }
    });
}

const makeCssJS = (seperate, el) => {
    const subPresentationDir = path.join(DIRECTORIES.presentationDir, el)
    shell.ls(subPresentationDir).forEach(slide => {
        console.log(`subPresentationDir :${subPresentationDir}`)
        //if main and Add is not seperated, slide Directory will be directly under the right below presentation.
        const slidesDir = seperate ? path.join(subPresentationDir, slide) : subPresentationDir
        shell.cd(slidesDir);
        fs.writeFileSync("index.html", makeHtml(slide), "utf8");
        shell.mkdir(['css', 'js']);
        shell.cd('css');
        fs.writeFileSync("styles.css", "", "utf8");
        shell.cd('..');
        shell.cd('js');
        fs.writeFileSync('local.js', "", 'utf8');
        shell.cd('../..')
    });
}
const makeHtml = slide => {
    let data = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="../shared/css/styles.css">
        <link rel="stylesheet" href="css/style.css">
        <title>${slide}</title>
    </head>
    
    <body>
        <div id="container">
        </div>
        <div>
            <img class="background" src="images/background.jpg" alt="">
        </div>
    
        <script src="../shared/js/jquery-3.1.0.min.js "></script>
        <script src="../shared/js/jquery-ui.js "></script>
        <script src="../shared/js/jquery.ui.touch-punch.js "></script>
        <script src="../shared/js/veeva-library.js "></script>
        <script src="../shared/js/fastclick.min.js"></script>
        <script src="../shared/js/hammer.min.js "></script>
        <script src="../shared/js/config.js"></script>
        <script src="../shared/js/mt.js "></script>
        <script src="../shared/js/presentation.js "></script>
        <script src="js/local.js "></script>
    </body>
    
    </html>`;
    return data;
};