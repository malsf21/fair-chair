# Fair Chair

[![Travis Build Status](https://travis-ci.org/malsf21/fair-chair.svg?branch=master)](https://travis-ci.org/malsf21/fair-chair) [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/2q0ww0thsc2qlc3h?svg=true)](https://ci.appveyor.com/project/malsf21/fair-chair) [![GitHub Release](https://img.shields.io/github/release/malsf21/fair-chair.svg)](https://github.com/malsf21/fair-chair/releases)

> Making chairing Model UN conferences easy and fair

**NOTE: FAIR CHAIR IS UNDERGOING A HEAVY REWRITE**

Fair Chair is a desktop app that's designed to help chairs keep track of their committee, with a speaker timer, speaker list, and committee notes section. The goal of this app is to be projected on a screen, so all the delegates in the conference can always see what's happening.

This README will be updated as more of the app is rewritten. You can download previous versions in the Releases section.

## Quick Dev Notes

This project was created with [Electron Forge](https://github.com/electron-userland/electron-forge/), but was heavily modified - now it uses Angular 5. In order to run, deploy, and publish the project however, the tooling is the same.

To run:

```
electron-forge start
```

To make distributables:

```
electron-forge make
```

Currently, the app isn't configured properly for release, but it will be by our 1.0.0.

## Credits

Fair Chair was made by Matthew Wang (@malsf21) for the [Ontario Model United Nations Conference](https://omun.ca).
