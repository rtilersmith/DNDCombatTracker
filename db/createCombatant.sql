INSERT INTO CombatantInfo ( name, ac, hp, str, dex, con, wis, int, cha, initiative )
VALUES (${name}, ${ac}, ${hp}, ${strength}, ${dex}, ${con}, ${wis}, ${intel}, ${cha}, ${init})
RETURNING *;