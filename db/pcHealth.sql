UPDATE combatants
SET current_hp=${num}
WHERE room=${battleId}
AND (character_id = (
	select id from combatantinfo ci
	JOIN combatants c
	on ci.id = c.character_id
	WHERE name=${name} AND c.room = ${battleId})
);
SELECT * FROM combatants c
JOIN combatantinfo ci
ON ci.id = c.character_id
WHERE c.room=${battleId}
AND ci.name=${name};