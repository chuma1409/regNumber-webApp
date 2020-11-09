const assert = require("assert")
const Registrations =  require("../registrations")

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/registrationstest';
const pool = new Pool({
  connectionString
});

describe("Registrations", function () {
beforeEach(async function () {
    await pool.query("delete from regNumbers");
});
it("should be able to add registration to registration List and database", async function () {
    let registrations = Registrations(pool)

    var regPlate = "CY 12345"

    await registrations.setRegNumber(regPlate)
    assert.deepEqual([{ reg_number: 'CY 12345' }], await registrations.showList());
});
it("should be able to add more then one registrations to the database", async function () {
    const registrations = Registrations(pool)

    var regPlate1 = "CY 09876";
    var regPlate2 = "CJ 23456";
    var regPlate3= "CA 234567";

    await registrations.setRegNumber(regPlate1)
    await registrations.setRegNumber(regPlate2)
    await registrations.setRegNumber(regPlate3)
   

    assert.deepEqual([{ reg_number: "CY 09876" }],[{ reg_number: "CY 09876" }], [{ reg_number: 'CJ 23456' }], [{ reg_number: 'CA 234567' }], await registrations.showList());
});
it("should be able to reset the dataBase and empty the List", async function () {
    const registrations = Registrations(pool)

    var regPlate1 = "CY 09876";
    var regPlate2 = "CJ 23456";
    var regPlate3= "CA 234567";

    await registrations.setRegNumber(regPlate1)
    await registrations.setRegNumber(regPlate2)
    await registrations.setRegNumber(regPlate3)
    

    assert.deepEqual([], await registrations.resetBtn());
});
// it("should be able to filter for Paarl", async function () {
//     const registrations = Registrations(pool)

//     await registrations.setRegNumber("CY 7654")
//     await registrations.setRegNumber("CA 345678")
//     await registrations.setRegNumber("CJ 98765")

//     assert.deepEqual([{ reg_number: "CY 7654" }],[{ reg_number: "CJ 98765" }],[{ reg_number: "CA 345678" }], await registrations.filter('1'));
// });
after( async function () {
    pool.end();
})
});
