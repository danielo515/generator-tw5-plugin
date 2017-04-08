
'use strict'
/**
 * This script generates the lists of official tw5 plugins/components the generator uses.
 * This includes languages, plugins and themes.
 * To run this script just run it with node js or use the npm script at the root of this repo:
 * > npm run generate-plugins-list
 */
const fs = require( 'fs' );
const GenerateList = require( './list-tw5-plugins' );

fs.writeFileSync( './generators/app/tw5PlugisnList.json', JSON.stringify( GenerateList(), null, 2 ) );
fs.writeFileSync( './generators/app/tw5ThemesList.json', JSON.stringify( GenerateList('themes'), null, 2 ) );
fs.writeFileSync( './generators/app/tw5LanguagesList.json', JSON.stringify( GenerateList('languages'), null, 2 ) );
process.exit(0);
