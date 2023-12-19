exports.Users = {
  create: `INSERT INTO users
            ([fullname]
            ,[username]
            ,[Role]
            ,[hached_password]
            ,[salt]
           )
           VALUES
            (@fullname
            ,@username
            ,@Role
            ,@hached_password
            ,@salt
            )`,

  update: `UPDATE users
    SET [fullname] = @fullname
      ,[username] = @username
      ,[Role] = @Role
      ,[isActivated] = @isActivated
    WHERE id = @id`,
  getCount: `SELECT COUNT(*) as count FROM users`,
  getAll: `SELECT * FROM users where 1=1 `,
  getOne: `SELECT * FROM users WHERE id = @id`,
  getOneUsename: `SELECT * FROM users WHERE username = @username`,
};
exports.Regions = {
  getAll: "Select * from Regions where 1= 1",
  getCount: "Select count(*) as count from Regions",
  getById: "Select * from Regions where id = @id",
};
exports.etablisements = {
  getAll: `
  SELECT
    e.[id] as id,
    e.[Etablissement],
    r.[Region]
FROM
    [dbo].[Etablissements] e
JOIN
    [dbo].[Regions] r ON e.[RegionId] = r.[Id]
    Where 1=1
  `,
  create: `
  INSERT INTO [dbo].[Etablissements]
           ([Etablissement]
           ,[RegionId])
     VALUES
           (@Etablissement
           ,@RegionId)
  `,
  update: `
  UPDATE [dbo].[Etablissements]
   SET [Etablissement] = @Etablissement
      ,[RegionId] = @RegionId

      Where id = @id
  `,
  getCount: `select count(*) as count from [dbo].[Etablissements] `,
  getById: `SELECT * FROM [dbo].[Etablissements] Where id = @id`,
  delete: `delete from [dbo].[Etablissements]  Where id = @id`,
};
exports.centres = {
  getAll: `
  SELECT 
  c.[id] as id,
  c.[Centre],
  e.[Etablissement],
r.Region
FROM
  [dbo].[Centres] c
JOIN
  [dbo].[Etablissements] e ON c.[EtablissementId] = e.[id]
Join 
Regions r on e.RegionId = r.id
  Where 1=1
  `,
  create: `
  INSERT INTO [dbo].[Centres]
  ([Centre]
  ,[EtablissementId])
VALUES
  (@Centre
  ,@EtablissementId)
  `,
  update: `
  UPDATE [dbo].[Centres]
   SET [Centre] = @Centre
      ,[EtablissementId] = @EtablissementId
 WHERE id = @id
  `,
  getCount: `select count(*) as count from [dbo].[Centres] `,
  getById: `SELECT * FROM [dbo].[Centres] WHERE id = @id`,
  delete: `delete from [dbo].[Centres] WHERE id = @id`,
};
exports.materiels = {
  getAll: `
  SELECT
    m.[id] as id,
    m.[Materiel],
    g.[GenreMateriel]
FROM
    [dbo].[Materiels] m
JOIN
    [dbo].[GenreMateriels] g ON m.[GenreMateriel] = g.[id]
  where 1=1 `,
  create: `INSERT INTO [dbo].[Materiels]
  ([Materiel]
  ,[GenreMateriel])
VALUES
  (@Materiel
  ,@GenreMateriel)`,
  update: `
  UPDATE [dbo].[Materiels]
   SET [Materiel] = @Materiel
      ,[GenreMateriel] = @GenreMateriel
 WHERE id = @id
  `,

  getCount: `select count(*) as count from [dbo].[Materiels] `,
  getById: `SELECT * FROM [dbo].[Materiels] WHERE id = @id`,
  delete: `delete from [dbo].[Materiels] WHERE id = @id`,
  getMaterielChart: `
  select COUNT(*) as nb_mateirels ,g.GenreMateriel 
from [dbo].[Materiels]  m
join GenreMateriels g on m.GenreMateriel = g.id
  group by g.GenreMateriel `,
};
exports.GenreMateriels = {
  getAll: `SELECT [id] as id
  ,[GenreMateriel]
FROM [dbo].[GenreMateriels] 
where 1 = 1`,
  create: `
  INSERT INTO [dbo].[GenreMateriels]
           ([GenreMateriel])
     VALUES
           (@GenreMateriel)`,
  update: `
  UPDATE [dbo].[GenreMateriels]
   SET [GenreMateriel] = @GenreMateriel
 WHERE Where id = @id
  `,
  delete: `delete from [dbo].[GenreMateriels] WHERE id = @id`,
  getCount: `select count(*) as count from [dbo].[GenreMateriels]`,
  getById: `SELECT * FROM [dbo].[GenreMateriels] WHERE id = @id`,
};
exports.personels = {
  getAll: `
  SELECT
    p.[id] as id,
    p.[Nom],
    p.[Prenom],
    p.[Cin],
    p.[DateNaissance],
    p.[Matricule],
    p.[Grade],
    p.[Mission],
    p.[DateAffectation],
    e.[Etablissement],
    c.[Centre]
FROM
    [dbo].[Personnels] p
JOIN
    [dbo].[Etablissements] e ON p.[EtablissementId] = e.[id]
JOIN
    [dbo].[Centres] c ON p.[CentreId] = c.[id]
    Where 1 = 1
  `,
  create: `
  INSERT INTO [dbo].[Personnels]
           ([Nom]
           ,[Prenom]
           ,[Cin]
           ,[DateNaissance]
           ,[Matricule]
           ,[Grade]
           ,[Mission]
           ,[DateAffectation]
           ,[EtablissementId]
           ,[CentreId])
     VALUES
           (@Nom
           ,@Prenom
           ,@Cin
           ,@DateNaissance
           ,@Matricule
           ,@Grade
           ,@Mission
           ,@DateAffectation
           ,@EtablissementId
           ,@CentreId)
  `,
  update: `
  UPDATE [dbo].[Personnels]
   SET [Nom] = @Nom
      ,[Prenom] = @Prenom
      ,[Cin] = @Cin
      ,[DateNaissance] = @DateNaissance
      ,[Matricule] = @Matricule
      ,[Grade] = @Grade
      ,[Mission] = @Mission
      ,[DateAffectation] = @DateAffectation
      ,[EtablissementId] = @EtablissementId
      ,[CentreId] = @CentreId
  WHERE id = @id`,
  getCount: `select count(*) as count from [dbo].[Personnels] `,
  getById: `SELECT * FROM [dbo].[Personnels] WHERE id = @id`,
  delete: `delete from [dbo].[Personnels] WHERE id = @id`,
  getPersonnelChart: `select count(*) as count, year(DateAffectation) as year 
  from [dbo].[Personnels]
    group by year(DateAffectation)`,
  getPersonnelsData: `SELECT
  Grade,
  Mission,
  AVG(DATEDIFF(YEAR, DateNaissance, GETDATE())) AS averageAge,
  (SELECT COUNT(DISTINCT grade) FROM personnels WHERE mission = p.mission) AS uniqueMissionCount,
  (SELECT COUNT(DISTINCT mission) FROM personnels WHERE grade = p.grade) AS uniqueGradeCount
FROM
[dbo].[Personnels] p
GROUP BY
    Grade,
  Mission`,
};

exports.equipements = {
  getAll: `
  SELECT
  Eq.[id] as id,
  M.Materiel,
Eq.Description,
g.GenreMateriel,
  c.Centre,
  e.Etablissement,
  Eq.[CreatedAt]
FROM
  [dbo].[Equipements] Eq
JOIN
  Centres c ON Eq.[CentreID] = c.id
JOIN
  Materiels M ON Eq.MaterielID = M.id
JOIN GenreMateriels g on M.GenreMateriel = g.id
join Etablissements e on c.EtablissementId = e.id
WHERE 1=1`,
  create: `
  INSERT INTO [dbo].[Equipements]
           ([MaterielID]
           ,[Description]
           ,[CentreId])
     VALUES
           (@MaterielID
           ,@Description
           ,@CentreId
           )
  `,
  update: `
  UPDATE [dbo].[Equipements]
  SET [MaterielID] = @MaterielID
     ,[Description] = @Description
     ,[CentreId] = @CentreId
WHERE id = @id
  `,
  getCount: `select count(*) as count from [dbo].[Equipements] `,
  getById: `SELECT * FROM [dbo].[Equipements] WHERE id = @id`,
  delete: `delete from [dbo].[Equipements] WHERE id = @id`,

  getDataTable: `
  SELECT etab.etablissement,
  COUNT(DISTINCT e.MaterielID ) as nb_equipement,
  MAX(g.GenreMateriel) as most_common_categorie,
  count(*) as total
  
FROM
  equipements e
JOIN
  etablissements etab ON e.CentreId = etab.id
JOIN 
materiels m on e.MaterielID = m.id
join 
GenreMateriels g on m.GenreMateriel = g.id 

GROUP BY
etab.etablissement`,
};

exports.besoins = {
  getAll: `
  SELECT
  b.[id] AS id,
  [Besoin],
  [Description],
  M.Materiel ,
  gm.GenreMateriel ,
  C.Centre Centre,
  Etat,
  [CreatedAt]

FROM
  [dbo].[Besoins] b
JOIN
  Materiels M ON b.[MaterielID] = M.id 
JOIN
  GenreMateriels gm ON m.GenreMateriel = gm.id 
JOIN
  Centres C ON b.[CentreID] = C.[id]
WHERE 1 = 1
  `,
  getCount: `select count(*) as count from [dbo].[Besoins] `,
  getById: `SELECT * FROM [dbo].[Besoins] WHERE id = @id`,
  delete: `delete from [dbo].[Besoins] WHERE id = @id`,
  create: `
  INSERT INTO [dbo].[Besoins]
           ([Besoin]
           ,[Description]
           ,[MaterielID]
           ,[CentreId]
           )
     VALUES
           (@Besoin
           ,@Description
           ,@MaterielID
           ,@CentreId
           )
  `,
  update: `
  UPDATE [dbo].[Besoins]
   SET [Besoin] = @Besoin
      ,[Description] = @Description
      ,[MaterielID] = @MaterielID
      ,[CentreId] = @CentreId
      ,[Etat] = @Etat
      WHERE id = @id
      `,
};
