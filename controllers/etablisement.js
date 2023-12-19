const { getConnection, getSql } = require("../db/conn");
const { etablisements } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(etablisements.getCount);
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
      `${etablisements.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `etablisements ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
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
      .query(etablisements.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.createEtablissement = async (req, res) => {
  const { Etablissement, RegionId } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Etablissement", getSql().VarChar, Etablissement)
      .input("RegionId", getSql().Int, RegionId)
      .query(etablisements.create);

    res.json({
      id: "",
      Etablissement,
      RegionId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.updateEtablissement = async (req, res) => {
  const { id, Etablissement, RegionId } = req.body;
  if (id == null || Etablissement == null || RegionId == null) {
    return res.status(400).json({ error: "all field is required" });
  }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, id)
      .input("Etablissement", getSql().VarChar, Etablissement)
      .input("RegionId", getSql().Int, RegionId)
      .query(etablisements.update);

    console.log(results);

    res.json({
      id,
      Etablissement,
      RegionId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.deleteEtablissement = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(etablisements.delete);
    return res.json({ id: "etablisement deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
