;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./static/core"), require("./sha256"), require("./sha224"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./static/core", "./sha256", "./sha224"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA224;

}));