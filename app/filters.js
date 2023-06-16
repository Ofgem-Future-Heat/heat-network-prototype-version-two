const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('redirect', function (str) {
	return '<script>window.location.href = "' + str + '";</script>'
})

addFilter('debug', function (str) {
	return JSON.stringify(str, null, 2)
})

addFilter('monthName', function (int) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	return months[Number(int) - 1]
})

addFilter('includes', function (arr, str) {
	if (arr && Array.isArray(arr)) {
		return arr.includes(str)
	}
	return false
})

addFilter('commas2br', function (str) {
	// test if str is type string
	if (typeof str !== 'string') {
		return str.replace(/,/g, '<br>')
	} else {
		return str
	}
})
