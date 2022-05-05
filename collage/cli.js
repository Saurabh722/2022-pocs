#!/bin/bash node

const dist = './dist/img';
const fs = require('fs');
const fse = require('fs-extra');


function generateFixture(filePath, content) {
  fse.outputFile(filePath, content, err => {
      if(err) {
        console.log(err);
      }
  });
}

var imgs = [];

fs.readdir(dist, (err, files) => {
  files.forEach(name => {
    if(name.indexOf("DS_Store") == -1) imgs.push(`${name}`);
  });

  generateFixture("./dist/img.json", JSON.stringify(imgs));
});