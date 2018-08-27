UPDATE Combatants c
join combatantInfo ci
on ci.ID = c.Character_ID
SET c.${key}=${value}
WHERE ci.name=${name}