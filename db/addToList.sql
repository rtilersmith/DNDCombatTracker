INSERT INTO COMBATANTS (Character_ID, Current_HP, Current_Init, room)
VALUES (${Character_ID}, ${health}, ${init}, ${room});
SELECT * FROM CombatantInfo ci
LEFT JOIN Combatants c
ON ci.ID = c.Character_ID
where C.Character_ID=${Character_ID};