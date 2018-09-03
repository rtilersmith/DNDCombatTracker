module.exports = {

	create: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { name, ac, health, strength, dex, con, wis, intel, cha, init, room } = req.body;
			let newCombatant = { name, ac, health, strength, dex, con, wis, intel, cha, init }
			let combatants = await db.createCombatant(newCombatant);
			let Character_ID = combatants[0].id;
			let listItem = {Character_ID, health, init, room};
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
		let combatants = await db.getCombatants(req.query);
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
		try {
			let db = req.app.get('db')
			let player = await db.getPlayer(req.body)
			res.send(player[0])
		} catch (error) {
			console.log('could not retrieve player:' ,error)
			res.status(500).send(error)
		}
	},
	playerHealth: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let player = await db.pcHealth(req.body)
			let {current_hp}=player[0];
			res.send(player[0])
		} catch (error) {
			console.log('error updating health', error)
			res.status(500).send(error)
		}
	},
	update: async (req, res)=>{
		try {
			let db = req.app.get('db')
			console.log('body.change', req.body.change, 'params.id', req.params.id)
			let info = {id:req.params.id, current_hp:req.body.change}
			let combatant = await db.updateCombatant(info);
			res.send('good to go')

		} catch (error) {
			console.log('failed to update combatant:', error)
			res.status(500).send(error)
		}
	},
	delete: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let dropped = await db.removeCombatant(req.params)
			res.send(dropped)

		} catch (error) {
			console.log('failed to update combatant:', error)
			res.status(500).send(error)
		}
	}
}