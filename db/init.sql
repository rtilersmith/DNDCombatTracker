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

