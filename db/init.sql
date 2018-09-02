CREATE TABLE CombatantInfo (
	ID SERIAL PRIMARY KEY,
	Name VARCHAR(30),
	AC INTEGER,
	HP INTEGER,
	Str INTEGER,
	Dex INTEGER,
	Con INTEGER,
	Wis INTEGER,
	Int INTEGER,
	Cha INTEGER,
	Initiative INTEGER,
	Skills VARCHAR(250)
);

CREATE TABLE Combatants (
	Current_HP INTEGER,
	Current_Init INTEGER,
	Character_ID INTEGER references CombatantInfo
);

ALTER TABLE combatantinfo
DROP COLUMN skills;

ALTER TABLE Combatants
ADD COLUMN room;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	auth_id TEXT,
	name VARCHAR,
	email VARCHAR,
	picture TEXT
)

CREATE TABLE monsters (
	id PRIMARY KEY,
	name VARCHAR,
	armor_class INTEGER,
	constitution INTEGER,
	constitution_save INTEGER,
	dexterity INTEGER,
	dexterity_save INTEGER,
	intelligence INTEGER,
	intelligence_save INTEGER,
	strength_save INTEGER,
	wisdom INTEGER,
	wisdom_save INTEGER,
	charisma INTEGER,
	charisma_save INTEGER,
	hit_points INTEGER
)

ALTER TABLE monsters
ADD COLUMN strength