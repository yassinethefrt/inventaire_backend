const { getConnection, getSql } = require("../db/conn");
const { GenreMateriels } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(GenreMateriels.getCount);
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
      `${GenreMateriels.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
          OFFSET ${range[0]} ROWS FETCH NEXT ${
        range[1] + 1 - range[0]
      } ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `genre materiels ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
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
      .query(GenreMateriels.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.createGenreMateriel = async (req, res) => {
  const { GenreMateriel } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("GenreMateriel", getSql().VarChar, GenreMateriel)

      .query(GenreMateriels.create);

    res.json({ id: "", GenreMateriel });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
exports.updateGenreMateriel = async (req, res) => {
  const { id, GenreMateriel } = req.body;
  if (id == null || GenreMateriel == null) {
    return res.status(400).json({ error: "all field is required" });
  }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .input("GenreMateriel", getSql().VarChar, GenreMateriel)

      .query(GenreMateriels.update);

    console.log(results);

    res.json({
      id,
      GenreMateriel,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.deleteMateriel = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(GenreMateriels.delete);
    return res.json({ id: "Materiel deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
