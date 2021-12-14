
function checkAdmin(req, res, next){
    console.log(admin);
    if(admin){
        next();
    } else {
        res.json({error : 'Permission denied'})
    }
}

module.exports = checkAdmin;