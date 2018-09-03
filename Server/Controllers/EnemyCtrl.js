module.exports = {
	// add: async (req, res)=>{
	// 	try {
	// 		let db = req.app.get('db')
	// 		let monsters = await db.addMonster(req.body)
	// 		res.send(monsters[0])
	// 	} catch(error){
	// 		console.log('error', error)
	// 	}
	// }
	read: async (req, res)=>{
		try {
			let db = req.app.get('db')
		let monsters = await db.getMonsters();
		res.send(monsters)
		} catch (error) {
			console.log('error getting monsters:', error)
			res.status(500).send(error)
		}
	},

	readOne: async (req, res)=>{
		try {
			let db = req.app.get('db')
			let monsters = await db.getMonster(req.params)
			res.send(monsters[0])
		} catch (error) {
			console.log('could not retrieve monster:', error)
			res.status(500).send(error)
		}
	}
}