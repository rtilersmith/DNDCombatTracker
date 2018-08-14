module.exports = {

	create: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { name, ac, hp, strength, dex, con, wis, intel, cha, init } = req.body;
			let newCombatant = { name, ac, hp, strength, dex, con, wis, intel, cha, init }
			let combatants = await db.createCombatant(newCombatant);
			let Character_ID = combatants[0].id;
			let listItem = {Character_ID, hp, init};
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
		let combatants = await db.getCombatants();
		res.send(combatants)
		} catch (error) {
			console.log('error getting combatants:', error)
			res.status(500).send(error)
		}
	},
	readOne: async (req, res)=>{
		try {
			let db = req.app.get('db')
			console.log(req.body)
			let combatant = await db.getCombatant(req.body);
			res.send(combatant);
		} catch (error) {
			console.log('could not retrieve combatant:' ,error)
			res.status(500).send(error)
		}
	},
	update: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { id } = req.body;

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