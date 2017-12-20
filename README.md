# Fair Chair

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9fad262a10054de880457f8757d74c14)](https://www.codacy.com/app/malsf21/fair-chair?utm_source=github.com&utm_medium=referral&utm_content=malsf21/fair-chair&utm_campaign=badger)
[![Build Status](https://travis-ci.org/malsf21/fair-chair.svg?branch=master)](https://travis-ci.org/malsf21/fair-chair)
[![GitHub Release](https://img.shields.io/github/release/malsf21/fair-chair.svg)](https://github.com/malsf21/fair-chair/releases)

> Making chairing Model UN conferences easy and fair

**NOTE: FAIR CHAIR IS UNDERGOING A HEAVY REWRITE**

Fair Chair is a desktop app that's designed to help chairs keep track of their committee, with a speaker timer, speaker list, and committee notes section. The goal of this app is to be projected on a screen, so all the delegates in the conference can always see what's happening.

*Note: If you want to use this for your conference, that's fine. But, please don't remove my name, or any parts of the bottom footer, from the app. Thanks!*

## Installation

Visit the [releases page](https://github.com/malsf21/fair-chair/releases) and download the `.zip` for your Operating System. Right now, Fair Chair is available for OSX and Linux.

## Tech Specs

Fair Chair uses [Electron](https://github.com/electron/electron) turn the HTML/CSS/JS into a desktop application.

Fair Chair uses [Bootstrap](https://github.com/twbs/bootstrap) as our CSS Framework, [jQuery](https://github.com/jquery/jquery) to do DOM manipulation, and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) as an icon font toolkit.

## Development Setup

You'll need these things for development:

* Unix-based operating system (if you're running on Windows, find a unix shell and follow these steps)
* [node.js](https://nodejs.org) (we developed it on
* [npm](https://www.npmjs.com/)
* [Electron](https://github.com/electron/electron)

We'll assume you have node and npm installed.

First, clone this repository:

```bash
$ git clone https://github.com/malsf21/fair-chair.git
```

Get into the fair-chair directory:

```bash
$ cd fair-chair
```

Install our npm dependencies:

```
$ npm install
```

Then, start our app!

```
$ npm start
```


### Building a Distribution file

We'll use [Electron Packager](https://github.com/electron-userland/electron-packager) to help package our app. We assume you've done the above instructions.

Install electron-packager:

```
$ npm install electron-packager -g
```

Then, build for what platform you want. [Electron Packager](https://github.com/electron-userland/electron-packager) has documentation on how to customize your build options. We also have defaults, `npm run build-osx` and `npm run build-linux`

```
$ electron-packager ./ FairChair --platform=darwin --arch=x64
$ npm run build-osx
```

## Credits

Fair Chair was made by Matthew Wang (@malsf21) for the [Ontario Model United Nations Conference](https://omun.ca).
