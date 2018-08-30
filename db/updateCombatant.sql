UPDATE Combatants c
join combatantInfo ci
on ci.ID = c.Character_ID
SET c.current_hp=${current_hp}
WHERE ci.name=${name}