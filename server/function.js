const fs = require('fs');
const path = require('path');

  function prependFolderNameToPictures(directory, folder) {
    const utilsDirectory = './utils'; 

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(fileName => {
            const filePath = path.join(directory, fileName);
            const newFileName = `${folder}_${fileName}`;
            const newFilePath = path.join(utilsDirectory, newFileName); 

            fs.rename(filePath, newFilePath, err => {
                if (err) {
                    console.error(`Error renaming file ${fileName}:`, err);
                    return;
                }

                console.log(`Moved and renamed ${fileName} to ${newFilePath}`);
            });
        });
    });
}




for(var i = 0 ;i < 61 ;i++)
prependFolderNameToPictures(__dirname+`/stickers/${i+1}`,i+1);
