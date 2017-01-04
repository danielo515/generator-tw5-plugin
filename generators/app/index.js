'use strict';
var Generator = require('yeoman-generator');

const {isPlainObject} = require(`lodash`);

const init = require(`./lib/init`);

const {
  spawnSync: spawn,
  execSync: exec
} = require(`child_process`);


var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.Base.extend({
  _ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  _hyphenate(name) {
    return name.split(` `).join(`-`);
  },

  _camelCase(name) {

    return name.split(`-`).map((s, i) => {
      if (i === 0) return s;
      return this._ucFirst(s);
    }).join(``);

  },
  _spawn(cmd) {

    const parts = cmd.split(` `);
    const [first, ...rest] = parts;

    spawn(first, rest, { stdio: `inherit` });

  },

  _copyFile(f) {

    let from = f;
    let to = f;

    if (isPlainObject(f)) ({ from, to } = f);

    this.fs.copyTpl(
      this.templatePath(from),
      this.destinationPath(to),
      this.props,
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );

  },

  _createDir(d) {

    mkdir(d, e => {
      if (e) console.error(e);
    });

  },

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sweet ' + chalk.red('generator-tiddlywiki-plugin') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install() {
    this.installDependencies();
  }
});
