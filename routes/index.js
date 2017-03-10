var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/all', db.getAllTransearch);
router.get('/api/counties/export/:id', db.getSingleCountyExport);
router.get('/api/counties/export/tons/:id', db.getSingleCountyExportTons);
router.get('/api/counties/export/value/:id', db.getSingleCountyExportValue);
router.get('/api/counties/import/:id', db.getSingleCountyImport);
router.get('/api/counties/import/tons/:id', db.getSingleCountyImportTons);
router.get('/api/counties/import/value/:id', db.getSingleCountyImportValue);

// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
