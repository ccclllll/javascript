const {getOptions} = require('loader-utils')
 
module.exports = function (source){
    const options = getOptions(this);
    console.log(source);
    source = source.replace(/\[name\]/g, options.name);
    console.log(source);
    return `export default ${JSON.stringify(source)}`
}