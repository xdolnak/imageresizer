const sharp = require('sharp');

const middleware = {
	fill: async function(s, width, height) {
		return s.resize(width, height, {fit:'fill'});
	}
};

const imageresizer = {
	resize: async function(path, width, height, method, format) {
		let s = sharp(path);
		switch (format) {
			case 'Fit':
			break;
			case 'ScaleWidth':
			break;
			case 'ScaleHeight':
			break;
			case 'Fill':
			let res = await sharp.fill(s, width, height);
			break;

			case 'Crop':
			break;
		}
	}
};

module.exports = imageresizer;