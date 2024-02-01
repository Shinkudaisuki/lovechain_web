;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./static/core"), require("./ripemd160"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./static/core", "./ripemd160"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacRIPEMD160;

}));