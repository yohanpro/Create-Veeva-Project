import fs from 'fs';
import shell from 'shelljs';
import {
    DIRECTORIES
} from '../main';


export const makeShfilesJS = async options => {


    console.log(options.targetDirectory)
    shell.cd(options.targetDirectory);
    let shStr = "";
    let sh_thumb_str = "";

    if (options.seperate) {
        shStr = sh_zip_SeperateMainAndAdd;
        sh_thumb_str = sh_thumb_seperated;
    } else {
        shStr = sh_zip_Normal;
        sh_thumb_str = sh_thumb_normal;
    }
    const shZipFile = shZip(options, shStr);
    const shThumbFile = shThumb(options, sh_thumb_str);



    fs.writeFile("gen-zip.sh", shZipFile, "utf8", err => {});
    fs.writeFile("gen-thumb.sh", shThumbFile, "utf8", err => {});
}
const shThumb = (options, sh_thumb_str) => {
    let shThumbFile = `# Directory containing _MAIN and _ADD presentation folders
  # 처음 'sh gen-thumb.sh'를 실행하는 거라면, 'brew install imagemagick' 설치
  
  PROJECT=${options.targetDirectory}
  
  SCN_DIR=${options.targetDirectory}/screenshots
  
  # Generate thumb files for each slide in the presentation
  ${sh_thumb_str}
  `;
    return shThumbFile;
};
const shZip = (options, shStr) => {
    const shZipFile = `#!/bin/bash
  
  # Directory for generated zip files
  OUT_DIR=${options.targetDirectory}/dist
  
  # Directry containing _MAIN and _ADD presentation folders
  PROJECT=${options.targetDirectory}/${options.presentation}
  
  # Directory to common shared
  SHARED_DIR=${options.targetDirectory}/shared
  
  # Shared file name specific to the project
  SHARED=${options.presentation}_Shared
  
  # Clean up old files inside output directory
  cd $OUT_DIR
  rm -r *
  
  # Generate zip file for shared resources
  cd $SHARED_DIR
  zip -r $OUT_DIR/$SHARED.zip . -x .DS_Store
  
  # Generate zip files for each slide in the presentation
  ${shStr}
  
  `;
    return shZipFile;
};
let sh_thumb_seperated = `
cd $PROJECT
for presentation in $(ls); do
  cd $presentation
  for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.png -thumbnail 200x150! -strip thumb.png
      cd ..
    fi
  done
  cd ..
done
`;

let sh_thumb_normal = `
cd $PROJECT
for slide in $(ls); do
    if [ $slide != "shared" ]; then
      cd $slide
      convert $SCN_DIR/$slide.png -thumbnail 200x150! -strip thumb.png
      cd ..
    fi
done
`;


let sh_zip_SeperateMainAndAdd = `
cd $PROJECT
for presentation in $(ls); do
  cd $presentation
  for slide in $(ls); do
    cd $slide
    zip -r $OUT_DIR/$slide.zip . -x .DS_Store
    cd ..
  done
  cd ..
done
`;

let sh_zip_Normal = `
cd $PROJECT
for slide in $(ls); do
  cd $slide
  zip -r $OUT_DIR/$slide.zip . -x .DS_Store
  cd ..
done
`;