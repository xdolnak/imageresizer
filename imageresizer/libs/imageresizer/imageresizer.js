const sharp = require('sharp');
const fsPromises = require('fs').promises;

const middleware = {
	contain: async function(s, width, height) {
		return s.resize(width, height, {fit:'contain'});
	},
	autoScaleHeight: async function(s, width) {
		return s.resize(width, null, {fit:'contain'});
	},
	autoScaleWidth: async function(s, height) {
		return s.resize(null, height, {fit:'contain'});
	},
	outside: async function(s, width, height) {
		return s.resize(width, height, {fit:'outside'});
	},
	cover: async function(s, width, height) {
		return s.resize(width, height, {fit:'cover'});
	},
};

const imageresizer = {
	resize: async function(path, width, height, method, format) {
		let s = sharp(path);
		switch (method) {
			case 'Fit':
			await middleware.contain(s, width, height);
			break;
			case 'ScaleWidth':
			await middleware.autoScaleHeight(s, width);
			break;
			case 'ScaleHeight':
			await middleware.autoScaleWidth(s, height);
			break;
			case 'Fill':
			await middleware.outside(s, width, height);
			break;
			case 'Crop':
			await middleware.cover(s, width, height);
			break;
		}
		await s.toFile('output.png');
		await fsPromises.rename('output.png', path);
	}
};

module.exports = imageresizer;