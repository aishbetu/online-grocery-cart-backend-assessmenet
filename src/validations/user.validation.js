const joi = require('joi');

const signupValidation = data => {
    const signupSchema = joi.object({
        first_name: joi.string().required().min(3),
        last_name: joi.string().required().min(3),
        email: joi.string().email().required(),
        password: joi.string().required().min(6),
        is_admin: joi.boolean().default(false)
    });

    return signupSchema.validate({ first_name: data.first_name, last_name: data.last_name, email: data.email, password: data.password, is_admin: data.is_admin });
}

const loginValidation = data => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(6)
    });

    return loginSchema.validate({ email: data.email, password: data.password });
}

const passwordResetValidation = data => {
    const passwordSchema = joi.object({
        old_password: joi.string().required().min(6),
        password: joi.string().required().min(6)
    });

    return passwordSchema.validate({ old_password: data.old_password, password: data.password });
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordResetValidation = passwordResetValidation;
