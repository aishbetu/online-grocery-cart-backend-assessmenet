const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// local imports
const { createUser, isEmailExist, getUser, changePassword} = require('../services/user.service');
const { signupValidation, loginValidation, passwordResetValidation } = require('../validations/user.validation');


exports.signupUser = async (req, res) => {
    console.log("signup called");
    // schema validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(422).send({message: error.details[0].message});

    const { email, password } = req.body;

    // check if email exist
    if (await isEmailExist(email)) return res.status(400).send({message: 'Email already exist'});

    // hashing password before saving to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);

    try {
        const newUser = await createUser(req.body, hashedPassword);
        console.log(newUser);

        // create JWT token & send to client
        const payload = {
            user: {
                id: newUser.id
            }
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });
        res.status(200).send({message: "account has been created", newUser, token});
    } catch (err) {
        res.send({message: "Error Occurred", err});
    }
}

exports.loginUser = async (req, res) => {
    console.log("login called");
    // schema validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(422).send({message: error.details[0].message});

    const { email, password } = req.body;

    // if email not exist
    const user = await isEmailExist(email);
    if (!user) return res.status(400).send({message: 'User does not exist'});

    // validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({message: 'Invalid password'});

    // create JWT token & send to client
    const payload = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    res.status(200).json({user,token});
}

exports.updatePassword = async (req, res) => {
    console.log("updated user called");
    // schema validation
    const { error } = passwordResetValidation(req.body);
    if (error) return res.status(422).send({message: error.details[0].message});

    const { old_password, password } = req.body;
    // get user by id from middleware
    const user = await getUser(req.user.id).catch((err) => {
        console.log(err);
        return res.send({message: "Error Occurred", err});
    });

    // validate old password
    const oldPasswordValidate = await bcrypt.compare(old_password, user.password);
    if (!oldPasswordValidate) return res.status(400).send({message: 'Invalid password'});

    // hashing new password before saving to db
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword =await bcrypt.hash(password, salt);

    try {
        const updatedUserPassword = await changePassword(user.id, newHashedPassword);
        console.log(updatedUserPassword);
        res.status(200).send({message: "password has been updated", updatedUserPassword});
    } catch (err) {
        console.log(err);
        res.send({message: "Error Occurred", err});
    }
}
