const mask = '+7 (###) ###-##-##';

const isValidPhone = (value: string): boolean => value.length === mask.length;

export { mask, isValidPhone };
