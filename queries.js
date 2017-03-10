var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var cn = {
    host: 'mars.availabs.org', // server name or IP address;
    port: 5432,
    database: 'transearch_2012',
    user: 'postgres',
    password: 'Jedi21funk'
}

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://mars.availabs.org:5432/transearch_2012';
var db = pgp(cn);

// add query functions
function getAllTransearch(req, res, next) {
  db.any('select * from "2012_Transearch" LIMIT 10')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL transearch'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyExport(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT * FROM "2012_Transearch" WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\'',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. ORIGIN FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyExportTons(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT "STCC2",sum("Total_Annual_tons")  FROM "2012_Transearch" WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "STCC2" ORDER BY "STCC2"',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. ORIGIN FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyExportValue(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT "STCC2",sum("SumOfValue")  FROM "2012_Transearch" WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "STCC2" ORDER BY "STCC2"',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. ORIGIN FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyImport(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT * FROM "2012_Transearch" WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' LIMIT 10',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. DESTINATION FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyImportTons(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT "STCC2",sum("Total_Annual_tons")  FROM "2012_Transearch" WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "STCC2" ORDER BY "STCC2"',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. ORIGIN FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleCountyImportValue(req, res, next) {
  console.log(req.params.id)

  db.any('SELECT "STCC2",sum("SumOfValue")  FROM "2012_Transearch" WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "STCC2" ORDER BY "STCC2"',{
    countyFips: req.params.id
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single county. ORIGIN FIPS: '+req.params.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
module.exports = {
  getAllTransearch: getAllTransearch,
  getSingleCountyExport: getSingleCountyExport,
  getSingleCountyExportTons: getSingleCountyExportTons,
  getSingleCountyExportValue: getSingleCountyExportValue,
  getSingleCountyImport: getSingleCountyImport,
  getSingleCountyImportTons: getSingleCountyImportTons,
  getSingleCountyImportValue: getSingleCountyImportValue
  // createPuppy: createPuppy,
  // updatePuppy: updatePuppy,
  // removePuppy: removePuppy
};