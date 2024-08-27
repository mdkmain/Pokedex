export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeStats = (stat: string) => {
	return stat
		.split('-')
		.map((word) => capitalizeFirstLetter(word))
		.join(' ');
};
