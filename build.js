const { exec } = require('child_process');
const fs = require('fs-extra');
const archiver = require('archiver');

// Compile TypeScript
exec('tsc', (error, stdout, stderr) => {
  if (error) {
    console.error(`TypeScript compilation error: ${error}`);
    return;
  }
  console.log('TypeScript compiled successfully');

  // Copy HTML and CSS files
  fs.copy('./src', './build/src', err => {
    if (err) {
      console.error(`Error copying files: ${err}`);
    } else {
      console.log('Static files copied successfully');
      createZipFile();
    }
  });
});

function createZipFile() {
  const output = fs.createWriteStream('./lambda-function.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
  });

  output.on('close', function() {
    console.log(`Zip file created successfully. Total bytes: ${archive.pointer()}`);
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  // Add the contents of the build folder to the zip
  archive.directory('build/', false);

  archive.finalize();
}
