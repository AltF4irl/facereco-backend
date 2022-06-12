
const handleRegister = (req, res, bcrypt, db) => {
    const {username, email, password} = req.body;

    if ((!email || !username || !password) || !email.includes('@')) {
        return res.status(400).json('bad form submission');
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                username: username,
                email: loginEmail[0].email,
                joined: new Date()
            })
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unable to register'));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('cannot register'));
}

module.exports = {
    handleRegister: handleRegister
}