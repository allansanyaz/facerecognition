const createSessions = require('./signin').createSessions;

const handleRegister = (req, res, knex, bcrypt) => {
    const {email, name, password} = req.body;

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            knex.transaction(trx => {
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date(),
                    })
                    .then(user => {
                        createSessions(user[0])
                            .then(session => res.json(session))
                            .catch(err => res.status(400).json(err));
                    })
                })
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .catch(err => {
                console.log("The error is:", err);
                return res.status(400).json('unable to register')}
                );
        })
    })
    
}

module.exports = {
    handleRegister: handleRegister
}