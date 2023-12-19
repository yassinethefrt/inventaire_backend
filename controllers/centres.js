const { getConnection, getSql } = require("../db/conn");
const { centres } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(centres.getCount);
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
      `${centres.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `centres ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
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
      .query(centres.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.createCentre = async (req, res) => {
  const { Centre, EtablissementId } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Centre", getSql().VarChar, Centre)
      .input("EtablissementId", getSql().Int, EtablissementId)

      .query(centres.create);

    return res.json({ id: Centre, EtablissementId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.updateCentre = async (req, res) => {
  const { id, Centre, EtablissementId } = req.body;

  if (id == null || Centre == null || EtablissementId == null) {
    return res.status(400).json({ error: "all field is required" });
  }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, id)
      .input("Centre", getSql().VarChar, Centre)
      .input("EtablissementId", getSql().Int, EtablissementId)

      .query(centres.update);

    console.log(results);

    res.json({
      id,
      Centre,
      EtablissementId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.deleteCentre = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(centres.delete);
    return res.json({ id: "centre deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
