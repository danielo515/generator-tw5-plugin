
'use strict';
/**
 * This file exports a function that lists official tiddlywiki plugins.
 * Themes are also considered plugins, so it can be used for both, plugins and themes.
 */
const fs = require( 'fs' );
const path = require( 'path' );
const validTypes = [ 'plugins', 'themes', 'languages' ];

const isValidType = ( t ) => {

    if ( validTypes.indexOf( t ) === -1 ) {
        throw `The provided plugin type ${t} is invalid. Valid types are ${validTypes.join( ',' )}`;
    }
    return t
}

const getTw5Path = ( type ) => {

    if ( type.match( /plugins|themes/ ) ) {
        return `node_modules/tiddlywiki/${type}/tiddlywiki`;
    }
        return `node_modules/tiddlywiki/${type}`
}

const generateList = ( type = 'plugins' ) => {

    type = isValidType( type );
    const prefix = `$:/${type}/`;
    const pluginsPath = getTw5Path(type);
    const plugins = fs.readdirSync( pluginsPath );
    return plugins.map(( p ) => {

        const pluginPath = path.join( pluginsPath, p, 'plugin.info' );
        const pluginInfo = JSON.parse( fs.readFileSync( pluginPath ) );
        const pluginTitle = pluginInfo.title.replace( prefix, '' );
        return { name: p, value: pluginTitle }
    });
}
module.exports = generateList;
