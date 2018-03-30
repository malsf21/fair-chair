# Fair Chair

[![Travis Build Status](https://travis-ci.org/malsf21/fair-chair.svg?branch=master)](https://travis-ci.org/malsf21/fair-chair) [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/2q0ww0thsc2qlc3h?svg=true)](https://ci.appveyor.com/project/malsf21/fair-chair) [![GitHub Release](https://img.shields.io/github/release/malsf21/fair-chair.svg)](https://github.com/malsf21/fair-chair/releases)

> Making chairing Model UN conferences easy and fair

Fair Chair is a desktop app that's designed to make chairing easy and fair. At its core, it's just a glorified table, but the many subtle features it has makes it a prime choice for chairing. It features a robust list manager (saves the states of several lists automatically), coordinates the timer state with each individual list, and has many simple one-button interactions that make life easy.

From a technical perspective, Fair Chair is an [Electron](https://electronjs.org/) app that utilizes [Angular](https://angular.io) via [Electron Forge](https://electronforge.io), and also uses the [Materia Bootstrap Theme](https://bootswatch.com/materia/) and [Font Awesome](https://fontawesome.com/) to make things pretty.

## Development Setup

This project is an Angular 5 flavour of the [Electron Forge](https://github.com/electron-userland/electron-forge/) template - as such, you can use any of Electron Forge's default commands to run, build, and package the project.

First, install the Electron Forge CLI

```bash
$ npm install -g electron-forge
```

Then, clone this repo and install all the npm dependencies:

```bash
$ git clone https://github.com/malsf21/fair-chair.git
$ cd fair-chair
$ npm install
```

To simply start a local instance of the app, you can use the `electron-forge start` command. Note that I've disabled livereload for this app.

```bash
$ electron-forge start
```

To make a distributable for the current platform, you can use

```
$ electron-forge make
```

You can configure how make operates in the `package.json`, or check out the [documentation for the command](https://electronforge.io/cli/make).

## Continuous Integration and Deployment

Deploying an Electron app, especially to a production build, is an arduous task! To help us, I use two continuous integration services, [Travis](https://travis-ci.org) and [AppVeyor](https://appveyor.com). On every push to `master`, Travis and AppVeyor run `electron-forge make` on virtual machines (OSX and Windows respectively), to ensure that `master` has a working build. In addition, on every push to `stable`, Travis and AppVeyor also run `electron-forge publish`, which sends the distributables to GitHub. After I check them over, they get published.

This can be easily replicated in a fork of this repository - the default Travis and AppVeyor tasks work out of the box. However, to deploy to GitHub using Travis and AppVeyor, one needs to set the environment variable `GITHUB_TOKEN` to a valid [GitHub Personal Access Token](https://github.com/settings/tokens).

## Publishing to the Mac App Store

Publishing the app to the Mac App Store is another similarly arduous task. It requires enrollment in the [Apple Developer Program](https://developer.apple.com/programs/), which costs money, and also requires a special build of the application and specific certificates and other security information.

Firstly, we need to package the app in a different way.

```
$ electron-forge package --platform=mas 
```

More coming soon...

## Licensing and Credits

If you want to simply use this application, go on right ahead! It's free and open source, so you can use it for whatever you like. If you want to use it for your conference, I encourage you to do so!

This project is released under the MIT License, which means that you're allowed to do anything with this code (as long as you preserve the copyright and license information). I would greatly prefer if you gave me a shoutout as well, but it's not required. Ideally, it looks something like this:

> Fair Chair was a project originally created by Matthew Wang (@malsf21)/(https://matthewwang.me)
