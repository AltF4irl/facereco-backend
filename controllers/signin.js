const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;

    db.select('email', 'hash').from('login').where({email})
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid) {
            return db.select('*').from('users').where({email})
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('enable to get user'));
        } else {
            res.status(400).json("Wrong email/password combination");
        }
    })
    .catch(err => res.status(400).json("Wrong email/password combination"));
}

module.exports = {
    handleSignin: handleSignin
}