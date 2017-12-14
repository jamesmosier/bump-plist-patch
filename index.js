#!/usr/bin/env node

const semver = require('semver');
const plist = require('simple-plist');
const { exec } = require('child_process');

const VERSION_KEY = 'CFBundleShortVersionString';
const FILE_LOCATION = './Info.plist';

const data = plist.readFileSync(FILE_LOCATION);
const incrementedVersion = semver.inc(data[VERSION_KEY], 'patch');


exec(`plutil -replace CFBundleShortVersionString -string "${incrementedVersion}" ${FILE_LOCATION}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Updated your plist to version ${incrementedVersion}`)
});
