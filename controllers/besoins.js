const { getConnection, getSql } = require("../db/conn");
const { besoins, Users } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(besoins.getCount);
    req.count = result.recordset[0].count;
    next();
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getAll = async (req, res) => {
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
      `${besoins.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
          OFFSET ${range[0]} ROWS FETCH NEXT ${
        range[1] + 1 - range[0]
      } ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `besoins ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
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
      .query(besoins.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.createBesoin = async (req, res) => {
  const { Besoin, Description, MaterielID, CentreId, CreatedBy } = req.body;
  // const user_id = req.params.id;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Besoin", getSql().VarChar, Besoin)
      .input("Description", getSql().NText, Description)
      .input("MaterielID", getSql().Int, MaterielID)
      .input("CentreId", getSql().Int, CentreId)
      // .input("CreatedBy", getSql().Int, CreatedBy)
      .query(besoins.create);

    return res.json({
      id: "",
      Besoin,
      Description,
      MaterielID,
      CentreId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.updateBesoin = async (req, res) => {
  // const { besoin, description, date_creation, created_by } = req.body;
  const { Besoin, Description, MaterielID, CentreId, Etat } = req.body;

  //   if (
  //     id == null ||
  //     ville_id == null ||
  //     centre == null ||
  //     etablissement == null
  //   ) {
  //     return res.status(400).json({ error: "all field is required" });
  //   }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .input("Besoin", getSql().VarChar, Besoin)
      .input("Description", getSql().NText, Description)
      .input("MaterielID", getSql().Int, MaterielID)
      .input("CentreId", getSql().Int, CentreId)
      .input("Etat", getSql().VarChar, Etat)
      .query(besoins.update);

    console.log(results);

    res.json({
      id: req.params.id,
      Besoin,
      Description,
      MaterielID,
      CentreId,
      Etat,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.deleteBesoin = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(besoins.delete);
    return res.json({ id: "besoin deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
