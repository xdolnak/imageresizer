const express = require('express');
const router = express.Router();
const imageresizer = require('../libs/imageresizer/imageresizer');

/* GET home page. */
router.get('/', async(req, res) => {

  params.body = {

  }
  res = await imageresizer.resize(params.body.path, params.body.width, params.body.height, params.body.method, params.body.format);
  res.render('index', { title: 'Express' });
});

module.exports = router;
