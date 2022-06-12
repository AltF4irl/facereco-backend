
const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => user.length? res.json(user[0]) : res.status(404).json("user not found"))
    .catch(err => res.status(404).json("Error finding user"));   
}

module.exports = {
    handleProfile: handleProfile
}