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
var db = pgp(cn);

// add query functions
function getAllTransearch(req, res, next) {
  db.any('select * from "Copy_Of_2012_Transearch" LIMIT 10')
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

/*
* Import or Export to or from a single county
* Both tonnage and value
* Grouped by STCC2 
*/

function getSingleCountyImport(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Origin_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyImport beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)
  db.any('select "PROPER","Destination_County_FIPS_Code", "Copy_Of_2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Copy_Of_2012_Transearch"."STCC2","PROPER","Destination_County_FIPS_Code" ORDER BY "Copy_Of_2012_Transearch"."STCC2"',{
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
function getSingleCountyExport(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Destination_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyExport beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)

  db.any('select "PROPER","Origin_County_FIPS_Code","Copy_Of_2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Copy_Of_2012_Transearch"."STCC2","PROPER","Origin_County_FIPS_Code" ORDER BY "Copy_Of_2012_Transearch"."STCC2"',{
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

/*
* Import/Export for a single county
* Both tonnage and value
* Grouped by Origin/Destination county 
*/

function getSingleCountyImportOrigin(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Origin_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyImportOrigin beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)
  db.any('select "Destination_County_FIPS_Code", "Origin_County_FIPS_Code",sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Origin_County_FIPS_Code","Destination_County_FIPS_Code" ORDER BY "Origin_County_FIPS_Code"',{
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
function getSingleCountyExportDestination(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Destination_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyExportDestination beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)

  db.any('select "Origin_County_FIPS_Code","Destination_County_FIPS_Code", sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Destination_County_FIPS_Code","Origin_County_FIPS_Code" ORDER BY "Destination_County_FIPS_Code"',{
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

/*
* Import/Export for a single county
* Both tonnage and value
* Grouped by STCC2 -> Origin/Destination county
*/

function getSingleCountyImportOriginDetails(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Origin_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyImportOriginDetails beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)

  db.any('select "PROPER","Destination_County_FIPS_Code","Origin_County_FIPS_Code","Copy_Of_2012_Transearch"."STCC2", sum("SumOfValue") as value,sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Copy_Of_2012_Transearch"."STCC2","PROPER","Origin_County_FIPS_Code","Origin_County_FIPS_Code","Destination_County_FIPS_Code" ORDER BY "Copy_Of_2012_Transearch"."STCC2"',{
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
function getSingleCountyExportDestinationDetails(req, res, next) {
  var beaConditional = ''
  if(req.params.id.length < 5){
    beaConditional = ' AND character_length("Destination_County_FIPS_Code") >= 5 '
  }
  console.log("getSingleCountyExportDestinationDetails beaConditional:",beaConditional);
  console.log("req.params.id:",req.params.id)

  db.any('select "PROPER","Origin_County_FIPS_Code","Destination_County_FIPS_Code","Copy_Of_2012_Transearch"."STCC2",sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' '+beaConditional+'GROUP BY "Copy_Of_2012_Transearch"."STCC2","PROPER","Destination_County_FIPS_Code","Origin_County_FIPS_Code" ORDER BY "Copy_Of_2012_Transearch"."STCC2"',{
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

/*
* Import/Export between two counties
* Both tonnage and value
* Grouped by STCC2
*/

function getExportsFromSingleToSingle(req, res, next) {
  console.log("getExportsFromSingleToSingle:",req.params.originFips,req.params.destinationFips)

  db.any('select  "PROPER", "Copy_Of_2012_Transearch"."STCC2",  "Destination_County_FIPS_Code", "Origin_County_FIPS_Code", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons,   sum("Air_Annual_tons") as air,   sum("Water_Annual_tons") as water, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire,   sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private   FROM "Copy_Of_2012_Transearch" INNER JOIN  "Stcc2DNames" ON "Copy_Of_2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text   WHERE "Destination_County_FIPS_Code"=\'${destinationFips^}\'  AND "Origin_County_FIPS_Code" = \'${originFips^}\'  GROUP BY "Copy_Of_2012_Transearch"."STCC2","PROPER","Destination_County_FIPS_Code","Origin_County_FIPS_Code"  ORDER BY "Origin_County_FIPS_Code"',{
    originFips: req.params.originFips,
    destinationFips:req.params.destinationFips
  })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved exports from single to single county. ORIGIN FIPS: '+req.params.originFips+ ' DESTINATION: '+req.params.destinationFips
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllTransearch: getAllTransearch,
  getSingleCountyImport: getSingleCountyImport,
  getSingleCountyExport: getSingleCountyExport,
  getSingleCountyImportOrigin:getSingleCountyImportOrigin, 
  getSingleCountyExportDestination:getSingleCountyExportDestination, 
  getSingleCountyImportOriginDetails:getSingleCountyImportOriginDetails,
  getSingleCountyExportDestinationDetails:getSingleCountyExportDestinationDetails,
  getExportsFromSingleToSingle:getExportsFromSingleToSingle
};
