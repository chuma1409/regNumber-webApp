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
        let select = await pool.query('select reg_number from regNumbers where reg_number=$1', [regInserted])
        if (select.rowCount === 0) {
            await pool.query('insert into regNumbers (reg_number) values ($1)', [regInserted])
        }
    }
    async function showList() {
        const list = await pool.query('select reg_number from regNumbers')
		console.log(list.rows)
		return list.rows;
    }
    async function resetBtn() {
        await pool.query('delete from regNumbers')
    }

  
    return {
        showList,
        setRegNumber,
        resetBtn
        
    }

}
