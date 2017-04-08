'use strict';
var Generator = require('yeoman-generator');

const {isPlainObject} = require(`lodash`);

const {
  spawnSync: spawn,
  execSync: exec
} = require(`child_process`);

const mkdir = require(`mkdirp`);

var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  _ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  _hyphenate(name) {
    return name.split(` `).join(`-`);
  },

  _camelCase(name) {
    return name.split(`-`).map((s, i) => {
      if (i === 0) {
        return s;
      }
      return this._ucFirst(s);
    }).join(``);
  },
  _spawn(cmd) {
    const parts = cmd.split(` `);
    const [first, ...rest] = parts;

    spawn(first, rest, {stdio: `inherit`});
  },

  _copyFile(f) {
    let from = f;
    let to = f;

    if (isPlainObject(f)) {
      ({from, to} = f);
    }

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
      if (e) {
        console.error(e);
      }
    });
  },

  initializing() {
    this.props = {
      license: `MIT`,
      year: new Date().getFullYear(),
      version: '0.1.0'
    };
  },

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sweet ' + chalk.red('tw5-plugin') + ' generator!'
    ));

    var prompts = [
    // ==== General metadata info ====
      {
        type: 'input',
        name: 'pluginName',
        message: 'Your plugin name',
        default: this._ucFirst(this.appname) // Default to current folder name
      },
      {
        type: 'input',
        name: 'pluginDescription',
        message: 'Description or what is this plugin about',
        default: 'An awesome Tiddlywiki 5 plugin.'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author (complete name)',
        default: 'Mr Anonymous',
        store: true
      },
      {
        type: 'input',
        name: 'email',
        message: `Author's name`,
        default: 'yo@gmail.com',
        store: true
      },
      {
        type: 'input',
        name: 'github',
        message: `What's your Github username`,
        store: true
      },
      {
        type: `list`,
        name: `license`,
        message: `License`,
        default: 'MIT',
        choices: [{
          value: `MIT`,
          name: `MIT`
        }, {
          value: `BSD-2-Clause`,
          name: `BSD-2-Clause`
        }, {
          value: `BSD-3-Clause`,
          name: `BSD-3-Clause`
        }, {
          value: `ISC`,
          name: `ISC`
        }, {
          value: `Apache-2.0`,
          name: `Apache-2.0`
        }]
      },
      // ==== TW5 specific =====
      {
        type: 'checkbox',
        name: 'tw5Plugins',
        message: 'Select which tiddlywiki official plugins you need',
        choices: require('./tw5PlugisnList.json')
      },
      {
        type: 'checkbox',
        name: 'tw5Themes',
        message: 'Select which tiddlywiki official themes you want to include',
        choices: require('./tw5ThemesList.json')
      },
      {
        type: 'checkbox',
        name: 'tw5Languages',
        message: 'Select which ones of tiddlywiki\'s official Languages you want to include',
        choices: require('./tw5LanguagesList.json')
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = Object.assign(this.props, props);
      this.props.plugin = props.pluginName.toLowerCase();
    }.bind(this));
  },

  writing() {
    this.log(this.props);

    const github = [
      // `CONTRIBUTING.md`,
      // `.github/ISSUE_TEMPLATE.md`,
      // `.github/PULL_REQUEST_TEMPLATE.md`
    ];

    const babel = [
      `.babelrc`
    ];

    const editor = [
      `.editorconfig`
    ];

    const eslint = [
      `.eslintignore`,
      `.eslintrc.yml`
    ];

    const git = [
      `README.md`,
      {from: `licences/${this.props.license}`, to: `LICENSE`},
      {from: `_gitignore`, to: `.gitignore`}
    ];

    const npm = [
      {from: `_package.json`, to: `package.json`}
    ];

    const ci = [
      `.travis.yml`,
      `gulpfile.babel.js`
    ];

    const plugin = [
        {from: `src/plugin.info`, to: `src/plugins/${this.props.github}/${this.props.plugin}/plugin.info`},
        {from: `src/tiddlers/**.tid`, to: `src/plugins/${this.props.github}/${this.props.plugin}/tiddlers`}

    ];

    const wiki = [
      'wiki/tiddlywiki.info',
      {from: 'wiki/tiddlers/**', to: 'wiki/tiddlers'}
    ];

    let files = [
      ...eslint,
      ...git,
      // ...github,
      ...babel,
      ...editor,
      ...npm,
      ...plugin,
      ...wiki,
      ...ci
    ];

    files.forEach(f => this._copyFile(f));
  },

  install() {
    // this.installDependencies();
    // this.config.set('plugin', this.props.plugin);
    // this.config.set('pluginDescription', this.props.pluginDescription);
    this.config.defaults({
      plugin: this.props.plugin,
      pluginDescription: this.props.pluginDescription
    });
    this.log('Wow, let\'s install stuff');
  }
});
