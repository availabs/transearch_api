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

  db.any('select "PROPER","Origin_County_Name", "2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Origin_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('select "PROPER","Origin_County_Name", "2012_Transearch"."STCC2", sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Origin_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('SELECT "2012_Transearch"."STCC2",sum("SumOfValue"),"PROPER","Origin_County_Name" FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text  WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Origin_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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
  db.any('select "PROPER","Destination_County_Name", "2012_Transearch"."STCC2", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Destination_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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
  db.any('select PROPER","Destination_County_Name", "2012_Transearch"."STCC2", sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Destination_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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

  db.any('SELECT 2012_Transearch"."STCC2",sum("SumOfValue"),"PROPER","Destination_County_Name" FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text  WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Destination_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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
  console.log(req.params.id)

  db.any('select "Destination_New_BEA","Origin_County_Name", "Destination_County_Name","Destination_County_FIPS_Code", sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "Destination_County_FIPS_Code","Destination_County_Name","Destination_New_BEA","Origin_County_Name" ORDER BY "Destination_County_FIPS_Code"',{
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
  console.log(req.params.id)

  db.any('select "Destination_New_BEA", "PROPER","Origin_County_Name", "Destination_County_Name","Destination_County_FIPS_Code","2012_Transearch"."STCC2",sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Origin_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Destination_County_FIPS_Code","Destination_County_Name","Destination_New_BEA","Origin_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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

function getSingleCountyImportOriginDetails(req, res, next) {
  console.log(req.params.id)

  db.any('select "Origin_New_BEA", "PROPER","Destination_County_Name","Origin_County_Name","Origin_County_FIPS_Code","2012_Transearch"."STCC2", sum("SumOfValue") as value,sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "2012_Transearch"."STCC2","PROPER","Origin_County_FIPS_Code","Origin_County_Name","Origin_New_BEA","Destination_County_Name" ORDER BY "2012_Transearch"."STCC2"',{
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

function getSingleCountyImportOrigin(req, res, next) {
  console.log(req.params.id)

  db.any('select "Origin_New_BEA", "Destination_County_Name", "Origin_County_Name","Origin_County_FIPS_Code",sum("SumOfValue") as value, sum("Total_Annual_tons") as tons, sum("Air_Annual_tons") as air, sum("Water_Annual_tons") as water, sum("Other_Annual_tons") as other, sum("Rail_Carload_Annual_tons") as rail_carload, sum("Rail_Intermodal_Annual_tons") as rail_intermodal, sum("For_Hire_Truckload_Annual_tons") as truck_for_hire, sum("For_Hire_LTL_Annual_tons") as ltl_for_hire, sum("Private_Truck_Annual_tons") as truck_private FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text WHERE "Destination_County_FIPS_Code"=\'${countyFips^}\' GROUP BY "Origin_County_FIPS_Code","Origin_County_Name","Origin_New_BEA","Destination_County_Name" ORDER BY "Origin_County_Name"',{
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

function getExportsFromSingleToSingle(req, res, next) {
  console.log(req.params.originFips,req.params.destinationFips)

  db.any('select  "PROPER", "2012_Transearch"."STCC2", "Destination_County_Name",  "Destination_County_FIPS_Code", "Origin_County_Name", "Origin_County_FIPS_Code", sum("SumOfValue") as value,  sum("Total_Annual_tons") as tons,   sum("Air_Annual_tons") as air,   sum("Water_Annual_tons") as water,   sum("Other_Annual_tons") as other,   sum("Rail_Carload_Annual_tons") as rail_carload,   sum("Rail_Intermodal_Annual_tons") as rail_intermodal,   sum("For_Hire_Truckload_Annual_tons") as truck_for_hire,   sum("For_Hire_LTL_Annual_tons") as ltl_for_hire,   sum("Private_Truck_Annual_tons") as truck_private   FROM "2012_Transearch" INNER JOIN  "Stcc2DNames" ON "2012_Transearch"."STCC2" = "Stcc2DNames"."STCC2"::text   WHERE "Destination_County_FIPS_Code"=\'${destinationFips^}\'  AND "Origin_County_FIPS_Code" = \'${originFips^}\'  GROUP BY "2012_Transearch"."STCC2","PROPER","Destination_County_FIPS_Code","Destination_County_Name","Origin_County_FIPS_Code","Origin_County_Name"  ORDER BY "Origin_County_Name"',{
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

/*
* In short, any fips that don't start with the following, are garbage
*/
// substring("Destination_County_FIPS_Code" from 0 for 3) != '25' and
// substring("Destination_County_FIPS_Code" from 0 for 3) != '36' and
// substring("Destination_County_FIPS_Code" from 0 for 3) != '34' and
// substring("Destination_County_FIPS_Code" from 0 for 3) != '42' and
// substring("Destination_County_FIPS_Code" from 0 for 3) != '50' and
// substring("Destination_County_FIPS_Code" from 0 for 3) != '09' and 

// substring("Origin_County_FIPS_Code" from 0 for 3) != '25' and
// substring("Origin_County_FIPS_Code" from 0 for 3) != '36' and
// substring("Origin_County_FIPS_Code" from 0 for 3) != '34' and
// substring("Origin_County_FIPS_Code" from 0 for 3) != '42' and
// substring("Origin_County_FIPS_Code" from 0 for 3) != '50' and
// substring("Origin_County_FIPS_Code" from 0 for 3) != '09'



module.exports = {
  getAllTransearch: getAllTransearch,
  getSingleCountyExport: getSingleCountyExport,
  getSingleCountyExportTons: getSingleCountyExportTons,
  getSingleCountyExportValue: getSingleCountyExportValue,
  getSingleCountyImport: getSingleCountyImport,
  getSingleCountyImportTons: getSingleCountyImportTons,
  getSingleCountyImportValue: getSingleCountyImportValue,
  getSingleCountyExportDestinationDetails:getSingleCountyExportDestinationDetails,
  getSingleCountyImportOriginDetails:getSingleCountyImportOriginDetails,
  getSingleCountyExportDestination:getSingleCountyExportDestination,
  getSingleCountyImportOrigin:getSingleCountyImportOrigin,
  getExportsFromSingleToSingle:getExportsFromSingleToSingle
};