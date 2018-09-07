UPDATE combatants
SET current_hp=${current_hp}
WHERE character_id=${id};

SELECT * FROM CombatantInfo ci
LEFT JOIN Combatants c
ON ci.ID = c.Character_ID
WHERE c.room = ${room}
ORDER BY Current_init DESC;