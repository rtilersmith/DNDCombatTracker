UPDATE combatants
SET current_hp=${num}
WHERE room=${battleId}
AND character_id = (select id from combatantinfo
WHERE name=${name})