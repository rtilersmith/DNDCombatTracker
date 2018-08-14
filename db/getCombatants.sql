SELECT * FROM Combatants c
JOIN CombatantInfo ci
ON ci.ID = c.Character_ID
ORDER BY Current_init DESC