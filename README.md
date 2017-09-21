# generator-tw5-plugin [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/danielo515/generator-tw5-plugin.svg)](https://greenkeeper.io/)
> Create new plugins for tiddlywiki 5 easily

The hardest part for me when I started programming plugins for tiddlywiki was generating an appropriate project.
Hope this generator saves you all the headache and confusion I suffered at the beginning.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-tw5-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-tw5-plugin
```

Then generate your new project:

```bash
mkdir myCoolPlugin
cd myCoolPlugin
yo tw5-plugin
```

## Features

* Very comfortable developer experience
* Use latest Javascript ES6 features thanks to Babel
* Automatic github pages publishing using Travis-CI
* Easy management using npm scripts
* Automatic code rebuild and server restart on changes using nodemon
* Add plugins just by selecting them from a list of official ones
* Add themes just by selecting them from a list of official ones
* Add languages just by selecting them from a list of official ones
* Scaffolding of tiddlywiki's Javascript modules (just during project generation at the moment)
  * startup module
  * javascript macro
  * javascript library

### Future features

* Scaffolding of all kind of tiddlywiki Javascript modules using subgenerators

## Usage

The project that this generator creates uses npm scripts for operation.
To run an npm script just execute `npm run scriptName`. The following npm scripts are available:

* `build`: Generates a non minified version of the plugin on the dist folder and bundles the plugin
* `build:production`: Same as `build` but with code minification
* `build:index`: Creates a tiddlywiki file containing your plugin and your presentation tiddlers. Useful for publishing.
* `docs`: Generates documentation from your plugin's Javascript code using JsDocs
* `start`: Starts a tiddlywiki server at http://localhost:8080. Useful for testing your project before publishing, or generating the demo tiddlers. You can run this script directly just by doing `npm start`.

There are other scripts, but they are not intended to be used manually.

An usual workflow could be:

1. Write javascript code (startup modules, savers, sync adaptors, macros...)
1. Write plugin-specific tiddlers
1. Start the tiddlywiki server with `npm start` to check that everything works
1. Optionally use the running tiddlywiki server to write demonstration tiddlers
1. Stop the server, generate an index and publish it to gh-pages

## Using Travis-CI for automatic publishing

The generated project includes a `.travis.yml` file for automatic publishing to github pages.
All you have to do is enable `travis` on your repository.
To be able to publish to github pagesyou need to configure an environment variable
named `GITHUB_TOKEN` containinng a github token with on your `travis-ci` dashboard.
Instructions about generating the token [are here](https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token), and [how to setup the environment variable is here](https://docs.travis-ci.com/user/environment-variables#Defining-Variables-in-Repository-Settings).

## Scaffolded project structure

The created folder structure looks as follows:

```text
pluginName/
|-- dist/             <-- your plugin will end here after the build process (babel, scss, etc)
|-- wiki/
|    |-- tiddlywiki.info
|    |-- tiddlers/          <-- put your presentation tiddlers here
|    |   |-- ReadMe.tid
|    |-- output/          <-- Generated wikis will be here. Do not put anything here manually
|
|-- src/
|    |-- jsdoc/ <-- API documentation
|    |   |-- config.json
|    |   |-- README.md
|    |-- plugins/
|        |-- author/
|            |-- pluginName/
|                | -- plugin.info
|                | -- js/      <-- put your javascript code here
|                | -- tiddlers/      <-- put your plugin specific tiddlers here
|                    | -- readme.tid
|
```

### Why so many readmes

You may have noticed that there are several readme files.
This is because each one fulfills one specific purpose. There are three kind of readme files:

- Wiki readme: This readme will be used to generate the readme of your repository, and will also be included into your demonstration wiki
- Plugin readme: This is the readme that ships with your plugin. It should contain information about what is your plugin about
- API readme: This readme will be used as home page of the generated API docuemntation using jsdocs

## Special thanks
Special thanks to [felixhayasi](https://github.com/felixhayashi), the creator of [tiddlymap](http://tiddlymap.org).
He is the author of the original gulpfile that powers the projects bootstrapped using this yeoman generator.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Danielo Rodriguez Rivero](danielorodriguezrivero.com)


[npm-image]: https://badge.fury.io/js/generator-tw5-plugin.svg
[npm-url]: https://npmjs.org/package/generator-tw5-plugin
[travis-image]: https://travis-ci.org/danielo515/generator-tw5-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/danielo515/generator-tw5-plugin
[daviddm-image]: https://david-dm.org/danielo515/generator-tw5-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/danielo515/generator-tw5-plugin
[coveralls-image]: https://coveralls.io/repos/danielo515/generator-tw5-plugin/badge.svg
[coveralls-url]: https://coveralls.io/r/danielo515/generator-tw5-plugin
