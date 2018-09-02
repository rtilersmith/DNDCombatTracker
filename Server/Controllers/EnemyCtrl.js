// module.exports = {
// 	add: async (req, res)=>{
// 		try {
// 			let db = req.app.get('db')
// 			console.log(req.body)
// 			let monsters = await db.addMonster(req.body)
// 			res.send(monsters[0])
// 		} catch(error){
// 			console.log('error', error)
// 		}
// 	}
// }