const formatPercentage = (value: string | number): string => {
    const stringValue = String(value).trim();
    return stringValue.endsWith("%") ? stringValue : `${stringValue}%`;
};

export {
    formatPercentage,
}