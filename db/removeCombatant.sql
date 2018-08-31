DELETE FROM Combatants
WHERE Character_ID=${id};

DELETE FROM CombatantInfo
WHERE ID=${id};


SELECT * FROM CombatantInfo ci
LEFT JOIN Combatants c
ON ci.ID = c.Character_ID
WHERE c.room = ${battleId}
ORDER BY Current_init DESC