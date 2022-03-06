const UserModel = require('../model/user.model');

// service to create a user
const createUser = async (data, hashPassword) => {
    const { first_name, last_name, email, is_admin } = data;

    const user = new UserModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        is_admin: is_admin
    });

    try {
        await user.save();
        return (savedUser = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            is_admin: user.is_admin,
            __v: user.__v
        });
    } catch (err) {
        return err;
    }
}

// Service to get User Profile
const getUserProfile = async (id) => {
    try {
        return await UserModel.findOne({_id: id})
    } catch (err) {
        return err;
    }
}

// Service to update password
const changePassword = async (id, newPass) => {
    try {
        return await UserModel.updateOne(
            {"_id": id},
            { $set: { password: newPass } },
            { new: true }
        );
    } catch (err) {
        return err;
    }
}

// Service to check if email already exist
const isEmailExist = async (email) => {
    try {
        return await UserModel.findOne({email: email});
    } catch (err) {
        return err;
    }
}

// Service  to delete User Account
const deleteAccount = async (id) => {
    try {
        return await UserModel.findOneAndDelete({_id: id});
    } catch (err) {
        return err;
    }
}

// service to get user
const getUser = async (id) => {
    try {
        return await UserModel.findOne({_id: id});
    } catch (err) {
        return err;
    }
}

module.exports = {
    createUser,
    changePassword,
    isEmailExist,
    deleteAccount,
    getUser,
    getUserProfile
}
