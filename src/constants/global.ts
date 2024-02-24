export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const gernders = ["male", "female", "others"];

export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const monthOptions = monthNames.map((item) => ({
    value: item,
    label: item
}))


export const bloodGroupOptions = bloodGroup.map((item) => ({
    value: item,
    label: item
}))

export const gendersOptions = gernders.map((item) => ({
    value: item,
    label: item
}))
export const weekDaysOptions = weekdays.map((item) => ({
    value: item,
    label: item
}))

