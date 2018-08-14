SELECT * FROM Combatants c
JOIN CombatantInfo ci
ON ci.ID = c.Character_ID
WHERE ci.ID=${id}
