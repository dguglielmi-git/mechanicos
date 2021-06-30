const dollarCurrency = { style: 'currency', currency: 'ARS' };
const dollarFormat = new Intl.NumberFormat('es-ES', dollarCurrency);

export function numToDollar(number) {
    return "$".concat(dollarFormat.format(number).replace('ARS', ''));
}

export function numToDollarRounded(number) {
	let val = "$".concat(dollarFormat.format(Math.ceil(number)).replace('ARS', ''));
    return val.substr(0,val.length-4);
}

export function getEntries(entries) {
	let result = {}
	for (let entry of entries) {
		let [key, val] = entry
		if (key.endsWith('[]')) {
			key = key.slice(0, -2);
			(result[key] || (result[key] = [])).push(val)
		} else {
			result[key] = val
		}
	}
	return result;
}
