const express = require('express');
const router = express.Router();
const imageresizer = require('../libs/imageresizer/imageresizer');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
/* GET home page. */
router.get('/', async(req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/image-resize', upload.single('path'), async(req, res) => {
	try {
		await imageresizer.resize(req.file , parseInt(req.body.width), parseInt(req.body.height), req.body.method, req.body.format);

		res.writeHead(200, {
			'Content-Type': req.file.mimetype,
			'Content-Length': req.file.size
		});

		const readStream = fs.createReadStream(req.file.path);
		readStream.pipe(res);

	} catch (err) {
		console.log(err);
		res.render('index', { error: err });
	}
});


module.exports = router;
