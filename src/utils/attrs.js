module.exports = function attrs (attrArray, max) {
	attrArray.shift();
	var attrString = attrArray.join('-_-');
	return attrString;
};