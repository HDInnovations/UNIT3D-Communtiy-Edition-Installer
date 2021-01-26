export interface ValidationI {
    valid: boolean
    error?: string
}

export const NotEmpty = (input: string): ValidationI => {
    if (input === '') {
        return {valid: false, error: 'Required'};
    }
    return {valid: true};
};

export const Length = (input: any[], length: number): ValidationI => {
    if (input.length !== length) {
        return {valid: false, error: `Should be exactly ${length.toString()} characters long`}
    }
    return {valid: true};
};

export const MinLength = (input: any[], length: number): ValidationI => {
    if (input.length < length)
        return {valid: false, error: `Should be at least ${length.toString()} characters long`};

    return {valid: true};
};

export const MaxLength = (input: any[], length: number): ValidationI => {
    if (input.length > length)
        return {valid: false, error: `Should not exceed ${length.toString()} characters long`};

    return {valid: true};
};

export const LengthBetween = (input: any[], min: number, max: number): ValidationI => {
    if (input.length < min || input.length > max)
        return {valid: false, error: `Should be between ${min.toString()} and ${max.toString()} characters long`};

    return {valid: true};
};

export const NoSpecialChars = (input: string): ValidationI => {
    const scCheck = new RegExp('^[a-zA-Z0-9]+$');

    if (!scCheck.test(input))
        return {valid: false, error: 'No special characters allowed'};

    return {valid: true};
};

export const LimitSpecialChars = (input: string): ValidationI => {
    const scCheck = new RegExp('^[a-zA-Z0-9-_]+$');

    if (!scCheck.test(input))
        return {valid: false, error: 'You are limited to alpha-numeric with dashes and underscores, No other special characters allowed!'};

    return {valid: true};
};

export const Domain = (input: string): ValidationI => {
    const domainCheck = new RegExp('^[a-zA-Z0-9-.]+(com|net|org|me|xyz|io|site)$');

    if (!domainCheck.test(input))
        return {valid: false, error: 'Not a valid domain (ie: domain.com) [com|net|org|me|xyz|io|site]'};

    return {valid: true};
};

export const Ip = (input: string): ValidationI => {
    const ipCheck = new RegExp('^\\d{2,3}.\\d{1,3}.\\d{1,3}.\\d{1,3}$');

    if (!ipCheck.test(input))
        return {valid: false, error: 'Not a valid ip format (ie: 192.168.1.1)'};

    return {valid: true};
};

export const Email = (input: string): ValidationI => {
    const emailCheck = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    if (!emailCheck.test(input))
        return {valid: false, error: 'Not a valid email format (ie: email@domain.com)'};

    return {valid: true};
};

export const Password = (input: string): ValidationI => {
    const lcCheck = new RegExp('(?=.*[a-z])');
    const ucCheck = new RegExp('(?=.*[A-Z])');
    const numCheck = new RegExp('(?=.*[0-9])');

    if (input.length < 8)
        return {valid: false, error: 'Must be eight characters or longer'};

    if (!lcCheck.test(input))
        return {valid: false, error: 'Must contain at least 1 lowercase character'};

    if (!ucCheck.test(input))
        return {valid: false, error: 'Must contain at least 1 uppercase alphabetical character'};

    if (!numCheck.test(input))
        return {valid: false, error: 'Must contain at least 1 numeric character'};

    return {valid: true};
};

export const confirmPassword = (input: string, compareTo: string): ValidationI => {
    if (input !== compareTo)
        return {valid: false, error: 'Passwords do not match. Try again!'};

    return {valid: true};
};
