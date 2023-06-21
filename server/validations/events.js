import * as yup from "yup";
import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

function validate(events) {
    const schema = yup.object({
        name: yup.string().min(3).max(150).required().label("Name"),
        date: yup.date().transform(parseDateString).label("Date"),
        information: yup.string().max(1000).label("Information"),
        }).required();

    return schema.validate(events);
}

module.exports = validate;