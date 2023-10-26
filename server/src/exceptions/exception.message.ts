export function exceptionMessage(message, field) {
    return {
        message: JSON.stringify({[`${field}`]: message})
    };
}