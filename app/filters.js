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

addFilter('arrayToBullets', function (arr) {
	if (arr && Array.isArray(arr)) {
		// If array length is 1, return a string
		if (arr.length === 1) {
			return arr[0]
		}
		return (
			'<ul class="govuk-list govuk-list--bullet">' +
			arr.map((item) => `<li>${item}</li>`).join('') +
			'</ul>'
		)
	}
	return ''
})
