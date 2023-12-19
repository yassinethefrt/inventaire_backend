const { getConnection, getSql } = require("../db/conn");
const { equipements } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(equipements.getCount);
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
    if (filter.equipement) {
      queryFilter += ` and LOWER(equipement) like(LOWER('%${filter.equipement}%'))`;
    }
    if (filter.categorie) {
      queryFilter += ` and LOWER(categorie) like(LOWER('%${filter.categorie}%'))`;
    }

    const pool = await getConnection();
    const result = await pool.request().query(
      `${equipements.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
            OFFSET ${range[0]} ROWS FETCH NEXT ${
        range[1] + 1 - range[0]
      } ROWS ONLY`
    );

    res.set(
      "Content-Range",
      `equipements ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
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
      .query(equipements.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.createEquipement = async (req, res) => {
  const { MaterielID, Description, CentreId } = req.body;

  if (MaterielID == "" || CentreId == "") {
    return res
      .status(400)
      .json({ error: "equipement and categorie  fields are required" });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      // .input("equipement", getSql().VarChar, equipement)
      .input("Description", getSql().VarChar, Description)
      .input("CentreId", getSql().Int, CentreId)
      .input("MaterielID", getSql().Int, MaterielID)

      .query(equipements.create);

    res.json({ id: "", MaterielID, Description, CentreId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.updateEquipement = async (req, res) => {
  const { id, Description, MaterielID, CentreId } = req.body;
  //   if (
  //     nom == null ||
  //     prenom == null ||
  //     matricule == null ||
  //     cin == null ||
  //     date_naissance == null ||
  //     grade == null ||
  //     date_affectation == null ||
  //     mission == null
  //   ) {
  //     return res.status(400).json({ error: "all field is required" });
  //   }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .input("Description", getSql().VarChar, Description)
      .input("CentreId", getSql().Int, CentreId)
      .input("MaterielID", getSql().Int, MaterielID)

      .query(equipements.update);

    res.json({
      id,
      Description,
      MaterielID,
      CentreId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.deleteEquipement = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(equipements.delete);
    return res.json({ id: "equipement deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getEquipementData = async (req, res) => {
  try {
    // console.log(queryFilter);
    const pool = await getConnection();
    const result = await pool.request().query(equipements.getDataTable);
    // console.log(result.recordset);
    res.set("Content-Range", `personnels 0-1/1`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
