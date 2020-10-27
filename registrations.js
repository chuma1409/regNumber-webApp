module.exports = function Registrations(){

	// const regNumberList = [];
	
//  function addReg(regNumberEnetered){

// 	if(!regNumberList.includes(currentRegNumber)){
// 		regNumberList.push(currentRegNumber)


	
// 	}	
// 	}	
function setRegNumber(regNumber){
	const Dname = await pool.query(`SELECT location FROM regLocation  
		WHERE location = $1`,[newReg]);
		if ( Dname.rowCount === 0){
			const insertReg = await pool.query(`INSERT INTO greet(name, counter) VALUES ($1, 1)`,[newName]);
		}else {
	 const counter = await pool.query(`UPDATE greet 
		SET counter= counter+1
		WHERE location =$1`,[newReg]);
			}	
		}		
}

function filter(list, value){
	const filteredList = [];
	for(var i=0; i<list.length;i++){
		const currentItem = list[i];
		if(currentItem.indexOf(value) !== -1){
			filteredList.push(currentItem)
	}
}
return filteredList;
}

function showList(list){
	regNumber.innerHTML = "";
	for(var i=0; i<list.length;i++){
		const currentItem = list[i];
		const theRegList = document.createElement("li");
		theRegList.innerHTML = currentItem;
		regNumber.appendChild(theRegList)
    }
}
    return{
		// addReg,
        filter,
        showList
    }
}