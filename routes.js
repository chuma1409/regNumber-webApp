module.exports = function route(registrations){
    const home = async function(req, res){
        res.render("index");
    };
    const addReg = async function(req, res) {
        var regPlate = req.body.regiNumber.toUpperCase()
        let checkDuplicate = await registrations.repCheck(regPlate)
        var regexCheck = await registrations.checkRegex(regPlate)
      
        if (regPlate == ""){
          var reg = await registrations.showList();
          req.flash('error',"Please enter Registration Number")
      
      } 
       else if (checkDuplicate === 0){
         if(regexCheck){
          await registrations.setRegNumber(regPlate)
          var reg = await registrations.showList();
          req.flash('success','Registration has been sucessfully added')
         }
         else{
        var reg = await registrations.showList();
        req.flash('error', 'Please enter a valid registration')
       
      }
       }
       else if (checkDuplicate !== 0) {
         
          await registrations.setRegNumber(regPlate);
          var reg = await registrations.showList();
          req.flash('exists', 'This registration has already been added')
         
         
        }
        res.render("index", {
            reg_number: reg
        });
      }
      const filter = async function(req, res) {
        var town = req.query.town
      if(town === "") {
        req.flash('error', "please select town")
      }else{
        var filteredList = await registrations.filter(town); 
      }
      
      
      res.render("index", {
        reg_number: filteredList
      })
      
      }
      const reset = async function(req, res) {
        await registrations.resetBtn()
        res.redirect("/")
      }

return {
home,
addReg,
filter,
reset
}
}