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
	return months[Number(int)-1]
})