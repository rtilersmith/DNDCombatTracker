module.exports = {

	create: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { name, ac, hp, strength, dex, con, wis, intel, cha, init, room } = req.body;
			let newCombatant = { name, ac, hp, strength, dex, con, wis, intel, cha, init }
			let combatants = await db.createCombatant(newCombatant);
			let Character_ID = combatants[0].id;
			let listItem = {Character_ID, hp, init, room};
			let part2 = await db.addToList(listItem);
			res.send(part2[0])

		} catch (error) {
			console.log('error adding combatant:', error)
			res.status(500).send(error)
		}
	},
	read: async (req, res)=>{
		try {
			let db = req.app.get('db')
			console.log('1111',req.query)
		let combatants = await db.getCombatants(req.query);
		console.log('combatants', combatants)
		res.send(combatants)
		} catch (error) {
			console.log('error getting combatants:', error)
			res.status(500).send(error)
		}
	},
	readOne: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let combatant = await db.getCombatant(req.body);
			res.send(combatant);
		} catch (error) {
			console.log('could not retrieve combatant:' ,error)
			res.status(500).send(error)
		}
	},
	readPlayer: async (req, res)=>{
		console.log(req.body)
		try {
			let db = req.app.get('db')
			let player = await db.getPlayer(req.body)
			res.send(player[0])
		} catch (error) {
			console.log('could not retrieve player:' ,error)
			res.status(500).send(error)
		}
	},
	update: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { id } = req.body;
			console.log(req.body)
			res.send('good to go')
			// let combatant = await db.updateCombatant(req.body);

		} catch (error) {
			console.log('failed to update combatant:', error)
			res.status(500).send(error)
		}
	},
	delete: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { id } = req.params;
			let dropped = await db.removeCombatant(id)
			res.send(dropped)

		} catch (error) {
			console.log('failed to update combatant:', error)
			res.status(500).send(error)
		}
	}
}