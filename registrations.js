//const { Pool } = require("pg");

module.exports = function Registrations(pool) {

	async function setRegNumber(regInserted) {

		var string = regInserted.substring(0, 2).trim()
		var town_id = await pool.query(`select id from towns where start_string=$1`, [string])
		var idcheck = town_id.rows[0].id
		// console.log(idcheck);
		let select;
		if (idcheck > 0) {
			select = await pool.query('select reg_number from regNumbers where reg_number=$1', [regInserted])
		}else {
			return false
		}
// 
		if (select.rowCount == 0) {
			await pool.query('insert into regNumbers (reg_number, town_id) values ($1, $2)', [regInserted, idcheck])
		}else{
			return false
		}
	}

	async function showList() {
		const list = await pool.query('select reg_number from regNumbers')
		console.log(list.rows)
		return list.rows;
	}
	async function repCheck(regInserted) {
		let checkDuplicate = await pool.query('select reg_number from regNumbers where reg_number=$1', [regInserted])
		return checkDuplicate.rowCount;
	}
	function checkRegex(plate) {
        return (/C[YAJ] \d{3,5}$/.test(plate) || /C[YAJ] \d{3,4}-\d{2,4}$/.test(plate))
    }
	async function resetBtn() {
		const clear = await pool.query('delete from regNumbers')
		return clear.rows
	}
	async function filter(idKey) {
		
		if (idKey === 'All') {
			const list = await pool.query('select reg_number from regNumbers');
			return list.rows
		} else {
			var strings = idKey.substring(0, 2).trim()
			var location_id = await pool.query(`select id from towns where start_string = $1`, [strings])
			// console.log(town_id)
			var idcheck = location_id.rows[0].id
			// console.log(idcheck)
			const filter = await pool.query('select reg_number from regNumbers where town_id=$1', [idcheck]);
			 console.log(filter.rows);
			return filter.rows;
		}



	}


	return {
		checkRegex,
		showList,
		repCheck,
		setRegNumber,
		resetBtn,
		filter

	}

}
