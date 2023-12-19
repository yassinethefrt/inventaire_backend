const { getConnection, getSql } = require("../db/conn");
const { Regions } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(Regions.getCount);
    req.count = result.recordset[0].count;
    next();
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.getVilles = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]";
    let sort = req.query.sort || '["id" , "ASC"]';
    let filter = req.query.filter || "{}";
    range = JSON.parse(range);
    sort = JSON.parse(sort);
    filter = JSON.parse(filter);

    let queryFilter = "";
    const pool = await getConnection();
    const result = await pool.request().query(
      `${Regions.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `Regions ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(Regions.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// exports.createVilles = async (req, res) => {
//   const { ville } = req.body;

//   try {
//     const pool = await getConnection();

//     await pool
//       .request()
//       .input("ville", getSql().NVarChar, ville)
//       .query(villes.create);

//     res.json({
//       id: ville,
//     });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// exports.deleteVille = async (req, res) => {
//   try {
//     const pool = await getConnection();
//     pool
//       .request()
//       .input("id", getSql().Int, req.params.id)
//       .query(villes.delete);
//     return res.json({ id: "city deleted" });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// exports.updateVille = async (req, res) => {
//   const { id, ville } = req.body;
//   if (id == null || ville == null) {
//     return res.status(400).json({ error: "all field is required" });
//   }
//   try {
//     const pool = await getConnection();

//     let results = await pool
//       .request()
//       .input("id", getSql().Int, id)
//       .input("ville", getSql().VarChar, ville)

//       .query(villes.update);

//     console.log(results);

//     res.json({
//       id,
//       ville,
//     });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };
