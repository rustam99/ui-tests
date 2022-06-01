const isValidEmail = (email: string): boolean => {
	if (!email || email?.length < 2 || email?.indexOf('@') === -1) {
		return false;
	}

	const name = email.split('@')[0];
	const domain = email.split('@')[1];

	if (
		name[0] === '-'
		|| name.slice(-1) === '-'
		|| /-{2,}/.test(name)
		|| /\.{2,}/.test(name)
		|| domain[0] === '-'
		|| domain.slice(-1) === '-'
		|| /-{2,}/.test(domain)
		|| /\.{2,}/.test(domain)
	) {
		return false;
	}

	return /^[a-zA-Z0-9._-]{1,30}@[a-zA-Z0-9.-]{1,32}\.[a-zA-Z]{2,15}$/.test(email);
};

export default isValidEmail;
