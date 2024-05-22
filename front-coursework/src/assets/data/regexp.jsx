export const nameRegex = new RegExp('^[^0-9]*$');
export const combinedPhoneRegex = /^(\(\d{3}\) ?\d{3}-\d{4}|\+?\d{12})$/;
export const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
export const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.,/-])[A-Za-z\\d@$!%*?&.,/-]+$');