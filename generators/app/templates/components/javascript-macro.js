/*\
title: $:/plugins/<%- github %>/<%- plugin %>/js/macros/<%- javascriptMacro.name %>.js
type: application/javascript
module-type: macro

@preserve

\*/

const name = '<%- javascriptMacro.name %>';
const params = [
	{name: 'paramName', default:'default value'} // put any parameter required by your macro here
];

/**
 * The parameters are pulled from the macro call and arranged according to the params array.
 * The run function should return the string value of the macro.
 * @this MacroCallWidget
 * @return {string}
 * @private
 */
function run(paramName) { //

    this.substVarRefs = this.substituteVariableReferences;
    /*
      Put your macro logic here, and make sure to return a string
    */
    const result = `${paramName} is the text you have entered`;
    return (typeof result === 'string' ? result : '');

}

/*** Exports *******************************************************/

export { run, name, params };
