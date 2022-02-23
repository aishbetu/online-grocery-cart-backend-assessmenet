const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// local imports
const { createUser, isEmailExist, getUser, changePassword, getUserProfile, deleteAccount } = require('../services/user.service');
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
                id: newUser._id
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
    res.status(200).json({_id: user.id, is_admin: user.is_admin, token});
}

exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const profile = await getUserProfile(userId)
        console.log(profile);
        res.status(200).send({ _id: profile._id, first_name: profile.first_name, last_name: profile.last_name, email: profile.email, is_admin: profile.is_admin, __v: profile.__v });
    } catch (err) {
        console.log(err);
        res.send({message: "Error Occurred", err});
    }
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

exports.deleteUser = async (req, res) => {
    console.log('delete called');
    const userId = req.user.id;
    try {
        const deletedUser = await deleteAccount(userId);
        console.log(deletedUser)
        if (deletedUser == null) return res.send({message: "Account already deleted"});
        res.status(200).send({message: "Account has been deleted", deletedUser});
    } catch (err) {
        console.log(err);
        res.send({message: "Error Occurred", err});
    }
}
