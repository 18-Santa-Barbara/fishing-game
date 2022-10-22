export enum Validator {
    login = 'login',
    password = 'password',
    email = 'email',
    first_name = 'first_name',
    second_name = 'second_name',
    phone = 'phone',
    confirm_password = 'confirm_password',
    message = 'message'
}

const validationRules: { [key: string]: (value: string) => string } = {
    login: (value: string) => {
        if (value.length < 3) {
            return 'Login must be more than 3 symbols!';
        }
        if (value.length > 20) {
            return 'Login must be less than 20 symbols!';
        }
        if (/^\d+$/i.test(value)) {
            return "Login can't only consist of numbers!";
        }
        if (!/^[a-zA-Z0-9\-_]+$/.test(value)) {
            return 'Invalid symbols!';
        }

        return '';
    },
    password: (value: string) => {
        if (value.length < 8 || value.length > 40) {
            return 'Password must more than 8 symbols and less than 40 symbols!';
        }
        if (!/[A-ZА-ЯЁ]/.test(value)) {
            return 'Password maust contain one capital letter!';
        }
        if (!/[0-9]/.test(value)) {
            return 'Password maust contain one number!';
        }

        return '';
    },
    email: (value: string) => {
        if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
            return 'Invalid email!';
        }
        return '';
    },
    first_name: (value: string) => {
        if (!/^([A-Z][a-z]+)|([А-Я][а-я]+)$/.test(value)) {
            return 'Invalid name!';
        }
        return '';
    },
    second_name: (value: string) => {
        if (!/^([A-Z][a-z]+)|([А-Я][а-я]+)$/.test(value)) {
            return 'Invalid surname!';
        }
        return '';
    },
    phone: (value: string) => {
        if (!/^\+?\d{10,15}$/.test(value)) {
            return 'Invalid phone number!';
        }
        return '';
    },
    message: (value: string) => {
        if (!value.length) {
            return 'Empty input';
        }
        return '';
    },
    display_name: (value: string) => {
        if (!value.length) {
            return 'Empty display name!';
        }
        return '';
    },

};
export function validateValue(rule: Validator | string, value: string) {
    return validationRules[rule](value);
}
