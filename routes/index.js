var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/all', db.getAllTransearch);

router.get('/api/counties/import/:id', db.getSingleCountyImport);
router.get('/api/counties/export/:id', db.getSingleCountyExport);

router.get('/api/counties/import/origin/:id',db.getSingleCountyImportOrigin);
router.get('/api/counties/export/destination/:id',db.getSingleCountyExportDestination);

router.get('/api/counties/import/origin/details/:id',db.getSingleCountyImportOriginDetails);
router.get('/api/counties/export/destination/details/:id',db.getSingleCountyExportDestinationDetails);

router.get('/api/counties/export/:originFips/:destinationFips',db.getExportsFromSingleToSingle);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;