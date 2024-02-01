;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./static/core"), require("./x64-core"), require("./sha512"), require("./sha384"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./static/core", "./x64-core", "./sha512", "./sha384"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA384;

}));