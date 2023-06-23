import * as yup from "yup";

function validate(member) {
    const schema = yup.object({
        memberId: yup.string().required().label("Member ID"),
        eventId: yup.string().required().label("Event ID")
    }).required();

    return schema.validate(member)
}

module.exports = validate;