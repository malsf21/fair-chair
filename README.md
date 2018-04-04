# Fair Chair

[![Travis Build Status](https://travis-ci.org/malsf21/fair-chair.svg?branch=master)](https://travis-ci.org/malsf21/fair-chair) [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/2q0ww0thsc2qlc3h?svg=true)](https://ci.appveyor.com/project/malsf21/fair-chair) [![GitHub Release](https://img.shields.io/github/release/malsf21/fair-chair.svg)](https://github.com/malsf21/fair-chair/releases)
[![iTunes App Store Link](https://img.shields.io/itunes/v/1365686846.svg)](https://itunes.apple.com/us/app/fair-chair/id1365686846)

> Making chairing Model UN conferences easy and fair

Fair Chair is a desktop app that's designed to make chairing easy and fair. At its core, it's just a glorified table, but the many subtle features it has makes it a prime choice for chairing. It features a robust list manager (saves the states of several lists automatically), coordinates the timer state with each individual list, and has many simple one-button interactions that make life easy.

You can download it from [the website](https://malsf21.github.io/fair-chair/) or from the [Mac App Store](https://itunes.apple.com/us/app/fair-chair/id1365686846).

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

Publishing the app to the Mac App Store is another similarly arduous task. It requires enrollment in the [Apple Developer Program](https://developer.apple.com/programs/), which costs money, and also requires a special build of the application and specific certificates and other security information. The rest of these instructions assume that you have a valid Apple Developer Account, as well as a computer running on OSX (required to make OSX apps).

Before we start publishing our app, we need to make a few things on the Apple Developer Account portal. Register your device, make an macOS App ID for your app, make two certificates (one for Mac App Distribution and the other for Mac Installer Distribution), and a MAS distribution provisioning profile. After that, head to iTunes Connect, and make an app for Fair Chair.

Now, to the command line! To prepare our app for the Mac App Store (MAS), we firstly need to package the app in a different way.

```
$ electron-forge package --platform=mas
```

Currently, there's a weird bug that I'm encountering with my build where the generated `.app` has a library that it shouldn't have. Once you've packaged it, right-click on the app and click "Show Package Contents", then navigate to `Contents/Resources/app/node_modules/electron` and delete the `dist` folder. Without doing it, the rest of the steps won't work.

After that, we need to sign the package. I prefer to use `electron-osx-sign`, which you can install using

```
$ npm install -g electron-osx-sign
```

Before we sign the package, we need to put our provisioning profile in the top-level directory of the app (in the `fair-chair` folder), and make a `entitlements.plist`. You can do the former from the Apple Developer Account portal, and the later by copying `entitlements.sample.plist` to `entitlements.plist` and filling TeamId and AppBundleId with their respective values (again, found in the Apple Developer Account portal).

Once we've done that, let's sign the package.

```
$ electron-osx-sign "/path/to/fair-chair/out/Fair Chair-mas-x64/Fair Chair.app" --platform=mas --type=distribution --identity="3rd Party Mac Developer Application: YOUR INFORMATION HERE" --entitlements="/path/to/fair-chair/entitlements.plist"
```

Remember to list the correct information for the keychain identity, which you can find on the Apple Eveloper Account portal.

You can verify the signing using Apple's `codesign` tool:

```
$ codesign --verify -vvvv "out/Fair Chair-mas-x64/Fair Chair.app"
```

Next, let's flatten our app, using `electron-osx-flat`, which is part of `electron-osx-sign`:

```
$ electron-osx-flat "out/Fair Chair-mas-x64/Fair Chair.app" --identity="3rd Party Mac Developer Installer: YOUR INFORMATION HERE"
```

This should create a `.pkg` file. Open Application Loader, target the `.pkg`, and you're good to go! After a long uploading process, your app should successfully appear under builds in iTunes Connect.

**Note: every time you submit another build of the same version, be sure to change the "buildVersion" property in the package.json - if you don't, the build won't upload properly!**

## Licensing and Credits

*All credit for the dependencies that Fair Chair was built on go to their developers. The Fair Chair icon was taken from [this SVGRepo page](https://www.svgrepo.com/svg/60798/gavel) under the NonCommercial Creative Commons License.*

If you want to simply use this application, go on right ahead! It's free and open source, so you can use it for whatever you like. If you want to use it for your conference, I encourage you to do so!

This project is released under the MIT License, which means that you're allowed to do anything with this code (as long as you preserve the copyright and license information). I would greatly prefer if you gave me a shoutout as well, but it's not required. Ideally, it looks something like this:

> Fair Chair was a project originally created by Matthew Wang (@malsf21)/(https://matthewwang.me)
