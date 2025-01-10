const isObjectTypeGuard = <T extends Record<string, unknown>>(option: any, requiredKeys: (keyof T)[]):
    option is T => {
    if (typeof option !== 'object' || option === null) return false;

    return requiredKeys.every((key) => key in option);
};


export {
    isObjectTypeGuard,
}