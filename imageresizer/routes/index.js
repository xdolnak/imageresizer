const express = require('express');
const router = express.Router();
const imageresizer = require('../libs/imageresizer/imageresizer');

/* GET home page. */
router.get('/', async(req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/image-resize', async(req, res) => {
	await imageresizer.resize(req.body.path, parseInt(req.body.width), parseInt(req.body.height), req.body.method, req.body.format);
	res.render('index', { title: 'Express' });
});


module.exports = router;
