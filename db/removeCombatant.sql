DELETE FROM Combatants
WHERE Character_ID=$1;

DELETE FROM CombatantInfo
WHERE ID=$1;


SELECT * FROM Combatants c
JOIN CombatantInfo ci
ON ci.ID = c.Character_ID
ORDER BY Current_init DESC