const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;

    if(!id) return res.status(400).json('User is not signed in');

    // if there is nothing it will return an empty array
    knex.select('*').from('users').where('id', id)
    .then(user => {
        if(!(user.length === 0)) {
            res.json(user[0])
        } else {
            res.status(400).json('Page not found');
        }
    });

}

const handleProfileUpdate = (req, res, knex) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;
    knex('users')
    .where({ id })
    .update({ name })
    .update({ age })
    .update({ pet })
    .then(resp => {
        if(resp) {
            res.json('success');
        } else {
            res.status(400).json('Unable to update');
        }
    })
    .catch(err => res.status(400).json('error updating user'));
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileUpdate: handleProfileUpdate
}