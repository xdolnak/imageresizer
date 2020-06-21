const express = require('express');
const router = express.Router();
const imageresizer = require('../libs/imageresizer/imageresizer');

/* GET home page. */
router.get('/', async(req, res) => {

  params = {};
  params.body = {
      path:'/Users/michaldolnak/VSETCI_MOZU_CITAT/imageResizer/imageresizer/chart.png',
	  width:100,
      height:100,
      method:'ScaleHeight',
      format: 'png'
  };

  await imageresizer.resize(params.body.path, params.body.width, params.body.height, params.body.method, params.body.format);
  res.render('index', { title: 'Express' });
});

module.exports = router;
