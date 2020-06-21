const express = require('express');
const router = express.Router();
const imageresizer = require('../libs/imageresizer/imageresizer');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async(req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/image-resize', upload.single('path'), [
		body('height').isInt({min:1}),
		body('width').isInt({min:1}),
		body('format').isIn(['', 'png', 'jpg', 'webp']),
		body('method').isIn(['Crop', 'Fill', 'ScaleWidth', 'ScaleHeight', 'Fit'])
	], async(req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.render('index', { error: errors.array()[0].msg + ' ' + errors.array()[0].param});
	}

	try {
		await imageresizer.resize(req.file , parseInt(req.body.width), parseInt(req.body.height), req.body.method, req.body.format);

		res.writeHead(200, {
			'Content-Type': req.file.mimetype
		});

		const readStream = fs.createReadStream(req.file.path);
		readStream.pipe(res);

		// remove tmp file
		res.on('finish', function () {
			fs.unlink(req.file.path, (err) => {
				if (err) {
					console.error(err);
				}
			})
		});

	} catch (err) {
		console.log(err);
		res.render('index', { error: err });
	}
});


module.exports = router;
