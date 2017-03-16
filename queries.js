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

  db.any('select "PROPER", "2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('select "PROPER", "2012_Transearch"."STCC2", sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('SELECT "2012_Transearch"."STCC2",sum("SumOfValue"),"PROPER" FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text  WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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
  db.any('select "PROPER", "2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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
  db.any('select "PROPER", "2012_Transearch"."STCC2", sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('SELECT "2012_Transearch"."STCC2",sum("SumOfValue"),"PROPER" FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text  WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"',{
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
'select "PROPER", "2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER" ORDER BY "2012_Transearch"."STCC2"'
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