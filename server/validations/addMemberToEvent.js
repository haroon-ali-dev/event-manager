import * as yup from "yup";

function validate(member) {
    const schema = yup.object({
        memberId: yup.string().min(3).max(100).required().label("Member ID"),
        eventId: yup.number().required().label("Event ID")
    }).required();

    return schema.validate(member)
}

module.exports = validate;