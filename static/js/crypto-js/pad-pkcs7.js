;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./static/core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./static/core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.pad.Pkcs7;

}));