//const { Pool } = require("pg");

module.exports = function Registrations(pool) {

	

	// async function setRegNumber(regInserted) {
	
	// 	var string = regInserted.substring(0, 2).trim()
	// 	var checking = await regCheck(string)
	// 	var id = checking.rows[0].id

	// 	var insert = await pool.query(`INSERT INTO regNumber (number_plate, reg_key) values ($1, $2)`, [regInserted]);
	// 	console.log(insert)
	// 	return insert;

    async function setRegNumber(regInserted) {
			var string = regInserted.substring(0, 2)
		var town_id = await pool.query(`select id from towns where start_string=$1`, [string])
		var idcheck = town_id.rows[0].id
		var select;
		if(idcheck > 0){
			 select = await pool.query('select reg_number from regNumbers where reg_number=$1', [regInserted])
		}
        
        if (select.rowCount === 0) {
            await pool.query('insert into regNumbers (reg_number, town_id) values ($1, $2)', [regInserted, idcheck])
        }
    }
    async function showList() {
        const list = await pool.query('select reg_number from regNumbers')
		console.log(list.rows)
		return list.rows;
	}
	async function repCheck(regInserted){
		var checkDuplicate = await pool.query('select reg_number from regNumbers where reg_number=$1', [regInserted])
        return checkDuplicate.rowCount;
	}
	function regex(numberPlate) {
        return (/C[YAJ] \d{3,5}$/.test(numberPlate))
    }
    async function resetBtn() {
        await pool.query('delete from regNumbers')
	}
	async function filter(selectedId){
		if (selctedId === 'All') {
            return showList();

        } else {
            var town = await pool.query('select reg_number from regNumbers where town_id=$1', [selectedId]);
			console.log(town);
			return town;
        }

    

	}

  
    return {
		regex,
		showList,
		repCheck,
        setRegNumber,
		resetBtn,
		filter
        
    }

}
