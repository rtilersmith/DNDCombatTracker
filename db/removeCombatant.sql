DELETE FROM Combatants
WHERE Character_ID=$1;

DELETE FROM CombatantInfo
WHERE ID=$1;


SELECT * FROM CombatantInfo ci
LEFT JOIN Combatants c
ON ci.ID = c.Character_ID
ORDER BY Current_init DESC