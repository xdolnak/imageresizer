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
	resize: async function(file, width, height, method, format) {
		// Add original extension to the filename
		const oldExtension = file.mimetype.split('/')[1];
		const newPath = file.path +  '.' + oldExtension;
		await fsPromises.rename(file.path, newPath);
		file.path = newPath;
		// Resize the file
		let s = sharp(file.path);
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
		// Transform to the given format
		let extension = format ? format : oldExtension;
		await s.toFile('tmp.' + extension);
		await fsPromises.rename('tmp.' + extension, file.path.replace(oldExtension, extension));
		file.mimetype = file.mimetype.replace(oldExtension, extension);
	}
};

module.exports = imageresizer;