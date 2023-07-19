import * as yup from "yup";

function validate(data) {
    const schema = yup.object({
        to: yup.string().max(256).email().required().label("Email"),
        data: yup.object({
            ["first_name"]: yup.string().min(3).max(150).required().label("First Name"),
            ["last_name"]: yup.string().min(3).max(150).required().label("Last Name"),
            ["g_id"]: yup.string().required().label("Member ID")
        })
    }).required();

    return schema.validate(data)
}

module.exports = validate;