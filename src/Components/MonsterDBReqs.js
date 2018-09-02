//GMSETUP


dbBuilder=()=>{
	for (let i = 3 ; i <= 325 ; i++){
		axios.get(`http://www.dnd5eapi.co/api/monsters/${i}`).then(res=>{
			let { name, armor_class, constitution, constitution_save, dexterity, dexterity_save, intelligence, intelligence_save, strength, strength_save, wisdom, wisdom_save, charisma, charisma_save, hit_points } = res.data
			let monster={  name, armor_class, constitution, constitution_save, dexterity, dexterity_save, intelligence, intelligence_save, strength, strength_save, wisdom, wisdom_save, charisma, charisma_save, hit_points };
			monster.strength_save= monster.strength_save || Math.floor((monster.strength-10)/2)
			monster.dexterity_save= monster.dexterity_save || Math.floor((monster.dexterity-10)/2)
			monster.constitution_save= monster.constitution_save || Math.floor((monster.constitution-10)/2)
			monster.wisdom_save= monster.wisdom_save || Math.floor((monster.wisdom-10)/2)
			monster.intelligence_save= monster.intelligence_save || Math.floor((monster.intelligence-10)/2)
			monster.charisma_save= monster.charisma_save || Math.floor((monster.charisma-10)/2)
			console.log(monster)
		axios.post('/api/monsters', monster).then(resp=>{
			console.log(resp.data)
		})
		})
	}
}



<button onClick={this.dbBuilder}>click</button>

//SERVER

EnemyCtrl = require('./Controllers/EnemyCtrl'),

app.post('/api/monsters', EnemyCtrl.add)


//ENEMYCTRL.JS FILE AND ADDMONSTER.SQL FILE