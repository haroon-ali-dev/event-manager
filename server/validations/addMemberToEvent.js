import * as yup from "yup";
import { parse, isDate } from "date-fns";

const today = new Date();

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

function validate(member) {
    const schema = yup.object({
        firstName: yup.string().min(3).max(150).required().label("First Name"),
        lastName: yup.string().min(3).max(150).required().label("Last Name"),
        gender: yup.string().required("Please select a gender.").label("Gender"),
        dateOfBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),
        address: yup.string().min(3).max(300).required().label("Address"),
        postCode: yup.string().min(3).max(20).required().label("Post Code"),
        email: yup.string().max(256).email().required().label("Email"),
        mobile: yup.string().min(3).max(11).required().label("Mobile"),
        additionalInfo: yup.string().max(1000).label("Additional Info"),
    }).required();

    return schema.validate(member)
}

module.exports = validate;