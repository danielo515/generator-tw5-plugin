/*\
title: $:/plugins/<%- github %>/<%- plugin %>/startup/<%- startupModule.name %>.js
type: application/javascript
module-type: startup

This is an startup module. Please put here a comment about what it does and why.
For more info just visit:  http://tiddlywiki.com/dev/#StartupMechanism

@preserve

\*/


/*jslint node: true, browser: true */
/*global $tw: false */


// Export name and synchronous status
exports.name = '<%- plugin %>-<%- startupModule.name %>';
/*
You MUST export at least one startup order, so uncomment at least one
Usually you want to run your module after the startup module
but that varies depending on your intentions. choose wisely...
*/
// exports.before = ["startup"];
exports.after = [ 'startup' ];
// Allowed options are browser, node or both
exports.platforms = [ 'browser' ];
// If you are doing asyncrhonous tasks change this to false
exports.synchronous = true;



/**
 * @module config-startup
 */
exports.startup = function () {
  // Put your startup logic here!
    console.log( '<%- plugin %> has executed one startup module!!!' );
};
