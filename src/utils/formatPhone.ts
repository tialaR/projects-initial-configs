const formatPhoneNumberWithExtraPrefix = (phone: string) => {
    const digits = phone.replace(/\D/g, '');

    if (digits.length <= 11) {
        // Fixo: (11) 2345-6789 ou Celular: (11) 98765-4321
        return digits.length === 10
            ? digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
            : digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    // Mais de 11 dígitos — presumimos que os primeiros são o DDI
    const extra = digits.length - 11;
    const prefix = digits.slice(0, extra);
    const number = digits.slice(extra);

    const formatted =
        number.length === 10
            ? number.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
            : number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return `+${prefix} ${formatted}`;
}

export {
    formatPhoneNumberWithExtraPrefix
}
