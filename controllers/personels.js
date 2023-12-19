const { getConnection, getSql } = require("../db/conn");
const { personels } = require("../db/querys");

exports.getCount = async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(personels.getCount);
    req.count = result.recordset[0].count;
    next();
  } catch (error) {
    res.status(500);
    console.log(error.message);
    res.send(error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]";
    let sort = req.query.sort || '["id" , "DESC"]';
    let filter = req.query.filter || "{}";

    range = JSON.parse(range);
    sort = JSON.parse(sort);
    filter = JSON.parse(filter);

    let queryFilter = "";
    if (filter.nom) {
      queryFilter += ` and nom like('%${filter.nom}%')`;
    }
    if (filter.prenom) {
      queryFilter += ` and prenom like('%${filter.prenom}%')`;
    }
    if (filter.cin) {
      queryFilter += ` and cin like('%${filter.cin}%')`;
    }
    if (filter.matricule) {
      queryFilter += ` and matricule like('%${filter.matricule}%')`;
    }
    if (filter.q) {
      queryFilter += ` and matricule like('%${filter.matricule}%')`;
    }

    const pool = await getConnection();
    console.log(`${personels.getAll} ${queryFilter} Order by ${sort[0]} ${
      sort[1]
    }
        OFFSET ${range[0]} ROWS FETCH NEXT ${
      range[1] + 1 - range[0]
    } ROWS ONLY`);
    const result = await pool.request().query(
      `${personels.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );
    res.set(
      "Content-Range",
      `personels ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );

    res.json(result.recordset);
  } catch (error) {
    res.send(error.message);
    res.status(500);
  }
};
exports.getById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(personels.getById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.createPersonel = async (req, res) => {
  const {
    Nom,
    Prenom,
    Cin,
    Matricule,
    DateNaissance,
    Grade,
    DateAffectation,
    Mission,
    EtablissementId,
    CentreId,
  } = req.body;

  // if (
  //   nom == "" ||
  //   prenom == "" ||
  //   cin == "" ||
  //   matricule == "" ||
  //   date_naissance == "" ||
  //   date_affectation == "" ||
  //   grade == "" ||
  //   mission == ""
  // ) {
  //   return res.status(400).json({ error: "all field is required" });
  // }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Nom", getSql().VarChar, Nom)
      .input("Prenom", getSql().VarChar, Prenom)
      .input("Cin", getSql().VarChar, Cin)
      .input("Matricule", getSql().VarChar, Matricule)
      .input("DateNaissance", getSql().Date, DateNaissance)
      .input("Grade", getSql().VarChar, Grade)
      .input("DateAffectation", getSql().Date, DateAffectation)
      .input("Mission", getSql().VarChar, Mission)
      .input("EtablissementId", getSql().Int, EtablissementId)
      .input("CentreId", getSql().Int, CentreId)
      .query(personels.create);

    res.json({
      id: "",
      Nom,
      Prenom,
      Cin,
      Matricule,
      DateNaissance,
      Grade,
      DateAffectation,
      Mission,
      EtablissementId,
      CentreId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.updatePersonel = async (req, res) => {
  const {
    id,
    Nom,
    Prenom,
    Cin,
    Matricule,
    DateNaissance,
    Grade,
    DateAffectation,
    Mission,
    EtablissementId,
    CentreId,
  } = req.body;
  // if (
  //   nom == null ||
  //   prenom == null ||
  //   matricule == null ||
  //   cin == null ||
  //   date_naissance == null ||
  //   grade == null ||
  //   date_affectation == null ||
  //   mission == null
  // ) {
  //   return res.status(400).json({ error: "all field is required" });
  // }
  try {
    const pool = await getConnection();

    let results = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .input("Nom", getSql().VarChar, Nom)
      .input("Prenom", getSql().VarChar, Prenom)
      .input("Cin", getSql().VarChar, Cin)
      .input("Matricule", getSql().VarChar, Matricule)
      .input("DateNaissance", getSql().Date, DateNaissance)
      .input("Grade", getSql().VarChar, Grade)
      .input("DateAffectation", getSql().Date, DateAffectation)
      .input("Mission", getSql().VarChar, Mission)
      .input("EtablissementId", getSql().Int, EtablissementId)
      .input("CentreId", getSql().Int, CentreId)

      .query(personels.update);

    res.json({
      id,
      Nom,
      Prenom,
      Cin,
      Matricule,
      DateNaissance,
      Grade,
      DateAffectation,
      Mission,
      EtablissementId,
      CentreId,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.deletePersonel = async (req, res) => {
  try {
    const pool = await getConnection();
    pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(personels.delete);
    return res.json({ id: "etablisement deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getPersonnelChart = async (req, res) => {
  try {
    // console.log(queryFilter);
    const pool = await getConnection();
    const result = await pool.request().query(personels.getPersonnelChart);
    // console.log(result.recordset);
    res.set("Content-Range", `personnels 0-1/1`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getPersonnelsData = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(personels.getPersonnelsData);
    // console.log(result.recordset);
    res.set("Content-Range", `personnels 0-1/1`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
