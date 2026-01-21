const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

var version = "v36";

function clearvalidation(req) {
	req.session.data.validationErrors = {};
	req.session.data.validationError = "false";
	req.session.data.includeValidation = req.query.iv || req.session.data.includeValidation;
}

//////// PAGE SETUP //////
router.use(function (req, res, next) {
	req.session.data["version"] = version;
	clearvalidation(req);
	req.session.lastPage = req.originalUrl;
	next(); // Continue to the actual route handler
});

function generateSupplierHN(req) {
	req.session.data["role"] = "Energy supplier";
	req.session.data["HNID"] = "496458931";
	req.session.data["HNStatus"] = "Not started";
	req.session.data["introrelevant"] = "Yes";
	req.session.data["introgroundloop"] = "No";
	req.session.data["introcommunal"] = "No";
	req.session.data["introbuildingstotal"] = "3";
	req.session.data["introbuildingshowmany"] = "3";
	req.session.data["introcommunaloperate"] = "Yes";
	req.session.data["introcommunaloperatehowmany"] = "1";
	req.session.data["introhnbuildings"] = "2";
	req.session.data["introenergycentre"] = "Yes";
	req.session.data["introenergycentrehowmany"] = "2";
	req.session.data["intropipework"] = "Yes";
	req.session.data["introsuppliers"] = "No";
	req.session.data["introsupplycurrent"] = "Yes";
	req.session.data["supplywhen"] = "2022";
	req.session.data["introselfsupply"] = "No";
	req.session.data["introbuy"] = "Yes";
	req.session.data["introsell"] = "No";
	req.session.data["name"] = "Seaton City Centre";
	req.session.data["introcomplete"] = "true";
	req.session.data["introsupply20"] = "No";
	req.session.data["introresponsible"] = "Yes";

	req.session.data["operator"] = "British Gas";

	req.session.data["ecaddressHasPostcode"] = "Yes";
	req.session.data["ecaddressSelected"] = "329-271, Links Rd, Aberdeen, AB2 45DJ";
	req.session.data["ecaddresslatitude"] = "57.15340080950945";
	req.session.data["ecaddresslongitude"] = "-2.0840666225762705";
	req.session.data["energytype"] = ["Space heating", "Process heating"];
	req.session.data["techcapacity"] = "120";
	req.session.data["techtechnology"] = ["Biofuel boiler"];
}

function generateOperatorHN(req) {
	req.session.data["role"] = "Operator and supplier";
	req.session.data["HNID"] = "496458931";
	req.session.data["HNStatus"] = "In progress";
	req.session.data["introrelevant"] = "Yes";
	req.session.data["introgroundloop"] = "No";
	req.session.data["introcommunal"] = "No";
	req.session.data["introbuildingstotal"] = "3";
	req.session.data["introbuildingshowmany"] = "3";
	req.session.data["introcommunaloperate"] = "Yes";
	req.session.data["introcommunaloperatehowmany"] = "1";
	req.session.data["introhnbuildings"] = "2";
	req.session.data["introenergycentre"] = "Yes";
	req.session.data["introenergycentrehowmany"] = "2";
	req.session.data["intropipework"] = "Yes";
	req.session.data["introsuppliers"] = "No";
	req.session.data["introsupplycurrent"] = "Yes";
	req.session.data["supplywhen"] = "2022";
	req.session.data["introselfsupply"] = "No";
	req.session.data["introbuy"] = "Yes";
	req.session.data["introsell"] = "No";
	req.session.data["name"] = "London Road Tower";
	req.session.data["introcomplete"] = "true";
	req.session.data["introsupply20"] = "No";
	req.session.data["introresponsible"] = "Yes";
	req.session.data["operator"] = "British Gas";

	req.session.data["ecaddressHasPostcode"] = "Yes";
	req.session.data["ecaddressSelected"] = "329-271, Links Rd, Aberdeen, AB2 45DJ";
	req.session.data["ecaddresslatitude"] = "57.15340080950945";
	req.session.data["ecaddresslongitude"] = "-2.0840666225762705";
	req.session.data["energytype"] = ["Space heating", "Process heating"];
	req.session.data["techcapacity"] = "120";
	req.session.data["techtechnology"] = ["Biofuel boiler"];
	req.session.data["eccomplete"] = "true";
}

function generateOperatorCompleteHN(req) {
	req.session.data["role"] = "Operator and supplier";
	req.session.data["HNID"] = "496458931";
	req.session.data["HNStatus"] = "Submitted";
	req.session.data["introrelevant"] = "Yes";
	req.session.data["introgroundloop"] = "No";
	req.session.data["introcommunal"] = "No";
	req.session.data["introbuildingstotal"] = "5";
	req.session.data["introbuildingshowmany"] = "5";
	req.session.data["introcommunaloperate"] = "Yes";
	req.session.data["introcommunaloperatehowmany"] = "1";
	req.session.data["introhnbuildings"] = "4";
	req.session.data["introenergycentre"] = "Yes";
	req.session.data["introenergycentrehowmany"] = "1";
	req.session.data["energycentres"] = req.session.data["introenergycentrehowmany"];
	req.session.data["intropipework"] = "Yes";
	req.session.data["introsuppliers"] = "No";
	req.session.data["introsupplycurrent"] = "Yes";
	req.session.data["supplywhen"] = "2022";

	req.session.data["introselfsupply"] = "No";
	req.session.data["introbuy"] = "Yes";
	req.session.data["introsell"] = "No";
	req.session.data["name"] = "Seaton Town Centre";
	req.session.data["introcomplete"] = "true";
	req.session.data["introsupply20"] = "No";
	req.session.data["introresponsible"] = "Yes";

	// EC Flow
	req.session.data["ecaddressHasPostcode"] = "Yes";
	req.session.data["ecaddressSelected"] = "329-271, Links Rd, Aberdeen, AB2 45DJ";
	req.session.data["energytype"] = ["Space heating", "Process heating"];
	req.session.data["techcapacity"] = "120";
	req.session.data["techtechnology"] = ["Biofuel boiler"];
	req.session.data["eccomplete"] = "true";

	// Customers Flow
	req.session.data["customersdomestic"] = "Yes";
	req.session.data["customersdomestictotal"] = "10";
	req.session.data["customersnondomestic"] = "Yes";
	req.session.data["customersnondomestictotal"] = "5";
	req.session.data["consumertypeindustrial"] = "No";
	req.session.data["smallenterprises"] = "Yes";
	req.session.data["consumertypemicrobusiness"] = "Yes";
	req.session.data["prepaymentmeters"] = "Some";
	req.session.data["meteringagent"] = "Yes";
	req.session.data["buildingcomplete"] = "true";

	// Billing
	req.session.data["billingoften"] = ["Quarterly"];
	req.session.data["billingcalculated"] = "Yes";
	req.session.data["billingcompare"] = "Yes";
	req.session.data["billinginfo"] = ["Current energy prices charged to customers", "Information about the customers' recent energy consumption"];
	req.session.data["billingcomplete"] = "true";

	//Consumer protections
	req.session.data["consumervulnerable"] = "Yes";
	req.session.data["consumervulnerableammount"] = "2";
	req.session.data["consumerpsr"] = "Yes";
	req.session.data["consumerconfirm"] = "Yes";
	req.session.data["consumerdifficulties"] = "No";
	req.session.data["protectionscomplete"] = "true";

	//Suppliers
	req.session.data["addedsupplier1"] = "true";
	req.session.data["suppliernameselected1"] = "BRITISH GAS";
	req.session.data["supplieraddressselected1"] = "Millstream, Maidenhead Road, Windsor, Berkshire, SL4 5GD";
	req.session.data["addedsupplier2"] = "true";
	req.session.data["suppliernameselected2"] = "E.ON NEXT ENERGY LTD.";
	req.session.data["supplieraddressselected2"] = "WESTWOOD WAY, WESTWOOD BUSINESS PARK, COVENTRY, CV4 8LG, UNITED KINGDOM";
	req.session.data["suppliercomplete"] = "true";
}

function clearHN(req) {
	req.session.data["role"] = "";
	req.session.data["HNID"] = "";
	req.session.data["HNStatus"] = "";
	req.session.data["introrelevant"] = "";
	req.session.data["introgroundloop"] = "";
	req.session.data["introcommunal"] = "";
	req.session.data["introbuildingstotal"] = "";
	req.session.data["introbuildingshowmany"] = "";
	req.session.data["introcommunaloperate"] = "";
	req.session.data["introcommunaloperatehowmany"] = "";
	req.session.data["introhnbuildings"] = "";
	req.session.data["introenergycentre"] = "";
	req.session.data["introenergycentrehowmany"] = "";
	req.session.data["energycentres"] = "";
	req.session.data["intropipework"] = "";
	req.session.data["introsuppliers"] = "";
	req.session.data["introsupplycurrent"] = "";
	req.session.data["supplywhen"] = "";

	req.session.data["introselfsupply"] = "";
	req.session.data["introbuy"] = "";
	req.session.data["introsell"] = "";
	req.session.data["name"] = "";
	req.session.data["introcomplete"] = "";
	req.session.data["introsupply20"] = "";
	req.session.data["introresponsible"] = "";

	// EC Flow
	req.session.data["ecaddressHasPostcode"] = "";
	req.session.data["ecaddressSelected"] = "";
	req.session.data["energytype"] = [];
	req.session.data["techcapacity"] = "";
	req.session.data["techtechnology"] = [];
	req.session.data["eccomplete"] = "";
	req.session.data["ecaddresslatitude"] = "";
	req.session.data["ecaddresslongitude"] = "";

	// Customers Flow
	req.session.data["customertype"] = [];
	req.session.data["buildingcustomersResidential"] = "";
	req.session.data["buildingcustomersPublic"] = "";
	req.session.data["buildingcustomersCommercial"] = "";
	req.session.data["consumertypemicrobusiness"] = "";
	req.session.data["smallmediumbusinesses"] = "";
	req.session.data["prepaymentmeters"] = "";
	req.session.data["meteringagent"] = "";
	req.session.data["buildingcomplete"] = "";

	// Billing
	req.session.data["billingoften"] = [];
	req.session.data["billingcalculated"] = "";
	req.session.data["billingcompare"] = "";
	req.session.data["billinginfo"] = [];
	req.session.data["billingcomplete"] = "";

	// Consumer Protections
	req.session.data["consumervulnerable"] = "";
	req.session.data["consumervulnerableammount"] = "";
	req.session.data["consumerpsr"] = "";
	req.session.data["consumerconfirm"] = "";
	req.session.data["consumerdifficulties"] = "";
	req.session.data["protectionscomplete"] = "";

	// Suppliers
	req.session.data["addedsupplier1"] = "";
	req.session.data["suppliernameselected1"] = "";
	req.session.data["supplieraddressselected1"] = "";
	req.session.data["addedsupplier2"] = "";
	req.session.data["suppliernameselected2"] = "";
	req.session.data["supplieraddressselected2"] = "";
	req.session.data["suppliercomplete"] = "";
}

function generateSupplier2HN(req) {
	req.session.data["role"] = "Energy supplier";
	req.session.data["HNID"] = "496458931";
	req.session.data["HNStatus"] = "Not started";
	req.session.data["introrelevant"] = "Yes";
	req.session.data["introgroundloop"] = "No";
	req.session.data["introcommunal"] = "No";
	req.session.data["introbuildingstotal"] = "3";
	req.session.data["introbuildingshowmany"] = "3";
	req.session.data["introcommunaloperate"] = "Yes";
	req.session.data["introcommunaloperatehowmany"] = "1";
	req.session.data["introenergycentre"] = "No";
	req.session.data["intropipework"] = "Yes";
	req.session.data["introsuppliers"] = "No";
	req.session.data["introsupplycurrent"] = "Yes";
	req.session.data["supplywhen"] = "2022";
	req.session.data["introselfsupply"] = "No";
	req.session.data["introbuy"] = "Yes";
	req.session.data["introsell"] = "No";
	req.session.data["name"] = "Seaton (City Centre)";
	req.session.data["introhnbuildings"] = "2";
	req.session.data["introauthorised"] = "Yes";
	req.session.data["operator"] = "British Gas";

	req.session.data["ecaddressHasPostcode"] = "No";
	req.session.data["ecaddressSelected"] = "329-271, Links Rd, Aberdeen, AB2 45DJ";
	req.session.data["ecaddresslatitude"] = "57.15340080950945";
	req.session.data["ecaddresslongitude"] = "-2.0840666225762705";
	req.session.data["energytype"] = "";
	req.session.data["techcapacity"] = "";
	req.session.data["techcoolingcapacity"] = "";
	req.session.data["techtechnology"] = "";
}

function clearSetup(req) {
	req.session.data["companyname"] = "";
	req.session.data["networklist"] = "";
	req.session.data["usertype"] = "";
	req.session.data["organisationdetails"] = "";
	req.session.data["smrideclaration"] = "";
}

///////////////////////////////////////////////////////////////// DASHBOARD ////////////////////////////////////////////////////

router.get("/" + version + "/account-information", function (req, res) {
	generateuser(req);
	const urlParams = req.query.v;
	req.session.data["variantname"] = urlParams;

	if (urlParams == "operator") {
		req.session.data["usertype"] = "operator";
		req.session.data["networklist"] = "";
		clearHN(req);
	}

	if (urlParams == "operatorcomplete") {
		req.session.data["usertype"] = "operator";
		req.session.data["organisationdetails"] = "Submitted";
		req.session.data["smrideclaration"] = "Yes";
		req.session.data["networklist"] = "complete";
		generateOperatorHN(req);
	}

	if (urlParams == "supplier") {
		req.session.data["usertype"] = "supplier";
		req.session.data["networklist"] = "complete";
		req.session.data["smrideclaration"] = "Yes";
		req.session.data["organisationdetails"] = "Submitted";
		generateSupplierHN(req);
	}

	if (urlParams == "supplier2") {
		req.session.data["usertype"] = "supplier2";
		req.session.data["networklist"] = "complete";
		req.session.data["organisationdetails"] = "Submitted";
		req.session.data["smrideclaration"] = "Yes";
		generateSupplier2HN(req);
	}

	res.render("/" + version + "/account-information", {
		data: req.session.data,
	});
});

//////////////////////////////////////////////////////////// POLICY PAGES /////////////////////////////////////////////////////////

router.get("/" + version + "/help/cookies", function (req, res) {
	// Read the cookie and store it in session data
	const existingCookie = req.cookies.cookies_additional;
	const cookiesuse = req.cookies.cookies_use;
	const cookiespreferences = req.cookies.cookies_preferences;

	const urlParams = req.query.notification;
	req.session.data["cookiesnotification"] = urlParams || "";

	if (existingCookie) {
		req.session.data["cookies"] = existingCookie;
	}
	if (cookiesuse) {
		req.session.data["cookiesuse"] = cookiesuse;
	}

	if (cookiespreferences) {
		req.session.data["cookiespreferences"] = cookiespreferences;
	}

	res.render("/" + version + "/help/cookies", {
		data: req.session.data,
	});
});

router.post("/" + version + "/help/cookies", function (req, res) {
	const cookies = "no";
	const cookiesuse = req.session.data["cookiesuse"];
	const cookiespreferences = req.session.data["cookiespreferences"];

	// Set cookies
	res.cookie("cookies_additional", cookies, {
		maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});

	res.cookie("cookies_use", cookiesuse, {
		maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});

	res.cookie("cookies_preferences", cookiespreferences, {
		maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});

	// Redirect to confirmation or back to settings page
	res.redirect("/" + version + "/help/cookies?notification=success");
});

router.get("/" + version + "/help/cookie-details", function (req, res) {
	// Read the cookie and store it in session data
	res.render("/" + version + "/help/cookie-details", {
		data: req.session.data,
	});
});

router.get("/" + version + "/blank", function (req, res) {
	const urlParams = req.query.cookieerror;

	if (urlParams) {
		req.session.data["cookieerror"] = urlParams;
	} else {
		req.session.data["cookieerror"] = "";
	}

	// Read the cookie and store it in session data

	const cookies = "";

	// Set cookies
	res.clearCookie("cookies_additional", {
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});
	res.clearCookie("cookies_use", {
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});
	res.clearCookie("cookies_preferences", {
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
	});

	res.render("/" + version + "/blank", {
		data: req.session.data,
	});
});

//////////////////////////////////////////////////////////// SETUP PAGES /////////////////////////////////////////////////////////

///Company name
router.get("/" + version + "/setup/company-name", function (req, res) {
	clearSetup(req);
	clearHN(req);
	clearaddeduser(req);
	clearSMRIUser(req);
	clearorgdetails(req);
	res.render("/" + version + "/setup/company-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/setup/company-name", function (req, res) {
	var companyname = req.session.data["companyname"];

	if (!companyname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.companyname = {
			anchor: "companyname",
			message: "Enter a name for your organisation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/setup/company-name", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/emails/monitoring-due");
	}
});

// Setup - Role
router.get("/" + version + "/setup/role", function (req, res) {
	res.render("/" + version + "/setup/role", {
		data: req.session.data,
	});
});

router.post("/" + version + "/setup/role", function (req, res) {
	var setuprole = req.session.data["setuprole"];

	if (!setuprole) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.setuprole = {
			anchor: "setuprole",
			message: "Select an activity",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/setup/role", {
			data: req.session.data,
		});
	} else {
		if (setuprole == "supplier") {
			res.redirect("/" + version + "/emails/supplier-invite");
		} else if (setuprole == "operatorcomplete") {
			res.redirect("/" + version + "/account-information?v=" + setuprole);
		} else {
			res.redirect("/" + version + "/account-information?v=" + setuprole);
		}
	}
});

//////////////////////////////////////////////////////////// EMAILS /////////////////////////////////////////////////////////
router.get("/" + version + "/emails/supplier-invite", function (req, res) {
	generateSupplierHN(req);

	res.render("/" + version + "/emails/supplier-invite", {
		data: req.session.data,
	});
});

//////////////////////////////////////////////////////////// ORG DETAILS /////////////////////////////////////////////////////////

function clearorgdetails(req) {
	req.session.data["orghasemailaddress"] = "";
	req.session.data["orgemailaddress"] = "";
	req.session.data["orgprofit"] = "";
	req.session.data["orgsubtype"] = "";
	req.session.data["orgsocialhousing"] = "";
	req.session.data["orgfinancialstartday"] = "";
	req.session.data["orgfinancialstartmonth"] = "";
	req.session.data["orgfinancialendday"] = "";
	req.session.data["orgfinancialendmonth"] = "";
	req.session.data["orgaccounts"] = "";
	req.session.data["orgsolvent"] = "";
	req.session.data["financialprofit"] = "";
	req.session.data["financialliquid"] = "";
	req.session.data["financialexceed"] = "";
	req.session.data["financialcosts"] = "";
	req.session.data["financialmonthly"] = "";
	req.session.data["financialincome"] = "";
	req.session.data["financialhedged"] = "";
	req.session.data["financiallength"] = "";
	req.session.data["financialpercentage"] = "";
	req.session.data["orgstructure"] = "";
	req.session.data["parentsentered"] = "";
	req.session.data["parentcompanyname1"] = "";
	req.session.data["parentcompanyname2"] = "";
	req.session.data["parentorgaddressSelect1"] = "";
	req.session.data["parentorgaddressSelect2"] = "";
	req.session.data["parentorgadded1"] = "";
	req.session.data["parentorgadded2"] = "";
}

///Org details
router.get("/" + version + "/organisation-details/organisation-details", function (req, res) {
	clearvalidation(req);
	const urlParams = req.query.notification;
	req.session.data["orgdetailsnotification"] = urlParams;

	res.render("/" + version + "/organisation-details/organisation-details", {
		data: req.session.data,
	});
});

/// Org details - Email address
router.get("/" + version + "/organisation-details/email-address", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/email-address", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/email-address", function (req, res) {
	clearvalidation(req);
	var orghasemailaddress = req.session.data["orghasemailaddress"];
	var orgemailaddress = req.session.data["orgemailaddress"];

	if (!orghasemailaddress) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orghasemailaddress = {
			anchor: "orghasemailaddress",
			message: "Select whether your organisation has an alternative email address",
		};
	}

	if (orghasemailaddress == "Yes" && !orgemailaddress) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgemailaddress = {
			anchor: "orgemailaddress",
			message: "Enter an email address",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/email-address", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/profit");
	}
});

/// Org details - Accounts
router.get("/" + version + "/organisation-details/accounts", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/accounts", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/accounts", function (req, res) {
	clearvalidation(req);
	var orgaccounts = req.session.data["orgaccounts"];

	if (!orgaccounts) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaccounts = {
			anchor: "orgaccounts",
			message: "Select whether your organisation has account for the last 12 months",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/accounts", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/solvent");
	}
});

/// Org details - Financial year date
router.get("/" + version + "/organisation-details/date", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/date", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/date", function (req, res) {
	clearvalidation(req);
	var financialstartday = req.session.data["orgfinancialstartday"];
	var financialstartmonth = req.session.data["orgfinancialstartmonth"];
	var financialendday = req.session.data["orgfinancialendday"];
	var financialendmonth = req.session.data["orgfinancialendmonth"];

	function isValidDate(day, month) {
		// Convert to integers
		const dayInt = parseInt(day, 10);
		const monthInt = parseInt(month, 10);

		// Check if month is between 1-12
		if (monthInt < 1 || monthInt > 12) {
			return false;
		}

		// Days per month (index 1 = January, 2 = February, etc.)
		const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years (assumes year 2024 as a reference for leap year calculations)
		if (monthInt === 2) {
			daysInMonth[2] = 29; // Assume leap year support for February
		}

		// Check if day is valid for the given month
		return dayInt >= 1 && dayInt <= daysInMonth[monthInt];
	}

	req.session.data.validationErrorStartDate = false;

	// Check if both fields are missing
	if (!financialstartday && !financialstartmonth) {
		req.session.data.validationError = "true";
		req.session.data.validationErrorStartDate = "true";

		req.session.data.validationErrors.financialstartdate = {
			anchor: "orgfinancialstartday",
			message: "Enter the start of the accounting period",
		};
	} else {
		// Validate financialstartday
		if (!financialstartday) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorStartDate = "true";

			req.session.data.validationErrors.financialstartday = {
				anchor: "orgfinancialstartday",
				message: "Enter a day for the start of the accounting period",
			};
		} else if (/[^0-9]/.test(financialstartday)) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorStartDate = "true";

			req.session.data.validationErrors.financialstartday = {
				anchor: "orgfinancialstartday",
				message: "Start day must be a number",
			};
		}

		// Validate financialstartmonth
		if (!financialstartmonth) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorStartDate = "true";

			req.session.data.validationErrors.financialstartmonth = {
				anchor: "orgfinancialstartmonth",
				message: "Enter a month for the start of the accounting period",
			};
		} else if (/[^0-9]/.test(financialstartmonth)) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorStartDate = "true";

			req.session.data.validationErrors.financialstartmonth = {
				anchor: "orgfinancialstartmonth",
				message: "Start month must be a number",
			};
		}

		// **Only perform valid date check if no validation errors exist**
		if (!req.session.data.validationErrorStartDate) {
			if (!isValidDate(financialstartday, financialstartmonth)) {
				req.session.data.validationError = "true";
				req.session.data.validationErrors.financialstartdate = {
					anchor: "orgfinancialstartday",
					message: "Start date of accounting period must be a real date",
				};
			}
		}
	}

	req.session.data.validationErrorendDate = false;

	// Check if both fields are missing
	if (!financialendday && !financialendmonth) {
		req.session.data.validationError = "true";
		req.session.data.validationErrorendDate = "true";

		req.session.data.validationErrors.financialenddate = {
			anchor: "orgfinancialendday",
			message: "Enter the end of the accounting period",
		};
	} else {
		// Validate financialendday
		if (!financialendday) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorendDate = "true";

			req.session.data.validationErrors.financialendday = {
				anchor: "orgfinancialendday",
				message: "Enter a day for the end of the accounting period",
			};
		} else if (/[^0-9]/.test(financialendday)) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorendDate = "true";

			req.session.data.validationErrors.financialendday = {
				anchor: "orgfinancialendday",
				message: "End day must be a number",
			};
		}

		// Validate financialendmonth
		if (!financialendmonth) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorendDate = "true";

			req.session.data.validationErrors.financialendmonth = {
				anchor: "orgfinancialendmonth",
				message: "Enter a month for the end of the accounting period",
			};
		} else if (/[^0-9]/.test(financialendmonth)) {
			req.session.data.validationError = "true";
			req.session.data.validationErrorendDate = "true";

			req.session.data.validationErrors.financialendmonth = {
				anchor: "orgfinancialendmonth",
				message: "End month must be a number",
			};
		}

		// **Only perform valid date check if no validation errors exist**
		if (!req.session.data.validationErrorendDate) {
			if (!isValidDate(financialendday, financialendmonth)) {
				req.session.data.validationError = "true";
				req.session.data.validationErrors.financialenddate = {
					anchor: "orgfinancialendday",
					message: "End date of accounting period must be a real date",
				};
			}
		}
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/date", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/accounts");
	}
});

/// Org details - Solvent
router.get("/" + version + "/organisation-details/solvent", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/solvent", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/solvent", function (req, res) {
	clearvalidation(req);
	var orgsolvent = req.session.data["orgsolvent"];
	var orgaccounts = req.session.data["orgaccounts"];

	if (!orgsolvent) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgsolvent = {
			anchor: "orgsolvent",
			message: "Select whether your organisation is solvent for the next 12 months",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/solvent", {
			data: req.session.data,
		});
	} else {
		if (orgaccounts == "Yes") {
			res.redirect("/" + version + "/organisation-details/financial-profit");
		} else {
			res.redirect("/" + version + "/organisation-details/structure");
		}
	}
});

/// Org details - Profit
router.get("/" + version + "/organisation-details/profit", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/profit", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/profit", function (req, res) {
	clearvalidation(req);
	var orgprofit = req.session.data["orgprofit"];

	if (!orgprofit) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgprofit = {
			anchor: "orgprofit",
			message: "Select whether your organisation operates for profit",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/profit", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/what");
	}
});

/// Org details - What
router.get("/" + version + "/organisation-details/what", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/what", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/what", function (req, res) {
	clearvalidation(req);
	var orgsubtype = req.session.data["orgsubtype"];
	var orgsubtypeother = req.session.data["orgsubtypeother"];
	var orgprofit = req.session.data["orgprofit"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!orgsubtype) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgsubtype = {
			anchor: "orgsubtype",
			message: "Select the option that best describes the work " + companyname + " does",
		};
	}

	if (orgsubtype == "Other" && !orgsubtypeother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgsubtypeother = {
			anchor: "orgtradingpostcode",
			message: "Enter an organisation description",
		};
	}

	if (orgsubtype == "Other" && orgsubtypeother.length > 50) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgsubtypeother = {
			anchor: "orgtradingpostcode",
			message: "Enter the organisation’s description",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/what", {
			data: req.session.data,
		});
	} else {
		if (orgsubtype == "Other") {
			req.session.data["orgsubtype"] = orgsubtypeother;
			res.redirect("/" + version + "/organisation-details/socialhousing");
		} else if (orgsubtype == "Registered social housing provider" || orgsubtype == "Other social housing provider" || orgsubtype == "Housing association" || orgsubtype == "Local authority" || orgsubtype == "Other public sector body") {
			res.redirect("/" + version + "/organisation-details/socialhousing");
		} else if (orgsubtype == "Central government body") {
			res.redirect("/" + version + "/organisation-details/structure");
		} else {
			res.redirect("/" + version + "/organisation-details/continuity");
		}
	}
});

/// Org details - Social housing
router.get("/" + version + "/organisation-details/socialhousing", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/socialhousing", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/socialhousing", function (req, res) {
	clearvalidation(req);
	var orgsocialhousing = req.session.data["orgsocialhousing"];
	var orgsubtype = req.session.data["orgsubtype"];

	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!orgsocialhousing) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgsocialhousing = {
			anchor: "orgsocialhousing",
			message: "Select whether " + companyname + " is subject to social housing regulations",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/socialhousing", {
			data: req.session.data,
		});
	} else {
		if (orgsocialhousing == "No" && orgsubtype != "Local authority") {
			res.redirect("/" + version + "/organisation-details/continuity");
		} else {
			res.redirect("/" + version + "/organisation-details/structure");
		}
	}
});

/// Org details - Continuity
router.get("/" + version + "/organisation-details/continuity", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/continuity", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/continuity", function (req, res) {
	clearvalidation(req);
	var orgcontinuity = req.session.data["orgcontinuity"];

	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!orgcontinuity) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgcontinuity = {
			anchor: "orgcontinuity",
			message: "Select yes if you have operation or supply continuity plans in place",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/continuity", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/date");
	}
});

/// Org details - Financial protfit
router.get("/" + version + "/organisation-details/financial-profit", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-profit", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-profit", function (req, res) {
	clearvalidation(req);
	var financialprofit = req.session.data["financialprofit"];

	if (!financialprofit) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialprofit = {
			anchor: "financialprofit",
			message: "Enter the profit or loss for the last financial year",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-profit", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-liquid");
	}
});

/// Org details - Financial monthly
router.get("/" + version + "/organisation-details/financial-monthly", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-monthly", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-monthly", function (req, res) {
	clearvalidation(req);
	var financialmonthly = req.session.data["financialmonthly"];

	if (!financialmonthly) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialmonthly = {
			anchor: "financialmonthly",
			message: "Enter the average monthly costs for the previous financial year",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-monthly", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-income");
	}
});

/// Org details - Financial income
router.get("/" + version + "/organisation-details/financial-income", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-income", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-income", function (req, res) {
	clearvalidation(req);
	var financialincome = req.session.data["financialincome"];
	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!financialincome) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialincome = {
			anchor: "financialincome",
			message: "Enter " + company + "'s total income for the previous financial year",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(financialincome)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialincome = {
			anchor: "financialincome",
			message: "Total income for the previous financial year must only include numbers and leading hyphens",
		};
	} else if (financialincome.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialincome = {
			anchor: "financialincome",
			message: "Total income for the previous financial year must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-income", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-hedged");
	}
});

/// Org details - Financial liquid
router.get("/" + version + "/organisation-details/financial-liquid", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-liquid", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-liquid", function (req, res) {
	clearvalidation(req);
	var financialliquid = req.session.data["financialliquid"];

	if (!financialliquid) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialliquid = {
			anchor: "financialliquid",
			message: "Enter the total amount of liquid assets",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-liquid", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-exceed");
	}
});

/// Org details - Financial exceed
router.get("/" + version + "/organisation-details/financial-exceed", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-exceed", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-exceed", function (req, res) {
	clearvalidation(req);
	var financialexceed = req.session.data["financialexceed"];

	if (!financialexceed) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialexceed = {
			anchor: "financialexceed",
			message: "Select whether assets exceeded liabilities",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-exceed", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-costs");
	}
});

/// Org details - Financial costs
router.get("/" + version + "/organisation-details/financial-costs", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-costs", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-costs", function (req, res) {
	clearvalidation(req);
	var financialcosts = req.session.data["financialcosts"];

	if (!financialcosts) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialcosts = {
			anchor: "financialcosts",
			message: "Enter the total running costs",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-costs", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-income");
	}
});

/// Org details - Financial needs
router.get("/" + version + "/organisation-details/financial-needs", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-needs", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-needs", function (req, res) {
	clearvalidation(req);
	var financialneeds = req.session.data["financialneeds"];

	if (!financialneeds) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialneeds = {
			anchor: "financialneeds",
			message: "Select average monthly cash needs met fixed costs",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-needs", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-authorised");
	}
});

/// Org details - Financial authorised
router.get("/" + version + "/organisation-details/financial-authorised", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-authorised", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-authorised", function (req, res) {
	clearvalidation(req);
	var financialauthorised = req.session.data["financialauthorised"];

	if (!financialauthorised) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialauthorised = {
			anchor: "financialauthorised",
			message: "Confirm whether the authorised entity is satisfied",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-authorised", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-hedged");
	}
});

/// Org details - Financial percentage
router.get("/" + version + "/organisation-details/financial-percentage", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-percentage", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-percentage", function (req, res) {
	clearvalidation(req);
	var financialpercentage = req.session.data["financialpercentage"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";
	const regex = /^[0-9,\s.]+$/; // Allowed characters: numbers (0-9), commas (,), spaces (\s), and decimal points (.)

	if (!financialpercentage) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialpercentage = {
			anchor: "financialpercentage",
			message: "Enter the percentage volume of " + companyname + "’s costs that are hedged",
		};
	} else if (!regex.test(financialpercentage)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialpercentage = {
			anchor: "financialpercentage",
			message: "Percentage must only include numbers and special characters such as full stops and commas",
		};
	}

	if (financialpercentage > 100) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialpercentage = {
			anchor: "financialpercentage",
			message: "Percentage must be 100 or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-percentage", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/structure");
	}
});

/// Org details - Financial hedged
router.get("/" + version + "/organisation-details/financial-hedged", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-hedged", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-hedged", function (req, res) {
	clearvalidation(req);
	var financialhedged = req.session.data["financialhedged"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!financialhedged) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financialhedged = {
			anchor: "financialhedged",
			message: "Select whether " + companyname + " hedges their gas, electricity, biomass or other fuel input requirementss",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-hedged", {
			data: req.session.data,
		});
	} else {
		if (financialhedged == "Yes") {
			res.redirect("/" + version + "/organisation-details/financial-hedged-months");
		} else {
			res.redirect("/" + version + "/organisation-details/structure");
		}
	}
});

/// Org details - Financial hedged months
router.get("/" + version + "/organisation-details/financial-hedged-months", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/financial-hedged-months", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/financial-hedged-months", function (req, res) {
	clearvalidation(req);
	var financiallength = req.session.data["financiallength"];

	if (!financiallength) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.financiallength = {
			anchor: "financiallength",
			message: "Enter the number of months",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/financial-hedged-months", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/organisation-details/financial-percentage");
	}
});

function clearparentdata(req) {
	req.session.data["parentcompanyname"] = "";
	req.session.data["parentorgaddressMLine1"] = "";
	req.session.data["parentorgaddressMTown"] = "";
	req.session.data["parentorgaddressMCounty"] = "";
	req.session.data["parentorgaddressMPostcode"] = "";
	req.session.data["parentorgaddressMCountry"] = "";
	req.session.data["parentorgaddressSelect"] = "";
}

/// Org details - Structure
router.get("/" + version + "/organisation-details/structure", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/structure", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/structure", function (req, res) {
	clearvalidation(req);
	var orgstructure = req.session.data["orgstructure"];

	if (!orgstructure) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgstructure = {
			anchor: "orgstructure",
			message: "Confirm your organisation structure",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/structure", {
			data: req.session.data,
		});
	} else {
		clearparentdata(req);
		req.session.data["parentsentered"] = 1;

		if (orgstructure == "Neither of these") {
			res.redirect("/" + version + "/organisation-details/cya");
		} else {
			res.redirect("/" + version + "/organisation-details/company-name");
		}
	}
});

///Parent Company name
router.get("/" + version + "/organisation-details/company-name", function (req, res) {
	clearvalidation(req);
	const urlParams = req.query.id;
	if (urlParams) {
		req.session.data["parentid"] = urlParams;

		req.session.data["parentcompanyname"] = req.session.data["parentcompanyname" + urlParams];
	} else {
		req.session.data["parentid"] = "";
	}

	const addanother = req.query.another;

	if (addanother) {
		req.session.data["parentcompanyname"] = "";
		req.session.data["parentorgaddressMLine1"] = "";
		req.session.data["parentorgaddressMTown"] = "";
		req.session.data["parentorgaddressMCountry"] = "";
		req.session.data["parentorgaddressMPostcode"] = "";
		req.session.data["parentsaddanother"] = "Yes";
	} else {
		req.session.data["parentsaddanother"] = "No";
	}

	res.render("/" + version + "/organisation-details/company-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/company-name", function (req, res) {
	clearvalidation(req);
	const urlParams = req.query.id;

	var parentcompanyname = req.session.data["parentcompanyname"];
	req.session.data["parentaccounttype"] == "Overseas organisation";

	if (!parentcompanyname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentcompanyname = {
			anchor: "parentcompanyname",
			message: "Enter a name for your organisation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/company-name", {
			data: req.session.data,
		});
	} else {
		if (urlParams) {
			req.session.data["parentcompanyname" + urlParams] = req.session.data["parentcompanyname"];
			res.redirect("/" + version + "/organisation-details/addressmanual?id=" + urlParams);
		} else {
			req.session.data["parentcompanyname" + req.session.data["parentsentered"]] = req.session.data["parentcompanyname"];
			res.redirect("/" + version + "/organisation-details/addressmanual");
		}
	}
});

// Parent Company - Address manual
router.get("/" + version + "/organisation-details/addressmanual", function (req, res) {
	clearvalidation(req);

	const urlParams = req.query.id;

	if (urlParams) {
		req.session.data["parentid"] = urlParams;

		req.session.data["parentorgaddressMLine1"] = req.session.data["parentorgaddressMLine1" + urlParams];

		req.session.data["parentorgaddressMTown"] = req.session.data["parentorgaddressMTown" + urlParams];
		req.session.data["parentorgaddressMCountry"] = req.session.data["parentorgaddressMCountry" + urlParams];
		req.session.data["parentorgaddressMPostcode"] = req.session.data["parentorgaddressMPostcode" + urlParams];
	} else {
		req.session.data["parentid"] = "";
	}

	res.render("/" + version + "/organisation-details/addressmanual", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/addressmanual", function (req, res) {
	const urlParams = req.query.id;

	clearvalidation(req);
	var parentorgaddressMLine1 = req.session.data["parentorgaddressMLine1"];
	var parentorgaddressMTown = req.session.data["parentorgaddressMTown"];
	var parentorgaddressMCountry = req.session.data["parentorgaddressMCountry"];
	var orgstructure = req.session.data["orgstructure"];
	var parentorgaddressMPostcode = req.session.data["parentorgaddressMPostcode"];

	if (!parentorgaddressMLine1) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentorgaddressMLine1 = {
			anchor: "parentorgaddressMLine1",
			message: "Enter the street address",
		};
	}

	if (!parentorgaddressMTown) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentorgaddressMTown = {
			anchor: "parentorgaddressMTown",
			message: "Enter the town or city",
		};
	}

	if (!parentorgaddressMPostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentorgaddressMPostcode = {
			anchor: "parentorgaddressMPostcode",
			message: "Enter a postcode",
		};
	}

	if (!parentorgaddressMCountry) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentorgaddressMCountry = {
			anchor: "parentorgaddressMCountry",
			message: "Enter a postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/addressmanual", {
			data: req.session.data,
		});
	} else {
		req.session.data.parentorgaddressSelect = parentorgaddressMLine1 + ", " + parentorgaddressMTown + ", " + parentorgaddressMPostcode + ", " + parentorgaddressMCountry;

		if (urlParams) {
			req.session.data["parentorgaddressSelect" + urlParams] = req.session.data["parentorgaddressSelect"];
			req.session.data["parentorgaddressMLine1" + urlParams] = req.session.data["parentorgaddressMLine1"];
			req.session.data["parentorgaddressMTown" + urlParams] = req.session.data["parentorgaddressMTown"];
			req.session.data["parentorgaddressMPostcode" + urlParams] = req.session.data["parentorgaddressMPostcode"];
			req.session.data["parentorgaddressMCountry" + urlParams] = req.session.data["parentorgaddressMCountry"];

			req.session.data["parentorgaddressSelect" + urlParams] = req.session.data["parentorgaddressSelect"];

			res.redirect("/" + version + "/organisation-details/cya");
		} else {
			req.session.data["parentorgaddressMLine1" + req.session.data["parentsentered"]] = req.session.data["parentorgaddressMLine1"];
			req.session.data["parentorgaddressMTown" + req.session.data["parentsentered"]] = req.session.data["parentorgaddressMTown"];
			req.session.data["parentorgaddressMPostcode" + req.session.data["parentsentered"]] = req.session.data["parentorgaddressMPostcode"];
			req.session.data["parentorgaddressMCountry" + req.session.data["parentsentered"]] = req.session.data["parentorgaddressMCountry"];

			req.session.data["parentorgaddressSelect" + req.session.data["parentsentered"]] = req.session.data["parentorgaddressSelect"];
			req.session.data["parentorgadded" + req.session.data["parentsentered"]] = "Yes";
			req.session.data["parentsentered"] = req.session.data["parentsentered"] + 1;

			if (orgstructure == "Joint venture") {
				res.redirect("/" + version + "/organisation-details/parent-another");
			} else {
				res.redirect("/" + version + "/organisation-details/cya");
			}
		}
	}
});

///Parent Another
router.get("/" + version + "/organisation-details/parent-another", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/organisation-details/parent-another", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/parent-another", function (req, res) {
	clearvalidation(req);
	var parentsentered = req.session.data["parentsentered"];
	var parentaddanother = req.session.data["parentaddanother"];

	const parents = [];
	for (let i = 1; i <= parentsentered; i++) {
		parents.push({
			id: i,
			name: req.session.data[`parentcompanyname${i}`],
			address: req.session.data[`parentorgaddressSelect${i}`],
			added: req.session.data[`parentorgadded${i}`],
		});
	}

	const totalYes = parents.filter((parent) => parent.added === "Yes").length;
	req.session.data["parentsactual"] = totalYes;

	if (!parentaddanother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentaddanother = {
			anchor: "parentaddanother",
			message: "Select whether you'd like to add another parent organisation",
		};
	}

	if (totalYes < 2 && parentaddanother == "No") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentaddanother = {
			anchor: "parentaddanother",
			message: "Joint ventures must have at least 2 parent orgnisations",
		};
	}

	if (totalYes == 6 && parentaddanother == "Yes") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.parentaddanother = {
			anchor: "parentaddanother",
			message: "You cannot add more than 6 parents organisations",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/organisation-details/parent-another", {
			data: req.session.data,
		});
	} else {
		clearparentdata(req);

		if (parentaddanother == "Yes") {
			res.redirect("/" + version + "/organisation-details/company-name?another=yes");
		} else {
			res.redirect("/" + version + "/organisation-details/cya");
		}
	}
});

///Parent Remove
router.post("/" + version + "/organisation-details/remove-parent", function (req, res) {
	const parentId = req.body.parentId;

	// Example: Remove parent logic
	console.log(`Removing parent with ID: ${parentId}`);
	// Perform the necessary action (e.g., update session or database)
	req.session.data["parentorgadded" + parentId] = "No";

	res.redirect("/" + version + "/organisation-details/parent-another");
});

///CYA
router.get("/" + version + "/organisation-details/cya", function (req, res) {
	clearvalidation(req);
	clearparentdata(req);

	res.render("/" + version + "/organisation-details/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/organisation-details/cya", function (req, res) {
	clearvalidation(req);
	req.session.data["organisationdetails"] = "Submitted";
	res.redirect("/" + version + "/organisation-details/organisation-details?notification=submitted");
});

////////////////////////////////////////////////////////////////////////////////////////////////  User Management  ////////////////////////////////////////////////////////////////////////////////////////////////

function clearaddeduser(req) {
	req.session.data["userfirstname"] = "";
	req.session.data["userlastname"] = "";
	req.session.data["usertelephone"] = "";
	req.session.data["usertelephonemobile"] = "";
	req.session.data["usertelephonelandline"] = "";
	req.session.data["usertelephonelandlineext"] = "";
	req.session.data["useremail"] = "";
	req.session.data["userjobtitle"] = "";
	req.session.data["userthirdparty"] = "";
	req.session.data["userorgname"] = "";
	req.session.data["addeduser"] = "";
	req.session.data["adduserpermissionstransfer"] = "";
	req.session.data["adduserpermissionsrightsandpowers"] = "";
	req.session.data["adduserpermissionsusermanagement"] = "";
	req.session.data["adduserpermissionsmonitoring"] = "";
	req.session.data["adduserpermissionsregistration"] = "";
}

function generateuser(req) {
	var useradded = req.session.data["addeduser1"];
	if (useradded != "true") {
		req.session.data["userfirstname1"] = "John";
		req.session.data["userlastname1"] = "Smith";
		req.session.data["usertelephone1"] = "Landline";
		req.session.data["usertelephonelandline1"] = "01234567891";
		req.session.data["usertelephonelandlineext1"] = "123";
		req.session.data["useremail1"] = "john.smith@radienteco.org";
		req.session.data["userjobtitle1"] = "Director";
		req.session.data["addeduser1"] = "true";
		req.session.data["userthirdparty1"] = "No";

		req.session.data["adduserpermissionstransfer1"] = "Initiate transfer of ownership";
		req.session.data["adduserpermissionsrightsandpowers1"] = "Apply for rights and powers licence";
		req.session.data["adduserpermissionsusermanagement1"] = "Manage users";
		req.session.data["adduserpermissionsmonitoring1"] = "Submit heat network information";
		req.session.data["adduserpermissionsregistration1"] = "Add or edit heat network information";
		req.session.data["regchange"] = "1";
		req.session.data["currentuserid"] = "1";
		req.session.data["regcontactname"] = "John Smith";
		req.session.data["regcontactemail"] = "john.smith@radienteco.org";
	}
}

function generateuser2(req) {
	req.session.data["userfirstname2"] = "Jenny";
	req.session.data["userlastname2"] = "Smith";
	req.session.data["usertelephone2"] = "Landline";
	req.session.data["usertelephonelandline2"] = "01234567892";
	req.session.data["usertelephonelandlineext2"] = "2243";
	req.session.data["useremail2"] = "jenny.smith@radienteco.org";
	req.session.data["addeduser2"] = "true";
	req.session.data["userthirdparty2"] = "Yes";
	req.session.data["adduserpermissionstransfer2"] = "Initiate transfer of ownership";
	req.session.data["adduserpermissionsrightsandpowers2"] = "Apply for rights and powers licence";
	req.session.data["adduserpermissionsusermanagement2"] = "Manage users";
	req.session.data["adduserpermissionsmonitoring2"] = "Submit heat network information";
	req.session.data["adduserpermissionsregistration2"] = "Add or edit heat network information";
}

function generateuser3(req) {
	req.session.data["userfirstname3"] = "Bob";
	req.session.data["userlastname3"] = "Smith";
	req.session.data["usertelephone3"] = "Landline";
	req.session.data["usertelephonelandline3"] = "01234567892";
	req.session.data["usertelephonelandlineext3"] = "2243";
	req.session.data["useremail3"] = "bob.smith@radienteco.org";
	req.session.data["userjobtitle3"] = "Staff";
	req.session.data["addeduser3"] = "true";
	req.session.data["userthirdparty3"] = "No";
	req.session.data["adduserpermissionstransfer3"] = "Initiate transfer of ownership";
	req.session.data["adduserpermissionsrightsandpowers3"] = "Apply for rights and powers licence";
	req.session.data["adduserpermissionsusermanagement3"] = "Manage users";
	req.session.data["adduserpermissionsmonitoring3"] = "Submit heat network information";
	req.session.data["adduserpermissionsregistration3"] = "Add or edit heat network information";
}

function generateuser4(req) {
	req.session.data["userfirstname4"] = "Dan";
	req.session.data["userlastname4"] = "Smith";
	req.session.data["usertelephone4"] = "Mobile";
	req.session.data["usertelephonemobile4"] = "07334567893";
	req.session.data["useremail4"] = "dan.smith@radienteco.org";
	req.session.data["userjobtitle4"] = "Staff";
	req.session.data["addeduser4"] = "true";
	req.session.data["userthirdparty4"] = "Yes";
	req.session.data["adduserpermissionstransfer4"] = "Initiate transfer of ownership";
	req.session.data["adduserpermissionsrightsandpowers4"] = "Apply for rights and powers licence";
	req.session.data["adduserpermissionsusermanagement4"] = "Manage users";
	req.session.data["adduserpermissionsmonitoring4"] = "Submit heat network information";
	req.session.data["adduserpermissionsregistration4"] = "Add or edit heat network information";
}

function generateuser5(req) {
	req.session.data["userfirstname5"] = "Jane";
	req.session.data["userlastname5"] = "Smith";
	req.session.data["usertelephone5"] = "Mobile";
	req.session.data["usertelephonemobile5"] = "0222567894";
	req.session.data["useremail5"] = "jane.smith@radienteco.org";
	req.session.data["userjobtitle5"] = "Staff";
	req.session.data["addeduser5"] = "true";
	req.session.data["userthirdparty5"] = "No";
	req.session.data["adduserpermissionstransfer5"] = "Initiate transfer of ownership";
	req.session.data["adduserpermissionsrightsandpowers5"] = "Apply for rights and powers licence";
	req.session.data["adduserpermissionsusermanagement5"] = "Manage users";
	req.session.data["adduserpermissionsregistration5"] = "Add or edit heat network information";
}

function generateuser6(req) {
	req.session.data["userfirstname6"] = "Donald";
	req.session.data["userlastname6"] = "Smith";
	req.session.data["usertelephone6"] = "Mobile";
	req.session.data["usertelephonemobile6"] = "0222567895";
	req.session.data["useremail6"] = "donald.smith@radienteco.org";
	req.session.data["userjobtitle6"] = "Staff";
	req.session.data["addeduser6"] = "true";
	req.session.data["userthirdparty6"] = "No";
	req.session.data["adduserpermissionstransfer6"] = "Initiate transfer of ownership";
	req.session.data["adduserpermissionsrightsandpowers6"] = "Apply for rights and powers licence";
	req.session.data["adduserpermissionsusermanagement6"] = "Manage users";
	req.session.data["adduserpermissionsregistration6"] = "Add or edit heat network information";
	req.session.data["isdeleted6"] = true;

	req.session.data["usertotal"] = "6";
}

function clearediteduser(req) {
	req.session.data["edituserfirstname"] = "";
	req.session.data["edituserlastname"] = "";
	req.session.data["editusertelephone"] = "";
	req.session.data["edituserjobtitle"] = "";
}

/// Add user
router.get("/" + version + "/manage-users/add-user", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/add-user", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/add-user", function (req, res) {
	clearvalidation(req);

	var useremail = req.session.data["useremail"];

	if (!useremail) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.useremail = {
			anchor: "useremail",
			message: "Enter an email address",
		};
	}

	if (useremail.length > 80) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.useremail = {
			anchor: "useremail",
			message: "Enter an email address using 80 characters or fewer",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/add-user", {
			data: req.session.data,
		});
	} else {
		if (req.session.data.usertotal) {
			req.session.data.usertotal = req.session.data.usertotal + 1;
		} else {
			req.session.data.usertotal = 2;
		}

		req.session.data["useremail" + req.session.data["usertotal"]] = req.session.data["useremail"];
		res.redirect("/" + version + "/manage-users/add-user-details");
	}
});

/// Add user details
router.get("/" + version + "/manage-users/add-user-details", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/add-user-details", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/add-user-details", function (req, res) {
	clearvalidation(req);

	var userfirstname = req.session.data["userfirstname"];
	var userlastname = req.session.data["userlastname"];
	var usertelephone = req.session.data["usertelephone"];
	var usertelephonemobile = req.session.data["usertelephonemobile"];
	var usertelephonelandline = req.session.data["usertelephonelandline"];
	var userjobtitle = req.session.data["userjobtitle"];

	if (!userfirstname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userfirstname = {
			anchor: "userfirstname",
			message: "Enter a first name",
		};
	}

	if (!userlastname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userlastname = {
			anchor: "userlastname",
			message: "Enter a last name",
		};
	}

	if (!usertelephone) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephone = {
			anchor: "usertelephone",
			message: "Select a preferred contact method for work",
		};
	}

	if (usertelephone == "Landline" && !usertelephonelandline) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephonelandline = {
			anchor: "usertelephonelandline",
			message: "Enter a landline number",
		};
	}

	if (usertelephone == "Mobile" && !usertelephonemobile) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephonemobile = {
			anchor: "usertelephonemobile",
			message: "Enter a mobile number",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/add-user-details", {
			data: req.session.data,
		});
	} else {
		req.session.data["userfirstname" + req.session.data["usertotal"]] = req.session.data["userfirstname"];
		req.session.data["userlastname" + req.session.data["usertotal"]] = req.session.data["userlastname"];
		req.session.data["usertelephone" + req.session.data["usertotal"]] = req.session.data["usertelephone"];
		req.session.data["usertelephonelandline" + req.session.data["usertotal"]] = req.session.data["usertelephonelandline"];
		req.session.data["usertelephonelandlineext" + req.session.data["usertotal"]] = req.session.data["usertelephonelandlineext"];
		req.session.data["usertelephonemobile" + req.session.data["usertotal"]] = req.session.data["usertelephonemobile"];
		res.redirect("/" + version + "/manage-users/add-user-org");
	}
});

/// Add user - third party
router.get("/" + version + "/manage-users/add-user-org", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/add-user-org", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/add-user-org", function (req, res) {
	clearvalidation(req);
	var userorgname = req.session.data["userorgname"];
	var userthirdparty = req.session.data["userthirdparty"];
	var userjobtitle = req.session.data["userjobtitle"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!userthirdparty) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userthirdparty = {
			anchor: "userthirdparty",
			message: "Select whether this user works for another organisation acting on behalf of " + companyname,
		};
	}

	if (userthirdparty == "No" && !userjobtitle) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userjobtitle = {
			anchor: "userjobtitle",
			message: "Enter the user’s job title",
		};
	}
	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/add-user-org", {
			data: req.session.data,
		});
	} else {
		req.session.data["userorgname" + req.session.data["usertotal"]] = req.session.data["userorgname"];
		req.session.data["userthirdparty" + req.session.data["usertotal"]] = req.session.data["userthirdparty"];
		req.session.data["userjobtitle" + req.session.data["usertotal"]] = req.session.data["userjobtitle"];

		res.redirect("/" + version + "/manage-users/add-user-permissions");
	}
});

/// Add user permissions
router.get("/" + version + "/manage-users/add-user-permissions", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/add-user-permissions", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/add-user-permissions", function (req, res) {
	clearvalidation(req);
	req.session.data["adduserpermissionsview" + req.session.data["usertotal"]] = req.session.data["adduserpermissionsview"];
	req.session.data["adduserpermissionstransfer" + req.session.data["usertotal"]] = req.session.data["adduserpermissionstransfer"];
	req.session.data["adduserpermissionsrightsandpowers" + req.session.data["usertotal"]] = req.session.data["adduserpermissionsrightsandpowers"];
	req.session.data["adduserpermissionsusermanagement" + req.session.data["usertotal"]] = req.session.data["adduserpermissionsusermanagement"];
	req.session.data["adduserpermissionsmonitoring" + req.session.data["usertotal"]] = req.session.data["adduserpermissionsmonitoring"];
	req.session.data["adduserpermissionsregistration" + req.session.data["usertotal"]] = req.session.data["adduserpermissionsregistration"];
	res.redirect("/" + version + "/manage-users?notification=adduserpermissions");
});

/// Edit user
router.get("/" + version + "/manage-users/edit-user", function (req, res) {
	clearvalidation(req);
	generateuser(req);

	const userid = req.query.id;

	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/edit-user", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/edit-user", function (req, res) {
	clearvalidation(req);
	var source = req.query.source;

	var userfirstname = req.session.data["userfirstname"];
	var userlastname = req.session.data["userlastname"];
	var usertelephone = req.session.data["usertelephone"];
	var usertelephonemobile = req.session.data["usertelephonemobile"];
	var usertelephonelandline = req.session.data["usertelephonelandline"];

	if (!userfirstname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userfirstname = {
			anchor: "userfirstname",
			message: "Enter a first name",
		};
	}

	if (!userlastname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.userlastname = {
			anchor: "userlastname",
			message: "Enter a last name",
		};
	}

	if (!usertelephone) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephone = {
			anchor: "usertelephone",
			message: "Select a preferred contact method for work",
		};
	}

	if (usertelephone == "Landline" && !usertelephonelandline) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephonelandline = {
			anchor: "usertelephonelandline",
			message: "Enter a landline number",
		};
	}

	if (usertelephone == "Mobile" && !usertelephonemobile) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.usertelephonemobile = {
			anchor: "usertelephonemobile",
			message: "Enter a mobile number",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/edit-user", {
			data: req.session.data,
		});
	} else {
		req.session.data["userfirstname" + req.session.data["userid"]] = req.session.data["userfirstname"];
		req.session.data["userlastname" + req.session.data["userid"]] = req.session.data["userlastname"];
		req.session.data["usertelephone" + req.session.data["userid"]] = req.session.data["usertelephone"];
		req.session.data["usertelephonelandline" + req.session.data["userid"]] = req.session.data["usertelephonelandline"];
		req.session.data["usertelephonelandlineext" + req.session.data["userid"]] = req.session.data["usertelephonelandlineext"];
		req.session.data["usertelephonemobile" + req.session.data["userid"]] = req.session.data["usertelephonemobile"];
		res.redirect("/" + version + "/my-profile?notification=edituser");
	}
});

/// Edit user permissions
router.get("/" + version + "/manage-users/edit-user-permissions", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;
	const urlParams = req.query.notification;
	req.session.data["manageusersnotification"] = urlParams;

	res.render("/" + version + "/manage-users/edit-user-permissions", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/edit-user-permissions", function (req, res) {
	clearvalidation(req);
	req.session.data["adduserpermissionsview" + req.session.data["userid"]] = req.session.data["edituserpermissionsview"];
	req.session.data["adduserpermissionsusermanagement" + req.session.data["userid"]] = req.session.data["edituserpermissionsusermanagement"];
	req.session.data["adduserpermissionsmonitoring" + req.session.data["userid"]] = req.session.data["edituserpermissionsmonitoring"];
	req.session.data["adduserpermissionsregistration" + req.session.data["userid"]] = req.session.data["edituserpermissionsregistration"];

	res.redirect("/" + version + "/manage-users/user-profile?notification=editpermissions&id=" + req.session.data["userid"]);
});

/// Edit user - third party
router.get("/" + version + "/manage-users/edit-user-org", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/edit-user-org", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/edit-user-org", function (req, res) {
	clearvalidation(req);
	var edituserthirdparty = req.session.data["edituserthirdparty"];
	var edituserjobtitle = req.session.data["edituserjobtitle"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!edituserthirdparty) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.edituserthirdparty = {
			anchor: "edituserthirdparty",
			message: "Select whether this user works for another organisation acting on behalf of " + companyname,
		};
	}

	if (edituserthirdparty == "No" && !edituserjobtitle) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.edituserjobtitle = {
			anchor: "edituserjobtitle",
			message: "Enter the user’s job title",
		};
	}
	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/edit-user-org", {
			data: req.session.data,
		});
	} else {
		req.session.data["userthirdparty" + req.session.data["userid"]] = req.session.data["edituserthirdparty"];
		req.session.data["userjobtitle" + req.session.data["userid"]] = req.session.data["edituserjobtitle"];

		res.redirect("/" + version + "/manage-users/edit-user-permissions?notification=editthirdparty&id=" + req.session.data["userid"]);
	}
});

/// Reg change
router.get("/" + version + "/manage-users/reg-change", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/reg-change", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/reg-change", function (req, res) {
	clearvalidation(req);
	var regchange = req.session.data["regchange"];

	if (regchange == "") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.regchange = {
			anchor: "regchange",
			message: "You must select someone to be the new regulatory contact",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/reg-change", {
			data: req.session.data,
		});
	} else {
		req.session.data["regcontactname"] = req.session.data["userfirstname" + regchange] + " " + req.session.data["userlastname" + regchange];
		req.session.data["regcontactemail"] = req.session.data["useremail" + regchange];

		res.redirect("/" + version + "/manage-users?notification=regchange");
	}
});

/// Delete user
router.get("/" + version + "/manage-users/delete-user", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/delete-user", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/delete-user", function (req, res) {
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	clearvalidation(req);
	req.session.data["deletedusername"] = req.session.data["userfirstname" + req.session.data["userid"]] + " " + req.session.data["userlastname" + req.session.data["userid"]];
	req.session.data["adduserpermissionsview" + req.session.data["userid"]] = "";
	req.session.data["adduserpermissionstransfer" + req.session.data["userid"]] = "";
	req.session.data["adduserpermissionsrightsandpowers" + req.session.data["userid"]] = "";
	req.session.data["adduserpermissionsusermanagement" + req.session.data["userid"]] = "";
	req.session.data["adduserpermissionsmonitoring" + req.session.data["userid"]] = "";
	req.session.data["adduserpermissionsregistration" + req.session.data["userid"]] = "";
	req.session.data["isdeleted" + req.session.data["userid"]] = true;
	res.redirect("/" + version + "/manage-users?notification=deleted");
});

/// Cancel invite
router.get("/" + version + "/manage-users/cancel-invite", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/cancel-invite", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/cancel-invite", function (req, res) {
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	clearvalidation(req);
	req.session.data["deleteduseremail"] = req.session.data["useremail" + req.session.data["userid"]];

	req.session.data["addeduser" + req.session.data["userid"]] = false;
	res.redirect("/" + version + "/manage-users?notification=inviteremoved");
});

/// Remove user
router.get("/" + version + "/manage-users/remove-user", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/remove-user", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/remove-user", function (req, res) {
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	clearvalidation(req);
	req.session.data["deleteduseremail"] = req.session.data["useremail" + req.session.data["userid"]];

	req.session.data["addeduser" + req.session.data["userid"]] = false;
	res.redirect("/" + version + "/manage-users?notification=removed");
});

/// Reactivate user
router.get("/" + version + "/manage-users/reactivate-user", function (req, res) {
	clearvalidation(req);
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	res.render("/" + version + "/manage-users/reactivate-user", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/reactivate-user", function (req, res) {
	const userid = req.query.id;
	req.session.data["userid"] = userid;

	clearvalidation(req);
	req.session.data["deletedusername"] = req.session.data["userfirstname" + req.session.data["userid"]] + " " + req.session.data["userlastname" + req.session.data["userid"]];

	req.session.data["isdeleted" + req.session.data["userid"]] = false;
	res.redirect("/" + version + "/manage-users/edit-user-permissions?id=" + userid + "&notification=reactivated");
});

/// Invite accept
router.get("/" + version + "/manage-users/organisation-invite", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/manage-users/organisation-invite", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users/organisation-invite", function (req, res) {
	var acceptinvite = req.session.data["acceptinvite"];
	clearvalidation(req);

	if (acceptinvite != "yes" && acceptinvite != "no") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.acceptinvite = {
			anchor: "acceptinvite",
			message: "Select yes if you wish to accept this invitation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/manage-users/organisation-invite", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-information");
	}
});

/// Manage users
router.get("/" + version + "/manage-users", function (req, res) {
	generateuser(req);
	clearvalidation(req);
	const urlParams = req.query.notification;
	const variant = req.query.v;

	req.session.data["manageusersnotification"] = urlParams;

	if (variant == "dev") {
		generateuser2(req);
		generateuser3(req);
		generateuser4(req);
		generateuser5(req);
		generateuser6(req);
	}

	res.render("/" + version + "/manage-users/index", {
		data: req.session.data,
	});
});

router.post("/" + version + "/manage-users", function (req, res) {
	clearvalidation(req);
	clearaddeduser(req);
	res.redirect("/" + version + "/manage-users/add-user");
});

/// User profile
router.get("/" + version + "/manage-users/user-profile", function (req, res) {
	clearvalidation(req);
	const urlParams = req.query.notification;
	req.session.data["manageusersnotification"] = urlParams;
	const userid = req.query.id;
	req.session.data["userid"] = userid;
	clearediteduser(req);

	res.render("/" + version + "/manage-users/user-profile", {
		data: req.session.data,
	});
});

/// User profile self
router.get("/" + version + "/my-profile", function (req, res) {
	generateuser(req);
	clearvalidation(req);
	const urlParams = req.query.notification;
	req.session.data["manageusersnotification"] = urlParams;
	clearediteduser(req);

	res.render("/" + version + "/my-profile", {
		data: req.session.data,
	});
});

/// Org invite accept
router.get("/" + version + "/manage-users/organisation-invite", function (req, res) {
	clearvalidation(req);

	res.render("/" + version + "/manage-users/organisation-invite", {
		data: req.session.data,
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Account creation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Start
router.get("/" + version + "/account-creation/start", function (req, res) {
	res.render("/" + version + "/account-creation/start", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/start", function (req, res) {
	req.session.destroy();
	res.redirect("/" + version + "/account-creation/one-login/start-onelogin");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  ONE LOGIN  - P0 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Email
router.get("/" + version + "/account-creation/one-login/enter-email-create", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/enter-email-create", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/enter-email-create", function (req, res) {
	var email = req.session.data["oneloginemail"];

	if (!email) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.email = {
			anchor: "email",
			message: "Enter an email address",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/one-login/enter-email-create", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/one-login/check-your-email");
	}
});

/// Email
router.get("/" + version + "/account-creation/one-login/check-your-email", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/check-your-email", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/check-your-email", function (req, res) {
	res.redirect("/" + version + "/account-creation/one-login/create-password");
});

/// Email sign in
router.get("/" + version + "/account-creation/one-login/enter-email-sign-in", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/enter-email-sign-in", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/enter-email-sign-in", function (req, res) {
	res.redirect("/" + version + "/account-creation/one-login/enter-password");
});

/// Create password
router.get("/" + version + "/account-creation/one-login/create-password", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/create-password", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/create-password", function (req, res) {
	res.redirect("/" + version + "/account-creation/one-login/get-security-codes");
});

/// Get security codes
router.get("/" + version + "/account-creation/one-login/get-security-codes", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/get-security-codes", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/get-security-codes", function (req, res) {
	var authenticate = req.session.data["2faMethod"];

	if (!authenticate) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.authenticate = {
			anchor: "2faMethod",
			message: "Select a method of authentication",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/one-login/get-security-codes", {
			data: req.session.data,
		});
	} else {
		if (authenticate == "sms") {
			res.redirect("/" + version + "/account-creation/one-login/enter-phone-number");
		} else {
			res.redirect("/" + version + "/account-creation/one-login/setup-authenticator-app");
		}
	}
});

/// Enter phone number
router.get("/" + version + "/account-creation/one-login/enter-phone-number", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/enter-phone-number", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/enter-phone-number", function (req, res) {
	var phone = req.session.data["oneloginphone"];

	if (!phone) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.phone = {
			anchor: "international-telephone-number",
			message: "Enter a phone number",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/one-login/enter-phone-number", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/one-login/check-your-phone");
	}
});

/// Check your phone
router.get("/" + version + "/account-creation/one-login/check-your-phone", function (req, res) {
	res.render("/" + version + "/account-creation/one-login/check-your-phone", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/one-login/check-your-phone", function (req, res) {
	res.redirect("/" + version + "/account-creation/one-login/account-created");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ACCOUNT CREATE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Intro
router.get("/" + version + "/account-creation/intro", function (req, res) {
	res.render("/" + version + "/account-creation/intro", {
		data: req.session.data,
	});
});

///Select org
router.get("/" + version + "/account-creation/select-org", function (req, res) {
	const orgtotal = req.query.orgtotal;
	if (orgtotal) {
		req.session.data["orgtotal"] = orgtotal;
	}

	res.render("/" + version + "/account-creation/select-org", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/select-org", function (req, res) {
	var orgselect = req.session.data["orgselect"];
	if (!orgselect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgselect = {
			anchor: "orgselect",
			message: "Select which organisation you want to access",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/select-org", {
			data: req.session.data,
		});
	} else {
		if (orgselect != "new" && orgselect != "Heating Co") {
			req.session.data["companyname"] = orgselect;
			res.redirect("/" + version + "/account-information");
		} else {
			if (orgselect == "new") {
				res.redirect("/" + version + "/account-creation/intro");
			}
			if (orgselect == "Heating Co") {
				req.session.data.companyname = "Heating Co";
				res.redirect("/" + version + "/account-creation/company-create");
			}
		}
	}
});

///Legal declaration
router.get("/" + version + "/account-creation/check-answers", function (req, res) {
	res.render("/" + version + "/account-creation/check-answers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/check-answers", function (req, res) {
	var confirmauthority = req.session.data["creatorlegaldeclaration"];

	if (!confirmauthority) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.creatorlegaldeclaration = {
			anchor: "creatorlegaldeclaration",
			message: "You must tick to confirm that you comply with the conditions for enabling your organisation for the heat network service",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/check-answers", {
			data: req.session.data,
		});
	} else {
		req.session.data["userfirstname1"] = req.session.data["yourfirstname"];
		req.session.data["userlastname1"] = req.session.data["yourlastname"];
		req.session.data["usertelephone1"] = req.session.data["yourtelephone"];
		req.session.data["usertelephonelandline1"] = req.session.data["yourtelephonelandline"];
		req.session.data["usertelephonelandlineext1"] = req.session.data["yourtelephonelandlineext"];
		req.session.data["usertelephonemobile1"] = req.session.data["yourtelephonemobile"];
		req.session.data["useremail1"] = req.session.data["oneloginemail"];
		req.session.data["userjobtitle1"] = req.session.data["yourjobtitle"];
		req.session.data["addeduser1"] = "true";
		req.session.data["adduserpermissionstransfer1"] = "Initiate transfer of ownership";
		req.session.data["adduserpermissionsrightsandpowers1"] = "Apply for rights and powers licence";
		req.session.data["adduserpermissionsusermanagement1"] = "Manage users";
		req.session.data["adduserpermissionsmonitoring1"] = "Submit heat network information";
		req.session.data["adduserpermissionsregistration1"] = "Add or edit heat network information";
		req.session.data["regchange"] = "1";
		req.session.data["currentuserid"] = "1";
		req.session.data["regcontactname"] = req.session.data["yourfirstname"] + " " + req.session.data["yourlastname"];
		req.session.data["regcontactemail"] = req.session.data["oneloginemail"];

		if (req.session.data.orgtotal) {
			req.session.data.orgtotal = req.session.data.orgtotal + 1;
		} else {
			req.session.data.orgtotal = 1;
		}

		res.redirect("/" + version + "/account-creation/account-created");
	}
});

///Type
router.get("/" + version + "/account-creation/type", function (req, res) {
	res.render("/" + version + "/account-creation/type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/type", function (req, res) {
	var accounttype = req.session.data["accounttype"];

	if (!accounttype) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.accounttype = {
			anchor: "accounttype",
			message: "Select which type of organisation you work for",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/type", {
			data: req.session.data,
		});
	} else {
		if (accounttype == "UK public body" || accounttype == "Other UK organisation" || accounttype == "Overseas organisation" || accounttype == "None, I'm a sole trader") {
			res.redirect("/" + version + "/account-creation/company-name");
		} else {
			res.redirect("/" + version + "/account-creation/company-number");
		}
	}
});
///Company name
router.get("/" + version + "/account-creation/company-name", function (req, res) {
	res.render("/" + version + "/account-creation/company-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/company-name", function (req, res) {
	var companyname = req.session.data["companyname"];
	var accounttype = req.session.data["accounttype"];

	if (!companyname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.companyname = {
			anchor: "companyname",
			message: "Enter a name for your organisation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/company-name", {
			data: req.session.data,
		});
	} else {
		if (accounttype == "Overseas organisation") {
			res.redirect("/" + version + "/account-creation/addressmanual");
		} else {
			res.redirect("/" + version + "/account-creation/address");
		}
	}
});

///Company number
router.get("/" + version + "/account-creation/company-number", function (req, res) {
	res.render("/" + version + "/account-creation/company-number", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/company-number", function (req, res) {
	var orgcompanynumber = req.session.data["companynumber"];
	var accounttype = req.session.data["accounttype"];

	if (!orgcompanynumber) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.companynumber = {
			anchor: "companynumber",
			message: "Enter a company number",
		};
	} else {
		const orgregex = /^[A-Za-z0-9]{8}$/;

		if (!orgregex.test(orgcompanynumber)) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors.companynumber = {
				anchor: "companynumber",
				message: "Company number must have exactly 8 characters, comprising numbers and letters only",
			};
		}
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/company-number", {
			data: req.session.data,
		});
	} else {
		(async () => {
			// Dynamically import 'node-fetch' for CommonJS
			const fetch = (await import("node-fetch")).default;

			const API_KEY = "b38e31d7-61af-448c-8955-425028c1a088"; // Replace with your actual Companies House API key

			async function getCompanyDetails(companyNumber) {
				// Concatenate the API key with a colon (:) for Basic Auth
				const apiKeyWithColon = API_KEY + ":";

				// Base64 encode the result
				const encodedKey = Buffer.from(apiKeyWithColon).toString("base64");

				// Set the headers for the request
				const headers = new Headers({
					Authorization: "Basic " + encodedKey,
				});

				const requestOptions = {
					method: "GET",
					headers: headers,
				};

				try {
					const response = await fetch(`https://api.company-information.service.gov.uk/company/${companyNumber}`, requestOptions);

					// Log the response status
					console.log(`Response Status: ${response.status} ${response.statusText}`);

					if (!response.ok) {
						req.session.data.validationErrors.companynumber = {
							anchor: "companynumber",
							message: "Cannot find a company with this number",
						};

						res.render("/" + version + "/account-creation/company-number", {
							data: req.session.data,
						});
					}

					const companyData = await response.json();

					// Extracting company name and registered office address
					const companyName = companyData.company_name;
					const address = companyData.registered_office_address;

					if (!address) {
						req.session.data.companyname = companyName;
						res.redirect("/" + version + "/account-creation/addressmanual");
					} else {
						const formattedAddress = `${address.address_line_1}, ${address.address_line_2 || ""}, ${address.locality}, ${address.region || ""}, ${address.postal_code}, ${address.country || ""}`.replace(/, ,/g, ",").replace(/, $/, "");
						req.session.data.companyname = companyName;
						req.session.data.orgaddressSelect = formattedAddress;
					}

					// Returning as a JSON object
					return {
						companyName: companyName,
						address: formattedAddress,
					};
				} catch (error) {
					console.error("Error fetching company details:", error);
					return { error: error.message };
				}
			}

			// Example usage
			getCompanyDetails(orgcompanynumber.toUpperCase())
				.then(() => res.redirect("/" + version + "/account-creation/company-confirm"))
				.catch((error) => console.error("Error:", error));
		})();
	}
});

///Your details
router.get("/" + version + "/account-creation/your-details", function (req, res) {
	res.render("/" + version + "/account-creation/your-details", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/your-details", function (req, res) {
	var firstname = req.session.data["yourfirstname"];
	var lastname = req.session.data["yourlastname"];
	var telephone = req.session.data["yourtelephone"];
	var telephonelandline = req.session.data["yourtelephonelandline"];
	var telephonemobile = req.session.data["yourtelephonemobile"];

	var jobtitle = req.session.data["yourjobtitle"];

	if (!firstname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourfirstname = {
			anchor: "yourfirstname",
			message: "Enter your first name",
		};
	}
	if (!lastname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourlastname = {
			anchor: "yourlastname",
			message: "Enter your last name",
		};
	}

	if (!telephone) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourtelephone = {
			anchor: "yourtelephone",
			message: "Select a preferred contact method",
		};
	}

	if (telephone == "Landline" && !telephonelandline) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourtelephonelandline = {
			anchor: "yourtelephonelandline",
			message: "Enter a landline telephone number",
		};
	}

	if (telephone == "Mobile" && !telephonemobile) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourtelephonemobile = {
			anchor: "yourtelephonemobile",
			message: "Enter a mobile telephone number",
		};
	}

	if (!jobtitle) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.yourjobtitle = {
			anchor: "yourjobtitle",
			message: "Enter your job title",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/your-details", {
			data: req.session.data,
		});
	} else {
		if (telephone == "Landline") {
			req.session.data["yourtelephonemobile"] = "";
		}
		res.redirect("/" + version + "/account-creation/check-answers");
	}
});

///Director select
router.get("/" + version + "/account-creation/director-select", function (req, res) {
	res.render("/" + version + "/account-creation/director-select", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/director-select", function (req, res) {
	var directorselect = req.session.data["directorselect"];
	var accounttype = req.session.data["accounttype"];

	if (!directorselect) {
		req.session.data.validationError = "true";
		if (accounttype == "UK charity registered with the Charity Commission") {
			req.session.data.validationErrors.directorselect = {
				anchor: "directorselect",
				message: "Select a trustee",
			};
		} else {
			req.session.data.validationErrors.directorselect = {
				anchor: "directorselect",
				message: "Select a director",
			};
		}
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/director-select", {
			data: req.session.data,
		});
	} else {
		if (directorselect == "John Smith") {
			req.session.data["directorfirstname"] = "John";
			req.session.data["directorlastname"] = "Smith";
			res.redirect("/" + version + "/account-creation/director-details");
		} else if (directorselect == "Jane Smith") {
			req.session.data["directorfirstname"] = "Jane";
			req.session.data["directorlastname"] = "Smith";
			res.redirect("/" + version + "/account-creation/director-details");
		} else {
			req.session.data["directorfirstname"] = "";
			req.session.data["directorlastname"] = "";

			res.redirect("/" + version + "/account-creation/director-details");
		}
	}
});

///Director details
router.get("/" + version + "/account-creation/director-details", function (req, res) {
	res.render("/" + version + "/account-creation/director-details", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/director-details", function (req, res) {
	var email = req.session.data["directoremail"];
	var firstname = req.session.data["directorfirstname"];
	var lastname = req.session.data["directorlastname"];

	if (!email) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.directoremail = {
			anchor: "directoremail",
			message: "Enter director email",
		};
	}

	if (!firstname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.directorfirstname = {
			anchor: "directorfirstname",
			message: "Enter director first name",
		};
	}
	if (!lastname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.directorlastname = {
			anchor: "directorlastname",
			message: "Enter director last name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/director-details", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/what-next");
	}
});

///Director details check
router.get("/" + version + "/account-creation/director-details-check", function (req, res) {
	res.render("/" + version + "/account-creation/director-details-check", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/director-details-check", function (req, res) {
	var firstname = req.session.data["directorfirstname"];
	var lastname = req.session.data["directorlastname"];

	if (!firstname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.directorfirstname = {
			anchor: "directorfirstname",
			message: "Enter director first name",
		};
	}
	if (!lastname) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.directorlastname = {
			anchor: "directorlastname",
			message: "Enter director last name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/director-details-check", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/confirm-director-authority");
	}
});

///Confirm authority
router.get("/" + version + "/account-creation/confirm-authority", function (req, res) {
	res.render("/" + version + "/account-creation/confirm-authority", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/confirm-authority", function (req, res) {
	var confirmauthority = req.session.data["confirmauthority"];

	if (!confirmauthority) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.confirmauthority = {
			anchor: "confirmauthority",
			message: "Confirm you want to create an account",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/confirm-authority", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/account-created");
	}
});

///Confirm director authority
router.get("/" + version + "/account-creation/confirm-director-authority", function (req, res) {
	res.render("/" + version + "/account-creation/confirm-director-authority", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/confirm-director-authority", function (req, res) {
	var confirmauthority = req.session.data["confirmauthority"];

	if (!confirmauthority) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.confirmauthority = {
			anchor: "confirmauthority",
			message: "Confirm you want to create an account",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/confirm-director-authority", {
			data: req.session.data,
		});
	} else {
		if (confirmauthority == "No") {
			res.redirect("/" + version + "/account-creation/dropout-director");
		} else {
			res.redirect("/" + version + "/account-creation/account-created");
		}
	}
});

///Company create
router.get("/" + version + "/account-creation/company-create", function (req, res) {
	res.render("/" + version + "/account-creation/company-create", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/company-create", function (req, res) {
	var companycreate = req.session.data["companycreate"];
	var accounttype = req.session.data["accounttype"];

	if (!companycreate) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.companycreate = {
			anchor: "companycreate",
			message: "Select whether you are the regulatory contact",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/company-create", {
			data: req.session.data,
		});
	} else {
		if (companycreate == "No") {
			res.redirect("/" + version + "/account-creation/dropout-regcontact");
		} else {
			res.redirect("/" + version + "/account-creation/your-details");
		}
	}
});

///Invite email
router.get("/" + version + "/emails/service-invite", function (req, res) {
	res.render("/" + version + "/emails/service-invite", {
		data: req.session.data,
	});
});

router.post("/" + version + "/emails/service-invite", function (req, res) {
	req.session.data["firstname"] = "";
	req.session.data["lastname"] = "";
	req.session.data["telephone"] = "";
	req.session.data["directorjobtitle"] = "";
	res.redirect("/" + version + "/account-creation/one-login/start-onelogin");
});

// Company - Address
router.get("/" + version + "/account-creation/address", function (req, res) {
	res.render("/" + version + "/account-creation/address", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/address", function (req, res) {
	var userpostcode = req.session.data["orgaddressPostcode"].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

	if (!userpostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressPostcode = {
			anchor: "orgaddressPostcode",
			message: "Enter a postcode",
		};
	}

	function validateUKPostcode(postcode) {
		const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

		return postcodeRegex.test(postcode);
	}

	if (!validateUKPostcode(userpostcode)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressPostcode = {
			anchor: "orgaddressPostcode",
			message: "Enter a valid postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/address", {
			data: req.session.data,
		});
	} else {
		const axios = require("axios");
		const https = require("https");

		const httpsAgent = new https.Agent({
			rejectUnauthorized: false,
		});

		const apiKey = "HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6";

		const customSort = (a, b) => {
			const extractNumber = (str) => {
				const match = str.match(/^\d+/); // Extracts the leading number from the string
				return match ? parseInt(match[0], 10) : NaN; // Converts the extracted number to integer
			};

			const numA = extractNumber(a);
			const numB = extractNumber(b);

			if (!isNaN(numA) && isNaN(numB)) {
				return -1;
			} else if (isNaN(numA) && !isNaN(numB)) {
				return 1;
			} else if (!isNaN(numA) && !isNaN(numB)) {
				return numA - numB; // Compare the numbers if both are numbers
			} else {
				return a.localeCompare(b); // Compare as strings if neither is a number
			}
		};

		async function postcode(postcode) {
			axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcode + "&dataset=LPI&key=" + apiKey, { httpsAgent }).then(function (response) {
				var output = JSON.stringify(response.data, null, 2);
				let totalResults = response.data.header.totalresults;
				let parsed = JSON.parse(output).results;
				let locationaddresses = [];
				if (parsed != undefined) {
					for (var i = 0; i < parsed.length; i++) {
						let obj = parsed[i];
						locationaddresses.push(obj.LPI.ADDRESS);
					}

					req.session.data.buildinglocationAddressSelect = locationaddresses.sort(customSort);
					req.session.data.orgaddressnotfound = "";
					if (totalResults > 99) {
						res.redirect("/" + version + "/account-creation/addresserror?reason=toomany");
					} else {
						res.redirect("/" + version + "/account-creation/addressselect");
					}
				} else {
					req.session.data.buildinglocationAddressSelect = locationaddresses;
					req.session.data.orgaddressnotfound = true;
					res.redirect("/" + version + "/account-creation/addresserror");
				}
			});
		}
		postcode(userpostcode);
	}
});

///Address error
router.get("/" + version + "/account-creation/addresserror", function (req, res) {
	const urlParams = req.query.reason;
	req.session.data["addresserrorreason"] = urlParams;

	res.render("/" + version + "/account-creation/addresserror", {
		data: req.session.data,
	});
});

// Company - Address select
router.get("/" + version + "/account-creation/addressselect", function (req, res) {
	res.render("/" + version + "/account-creation/addressselect", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/addressselect", function (req, res) {
	var addressselect = req.session.data["orgaddressSelect"];

	if (!addressselect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressSelect = {
			anchor: "orgaddressSelect",
			message: "Select an address",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/addressselect", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/account-creation/company-confirm");
	}
});

// Company - Address manual
router.get("/" + version + "/account-creation/addressmanual", function (req, res) {
	res.render("/" + version + "/account-creation/addressmanual", {
		data: req.session.data,
	});
});

router.post("/" + version + "/account-creation/addressmanual", function (req, res) {
	var orgaddressMLine1 = req.session.data["orgaddressMLine1"];
	var orgaddressMTown = req.session.data["orgaddressMTown"];
	var orgaddressMCounty = req.session.data["orgaddressMCounty"];
	var orgaddressMCountry = req.session.data["orgaddressMCountry"];
	var accounttype = req.session.data["accounttype"];

	var orgaddressMPostcode = req.session.data["orgaddressMPostcode"];

	if (!orgaddressMLine1) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressMLine1 = {
			anchor: "orgaddressMLine1",
			message: "Enter the street address",
		};
	}

	if (!orgaddressMTown) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressMTown = {
			anchor: "orgaddressMTown",
			message: "Enter the town or city",
		};
	}

	if (!orgaddressMPostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressMPostcode = {
			anchor: "orgaddressMPostcode",
			message: "Enter a postcode",
		};
	}

	if (accounttype == "Overseas organisation" && !orgaddressMCountry) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.orgaddressMCountry = {
			anchor: "orgaddressMCountry",
			message: "Enter a country",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/account-creation/addressmanual", {
			data: req.session.data,
		});
	} else {
		if (accounttype == "Overseas organisation") {
			req.session.data.orgaddressSelect = orgaddressMLine1 + ", " + orgaddressMTown + ", " + orgaddressMPostcode + ", " + orgaddressMCountry;
		} else {
			req.session.data.orgaddressSelect = orgaddressMLine1 + ", " + orgaddressMTown + ", " + orgaddressMCounty + ", " + orgaddressMPostcode;
		}

		res.redirect("/" + version + "/account-creation/company-confirm");
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Register a Heat Network ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearRegIntro(req) {
	req.session.data["introrelevant"] = "";
	req.session.data["introgroundloop"] = "";
	req.session.data["role"] = "";
	req.session.data["introcommunal"] = "";
	req.session.data["introenergycentre"] = "";
	req.session.data["introprimary"] = "";
	req.session.data["introcommunalnetworks"] = "";
	req.session.data["introconnectedcommunal"] = "";
	req.session.data["introconnectedcommunalhowmany"] = "";
	req.session.data["introcontrol"] = "";
	req.session.data["introcontrolhowmany"] = "";
	req.session.data["introonly"] = "";
	req.session.data["introsupply"] = "";
	req.session.data["introonlysupplier"] = "";
	req.session.data["introsupply20"] = "";
	req.session.data["introsupplydecade"] = "";
	req.session.data["supplywhen"] = "";
	req.session.data["introselfsupply"] = "";
	req.session.data["name"] = "";
}

// Introduction - Initial
router.get("/" + version + "/add-heat-network/introduction/intro", function (req, res) {
	clearHN(req);
	res.render("/" + version + "/add-heat-network/introduction/intro", {
		data: req.session.data,
	});
});

// Introduction - Initial
router.get("/" + version + "/add-heat-network/introduction/initial", function (req, res) {
	clearRegIntro(req);
	res.render("/" + version + "/add-heat-network/introduction/initial", {
		data: req.session.data,
	});
});

// Tasklist
router.get("/" + version + "/add-heat-network/tasklist", function (req, res) {
	const urlParams = req.query.v;
	req.session.data["variantname"] = urlParams;

	if (urlParams == "supplier") {
		generateSupplierHN(req);
	}

	if (urlParams == "supplier2") {
		generateSupplier2HN(req);
	} else {
		if (req.session.data["introcomplete"] != "true") {
			populateIntrodata(req);
		}

		if (!req.session.data["HNStatus"]) {
			req.session.data["HNStatus"] = "In progress";
		}
	}

	res.render("/" + version + "/add-heat-network/tasklist", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/tasklist", function (req, res) {
	var introcomplete = req.session.data["introcomplete"];
	var eccomplete = req.session.data["eccomplete"];
	var billingcomplete = req.session.data["billingcomplete"];
	var protectionscomplete = req.session.data["protectionscomplete"];
	var suppliercomplete = req.session.data["suppliercomplete"];
	var buildingcomplete = req.session.data["buildingcomplete"];

	var role = req.session.data["role"];
	var buildingcustomersResidential = req.session.data["buildingcustomersResidential"];
	var consumertypemicrobusiness = req.session.data["consumertypemicrobusiness"];
	var smallmediumbusinesses = req.session.data["smallmediumbusinesses"];
	var introcommunal = req.session.data["introcommunal"];
	var introhnbuildings = req.session.data["introhnbuildings"];
	var introenergycentrehowmany = req.session.data["introenergycentrehowmany"];
	var introsuppliers = req.session.data["introsuppliers"];
	var consumertypeindustrial = req.session.data["consumertypeindustrial"];

	if (introcomplete != "true") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcomplete = {
			anchor: "introcomplete",
			message: "Introduction must be complete",
		};
	}

	if ((role === "Operator" || role === "Operator and supplier") && (introcommunal !== "Yes" || (introcommunal === "Yes" && introenergycentrehowmany > 0)) && eccomplete != "true") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.eccomplete = {
			anchor: "eccomplete",
			message: "Technical information must be complete",
		};
	}

	if ((role === "Supplier" || role === "Operator and supplier") && (introhnbuildings > 0 || introcommunal === "Yes") && buildingcomplete != "true") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingcomplete = {
			anchor: "buildingcomplete",
			message: "Customers and metering must be complete",
		};
	}

	if ((role === "Supplier" || role === "Operator and supplier") && billingcomplete != "true" && consumertypeindustrial != "Yes") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingcomplete = {
			anchor: "billingcomplete",
			message: "Billing must be complete",
		};
	}

	if ((role === "Supplier" || role === "Operator and supplier") && buildingcomplete === "true" && (buildingcustomersResidential > 0 || consumertypemicrobusiness === "Yes" || smallmediumbusinesses === "Yes") && protectionscomplete != "true" && consumertypeindustrial != "Yes") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.protectionscomplete = {
			anchor: "protectionscomplete",
			message: "Consumer protections must be complete",
		};
	}

	if ((role === "Operator" || (role === "Operator and supplier" && introsuppliers === "No")) && suppliercomplete != "true") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.suppliercomplete = {
			anchor: "suppliercomplete",
			message: "Other suppliers must be complete",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/tasklist", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/confirmsubmit");
	}
});

// View

router.get("/" + version + "/add-heat-network/view", function (req, res) {
	const urlParams = req.query.v;
	req.session.data["variantname"] = urlParams;

	if (urlParams == "complete") {
		req.session.data["introrelevant"] = "Yes";
		req.session.data["introgroundloop"] = "No";
		req.session.data["introcommunal"] = "No";
		req.session.data["introbuildingstotal"] = "3";
		req.session.data["introbuildingshowmany"] = "3";
		req.session.data["introcommunaloperate"] = "Yes";
		req.session.data["introcommunaloperatehowmany"] = "1";
		req.session.data["introenergycentre"] = "Yes";
		req.session.data["introenergycentrehowmany"] = "1";
		req.session.data["intropipework"] = "Yes";
		req.session.data["introsuppliers"] = "No";
		req.session.data["introsupplycurrent"] = "Yes";
		req.session.data["supplywhen"] = "2022";
		req.session.data["introselfsupply"] = "No";
		req.session.data["introbuy"] = "Yes";
		req.session.data["introsell"] = "No";
		req.session.data["name"] = "Heat Network One";
		req.session.data["introcomplete"] = "true";
		req.session.data["introhnbuildings"] = "2";
	}

	if (urlParams == "supplier") {
		generateSupplierHN(req);
	}

	if (urlParams == "operator") {
		generateOperatorHN(req);
	}

	if (urlParams == "operatorcomplete") {
		generateOperatorCompleteHN(req);
	}

	if (urlParams == "supplier2") {
		generateSupplier2HN(req);
	}

	res.render("/" + version + "/add-heat-network/view", {
		data: req.session.data,
	});
});

// Add Heat Network - Intro

// Introduction - dropout
router.get("/" + version + "/add-heat-network/introduction/dropout", function (req, res) {
	const urlParams = req.query.v;
	req.session.data["introdropoutreason"] = urlParams;

	backURL = req.header("Referer");
	res.render("/" + version + "/add-heat-network/introduction/dropout", {
		data: req.session.data,
	});
});

// Introduction - Relevant
router.get("/" + version + "/add-heat-network/introduction/relevant", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/relevant", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/relevant", function (req, res) {
	var introrelevant = req.session.data["introrelevant"];

	if (!introrelevant) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introrelevant = {
			anchor: "introrelevant",
			message: "Select whether the heat network is a relevant heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/relevant", {
			data: req.session.data,
		});
	} else {
		if (introrelevant == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/groundloop");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=237");
		}
	}
});

// Introduction - Ground loop
router.get("/" + version + "/add-heat-network/introduction/groundloop", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/groundloop", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/groundloop", function (req, res) {
	var introgroundloop = req.session.data["introgroundloop"];

	if (!introgroundloop) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introgroundloop = {
			anchor: "introgroundloop",
			message: "Select yes if the heat network is a shared ground loop (SGL) heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/groundloop", {
			data: req.session.data,
		});
	} else {
		if (introgroundloop == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/role");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-individual");
			// res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=203');
		}
	}
});

// Introduction - Type of ground loop - Individuals
router.get("/" + version + "/add-heat-network/introduction/sgl-individual", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sgl-individual", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sgl-individual", function (req, res) {
	var sglIndividual = req.session.data["sglIndividual"];

	if (!sglIndividual) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglIndividual = {
			anchor: "sglIndividual",
			message: "Select yes if the shared ground loop is owned by private individuals",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sgl-individual", {
			data: req.session.data,
		});
	} else {
		console.log("sglIndividual:", sglIndividual);
		if (sglIndividual == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-responsible");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-fixedfee");
		}
	}
});

// Introduction - Type of ground loop - Responsible
router.get("/" + version + "/add-heat-network/introduction/sgl-responsible", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sgl-responsible", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sgl-responsible", function (req, res) {
	var sglresponsible = req.session.data["sglResponsible"];

	if (!sglresponsible) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglResponsible = {
			anchor: "sglResponsible",
			message: "Select yes if the individuals are responsible for operating the heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sgl-responsible", {
			data: req.session.data,
		});
	} else {
		console.log("sglresponsible:", sglresponsible);
		if (sglresponsible == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-private");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-fixedfee");
		}
	}
});

// Introduction - Type of ground loop - Private
router.get("/" + version + "/add-heat-network/introduction/sgl-private", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sgl-private", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sgl-private", function (req, res) {
	var sglprivate = req.session.data["sglPrivate"];

	if (!sglprivate) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglPrivate = {
			anchor: "sglPrivate",
			message: "Select yes if these individuals are the heat network's only consumers",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sgl-private", {
			data: req.session.data,
		});
	} else {
		console.log("sglprivate:", sglprivate);
		if (sglprivate == "Yes") {
			req.session.data["sglCategory"] = "Privately Owned";
			res.redirect("/" + version + "/add-heat-network/introduction/role");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sgl-fixedfee");
		}
	}
});

// Introduction - Type of ground loop - Fixed fee
router.get("/" + version + "/add-heat-network/introduction/sgl-fixedfee", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sgl-fixedfee", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sgl-fixedfee", function (req, res) {
	var sglfixedfee = req.session.data["sglFixedFee"];

	if (!sglfixedfee) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglFixedFee = {
			anchor: "sglFixedFee",
			message: "Select yes if your customers are charged a fixed fee to access the shared ground loop",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sgl-fixedfee", {
			data: req.session.data,
		});
	} else {
		if (sglfixedfee == "Yes") {
			req.session.data["sglCategory"] = "Utility";
		} else {
			req.session.data["sglCategory"] = "Non-Utility";
		}
		res.redirect("/" + version + "/add-heat-network/introduction/role");
	}
});

// Introduction - Role
router.get("/" + version + "/add-heat-network/introduction/role", function (req, res) {
	console.log("sglCategory:", req.session.data["sglCategory"]);

	res.render("/" + version + "/add-heat-network/introduction/role", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/role", function (req, res) {
	var role = req.session.data["role"];
	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!role) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.role = {
			anchor: "role",
			message: "Select the regulated activities that " + company + " undertakes on the heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/role", {
			data: req.session.data,
		});
	} else {
		if (role == "Supplier" || role == "Neither") {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=238");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/supplycurrent");
		}
	}
});

// Introduction - Supply current
router.get("/" + version + "/add-heat-network/introduction/supplycurrent", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supplycurrent", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supplycurrent", function (req, res) {
	var introsupplycurrent = req.session.data["introsupplycurrent"];

	if (!introsupplycurrent) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsupplycurrent = {
			anchor: "introsupplycurrent",
			message: "Select if the heat network already supplying thermal energy",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supplycurrent", {
			data: req.session.data,
		});
	} else {
		if (introsupplycurrent == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=232");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/supply20");
		}
	}
});

// Introduction - Supply April
router.get("/" + version + "/add-heat-network/introduction/supply20", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supply20", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supply20", function (req, res) {
	var introsupply20 = req.session.data["introsupply20"];
	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!introsupply20) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsupply20 = {
			anchor: "introsupply20",
			message: "Select yes if " + company + " started a regulated activity on the heat network on or after 1 April 2025",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supply20", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/changes");
	}
});

// Introduction - Communal
router.get("/" + version + "/add-heat-network/introduction/communal", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/communal", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/communal", function (req, res) {
	var introcommunal = req.session.data["introcommunal"];
	var introgroundloop = req.session.data["introgroundloop"];

	if (!introcommunal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcommunal = {
			anchor: "introcommunal",
			message: "Select whether the heat network is a communal network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/communal", {
			data: req.session.data,
		});
	} else {
		if (introcommunal == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/address");
		} else {
			if (introgroundloop == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/sgl-location");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/buildingstotal");
			}
		}
	}
});

function validateUKPostcode(postcode) {
	const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
	return postcodeRegex.test(postcode);
}

// Introduction - SGL Location
router.get("/" + version + "/add-heat-network/introduction/sgl-location", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sgl-location", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sgl-location", function (req, res) {
	var sglLocation = req.session.data["sglLocation"].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

	if (!sglLocation) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglLocation = {
			anchor: "sglLocation",
			message: "Enter the SGL heat network's postcode",
		};
	}

	if (!validateUKPostcode(sglLocation)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.sglLocation = {
			anchor: "sglLocation",
			message: "Enter a full real postcode for the SGL heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sgl-location", {
			data: req.session.data,
		});
	} else {
		clearvalidation(req);
		res.redirect("/" + version + "/add-heat-network/introduction/buildingstotal");
	}
});

// Introduction - Address
router.get("/" + version + "/add-heat-network/introduction/address", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/address", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/address", function (req, res) {
	var userpostcode = req.session.data["buildingaddressPostcode"].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

	if (!userpostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressPostcode = {
			anchor: "buildingaddressPostcode",
			message: "Enter a postcode",
		};
	}

	if (!validateUKPostcode(userpostcode)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressPostcode = {
			anchor: "buildingaddressPostcode",
			message: "Enter a valid postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/address", {
			data: req.session.data,
		});
	} else {
		const axios = require("axios");
		const https = require("https");

		const httpsAgent = new https.Agent({
			rejectUnauthorized: false,
		});

		const apiKey = "HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6";

		const customSort = (a, b) => {
			const extractNumber = (str) => {
				const match = str.match(/^\d+/); // Extracts the leading number from the string
				return match ? parseInt(match[0], 10) : NaN; // Converts the extracted number to integer
			};

			const numA = extractNumber(a);
			const numB = extractNumber(b);

			if (!isNaN(numA) && isNaN(numB)) {
				return -1;
			} else if (isNaN(numA) && !isNaN(numB)) {
				return 1;
			} else if (!isNaN(numA) && !isNaN(numB)) {
				return numA - numB; // Compare the numbers if both are numbers
			} else {
				return a.localeCompare(b); // Compare as strings if neither is a number
			}
		};
		async function postcode(postcode) {
			axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcode + "&dataset=LPI&key=" + apiKey, { httpsAgent }).then(function (response) {
				var output = JSON.stringify(response.data, null, 2);
				let totalResults = response.data.header.totalresults;
				let parsed = JSON.parse(output).results;
				let locationaddresses = [];
				if (parsed != undefined) {
					for (var i = 0; i < parsed.length; i++) {
						let obj = parsed[i];
						locationaddresses.push(obj.LPI.ADDRESS);
					}

					req.session.data.buildingaddressSelect = locationaddresses.sort(customSort);
					req.session.data.ecorgaddressesnotfound = "";
					if (totalResults > 99) {
						res.redirect("/" + version + "/add-heat-network/introduction/addresserror?reason=toomany");
					} else {
						res.redirect("/" + version + "/add-heat-network/introduction/addressselect");
					}
				} else {
					req.session.data.buildingaddressSelect = locationaddresses;
					req.session.data.orgaddressnotfound = true;
					res.redirect("/" + version + "/add-heat-network/introduction/addresserror");
				}
			});
		}
		postcode(userpostcode);
	}
});

// Introduction - Address Error
router.get("/" + version + "/add-heat-network/introduction/addresserror", function (req, res) {
	const urlParams = req.query.reason;
	req.session.data["addresserrorreason"] = urlParams;

	res.render("/" + version + "/add-heat-network/introduction/addresserror", {
		data: req.session.data,
	});
});

// Introduction - Address select
router.get("/" + version + "/add-heat-network/introduction/addressselect", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/addressselect", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/addressselect", function (req, res) {
	var addressselect = req.session.data["buildingaddressSelected"];

	if (!addressselect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressSelected = {
			anchor: "buildingaddressSelectRadios",
			message: "Select an address",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/addressselect", {
			data: req.session.data,
		});
	} else {
		req.session.data.buildingaddress = req.session.data["buildingaddressSelected"];
		res.redirect("/" + version + "/add-heat-network/introduction/addressconfirm");
	}
});

// Introduction - Address confirm
router.get("/" + version + "/add-heat-network/introduction/addressconfirm", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/addressconfirm", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/addressconfirm", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/introduction/similarcommunal");
});

// Introduction - Address already in use
router.get("/" + version + "/add-heat-network/introduction/similarcommunal", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/similarcommunal", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/similarcommunal", function (req, res) {
	var introgroundloop = req.session.data["introgroundloop"];
	var role = req.session.data["role"];
	var sglCategory = req.session.data["sglCategory"];

	if (introgroundloop == "Yes") {
		if (role === "Operator" || sglCategory === "Privately Owned") {
			res.redirect("/" + version + "/add-heat-network/introduction/name");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
		}
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/energycentre");
	}
});

// Introduction - Address manual
router.get("/" + version + "/add-heat-network/introduction/addressmanual", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/addressmanual", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/addressmanual", function (req, res) {
	var buildingaddressMLine1 = req.session.data["buildingaddressMLine1"];
	var buildingaddressMTown = req.session.data["buildingaddressMTown"];
	var buildingaddressMCounty = req.session.data["buildingaddressMCounty"];
	var accounttype = req.session.data["accounttype"];

	var buildingaddressMPostcode = req.session.data["buildingaddressMPostcode"];

	if (!buildingaddressMLine1) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressMLine1 = {
			anchor: "buildingaddressMLine1",
			message: "Enter the street address",
		};
	}

	if (!buildingaddressMTown) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressMTown = {
			anchor: "buildingaddressMTown",
			message: "Enter the town or city",
		};
	}

	if (!buildingaddressMPostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.buildingaddressMPostcode = {
			anchor: "buildingaddressMPostcode",
			message: "Enter a postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/addressmanual", {
			data: req.session.data,
		});
	} else {
		req.session.data.buildingaddressSelected = buildingaddressMLine1 + ", " + buildingaddressMTown + ", " + buildingaddressMCounty + ", " + buildingaddressMPostcode;
		res.redirect("/" + version + "/add-heat-network/introduction/addressconfirm");
	}
});

// Introduction - Changes
router.get("/" + version + "/add-heat-network/introduction/changes", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/changes", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/changes", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/introduction/country");
});

// Introduction - Energy centre
router.get("/" + version + "/add-heat-network/introduction/country", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/country", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/country", function (req, res) {
	var introcountry = req.session.data["introcountry"];

	if (!introcountry) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcountry = {
			anchor: "introcountry",
			message: "Select the country that the heat network’s consumers are located in",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/country", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/communal");
	}
});

// Introduction - Energy centre
router.get("/" + version + "/add-heat-network/introduction/energycentre", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/energycentre", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/energycentre", function (req, res) {
	var introenergycentre = req.session.data["introenergycentre"];
	var role = req.session.data["role"];

	if (!introenergycentre) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introenergycentre = {
			anchor: "introenergycentre",
			message: "Select whether the communal network has its own energy centre",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/energycentre", {
			data: req.session.data,
		});
	} else {
		if (introenergycentre == "Yes") {
			req.session.data["introenergycentrehowmany"] = 1;
		}

		if (role != "Operator") {
			res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sell");
		}
	}
});

// Introduction - Primary
router.get("/" + version + "/add-heat-network/introduction/primary", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/primary", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/primary", function (req, res) {
	var introprimary = req.session.data["introprimary"];
	var company = req.session.data["companyname"] || "Radienteco Ltd";
	var role = req.session.data["role"];

	if (!introprimary) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introprimary = {
			anchor: "introprimary",
			message: "Select whether " + company + " operate the primary network?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/primary", {
			data: req.session.data,
		});
	} else {
		if (role != "Operator") {
			res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/supply20");
		}
	}
});

// Introduction - Communal buildings
router.get("/" + version + "/add-heat-network/introduction/communalbuildings", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/communalbuildings", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/communalbuildings", function (req, res) {
	var introcommunalbuildings = req.session.data["introcommunalbuildings"];

	if (!introcommunalbuildings) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcommunalbuildings = {
			anchor: "introcommunalbuildings",
			message: "Select if this heat network contains any communal buildings?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/communalbuildings", {
			data: req.session.data,
		});
	} else {
		if (introcommunalbuildings == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/communaloperate");
		}
	}
});

// Introduction - Communal Operate
router.get("/" + version + "/add-heat-network/introduction/communaloperate", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/communaloperate", {
		data: req.session.data,
	});
});

// ASH TO REVIEW
router.post("/" + version + "/add-heat-network/introduction/communaloperate", function (req, res) {
	var introcommunaloperate = req.session.data["introcommunaloperate"];
	var introcommunaloperatehowmany = req.session.data["introcommunaloperatehowmany"];
	var introbuildingshowmany = req.session.data["introbuildingshowmany"];
	var introgroundloop = req.session.data["introgroundloop"];
	var role = req.session.data["role"];

	if (!introcommunaloperate) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcommunaloperate = {
			anchor: "introcommunaloperate",
			message: "Select if you operate any of the communal buildings?",
		};
	}
	if (introbuildingshowmany != 1) {
		if (introcommunaloperate == "Yes" && !introcommunaloperatehowmany) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors.introenergycentrehowmany = {
				anchor: "introenergycentrehowmany",
				message: "Enter the number of communal buildings that you operate",
			};
		}
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/communaloperate", {
			data: req.session.data,
		});
	} else {
		if (introcommunaloperate === "No") {
			req.session.data["introhnbuildings"] = req.session.data["introbuildingshowmany"];
			if (introgroundloop == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/summary");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
			}
		} else if (introbuildingshowmany === 1) {
			req.session.data["introhnbuildings"] = 0;
			if (introgroundloop == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=226");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
			}
		} else {
			if (introbuildingshowmany == introcommunaloperatehowmany) {
				req.session.data["introhnbuildings"] = 0;
				if (introgroundloop == "Yes") {
					res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=226");
				} else {
					res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
				}
			} else {
				req.session.data["introhnbuildings"] = req.session.data["introbuildingshowmany"] - introcommunaloperatehowmany;

				if (introgroundloop == "Yes") {
					res.redirect("/" + version + "/add-heat-network/introduction/summary");
				} else {
					res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
				}
			}
		}
	}
});

// Introduction - Communal Register
router.get("/" + version + "/add-heat-network/introduction/communalregister", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/communalregister", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/communalregister", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
});

// Introduction - Communal Other
router.get("/" + version + "/add-heat-network/introduction/communalother", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/communalother", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/communalother", function (req, res) {
	var introcommunalother = req.session.data["introcommunalother"];

	if (!introcommunalother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcommunalother = {
			anchor: "introcommunalother",
			message: "Select if there are communal buildings operated by another organisation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/communalother", {
			data: req.session.data,
		});
	} else {
		if (introcommunalother == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/communalotherregister");
		}
	}
});

// Introduction - introenergycentreoperate
router.get("/" + version + "/add-heat-network/introduction/energycentreoperate", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/energycentreoperate", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/energycentreoperate", function (req, res) {
	var introenergycentre = req.session.data["introenergycentre"];
	var introenergycentrehowmany = parseInt(req.session.data["introenergycentrehowmany"]);
	var buildings = req.session.data["introhnbuildings"];

	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!introenergycentre) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introenergycentre = {
			anchor: "introenergycentre",
			message: "Select if " + company + " operate any cenergy centres on the heat network?",
		};
	}
	if (introenergycentre == "Yes" && !introenergycentrehowmany) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introenergycentrehowmany = {
			anchor: "introenergycentrehowmany",
			message: "Enter the number of enery centres",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/energycentreoperate", {
			data: req.session.data,
		});
	} else {
		if (buildings == 0 && (introenergycentrehowmany == 0 || introenergycentre == "No")) {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=226");
		} else {
			if (introenergycentre == "No") {
				req.session.data["introenergycentrehowmany"] = 0;
			}
			res.redirect("/" + version + "/add-heat-network/introduction/summary");
		}
	}
});

// Introduction - introbuildings - total
router.get("/" + version + "/add-heat-network/introduction/buildingstotal", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/buildingstotal", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/buildingstotal", function (req, res) {
	var introbuildingstotal = req.session.data["introbuildingstotal"];
	var role = req.session.data["role"];
	var introgroundloop = req.session.data["introgroundloop"];

	if (!introbuildingstotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introbuildingstotal = {
			anchor: "introbuildingstotal",
			message: "Enter the number of buildings on this heat network?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/buildingstotal", {
			data: req.session.data,
		});
	} else {
		if (introbuildingstotal == 0) {
			if (introgroundloop == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=226");
			} else {
				// if (role == "Operator") {
				// 	res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=244");
				// } else {
				req.session.data["introhnbuildings"] = 0;
				res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
				// }
			}
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/buildings");
		}
	}
});

// Introduction - introbuildings - responsible buildings
router.get("/" + version + "/add-heat-network/introduction/buildings", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/buildings", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/buildings", function (req, res) {
	var introbuildingstotal = parseInt(req.session.data["introbuildingstotal"]);
	var introbuildings = req.session.data["introbuildings"];
	var introbuildingshowmany = req.session.data["introbuildingshowmany"];
	var introgroundloop = req.session.data["introgroundloop"];

	var company = req.session.data["companyname"] || "Radienteco Ltd";
	var role = req.session.data["role"];

	if (!introbuildings) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introbuildings = {
			anchor: "introbuildings",
			message: "Select if " + company + " operate any buildings on the heat network?",
		};
	}

	if (introbuildingstotal > 1) {
		if (introbuildings == "No" && !introbuildingshowmany) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors.introbuildingshowmany = {
				anchor: "introbuildingshowmany",
				message: "Enter the number of buildings",
			};
		}
	}

	if (introbuildings == "Yes") {
		introbuildingshowmany = null;
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/buildings", {
			data: req.session.data,
		});
	} else {
		if (introbuildingshowmany == "0") {
			// if (role == "Operator") {
			// res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=244");
			// } else {

			if (introgroundloop == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=226");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
			}
			// }
		} else if (introbuildings == "No") {
			if (introbuildingstotal == 1) {
				// if (role == "Operator") {
				// res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=244");
				// } else {
				req.session.data["introhnbuildings"] = 0;
				if (introgroundloop == "Yes") {
					res.redirect("/" + version + "/add-heat-network/introduction/summary");
				} else {
					res.redirect("/" + version + "/add-heat-network/introduction/energycentreoperate");
				}
				// }
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/communaloperate");
			}
		} else {
			req.session.data["introbuildingshowmany"] = introbuildingstotal;
			res.redirect("/" + version + "/add-heat-network/introduction/communaloperate");
		}
	}
});

// Introduction - Summary
router.get("/" + version + "/add-heat-network/introduction/summary", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/summary", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/summary", function (req, res) {
	var introgroundloop = req.session.data["introgroundloop"];
	var sglCategory = req.session.data["sglCategory"];
	var buildings = req.session.data["introhnbuildings"];
	var role = req.session.data["role"];

	if (introgroundloop == "Yes") {
		if (sglCategory == "Non-Utility") {
			res.redirect("/" + version + "/add-heat-network/introduction/selfsupply");
		} else {
			if (role == "Operator" || buildings == 1 || sglCategory === "Privately Owned") {
				res.redirect("/" + version + "/add-heat-network/introduction/name");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
			}
		}
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/pipework");
	}
});

// Introduction - Pipework
router.get("/" + version + "/add-heat-network/introduction/pipework", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/pipework", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/pipework", function (req, res) {
	var intropipework = req.session.data["intropipework"];

	if (!intropipework) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.intropipework = {
			anchor: "intropipework",
			message: "Select if you supply all of the buildings you operate on this heat network?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/pipework", {
			data: req.session.data,
		});
	} else {
		if (intropipework == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/responsible");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/selfsupply");
		}
	}
});

// Introduction - Responsible
router.get("/" + version + "/add-heat-network/introduction/responsible", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/responsible", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/responsible", function (req, res) {
	var introresponsible = req.session.data["introresponsible"];

	if (!introresponsible) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introresponsible = {
			anchor: "introresponsible",
			message: "Select if you supply all of the buildings you operate on this heat network?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/responsible", {
			data: req.session.data,
		});
	} else {
		if (introresponsible == "No") {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=227");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/selfsupply");
		}
	}
});

// Introduction - introselfsupply
router.get("/" + version + "/add-heat-network/introduction/selfsupply", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/selfsupply", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/selfsupply", function (req, res) {
	var introselfsupply = req.session.data["introselfsupply"];
	var buildings = req.session.data["introhnbuildings"];
	var role = req.session.data["role"];
	var introgroundloop = req.session.data["introgroundloop"];
	var sglCategory = req.session.data["sglCategory"];

	if (!introselfsupply) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introselfsupply = {
			anchor: "introselfsupply",
			message: "Select whether the heat network is a self-supply network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/selfsupply", {
			data: req.session.data,
		});
	} else {
		if (introselfsupply == "Yes" || (introselfsupply == "No" && role == "Operator") || (introselfsupply == "No" && buildings <= 1)) {
			if (introgroundloop == "Yes" && sglCategory === "Privately Owned") {
				res.redirect("/" + version + "/add-heat-network/introduction/name");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/sell");
			}
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
		}
	}
});

// Introduction - Suppliers
router.get("/" + version + "/add-heat-network/introduction/suppliers", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/suppliers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/suppliers", function (req, res) {
	var introsuppliers = req.session.data["introsuppliers"];
	var introgroundloop = req.session.data["introgroundloop"];

	if (!introsuppliers) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsuppliers = {
			anchor: "introsuppliers",
			message: "Select if you supply all of the buildings you operate on this heat network?",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/suppliers", {
			data: req.session.data,
		});
	} else {
		if (introgroundloop == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/name");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/sell");
		}
	}
});

// Introduction - Supply start
router.get("/" + version + "/add-heat-network/introduction/supplystart", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supplystart", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supplystart", function (req, res) {
	var introsupplystart = req.session.data["introsupplystart"];

	if (!introsupplystart) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsupplystart = {
			anchor: "introsupplystart",
			message: "Select if this heat network will start supplying customers before 27 January 2027",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supplystart", {
			data: req.session.data,
		});
	} else {
		if (introsupplystart == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=232");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/dropout?v=233");
		}
	}
});

// Introduction - introcontrol
router.get("/" + version + "/add-heat-network/introduction/control", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/control", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/control", function (req, res) {
	var introcontrol = req.session.data["introcontrol"];
	var controlnumber = parseInt(req.session.data["introcontrolhowmany"]);
	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!introcontrol) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcontrol = {
			anchor: "introcontrol",
			message: "Select if " + company + " operate all of these connected communal networks?",
		};
	}
	if (introcontrol == "No" && !controlnumber) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcontrolhowmany = {
			anchor: "introcontrolhowmany",
			message: "Enter the number of connected communal networks",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/control", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/include");
	}
});

// Introduction - Only Supplier
router.get("/" + version + "/add-heat-network/introduction/othersuppliers", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/othersuppliers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/othersuppliers", function (req, res) {
	var introonlysupplier = req.session.data["introonlysupplier"];

	if (!introonlysupplier) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introonlysupplier = {
			anchor: "introonlysupplier",
			message: "Select whether there are other suppliers on this heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/othersuppliers", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/energycentre");
	}
});

// Introduction - Supply
router.get("/" + version + "/add-heat-network/introduction/supply", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supply", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supply", function (req, res) {
	var introsupply = req.session.data["introsupply"];

	if (!introsupply) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsupply = {
			anchor: "introsupply",
			message: "Error text",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supply", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/supply20");
	}
});

// Introduction - Suppliers
router.get("/" + version + "/add-heat-network/introduction/suppliers", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/suppliers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/suppliers", function (req, res) {
	var introsuppliers = req.session.data["introsuppliers"];

	if (!introsuppliers) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsuppliers = {
			anchor: "introsuppliers",
			message: "Enter the number of suppliers",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/suppliers", {
			data: req.session.data,
		});
	} else {
		res.redirect(301, "/" + version + "/add-heat-network/introduction/supply");
	}
});

// Introduction - Only supplier
router.get("/" + version + "/add-heat-network/introduction/onlysupply", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/onlysupply", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/onlysupply", function (req, res) {
	var introonlysupply = req.session.data["introonlysupply"];
	var role = req.session.data["role"];

	if (!introonlysupply) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introonlysupply = {
			anchor: "introonlysupply",
			message: "Select whether you are the only supplier",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/onlysupply", {
			data: req.session.data,
		});
	} else {
		if (introonlysupply == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/supply");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/suppliers");
		}
	}
});

// Introduction - Supply when
router.get("/" + version + "/add-heat-network/introduction/supplywhen", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supplywhen", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supplywhen", function (req, res) {
	var supplywhenyear = req.session.data["supplywhenyear"];
	var introcommunal = req.session.data["introcommunal"];

	if (!supplywhenyear) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.supplywhenyear = {
			anchor: "supplywhenyear",
			message: "Enter a year",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supplywhen", {
			data: req.session.data,
		});
	} else {
		req.session.data["supplywhen"] = supplywhenyear;

		if (supplywhenyear > 2024) {
			res.redirect("/" + version + "/add-heat-network/introduction/operational");
		} else {
			if (introcommunal == "Yes") {
				res.redirect("/" + version + "/add-heat-network/introduction/buy");
			} else {
				res.redirect("/" + version + "/add-heat-network/introduction/buy");
			}
		}
	}
});

// Introduction - Supply decade
router.get("/" + version + "/add-heat-network/introduction/supplydecade", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/supplydecade", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/supplydecade", function (req, res) {
	var introsupplydecade = req.session.data["introsupplydecade"];
	var introcommunal = req.session.data["introcommunal"];

	if (!introsupplydecade) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsupplydecade = {
			anchor: "introsupplydecade",
			message: "Select a decade",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/supplydecade", {
			data: req.session.data,
		});
	} else {
		req.session.data.supplywhen = introsupplydecade;
		if (introcommunal == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/buy");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/buy");
		}
	}
});

// Introduction - Operationbal
router.get("/" + version + "/add-heat-network/introduction/operational", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/operational", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/operational", function (req, res) {
	var introoperationalday = req.session.data["introoperationalday"];
	var introoperationalmonth = req.session.data["introoperationalmonth"];
	var introoperationalyear = req.session.data["introoperationalyear"];
	const operationalDeadline = new Date("2025-03-31");

	function createDateFromInputs(day, month, year) {
		// Convert inputs to integers
		const dayInt = parseInt(day, 10);
		const monthInt = parseInt(month, 10) - 1; // JavaScript months are 0-based
		const yearInt = parseInt(year, 10);

		// Validate inputs
		if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt) || dayInt < 1 || dayInt > 31 || monthInt < 0 || monthInt > 11 || yearInt < 1) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors.introoperationaldate = {
				anchor: "introoperationalday",
				message: "Enter a valid date",
			};
		}

		// Create and return the Date object
		const date = new Date(yearInt, monthInt, dayInt);

		// Validate the resulting date to ensure it's correct
		if (date.getDate() !== dayInt || date.getMonth() !== monthInt || date.getFullYear() !== yearInt) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors.introoperationaldate = {
				anchor: "introoperationalday",
				message: "Enter a valid date",
			};
		}

		return date;
	}

	let introoperationaldate;

	try {
		introoperationaldate = createDateFromInputs(introoperationalday, introoperationalmonth, introoperationalyear);
		console.log("Intro Operational Date:", introoperationaldate);
	} catch (error) {
		console.error("Error creating intro operational date:", error.message);
	}

	var introcommunal = req.session.data["introcommunal"];

	if (!introoperationalday || !introoperationalmonth || !introoperationalyear) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introoperationaldate = {
			anchor: "introoperationalday",
			message: "Enter a full date",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/operational", {
			data: req.session.data,
		});
	} else {
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const formattedDate = `${introoperationaldate.getDate()} ${monthNames[introoperationaldate.getMonth()]} ${introoperationaldate.getFullYear()}`;

		req.session.data["supplywhen"] = formattedDate;
		if (introoperationaldate > operationalDeadline) {
			req.session.data["introauthorised"] == "No";
			res.redirect("/" + version + "/add-heat-network/introduction/authorisation");
		} else {
			req.session.data["introauthorised"] == "Yes";

			res.redirect("/" + version + "/add-heat-network/introduction/buy");
		}
	}
});

// Introduction - Buy Heat
router.get("/" + version + "/add-heat-network/introduction/buy", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/buy", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/buy", function (req, res) {
	var introbuy = req.session.data["introbuy"];

	if (!introbuy) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introbuy = {
			anchor: "introbuy",
			message: "Select whether the heat network buys or sells heat",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/buy", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/sell");
	}
});

// Introduction - Sell Heat
router.get("/" + version + "/add-heat-network/introduction/sell", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/sell", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/sell", function (req, res) {
	var introsell = req.session.data["introsell"];
	var company = req.session.data["companyname"] || "Radienteco Ltd";

	if (!introsell) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introsell = {
			anchor: "introsell",
			message: "Select yes if " + company + " sells heating, cooling or hot water from this heat network to another heat network that is operated by a different organisation",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/sell", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/introduction/name");
	}
});
// Introduction - Name
router.get("/" + version + "/add-heat-network/introduction/name", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/name", function (req, res) {
	var name = req.session.data["name"];
	var introcommunal = req.session.data["introcommunal"];

	if (!name) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.name = {
			anchor: "name",
			message: "Enter a name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/name", {
			data: req.session.data,
		});
	} else {
		if (introcommunal == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/cya");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/similardistrict");
		}
	}
});

// Introduction - Commissioned
router.get("/" + version + "/add-heat-network/introduction/commissioned", function (req, res) {
	res.render("/" + version + "/add-heat-network/introduction/commissioned", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/commissioned", function (req, res) {
	var introcommissioned = req.session.data["introcommissioned"];

	if (!introcommissioned) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.introcommissioned = {
			anchor: "introcommissioned",
			message: "Select whther the heat network will be commissioned",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/commissioned", {
			data: req.session.data,
		});
	} else {
		if (introcommissioned == "Yes") {
			res.redirect("/" + version + "/add-heat-network/introduction/changes");
		} else {
			res.redirect("/" + version + "/add-heat-network/introduction/changes");
		}
	}
});

function populateIntrodata(req) {
	req.session.data["role"] = "Operator and supplier";
	req.session.data["introrelevant"] = "Yes";
	req.session.data["introgroundloop"] = "No";
	req.session.data["introcommunal"] = "No";
	req.session.data["introbuildingstotal"] = "3";
	req.session.data["introbuildingshowmany"] = "3";
	req.session.data["introcommunaloperate"] = "Yes";
	req.session.data["introcommunaloperatehowmany"] = "1";
	req.session.data["introhnbuildings"] = "2";
	req.session.data["introenergycentre"] = "Yes";
	req.session.data["introenergycentrehowmany"] = "2";
	req.session.data["intropipework"] = "Yes";
	req.session.data["introsuppliers"] = "No";
	req.session.data["introsupplycurrent"] = "Yes";
	req.session.data["supplywhen"] = "2022";
	req.session.data["introselfsupply"] = "No";
	req.session.data["introbuy"] = "Yes";
	req.session.data["introsell"] = "No";
	req.session.data["name"] = "Heat Network One";
	req.session.data["introcomplete"] = "true";
	req.session.data["introsupply20"] = "No";
	req.session.data["introresponsible"] = "Yes";
}

// Intro - cya
router.get("/" + version + "/add-heat-network/introduction/cya", function (req, res) {
	const urlParams = req.query.v;

	if (urlParams == "complete") {
		populateIntrodata(req);
	}

	res.render("/" + version + "/add-heat-network/introduction/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

// Confirm changes
router.get("/" + version + "/add-heat-network/confirmchange", function (req, res) {
	req.session.data["confirmchange"] = "";
	backURL = req.header("Referer");
	res.render("/" + version + "/add-heat-network/confirmchange", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/confirmchange", function (req, res) {
	var confirmchange = req.session.data["confirmchange"];

	if (!confirmchange) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.confirmchange = {
			anchor: "confirmchange",
			message: "Confirm whether you wish to make these changes",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/confirmchange", {
			data: req.session.data,
		});
	} else {
		if (confirmchange == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(backURL);
		}
	}
});

// Energy centre - Energy Centres
router.get("/" + version + "/add-heat-network/energycentre/energycentres", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/energycentres", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/energycentres", function (req, res) {
	var enerycentrescompleted = req.session.data["enerycentrescompleted"];

	if (enerycentrescompleted != "true") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressHasPostcode = {
			anchor: "",
			message: "Fill in all energy centre information before continuing",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/energycentres", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/energycentre/cya");
	}
});

function populateECdata(req, id) {
	req.session.data["ecaddressHasPostcode"] = req.session.data["ecaddressHasPostcode" + id];
	req.session.data["ecaddressPostcode"] = req.session.data["ecaddressPostcode" + id];

	req.session.data["ecaddressSelected"] = req.session.data["ecaddressSelected" + id];
	req.session.data["ecaddresslatitude"] = req.session.data["ecaddresslatitude" + id];
	req.session.data["ecaddresslongitude"] = req.session.data["ecaddresslongitude" + id];
	req.session.data["energytype"] = req.session.data["energytype" + id];
	req.session.data["techcapacity"] = req.session.data["techcapacity" + id];
	req.session.data["techcoolingcapacity"] = req.session.data["techcoolingcapacity" + id];
	req.session.data["technologies"] = req.session.data["technologies" + id];

	req.session.data["techmeters"] = req.session.data["techmeters" + id];
}

// Energy centre - Intro
router.get("/" + version + "/add-heat-network/energycentre/intro", function (req, res) {
	req.session.data["energycentres"] = req.session.data["introenergycentrehowmany"] || 0;

	res.render("/" + version + "/add-heat-network/energycentre/intro", {
		data: req.session.data,
	});
});

// Energy centre - Has postcode
router.get("/" + version + "/add-heat-network/energycentre/addresspostcode", function (req, res) {
	req.session.data["energycentres"] = req.session.data["introenergycentrehowmany"] || 0;

	const urlParams = req.query.id;
	if (urlParams) {
		req.session.data["currentecid"] = urlParams;
		populateECdata(req, urlParams);
	}

	res.render("/" + version + "/add-heat-network/energycentre/addresspostcode", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/addresspostcode", function (req, res) {
	var ecaddressHasPostcode = req.session.data["ecaddressHasPostcode"];

	if (!ecaddressHasPostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressHasPostcode = {
			anchor: "ecaddressHasPostcode",
			message: "Tell us whether the energy centre has a postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/addresspostcode", {
			data: req.session.data,
		});
	} else {
		var energycentres = req.session.data["energycentres"];
		if (energycentres == 0) {
			req.session.data["energycentretype"] = "plot connection point";
		} else {
			req.session.data["energycentretype"] = "energy centre";
		}

		if (ecaddressHasPostcode == "Yes") {
			res.redirect("/" + version + "/add-heat-network/energycentre/address");
		} else {
			res.redirect("/" + version + "/add-heat-network/energycentre/addresscoords");
		}
	}
});

// Energy centre - Coordinates
router.get("/" + version + "/add-heat-network/energycentre/addresscoords", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/addresscoords", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/addresscoords", function (req, res) {
	var ecaddresslatitude = req.session.data["ecaddresslatitude"];
	var ecaddresslongitude = req.session.data["ecaddresslongitude"];

	if (!ecaddresslatitude) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddresslatitude = {
			anchor: "ecaddresslatitude",
			message: "Enter the latitude for the energy centre",
		};
	}

	if (!ecaddresslongitude) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddresslongitude = {
			anchor: "ecaddresslongitude",
			message: "Enter the longitude for the energy centre",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/addresscoords", {
			data: req.session.data,
		});
	} else {
		var energycentres = req.session.data["energycentres"];

		if (energycentres == 0) {
			res.redirect("/" + version + "/add-heat-network/energycentre/cya");
		} else {
			res.redirect("/" + version + "/add-heat-network/energycentre/type");
		}
	}
});

// Energy centre - Address
router.get("/" + version + "/add-heat-network/energycentre/address", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/address", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/address", function (req, res) {
	var userpostcode = req.session.data["ecaddressPostcode"].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

	if (!userpostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressPostcode = {
			anchor: "ecaddressPostcode",
			message: "Enter a postcode",
		};
	}

	function validateUKPostcode(postcode) {
		const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
		return postcodeRegex.test(postcode);
	}

	if (!validateUKPostcode(userpostcode)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressPostcode = {
			anchor: "ecaddressPostcode",
			message: "Enter a valid postcode",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/address", {
			data: req.session.data,
		});
	} else {
		const axios = require("axios");
		const https = require("https");

		const httpsAgent = new https.Agent({
			rejectUnauthorized: false,
		});

		const apiKey = "HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6";

		const customSort = (a, b) => {
			const extractNumber = (str) => {
				const match = str.match(/^\d+/); // Extracts the leading number from the string
				return match ? parseInt(match[0], 10) : NaN; // Converts the extracted number to integer
			};

			const numA = extractNumber(a);
			const numB = extractNumber(b);

			if (!isNaN(numA) && isNaN(numB)) {
				return -1;
			} else if (isNaN(numA) && !isNaN(numB)) {
				return 1;
			} else if (!isNaN(numA) && !isNaN(numB)) {
				return numA - numB; // Compare the numbers if both are numbers
			} else {
				return a.localeCompare(b); // Compare as strings if neither is a number
			}
		};
		async function postcode(postcode) {
			axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcode + "&dataset=LPI&key=" + apiKey, { httpsAgent }).then(function (response) {
				var output = JSON.stringify(response.data, null, 2);
				let totalResults = response.data.header.totalresults;
				let parsed = JSON.parse(output).results;
				let locationaddresses = [];
				if (parsed != undefined) {
					for (var i = 0; i < parsed.length; i++) {
						let obj = parsed[i];
						locationaddresses.push(obj.LPI.ADDRESS);
					}

					req.session.data.ecAddressSelect = locationaddresses.sort(customSort);
					req.session.data.ecorgaddressesnotfound = "";
					if (totalResults > 99) {
						res.redirect("/" + version + "/add-heat-network/energycentre/addresserror?reason=toomany");
					} else {
						res.redirect("/" + version + "/add-heat-network/energycentre/addressselect");
					}
				} else {
					req.session.data.ecAddressSelect = locationaddresses;
					req.session.data.orgaddressnotfound = true;
					res.redirect("/" + version + "/add-heat-network/energycentre/addresserror");
				}
			});
		}
		postcode(userpostcode);
	}
});

// Energy center - Address Error
router.get("/" + version + "/add-heat-network/energycentre/addresserror", function (req, res) {
	const urlParams = req.query.reason;
	req.session.data["addresserrorreason"] = urlParams;

	res.render("/" + version + "/add-heat-network/energycentre/addresserror", {
		data: req.session.data,
	});
});

// Energy center - Address select
router.get("/" + version + "/add-heat-network/energycentre/addressselect", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/addressselect", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/addressselect", function (req, res) {
	var addressselect = req.session.data["ecaddressSelected"];

	if (!addressselect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressSelected = {
			anchor: "ecAddressSelectRadios",
			message: "Select an address",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/addressselect", {
			data: req.session.data,
		});
	} else {
		req.session.data.ecAddress = req.session.data["ecaddressSelected"];
		res.redirect("/" + version + "/add-heat-network/energycentre/addressconfirm");
	}
});

// Energy centre - Address confirm
router.get("/" + version + "/add-heat-network/energycentre/addressconfirm", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/addressconfirm", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/addressconfirm", function (req, res) {
	var energycentres = req.session.data["energycentres"];
	if (energycentres == 0) {
		res.redirect("/" + version + "/add-heat-network/energycentre/cya");
	} else {
		res.redirect("/" + version + "/add-heat-network/energycentre/type");
	}
});

// Energy centre - Address manual
router.get("/" + version + "/add-heat-network/energycentre/addressmanual", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/addressmanual", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/addressmanual", function (req, res) {
	var ecaddressMLine1 = req.session.data["ecaddressMLine1"];
	var ecaddressMTown = req.session.data["ecaddressMTown"];
	var ecaddressMCounty = req.session.data["ecaddressMCounty"];
	var ecaddressMCountry = req.session.data["ecaddressMCountry"];
	var accounttype = req.session.data["accounttype"];

	var ecaddressMPostcode = req.session.data["ecaddressMPostcode"];

	if (!ecaddressMLine1) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressMLine1 = {
			anchor: "ecaddressMLine1",
			message: "Enter the street address",
		};
	}

	if (!ecaddressMTown) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressMTown = {
			anchor: "ecaddressMTown",
			message: "Enter the town or city",
		};
	}

	if (!ecaddressMPostcode) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressMPostcode = {
			anchor: "ecaddressMPostcode",
			message: "Enter a postcode",
		};
	}

	if (accounttype == "Overseas organisation" && !ecaddressMCountry) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.ecaddressMCountry = {
			anchor: "ecaddressMCountry",
			message: "Enter a country",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/addressmanual", {
			data: req.session.data,
		});
	} else {
		req.session.data.ecAddress = ecaddressMLine1 + ", " + ecaddressMTown + ", " + ecaddressMCounty + ", " + ecaddressMPostcode;
		console.log(req.session.data.ecAddress);
		res.redirect("/" + version + "/add-heat-network/energycentre/addressconfirm");
	}
});

// Energy Centre - Type
router.get("/" + version + "/add-heat-network/energycentre/type", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/type", function (req, res) {
	var energytypes = req.session.data["energytype"];

	if (!energytypes) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.energytypes = {
			anchor: "energytypes",
			message: "Select a thermal energy type",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/type", {
			data: req.session.data,
		});
	} else {
		if (energytypes == "Cooling") {
			res.redirect("/" + version + "/add-heat-network/energycentre/coolingcapacity");
		} else {
			res.redirect("/" + version + "/add-heat-network/energycentre/capacity");
		}
	}
});
// Energy centre - Capacity
router.get("/" + version + "/add-heat-network/energycentre/capacity", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/capacity", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/capacity", function (req, res) {
	var techcapacity = req.session.data["techcapacity"];
	var energytype = req.session.data["energytype"];

	if (!techcapacity) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techcapacity = {
			anchor: "techcapacity",
			message: "Enter a capcity",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/capacity", {
			data: req.session.data,
		});
	} else {
		if (Array.isArray(energytype) && energytype.includes("Cooling")) {
			res.redirect("/" + version + "/add-heat-network/energycentre/coolingcapacity");
		} else {
			res.redirect("/" + version + "/add-heat-network/energycentre/technology");
		}
	}
});

// Energy centre - coolingcapacity
router.get("/" + version + "/add-heat-network/energycentre/coolingcapacity", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/coolingcapacity", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/coolingcapacity", function (req, res) {
	var techcoolingcapacity = req.session.data["techcoolingcapacity"];
	var services = req.session.data["service"];

	if (!techcoolingcapacity) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techcoolingcapacity = {
			anchor: "techcoolingcapacity",
			message: "Enter a cooling capcity",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/coolingcapacity", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/energycentre/technology");
	}
});

// Energy centre - technology
router.get("/" + version + "/add-heat-network/energycentre/technology", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/technology", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/technology", function (req, res) {
	var techtechnology = req.session.data["techtechnology"];
	var techtechnologyother = req.session.data["techtechnologyother"];

	if (!techtechnology) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techtechnology = {
			anchor: "techtechnology",
			message: "Select a technology",
		};
	}

	if (techtechnology == "Other" && !techtechnologyother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techtechnologyother = {
			anchor: "techtechnologyother",
			message: "Enter a technology name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/technology", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/energycentre/cya");
	}
});

// Energy centre - energysource
router.get("/" + version + "/add-heat-network/energycentre/energysource", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/energysource", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/energysource", function (req, res) {
	var techenergysource = req.session.data["techenergysource"];
	var techenergysourceother = req.session.data["techenergysourceother"];

	if (!techenergysource) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techenergysource = {
			anchor: "techenergysource",
			message: "Select an energy source",
		};
	}

	if (techenergysource == "Other" && !techenergysourceother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techenergysourceother = {
			anchor: "techenergysourceother",
			message: "Enter an energy source name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/energysource", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/energycentre/summary");
	}
});

// Energy centre when
router.get("/" + version + "/add-heat-network/energycentre/when", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/when", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/when", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/energycentre/summary");
});

function clearECdata(req) {
	req.session.data["ecaddressHasPostcode"] = "";
	req.session.data["ecaddressSelected"] = "";
	req.session.data["ecaddressPostcode"] = "";
	req.session.data["ecaddresslatitude"] = "";
	req.session.data["ecaddresslongitude"] = "";
	req.session.data["energytype"] = "";
	req.session.data["techcapacity"] = "";
	req.session.data["techcoolingcapacity"] = "";
	req.session.data["technologies"] = "";
	req.session.data["techmeters"] = "";
	req.session.data["techtechnology"] = "";
}

// Energy centre - summary
router.get("/" + version + "/add-heat-network/energycentre/summary", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/summary", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/summary", function (req, res) {
	var techsummaryother = req.session.data["techsummaryother"];
	var energycentres = req.session.data["energycentres"];
	var tech = req.session.data["techtechnology"] || req.session.data["technologyother"];

	if (!techsummaryother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.techsummaryother = {
			anchor: "techsummaryother",
			message: "Select an option",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/summary", {
			data: req.session.data,
		});
	} else {
		if (tech) {
			req.session.data.technologies = req.session.data.technologies || [];
			req.session.data.technologies.push([tech]);
		}

		if (techsummaryother == "No") {
			if (energycentres > 1) {
				((req.session.data["ecaddressHasPostcode" + req.session.data["currentecid"]] = req.session.data["ecaddressHasPostcode"]),
					(req.session.data["ecaddressPostcode" + req.session.data["currentecid"]] = req.session.data["ecaddressPostcode"]),
					(req.session.data["ecaddressSelected" + req.session.data["currentecid"]] = req.session.data["ecaddressSelected"]),
					(req.session.data["ecaddresslatitude" + req.session.data["currentecid"]] = req.session.data["ecaddresslatitude"]),
					(req.session.data["ecaddresslongitude" + req.session.data["currentecid"]] = req.session.data["ecaddresslongitude"]),
					(req.session.data["energytype" + req.session.data["currentecid"]] = req.session.data["energytype"]),
					(req.session.data["techcapacity" + req.session.data["currentecid"]] = req.session.data["techcapacity"]),
					(req.session.data["techcoolingcapacity" + req.session.data["currentecid"]] = req.session.data["techcoolingcapacity"]),
					(req.session.data["technologies" + req.session.data["currentecid"]] = req.session.data["technologies"]),
					(req.session.data["techmeters" + req.session.data["currentecid"]] = req.session.data["techmeters"]),
					(req.session.data["eccomplete" + req.session.data["currentecid"]] = true));
				clearECdata(req);

				res.redirect("/" + version + "/add-heat-network/energycentre/energycentres");
			} else {
				res.redirect("/" + version + "/add-heat-network/energycentre/cya");
			}
		} else {
			req.session.data["techtechnology"] = "";
			req.session.data["technologyother"] = "";
			req.session.data["techenergysource"] = "";
			req.session.data["techenergysourceother"] = "";
			req.session.data["techwhenyear"] = "";

			res.redirect("/" + version + "/add-heat-network/energycentre/technology");
		}
	}
});

// // Energy centre - Another
// router.get('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
//
//     res.render('/' + version + '/add-heat-network/energycentre/another', {
//         data: req.session.data
//     });
// });

// router.post('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
//
//     var techanother = req.session.data['techanother']

//     if (!techanother) {
//         req.session.data.validationError = "true"
//         req.session.data.validationErrors.techanother = {
//             "anchor": "techanother",
//             "message": "Select if the system is capable of thermal electricity"
//         }
//     }

//     if (req.session.data.validationError == "true") {
//         res.render('/' + version + '/add-heat-network/energycentre/another', {
//             data: req.session.data
//         });
//     }

//     else {
//         res.redirect('/' + version + '/add-heat-network/energycentre/cya');
//     }

// });

// Energy centre - cya
router.get("/" + version + "/add-heat-network/energycentre/cya", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

// Buildings & consumers - Intro
router.get("/" + version + "/add-heat-network/buildingsandconsumers/intro", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/intro", {
		data: req.session.data,
	});
});

// Buildings & consumers - Supply April
router.get("/" + version + "/add-heat-network/buildingsandconsumers/supply", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/supply", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/supply", function (req, res) {
	var supply20 = req.session.data["supply20"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!supply20) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.supply20 = {
			anchor: "supply20",
			message: "Select yes if " + companyname + " started supplying heating, cooling or hot water to some or all of the consumers on the heat network on or after 1 April 2025",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/supply", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/domestic");
	}
});

// Buildings & consumers - Domestic
router.get("/" + version + "/add-heat-network/buildingsandconsumers/domestic", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/domestic", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/domestic", function (req, res) {
	var customersdomestic = req.session.data["customersdomestic"];
	var customersdomestictotal = req.session.data["customersdomestictotal"];

	if (!customersdomestic) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersdomestic = {
			anchor: "customersdomestic",
			message: "Select yes if this heat network has domestic customers",
		};
	}

	if (customersdomestic == "Yes" && !customersdomestictotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersdomestictotal = {
			anchor: "customersdomestictotal",
			message: "Enter the number of domestic customers",
		};
	}

	if (customersdomestic == "Yes" && isNaN(customersdomestictotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersdomestictotal = {
			anchor: "customersdomestictotal",
			message: "Number of domestic customers must be a number",
		};
	}

	if (customersdomestic == "Yes" && customersdomestictotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersdomestictotal = {
			anchor: "customersdomestictotal",
			message: "Number of domestic customers must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/domestic", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/nondomestic");
	}
});

// Buildings & consumers - Non nondomestic
router.get("/" + version + "/add-heat-network/buildingsandconsumers/nondomestic", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/nondomestic", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/nondomestic", function (req, res) {
	var customersdomestic = req.session.data["customersdomestic"];

	var customersnondomestic = req.session.data["customersnondomestic"];
	var customersnondomestictotal = req.session.data["customersnondomestictotal"];

	const introgroundloop = req.session.data["introgroundloop"];
	const sglCategory = req.session.data["sglCategory"];

	if (!customersnondomestic) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersnondomestic = {
			anchor: "customersnondomestic",
			message: "Select yes if this heat network has non-domestic customers",
		};
	}

	if (customersnondomestic == "Yes" && !customersnondomestictotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersnondomestictotal = {
			anchor: "customersnondomestictotal",
			message: "Enter the number of non-domestic customers",
		};
	}

	if (customersnondomestic == "Yes" && isNaN(customersnondomestictotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersnondomestictotal = {
			anchor: "customersnondomestictotal",
			message: "Number of non-domestic customers must be a number",
		};
	}

	if (customersnondomestic == "Yes" && customersnondomestictotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customersnondomestictotal = {
			anchor: "customersnondomestictotal",
			message: "Number of non-domestic customers must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/nondomestic", {
			data: req.session.data,
		});
	} else {
		if (customersdomestic == "No" && customersnondomestic == "No") {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/dropout");
		} else {
			if (customersnondomestic == "Yes") {
				if (introgroundloop == "Yes") {
					res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises");
				} else {
					res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/industrial");
				}
			} else {
				if (sglCategory == "Non-Utility") {
					res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/cya");
				} else {
					res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters");
				}
			}
		}
	}
});

// Buildings & consumers - Industrial
router.get("/" + version + "/add-heat-network/buildingsandconsumers/industrial", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/industrial", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/industrial", function (req, res) {
	var consumertypeindustrial = req.session.data["consumertypeindustrial"];

	if (!consumertypeindustrial) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumertypeindustrial = {
			anchor: "consumertypeindustrial",
			message: "Select yes if the heat network is an industrial heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/industrial", {
			data: req.session.data,
		});
	} else {
		if (consumertypeindustrial == "Yes") {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/agent");
		} else {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises");
		}
	}
});

// Buildings & consumers - Type
router.get("/" + version + "/add-heat-network/buildingsandconsumers/type", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/type", function (req, res) {
	var customertype = req.session.data["customertype"];
	req.session.data["customertypealt"] = req.session.data["customertype"];

	if (!customertype) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customertype = {
			anchor: "customertype",
			message: "Select a type of customers on this heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/type", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/customers");
	}
});

// Buildings & consumers - Customers
router.get("/" + version + "/add-heat-network/buildingsandconsumers/customers", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/customers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/customers", function (req, res) {
	var customersCommercial = req.session.data["buildingcustomersCommercial"];
	var customertype = req.session.data["customertype"];

	const types = ["Residential", "Commercial", "Industrial", "Public"];

	types.forEach((type) => {
		if (customertype.includes(type) && !req.session.data[`buildingcustomers${type}`]) {
			req.session.data.validationError = "true";
			req.session.data.validationErrors[`buildingcustomers${type}`] = {
				anchor: `buildingcustomers${type}`,
				message: "Enter the number of " + type + " customers",
			};
		}
	});

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/customers", {
			data: req.session.data,
		});
	} else {
		if (customersCommercial >= 1) {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses");
		} else {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters");
		}
	}
});

// Buildings & consumers -  Pre payment meters
router.get("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters", function (req, res) {
	var prepaymentmeters = req.session.data["prepaymentmeters"];
	var prepaymentmetersnumber = req.session.data["prepaymentmetersnumber"];

	if (!prepaymentmeters) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.prepaymentmeters = {
			anchor: "prepaymentmeters",
			message: "Select whether any dwellings have pre-payment meters",
		};
	}

	if (prepaymentmeters == "Yes" && !prepaymentmetersnumber) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.prepaymentmetersnumber = {
			anchor: "prepaymentmetersnumber",
			message: "Enter how many dwellings have pre-payment meters",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/agent");
	}
});

// Buildings & consumers -  Microbusinesses
router.get("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses", function (req, res) {
	var consumertypemicrobusiness = req.session.data["consumertypemicrobusiness"];
	var customersdomestic = req.session.data["customersdomestic"];
	const sglCategory = req.session.data["sglCategory"];

	if (!consumertypemicrobusiness) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumertypemicrobusiness = {
			anchor: "consumertypemicrobusiness",
			message: "Select yes if any of your commercial customers are ‘microbusinesses’",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses", {
			data: req.session.data,
		});
	} else {
		if (sglCategory == "Non-Utility") {
			res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/cya");
		} else {
			if (customersdomestic == "Yes") {
				res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/prepaymentmeters");
			} else {
				res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/agent");
			}
		}
	}
});

// Buildings & consumers -  Small medium businesses
router.get("/" + version + "/add-heat-network/buildingsandconsumers/smallmediumbusinesses", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/smallmediumbusinesses", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/smallmediumbusinesses", function (req, res) {
	var smallmediumbusinesses = req.session.data["smallmediumbusinesses"];

	if (!smallmediumbusinesses) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smallmediumbusinesses = {
			anchor: "smallmediumbusinesses",
			message: "Select whether the heat network supplies smallmediumbusinesses",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/smallmediumbusinesses", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises");
	}
});

// Buildings & consumers -  Small medium businesses
router.get("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises", function (req, res) {
	var smallenterprises = req.session.data["smallenterprises"];
	var customersdomestic = req.session.data["customersdomestic"];

	if (!smallenterprises) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smallenterprises = {
			anchor: "smallenterprises",
			message: "Select whether the heat network supplies small enterprises",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/smallenterprises", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/microbusinesses");
	}
});

// Metering - agent
router.get("/" + version + "/add-heat-network/buildingsandconsumers/agent", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/agent", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/agent", function (req, res) {
	var meteringagent = req.session.data["meteringagent"];

	if (!meteringagent) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.meteringagent = {
			anchor: "meteringagent",
			message: "Select whether you use a metering agent",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/agent", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/buildingsandconsumers/cya");
	}
});

// Buildings & consumers - cya
router.get("/" + version + "/add-heat-network/buildingsandconsumers/cya", function (req, res) {
	res.render("/" + version + "/add-heat-network/buildingsandconsumers/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

// Billing - intro
router.get("/" + version + "/add-heat-network/billing/intro", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/intro", {
		data: req.session.data,
	});
});

// Billing - often
router.get("/" + version + "/add-heat-network/billing/often", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/often", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/often", function (req, res) {
	var billingoften = req.session.data["billingoften"];

	if (!billingoften) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingoften = {
			anchor: "billingoften",
			message: "Select how often you send bills",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/billing/often", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/billing/calculated");
	}
});

// Billing - calculated
router.get("/" + version + "/add-heat-network/billing/calculated", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/calculated", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/calculated", function (req, res) {
	var billingcalculated = req.session.data["billingcalculated"];

	if (!billingcalculated) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingcalculated = {
			anchor: "billingcalculated",
			message: "Select how calculated you send bills",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/billing/calculated", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/billing/compare");
	}
});

// Billing - compare
router.get("/" + version + "/add-heat-network/billing/compare", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/compare", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/compare", function (req, res) {
	var billingcompare = req.session.data["billingcompare"];

	if (!billingcompare) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingcompare = {
			anchor: "billingcompare",
			message: "Select how compare you send bills",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/billing/compare", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/billing/otherinfo");
	}
});

// Billing - available
router.get("/" + version + "/add-heat-network/billing/available", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/available", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/available", function (req, res) {
	var billingavailable = req.session.data["billingavailable"];

	if (!billingavailable) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingavailable = {
			anchor: "billingavailable",
			message: "Select at least one option",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/billing/available", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/billing/cya");
	}
});

// Billing - other info
router.get("/" + version + "/add-heat-network/billing/otherinfo", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/otherinfo", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/otherinfo", function (req, res) {
	var billinginfo = req.session.data["billinginfo"];

	//if (!billinginfo) {
	//    req.session.data.validationError = "true"
	//    req.session.data.validationErrors.billinginfo = {
	//        "anchor": "billinginfo",
	//        "message": "Select how otherinfo you send bills",
	//    }
	//}

	//if (req.session.data.validationError == "true") {
	//    res.render('/' + version + '/add-heat-network/billing/otherinfo', {
	//        data: req.session.data
	//    });
	//}
	//else {
	res.redirect("/" + version + "/add-heat-network/billing/cya");
	//    }
});

// Billing - cya
router.get("/" + version + "/add-heat-network/billing/cya", function (req, res) {
	res.render("/" + version + "/add-heat-network/billing/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

// Consumer - intro
router.get("/" + version + "/add-heat-network/consumerprotections/intro", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/intro", {
		data: req.session.data,
	});
});

// Consumer - vulnerable
router.get("/" + version + "/add-heat-network/consumerprotections/vulnerable", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/vulnerable", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/vulnerable", function (req, res) {
	var consumervulnerable = req.session.data["consumervulnerable"];
	var consumervulnerableammount = req.session.data["consumervulnerableammount"];

	if (!consumervulnerable) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumervulnerable = {
			anchor: "consumervulnerable",
			message: "Tell us whether the heat network supply vulnerable customers",
		};
	}

	if (consumervulnerable == "Yes" && !consumervulnerableammount) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumervulnerableammount = {
			anchor: "consumervulnerableammount",
			message: "Enter the total number of vulnerable customer",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/vulnerable", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/consumerprotections/psr");
	}
});

// Consumer - psr
router.get("/" + version + "/add-heat-network/consumerprotections/psr", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/psr", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/psr", function (req, res) {
	var consumerpsr = req.session.data["consumerpsr"];
	var consumertypemicrobusiness = req.session.data["consumertypemicrobusiness"];
	var smallmediumbusinesses = req.session.data["smallmediumbusinesses"];
	const sglCategory = req.session.data["sglCategory"];

	if (!consumerpsr) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumerpsr = {
			anchor: "consumerpsr",
			message: "Select yes if there is a procedure in place for domestic customers, small businesses and microbusinesses to raise a complaint",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/psr", {
			data: req.session.data,
		});
	} else {
		if (consumertypemicrobusiness == "Yes" || smallmediumbusinesses == "Yes") {
			res.redirect("/" + version + "/add-heat-network/consumerprotections/confirm");
		} else {
			if (sglCategory == "Non-Utility") {
				res.redirect("/" + version + "/add-heat-network/consumerprotections/cya");
			} else {
				res.redirect("/" + version + "/add-heat-network/consumerprotections/difficulties");
			}
		}
	}
});
// Consumer - confirm
router.get("/" + version + "/add-heat-network/consumerprotections/confirm", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/confirm", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/confirm", function (req, res) {
	var consumerconfirm = req.session.data["consumerconfirm"];
	const sglCategory = req.session.data["sglCategory"];

	if (!consumerconfirm) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumerconfirm = {
			anchor: "consumerconfirm",
			message: "Select yes if there is a procedure in place for domestic consumers, small businesses and microbusinesses to raise a complaint",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/confirm", {
			data: req.session.data,
		});
	} else {
		if (sglCategory == "Non-Utility") {
			res.redirect("/" + version + "/add-heat-network/consumerprotections/cya");
		} else {
			res.redirect("/" + version + "/add-heat-network/consumerprotections/difficulties");
		}
	}
});

// Consumer - difficulties
router.get("/" + version + "/add-heat-network/consumerprotections/difficulties", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/difficulties", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/difficulties", function (req, res) {
	var consumerdifficulties = req.session.data["consumerdifficulties"];

	if (!consumerdifficulties) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumerdifficulties = {
			anchor: "consumerdifficulties",
			message: "Tell us whether you have a process for dealing with customers",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/difficulties", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/consumerprotections/cya");
	}
});

// Consumer - cya
router.get("/" + version + "/add-heat-network/consumerprotections/cya", function (req, res) {
	res.render("/" + version + "/add-heat-network/consumerprotections/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

// Confirm submit
router.get("/" + version + "/add-heat-network/confirmsubmit", function (req, res) {
	res.render("/" + version + "/add-heat-network/confirmsubmit", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/confirmsubmit", function (req, res) {
	var confirmsubmit = req.session.data["confirmsubmit"];

	if (!confirmsubmit) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.confirmsubmit = {
			anchor: "confirmsubmit",
			message: "Tell us whether you wish to confirm and submit your applicaton",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/confirmsubmit", {
			data: req.session.data,
		});
	} else {
		if (confirmsubmit == "No") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			req.session.data["HNStatus"] = "Submitted";
			res.redirect("/" + version + "/add-heat-network/confirmation");
		}
	}
});

// Confirmation reg
router.get("/" + version + "/add-heat-network/confirmation", function (req, res) {
	res.render("/" + version + "/add-heat-network/confirmation", {
		data: req.session.data,
	});
});

// Confirm remove
router.get("/" + version + "/add-heat-network/confirmremove", function (req, res) {
	res.render("/" + version + "/add-heat-network/confirmremove", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/confirmremove", function (req, res) {
	var confirmremove = req.session.data["confirmremove"];
	const referrer = req.query.ref;

	if (!confirmremove) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.confirmremove = {
			anchor: "confirmremove",
			message: "Select yes if you want to remove this heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/confirmremove", {
			data: req.session.data,
		});
	} else {
		if (confirmremove == "No") {
			res.redirect(referrer);
		} else {
			res.redirect("/" + version + "/account-information");
		}
	}
});

// Confirm remove
router.get("/" + version + "/add-heat-network/cannotsubmit", function (req, res) {
	res.render("/" + version + "/add-heat-network/cannotsubmit", {
		data: req.session.data,
	});
});

////////// SUPPLIERS /////////////

function setSupplier(req, id) {
	req.session.data["suppliername"] = req.session.data["suppliername" + id];
	req.session.data["suppliernameselected"] = req.session.data["suppliernameselected" + id];
	req.session.data["supplieraddressselected"] = req.session.data["supplieraddressselected" + id];
	req.session.data["addedsupplier"] = req.session.data["addedsupplier" + id];
	req.session.data["supplierid"] = id;
}

function clearSupplier(req) {
	req.session.data["suppliername"] = "";
	req.session.data["suppliernameselected"] = "";
	req.session.data["supplieraddressselected"] = "";
	req.session.data["addedsupplier"] = "";
	req.session.data["supplierid"] = "";
	req.session.data["supplierremove"] = "";
}

function removeSupplier(req, id) {
	req.session.data["suppliername" + id] = "";
	req.session.data["suppliernameselected" + id] = "";
	req.session.data["supplieraddressselected" + id] = "";
	req.session.data["addedsupplier" + id] = "";
}

// Suppliers - How many
router.get("/" + version + "/add-heat-network/suppliers/howmany", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/howmany", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/howmany", function (req, res) {
	var suppliershowmany = req.session.data["suppliershowmany"];

	if (!suppliershowmany) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.suppliershowmany = {
			anchor: "suppliershowmany",
			message: "Enter the number of suppliers",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/howmany", {
			data: req.session.data,
		});
	} else {
		if (suppliershowmany == 1) {
			res.redirect("/" + version + "/add-heat-network/suppliers/search");
		} else {
			res.redirect("/" + version + "/add-heat-network/suppliers/suppliers");
		}
	}
});

// Supliers - List
router.get("/" + version + "/add-heat-network/suppliers/suppliers", function (req, res) {
	clearSupplier(req);

	res.render("/" + version + "/add-heat-network/suppliers/suppliers", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/suppliers", function (req, res) {
	var buildings = req.session.data["buildings"];

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/suppliers", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/suppliers/cya");
	}
});

// Suppliers - Name
router.get("/" + version + "/add-heat-network/suppliers/name", function (req, res) {
	const urlParams = req.query.id;
	if (urlParams) {
		setSupplier(req, urlParams);
	} else {
		if (req.session.data.suppliertotal) {
			req.session.data.suppliertotal = req.session.data.suppliertotal + 1;
			req.session.data["supplierid"] = req.session.data.suppliertotal;
		} else {
			req.session.data.suppliertotal = 1;
			req.session.data["supplierid"] = req.session.data.suppliertotal;
		}
	}

	res.render("/" + version + "/add-heat-network/suppliers/name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/name", function (req, res) {
	var suppliername = req.session.data["suppliername"];
	var buildinglocationAddress = req.session.data["buildinglocationAddress"];

	if (!suppliername) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.suppliername = {
			anchor: "suppliername",
			message: "Enter the number of suppliers",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/name", {
			data: req.session.data,
		});
	} else {
		var buildingssetup = req.session.data["buildingssetup"];

		if (buildingssetup != true) {
			var buildingnumber = req.session.data["buildings"];
			console.log(buildingnumber);
			const buildings = [];

			let buildingCount = buildingnumber && buildingnumber > 0 ? buildingnumber : 8;
			console.log(buildingCount);
			if (buildinglocationAddress) {
				for (let i = 1; i <= 1; i++) {
					buildings.push({
						name: "Building " + i,
						id: i,
						address: buildinglocationAddress,
						supplied: 0,
					});
				}
				for (let i = 2; i <= buildingCount; i++) {
					buildings.push({
						name: "Building " + i,
						id: i,
						address: i * 2 + " Fake Street, London, SW14 1BB",
						supplied: 0,
					});
				}
			} else {
				for (let i = 1; i <= buildingCount; i++) {
					buildings.push({
						name: "Building " + i,
						id: i,
						address: i * 2 + " Fake Street, London, SW14 1BB",
						supplied: 0,
					});
				}
			}

			req.session.data["buildings"] = buildings;

			req.session.data["buildingssetup"] = true;
		}

		req.session.data["suppliername" + req.session.data["supplierid"]] = req.session.data["suppliername"];

		const fs = require("fs");
		const path = require("path");

		// Read the orgs.json file
		fs.readFile(path.join(__dirname, "../data/orgs.json"), "utf-8", (err, data) => {
			if (err) {
				return res.status(500).json({ error: "Unable to read the data file" });
			}

			// Parse the JSON file
			const orgs = JSON.parse(data);

			// Filter the orgs based on the search query (case-insensitive search)
			const filteredOrgs = orgs.filter((org) => org.Name.toLowerCase().includes(suppliername.toLowerCase()));

			// Return the filtered results
			if (filteredOrgs.length > 1) {
				req.session.data.supplierresults = filteredOrgs;
				res.redirect("/" + version + "/add-heat-network/suppliers/results");
			} else if (filteredOrgs.length == 1) {
				const selected = filteredOrgs[0];
				req.session.data.supplierresults = filteredOrgs;
				req.session.data.suppliernameselected = selected.Name;
				req.session.data.supplieraddressselected = selected.Address || selected.address || ""; // Adjust based on your JSON structure

				res.redirect("/" + version + "/add-heat-network/suppliers/confirm");
			} else {
				res.redirect("/" + version + "/add-heat-network/suppliers/dropout");
			}
		});
	}
});

// Suppliers - Results
router.get("/" + version + "/add-heat-network/suppliers/results", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/results", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/results", function (req, res) {
	var suppliernameselected = req.session.data["suppliernameselected"];

	if (!suppliernameselected) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.suppliernameselected = {
			anchor: "suppliernameselected",
			message: "Select a name",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/results", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/add-heat-network/suppliers/confirm");
	}
});

// Suppliers - Confirm supplier
router.get("/" + version + "/add-heat-network/suppliers/confirm", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/confirm", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/confirm", function (req, res) {
	var introcommunal = req.session.data["introcommunal"];

	req.session.data["suppliernameselected" + req.session.data["supplierid"]] = req.session.data["suppliernameselected"];
	req.session.data["supplieraddressselected" + req.session.data["supplierid"]] = req.session.data["supplieraddressselected"];
	req.session.data["addedsupplier" + req.session.data["supplierid"]] = "true";

	res.redirect("/" + version + "/add-heat-network/suppliers/suppliers");
});

// Suppliers - Buildings
router.get("/" + version + "/add-heat-network/suppliers/buildings", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/buildings", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/buildings", function (req, res) {
	var buildings = req.session.data["buildings"];
	var supplierbuildings = req.session.data["supplierbuildings"];

	if (!supplierbuildings) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.supplierbuildings = {
			anchor: "supplierbuildings",
			message: "Select at least one building",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/buildings", {
			data: req.session.data,
		});
	} else {
		req.session.data["supplierbuildings" + req.session.data["supplierid"]] = req.session.data["supplierbuildings"];
		res.redirect("/" + version + "/add-heat-network/suppliers/suppliers");
	}
});

// Suppliers - cya
router.get("/" + version + "/add-heat-network/suppliers/cya", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/cya", function (req, res) {
	res.redirect("/" + version + "/add-heat-network/tasklist");
});

/// supplier remove
router.get("/" + version + "/add-heat-network/suppliers/remove", function (req, res) {
	const urlParams = req.query.id;
	if (urlParams) {
		setSupplier(req, urlParams);
	}
	res.render("/" + version + "/add-heat-network/suppliers/remove", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/remove", function (req, res) {
	const urlParams = req.query.id;

	var supplierremove = req.session.data["supplierremove"];
	var suppliername = req.session.data["suppliername"];

	if (!supplierremove) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.supplierremove = {
			anchor: "supplierremove",
			message: "Select whether you wish to remove " + suppliername,
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/remove", {
			data: req.session.data,
		});
	} else {
		if (supplierremove == "Yes") {
			clearSupplier(req);
			removeSupplier(req, urlParams);
			res.redirect("/" + version + "/add-heat-network/suppliers/suppliers");
		} else {
			clearSupplier(req);
			res.redirect("/" + version + "/add-heat-network/suppliers/suppliers");
		}
	}
});

///// CANCEL PAGES

// Introduction - Cancel
router.get("/" + version + "/add-heat-network/introduction/cancel", function (req, res) {
	req.session.data["introcancel"] = "";

	res.render("/" + version + "/add-heat-network/introduction/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/introduction/cancel", function (req, res) {
	var introcancel = req.session.data["introcancel"];
	const urlParams = req.query.v;
	var introcomplete = req.session.data["introcomplete"];
	var hnname = req.session.data["name"] || "Seaton City Centre";

	if (!introcancel) {
		req.session.data.validationError = "true";
		if (introcomplete == "true") {
			req.session.data.validationErrors.introcancel = {
				anchor: "introcancel",
				message: "Select yes if you wish to cancel making changes to " + hnname,
			};
		} else {
			req.session.data.validationErrors.introcancel = {
				anchor: "introcancel",
				message: "Select yes if you wish to cancel adding this heat network",
			};
		}
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/introduction/cancel", {
			data: req.session.data,
		});
	} else {
		if (introcancel == "Yes") {
			res.redirect("/" + version + "/account-information");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Billing - cancel
router.get("/" + version + "/add-heat-network/billing/cancel", function (req, res) {
	req.session.data["billingcancel"] = "";

	res.render("/" + version + "/add-heat-network/billing/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/billing/cancel", function (req, res) {
	var billingcancel = req.session.data["billingcancel"];
	const urlParams = req.query.v;

	if (!billingcancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.billingcancel = {
			anchor: "billingcancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/billing/cancel", {
			data: req.session.data,
		});
	} else {
		if (billingcancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Customers - cancel
router.get("/" + version + "/add-heat-network/buildingsandconsumers/cancel", function (req, res) {
	req.session.data["customerscancel"] = "";

	res.render("/" + version + "/add-heat-network/buildingsandconsumers/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/buildingsandconsumers/cancel", function (req, res) {
	var customerscancel = req.session.data["customerscancel"];
	const urlParams = req.query.v;

	if (!customerscancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.customerscancel = {
			anchor: "customerscancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/buildingsandconsumers/cancel", {
			data: req.session.data,
		});
	} else {
		if (customerscancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Consumer protections - cancel
router.get("/" + version + "/add-heat-network/consumerprotections/cancel", function (req, res) {
	req.session.data["consumerprotectionscancel"] = "";

	res.render("/" + version + "/add-heat-network/consumerprotections/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/cancel", function (req, res) {
	var consumerprotectionscancel = req.session.data["consumerprotectionscancel"];
	const urlParams = req.query.v;

	if (!consumerprotectionscancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumerprotectionscancel = {
			anchor: "consumerprotectionscancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/cancel", {
			data: req.session.data,
		});
	} else {
		if (consumerprotectionscancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Technical information - intro
router.get("/" + version + "/add-heat-network/energycentre/intro", function (req, res) {
	res.render("/" + version + "/add-heat-network/energycentre/intro", {
		data: req.session.data,
	});
});

// Technical information - cancel
router.get("/" + version + "/add-heat-network/energycentre/cancel", function (req, res) {
	req.session.data["energycentrecancel"] = "";

	res.render("/" + version + "/add-heat-network/energycentre/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/energycentre/cancel", function (req, res) {
	var energycentrecancel = req.session.data["energycentrecancel"];
	const urlParams = req.query.v;

	if (!energycentrecancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.energycentrecancel = {
			anchor: "energycentrecancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/energycentre/cancel", {
			data: req.session.data,
		});
	} else {
		if (energycentrecancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Suppliers - intro
router.get("/" + version + "/add-heat-network/suppliers/intro", function (req, res) {
	res.render("/" + version + "/add-heat-network/suppliers/intro", {
		data: req.session.data,
	});
});

// Suppliers - cancel
router.get("/" + version + "/add-heat-network/suppliers/cancel", function (req, res) {
	req.session.data["supplierscancel"] = "";

	res.render("/" + version + "/add-heat-network/suppliers/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/suppliers/cancel", function (req, res) {
	var supplierscancel = req.session.data["supplierscancel"];
	const urlParams = req.query.v;

	if (!supplierscancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.supplierscancel = {
			anchor: "supplierscancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/suppliers/cancel", {
			data: req.session.data,
		});
	} else {
		if (supplierscancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Consumer protections - cancel
router.get("/" + version + "/add-heat-network/consumerprotections/cancel", function (req, res) {
	req.session.data["consumerprotectionscancel"] = "";

	res.render("/" + version + "/add-heat-network/consumerprotections/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/add-heat-network/consumerprotections/cancel", function (req, res) {
	var consumerprotectionscancel = req.session.data["consumerprotectionscancel"];
	const urlParams = req.query.v;

	if (!consumerprotectionscancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.consumerprotectionscancel = {
			anchor: "consumerprotectionscancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/add-heat-network/consumerprotections/cancel", {
			data: req.session.data,
		});
	} else {
		if (consumerprotectionscancel == "Yes") {
			res.redirect("/" + version + "/add-heat-network/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

////////////////////////////////////////////////////////////////////////////// SMRI //////////////////////////////////////////////////////////////////////////////

function setSMRIUser(req) {
	req.session.data["smriprocess"] = "Yes";
	req.session.data["smriassessments"] = "Yes";
	req.session.data["smrilist"] = "Yes";
	req.session.data["smrifitandproper"] = "Yes";
	req.session.data["smrideclarationdate"] = "01/11/2024";
}

function clearSMRIUser(req) {
	req.session.data["smriprocess"] = "";
	req.session.data["smriassessments"] = "";
	req.session.data["smrilist"] = "";
	req.session.data["smrifitandproper"] = "";
	req.session.data["smrideclarationdate"] = "";
}

/// SMRI List
router.get("/" + version + "/smri/list", function (req, res) {
	clearvalidation(req);
	const urlParams = req.query.notification;
	const urlParamsVersion = req.query.v;
	req.session.data["smristatus"] = urlParamsVersion;

	if (urlParamsVersion == "submitted") {
		setSMRIUser(req);
		req.session.data["smrideclaration"] = "Yes";
	}
	if (urlParamsVersion == "expired") {
		setSMRIUser(req);
		req.session.data["smrideclaration"] = "Yes";
	}
	if (urlParamsVersion == "new") {
		clearSMRIUser(req);
		req.session.data["smrideclaration"] = "No";
	}
	req.session.data["smrinotification"] = urlParams;
	res.render("/" + version + "/smri/list", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/list", function (req, res) {
	clearSMRIUser(req);
	res.redirect("/" + version + "/smri/process");
});

/// SMRI Process
router.get("/" + version + "/smri/process", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/smri/process", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/process", function (req, res) {
	clearvalidation(req);
	var smriprocess = req.session.data["smriprocess"];
	var smrifirstname = req.session.data["smrifirstname"];
	var smrilastname = req.session.data["smrilastname"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!smriprocess) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smriprocess = {
			anchor: "smriprocess",
			message: "Select whether " + companyname + " has a process in place to ensure that all people with SMRI are fit and proper",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/smri/process", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/smri/assessments");
	}
});

/// SMRI assessments
router.get("/" + version + "/smri/assessments", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/smri/assessments", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/assessments", function (req, res) {
	clearvalidation(req);
	var smriassessments = req.session.data["smriassessments"];
	var smrifirstname = req.session.data["smrifirstname"];
	var smrilastname = req.session.data["smrilastname"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!smriassessments) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smriassessments = {
			anchor: "smriassessments",
			message: "Select whether " + companyname + " carries out regular assessments to ensure all people with SMRI remain fit and proper",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/smri/assessments", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/smri/smrilist");
	}
});

/// SMRI list
router.get("/" + version + "/smri/smrilist", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/smri/smrilist", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/smrilist", function (req, res) {
	clearvalidation(req);
	var smrilist = req.session.data["smrilist"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!smrilist) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smrilist = {
			anchor: "smrilist",
			message: "Select whether you have a list of all people at " + companyname + " with SMRI",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/smri/smrilist", {
			data: req.session.data,
		});
	} else {
		if (smrilist == "Yes") {
			res.redirect("/" + version + "/smri/fitandproper");
		} else {
			res.redirect("/" + version + "/smri/dropout");
		}
	}
});

/// SMRI fitandproper
router.get("/" + version + "/smri/fitandproper", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/smri/fitandproper", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/fitandproper", function (req, res) {
	clearvalidation(req);
	var smrifitandproper = req.session.data["smrifitandproper"];
	var companyname = req.session.data["companyname"] || "Radienteco Ltd";

	if (!smrifitandproper) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.smrifitandproper = {
			anchor: "smrifitandproper",
			message: "Select whether everybody with SMRI at " + companyname + " is fit and proper",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/smri/fitandproper", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/smri/declaration");
	}
});

/// SMRI declaration
router.get("/" + version + "/smri/declaration", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/smri/declaration", {
		data: req.session.data,
	});
});

router.post("/" + version + "/smri/declaration", function (req, res) {
	clearvalidation(req);

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + "/" + mm + "/" + yyyy;

	req.session.data["smrideclaration"] = "Yes";
	req.session.data["smrideclarationdate"] = today;

	res.redirect("/" + version + "/smri/list?notification=submitted");
});

//////////////////////////////////////////////////////////////////////////// QUERY MANAGEMENT //////////////////////////////////////////////////////////////////////////

// Help - type
router.get("/" + version + "/help/type", function (req, res) {
	res.render("/" + version + "/help/type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/help/type", function (req, res) {
	var helptype = req.session.data["helptype"];
	var helptypeother = req.session.data["helptypeother"];

	if (!helptype) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.helptype = {
			anchor: "helptype",
			message: "Select why you need to contact Ofgem",
		};
	}

	if ((helptype == "Something else") & !helptypeother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.helptypeother = {
			anchor: "helptypeother",
			message: "Enter a reason for contacting Ofgem",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/help/type", {
			data: req.session.data,
		});
	} else {
		if (helptype == "Something else") {
			req.session.data["helptypesummary"] = helptypeother;
			res.redirect("/" + version + "/help/details");
		} else {
			req.session.data["helptypesummary"] = helptype;
			res.redirect("/" + version + "/help/details");
		}
	}
});

// Help - details
router.get("/" + version + "/help/details", function (req, res) {
	const urlParams = req.query.type;
	if (urlParams) {
		req.session.data["helptypesummary"] = urlParams;
	}

	res.render("/" + version + "/help/details", {
		data: req.session.data,
	});
});

router.post("/" + version + "/help/details", function (req, res) {
	var helpdetails = req.session.data["helpdetails"];

	if (!helpdetails) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.helpdetails = {
			anchor: "helpdetails",
			message: "Add further details",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/help/details", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/help/sent");
	}
});

// Help - sent
router.get("/" + version + "/help/sent", function (req, res) {
	res.render("/" + version + "/help/sent", {
		data: req.session.data,
	});
});

///////////////////////////////////////////////// MONITORING /////////////////////////////////////////////////////////////////////////////

// Monitoring - Information
router.get("/" + version + "/monitoring/monitoring-information", function (req, res) {
	res.render("/" + version + "/monitoring/monitoring-information", {
		data: req.session.data,
	});
});

// Monitoring - Quarterly data intro
router.get("/" + version + "/monitoring/quarterly-data/intro", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/intro", {
		data: req.session.data,
	});
});

// Monitoring - Annual data intro
router.get("/" + version + "/monitoring/annual-data/intro", function (req, res) {
	res.render("/" + version + "/monitoring/annual-data/intro", {
		data: req.session.data,
	});
});

// Monitoring - Quarterly data - Tasklist
router.get("/" + version + "/monitoring/quarterly-data/tasklist", function (req, res) {
	const urlParams = req.query.v;
	req.session.data["variantname"] = urlParams;

	if (urlParams == "supplier") {
		generateSupplierHN(req);
	}

	if (urlParams == "supplier2") {
		generateSupplier2HN(req);
	} else {
		if (req.session.data["introcomplete"] != "true") {
			populateIntrodata(req);
		}

		if (!req.session.data["HNStatus"]) {
			req.session.data["HNStatus"] = "In progress";
		}
	}

	res.render("/" + version + "/monitoring/quarterly-data/tasklist", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/tasklist", function (req, res) {
	var mqvulnerabilitycomplete = req.session.data["mqvulnerabilitycomplete"];
	var mqqualitycomplete = req.session.data["mqqualitycomplete"];
	var mqpricingcomplete = req.session.data["mqpricingcomplete"];
	/*
    if (mqvulnerabilitycomplete != "true") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.mqvulnerabilitycomplete = {
            "anchor": "mqvulnerabilitycomplete",
            "message": "Vulnerability and debt must be complete"
        }
    }
*/

	if (mqvulnerabilitycomplete != "true" && mqvulnerabilitycomplete != "cannot") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqvulnerabilitycomplete = {
			anchor: "mqvulnerabilitycomplete",
			message: "Vulnerability and debt must be marked as complete",
		};
	}

	if (mqqualitycomplete != "true" && mqqualitycomplete != "cannot") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqqualitycomplete = {
			anchor: "mqqualitycomplete",
			message: "Quality of service must be marked as complete",
		};
	}

	if (mqpricingcomplete != "true" && mqpricingcomplete != "cannot") {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqpricingcomplete = {
			anchor: "mqpricingcomplete",
			message: "Pricing must be marked as complete",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/tasklist", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/confirm-submit");
	}
});

// Confirm submit monitoring
router.get("/" + version + "/monitoring/quarterly-data/confirm-submit", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/confirm-submit", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/confirm-submit", function (req, res) {
	var mqconfirmsubmit = req.session.data["mqconfirmsubmit"];

	if (!mqconfirmsubmit) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqconfirmsubmit = {
			anchor: "mqconfirmsubmit",
			message: "Tell us whether you wish to confirm and submit your applicaton",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/confirm-submit", {
			data: req.session.data,
		});
	} else {
		if (mqconfirmsubmit == "Yes") {
			req.session.data["mqstatus"] = "Completed";
			res.redirect("/" + version + "/monitoring/quarterly-data/confirmation");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
		}
	}
});

// Confirmation monitoring
router.get("/" + version + "/monitoring/quarterly-data/confirmation", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/confirmation", {
		data: req.session.data,
	});
});

// Monitoring - Quarterly data - Vulnerability Debt Intro
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/intro", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/intro", {
		data: req.session.data,
	});
});

// Monitoring - Quarterly data - Vulnerability Debt - Domestic
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/domestic", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/domestic", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/domestic", function (req, res) {
	var mqcustomersdomestic = req.session.data["mqcustomersdomestic"];
	var mqcustomersdomestictotal = req.session.data["mqcustomersdomestictotal"];

	if (!mqcustomersdomestic) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdomestic = {
			anchor: "mqcustomersdomestic",
			message: "Select yes if this heat network has domestic customers",
		};
	}

	if (mqcustomersdomestic == "Yes" && !mqcustomersdomestictotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdomestictotal = {
			anchor: "mqcustomersdomestictotal",
			message: "Enter the number of domestic customers",
		};
	}

	if (mqcustomersdomestic == "Yes" && isNaN(mqcustomersdomestictotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdomestictotal = {
			anchor: "mqcustomersdomestictotal",
			message: "Number of domestic customers must be a number",
		};
	}

	if (mqcustomersdomestic == "Yes" && mqcustomersdomestictotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdomestictotal = {
			anchor: "mqcustomersdomestictotal",
			message: "Number of domestic customers must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/domestic", {
			data: req.session.data,
		});
	} else {
		if (mqcustomersdomestic == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/debt");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cya");
		}
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - Debt
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/debt", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/debt", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/debt", function (req, res) {
	var mqcustomersdebt = req.session.data["mqcustomersdebt"];
	var mqcustomersdebttotal = req.session.data["mqcustomersdebttotal"];
	var mqcustomersdomestictotal = req.session.data["mqcustomersdomestictotal"];

	if (!mqcustomersdebt) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdebt = {
			anchor: "mqcustomersdebt",
			message: "Select yes if any of the customers are in debt",
		};
	}

	if (mqcustomersdebt == "Yes" && !mqcustomersdebttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdebttotal = {
			anchor: "mqcustomersdebttotal",
			message: "Enter the number of domestic customers in debt",
		};
	}

	if (mqcustomersdebt == "Yes" && isNaN(mqcustomersdebttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdebttotal = {
			anchor: "mqcustomersdebttotal",
			message: "Number of domestic customers in debt must be a number",
		};
	}

	if (Number(mqcustomersdebttotal) > Number(mqcustomersdomestictotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdebttotal = {
			anchor: "mqcustomersdebttotal",
			message: "Number of domestic customers in debt cannot be more than the total number of domestic customers",
		};
		console.log(mqcustomersdebttotal + " vs " + mqcustomersdomestictotal);
	}

	if (mqcustomersdebt == "Yes" && mqcustomersdebttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdebttotal = {
			anchor: "mqcustomersdebttotal",
			message: "Number of domestic customers in debt must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/debt", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnections");
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - Disconnections
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnections", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnections", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnections", function (req, res) {
	var mqcustomersdisconnect = req.session.data["mqcustomersdisconnect"];
	var mqcustomersdisconnecttotal = req.session.data["mqcustomersdisconnecttotal"];

	if (!mqcustomersdisconnect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnect = {
			anchor: "mqcustomersdisconnect",
			message: "Select yes if there were any self disconnections",
		};
	}

	if (mqcustomersdisconnect == "Yes" && !mqcustomersdisconnecttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnecttotal = {
			anchor: "mqcustomersdisconnecttotal",
			message: "Enter the number of customers who self disconnected",
		};
	}

	if (mqcustomersdisconnect == "Yes" && isNaN(mqcustomersdisconnecttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnecttotal = {
			anchor: "mqcustomersdisconnecttotal",
			message: "Number of customers who self disconnected must be a number",
		};
	}

	if (mqcustomersdisconnect == "Yes" && mqcustomersdisconnecttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnecttotal = {
			anchor: "mqcustomersdisconnecttotal",
			message: "Number of customers who self disconnected must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnections", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnected");
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - disconnected
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnected", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnected", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnected", function (req, res) {
	var mqcustomersdisconnected = req.session.data["mqcustomersdisconnected"];
	var mqcustomersdisconnectedtotal = req.session.data["mqcustomersdisconnectedtotal"];

	if (!mqcustomersdisconnected) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnected = {
			anchor: "mqcustomersdisconnected",
			message: "Select yes if there were customers disconnected",
		};
	}

	if (mqcustomersdisconnected == "Yes" && !mqcustomersdisconnectedtotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnectedtotal = {
			anchor: "mqcustomersdisconnectedtotal",
			message: "Enter the number of customers who were disconnected",
		};
	}

	if (mqcustomersdisconnected == "Yes" && isNaN(mqcustomersdisconnectedtotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnectedtotal = {
			anchor: "mqcustomersdisconnectedtotal",
			message: "Number of customers who disconnected must be a number",
		};
	}

	if (mqcustomersdisconnected == "Yes" && mqcustomersdisconnectedtotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersdisconnectedtotal = {
			anchor: "mqcustomersdisconnectedtotal",
			message: "Number of customers who disconnected must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/disconnected", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/repayment");
	}
});

// Monitoring - Quarterly data - vulnerability Debt - repayment plan
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/repayment", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/repayment", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/repayment", function (req, res) {
	var mqcustomersrepayment = req.session.data["mqcustomersrepayment"];
	var mqcustomersrepaymenttotal = req.session.data["mqcustomersrepaymenttotal"];
	var mqcustomersdomestictotal = req.session.data["mqcustomersdomestictotal"];

	if (!mqcustomersrepayment) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersrepayment = {
			anchor: "mqcustomersrepayment",
			message: "Select yes if there were customers on a repayment plan",
		};
	}

	if (mqcustomersrepayment == "Yes" && !mqcustomersrepaymenttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersrepaymenttotal = {
			anchor: "mqcustomersrepaymenttotal",
			message: "Enter the number of customers on a repayment plan",
		};
	}

	if (mqcustomersrepayment == "Yes" && isNaN(mqcustomersrepaymenttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersrepaymenttotal = {
			anchor: "mqcustomersrepaymenttotal",
			message: "Number of customers on a repayment plan must be a number",
		};
	}

	if (Number(mqcustomersrepaymenttotal) > Number(mqcustomersdomestictotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersrepaymenttotal = {
			anchor: "mqcustomersrepaymenttotal",
			message: "Number of customers on a repayment plan cannot be more than the total number of domestic customers",
		};
	}

	if (mqcustomersrepayment == "Yes" && mqcustomersrepaymenttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersrepaymenttotal = {
			anchor: "mqcustomersrepaymenttotal",
			message: "Number of customers on a repayment plan must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/repayment", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/reconnections");
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - Reconnections
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/reconnections", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/reconnections", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/reconnections", function (req, res) {
	var mqcustomersreconnect = req.session.data["mqcustomersreconnect"];
	var mqcustomersreconnecttotal = req.session.data["mqcustomersreconnecttotal"];

	if (!mqcustomersreconnect) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersreconnect = {
			anchor: "mqcustomersreconnect",
			message: "Select yes if there were any self reconnections",
		};
	}

	if (mqcustomersreconnect == "Yes" && !mqcustomersreconnecttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersreconnecttotal = {
			anchor: "mqcustomersreconnecttotal",
			message: "Enter the number of customers who self reconnected",
		};
	}

	if (mqcustomersreconnect == "Yes" && isNaN(mqcustomersreconnecttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersreconnecttotal = {
			anchor: "mqcustomersreconnecttotal",
			message: "Number of customers who self reconnected must be a number",
		};
	}

	if (mqcustomersreconnect == "Yes" && mqcustomersreconnecttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersreconnecttotal = {
			anchor: "mqcustomersreconnecttotal",
			message: "Number of customers who self reconnected must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/reconnections", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/prepayment");
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - Prepayment meters
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/prepayment", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/prepayment", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/prepayment", function (req, res) {
	var mqcustomersprepayment = req.session.data["mqcustomersprepayment"];
	var mqcustomersprepaymenttotal = req.session.data["mqcustomersprepaymenttotal"];

	if (!mqcustomersprepayment) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersprepayment = {
			anchor: "mqcustomersprepayment",
			message: "Select yes if there were meters switched to prepayment",
		};
	}

	if (mqcustomersprepayment == "Yes" && !mqcustomersprepaymenttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersprepaymenttotal = {
			anchor: "mqcustomersprepaymenttotal",
			message: "Enter the number of meters switched to prepayment",
		};
	}

	if (mqcustomersprepayment == "Yes" && isNaN(mqcustomersprepaymenttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersprepaymenttotal = {
			anchor: "mqcustomersprepaymenttotal",
			message: "Number of meters must be a number",
		};
	}

	if (mqcustomersprepayment == "Yes" && mqcustomersprepaymenttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcustomersprepaymenttotal = {
			anchor: "mqcustomersprepaymenttotal",
			message: "Number of meters must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/prepayment", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cya");
	}
});

// Monitoring - Quarterly data - Vulnerability Debt - cya
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cya", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cya", function (req, res) {
	res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
});

// Monitoring - Quarterly data - Quality of service - Intro
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/intro", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/intro", {
		data: req.session.data,
	});
});

// Monitoring - Quarterly data - Quality of service - cya
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/cya", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/cya", function (req, res) {
	res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
});

// Monitoring - Quarterly data - Quality of service  - Complaints
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/complaints", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/complaints", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/complaints", function (req, res) {
	var mqcomplaints = req.session.data["mqcomplaints"];
	var mqcomplaintstotal = req.session.data["mqcomplaintstotal"];

	if (!mqcomplaints) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcomplaints = {
			anchor: "mqcomplaints",
			message: "Select yes if there were complaints",
		};
	}

	if (mqcomplaints == "Yes" && !mqcomplaintstotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcomplaintstotal = {
			anchor: "mqcomplaintstotal",
			message: "Enter the number of complaints",
		};
	}

	if (mqcomplaints == "Yes" && isNaN(mqcomplaintstotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcomplaintstotal = {
			anchor: "mqcomplaintstotal",
			message: "Number of complaints must be a number",
		};
	}

	if (mqcomplaints == "Yes" && mqcomplaintstotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcomplaintstotal = {
			anchor: "mqcomplaintstotal",
			message: "Number of complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/complaints", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaints == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/types");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/cya");
		}
	}
});

// Monitoring - Quarterly data - Quality of service  - Group complaints
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints", function (req, res) {
	var mqgroupcomplaints = req.session.data["mqgroupcomplaints"];
	var mqgroupcomplaintstotal = req.session.data["mqgroupcomplaintstotal"];

	if (!mqgroupcomplaints) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqgroupcomplaints = {
			anchor: "mqgroupcomplaints",
			message: "Select yes if there were group complaints",
		};
	}

	if (mqgroupcomplaints == "Yes" && !mqgroupcomplaintstotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqgroupcomplaintstotal = {
			anchor: "mqgroupcomplaintstotal",
			message: "Enter the number of group complaints",
		};
	}

	if (mqgroupcomplaints == "Yes" && isNaN(mqgroupcomplaintstotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqgroupcomplaintstotal = {
			anchor: "mqgroupcomplaintstotal",
			message: "Number of group complaints must be a number",
		};
	}

	if (mqgroupcomplaints == "Yes" && mqgroupcomplaintstotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqgroupcomplaintstotal = {
			anchor: "mqgroupcomplaintstotal",
			message: "Number of group complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/ombudsman");
	}
});

// Monitoring - Quarterly data - Quality of service  - Ombudsman
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/ombudsman", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/ombudsman", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/ombudsman", function (req, res) {
	var mqombudsman = req.session.data["mqombudsman"];
	var mqombudsmantotal = req.session.data["mqombudsmantotal"];

	if (!mqombudsman) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqombudsman = {
			anchor: "mqombudsman",
			message: "Select yes if there were complaints reffered to the Ombudsman",
		};
	}

	if (mqombudsman == "Yes" && !mqombudsmantotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqombudsmantotal = {
			anchor: "mqombudsmantotal",
			message: "Enter the number of complaints reffered to the Ombudsman",
		};
	}

	if (mqombudsman == "Yes" && isNaN(mqombudsmantotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqombudsmantotal = {
			anchor: "mqombudsmantotal",
			message: "Number of complaints reffered to the Ombudsman must be a number",
		};
	}

	if (mqombudsman == "Yes" && mqombudsmantotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqombudsmantotal = {
			anchor: "mqombudsmantotal",
			message: "Number of complaints reffered to the Ombudsman must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/ombudsman", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/nextday");
	}
});

// Monitoring - Quarterly data - Quality of service  - Next Day
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/nextday", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/nextday", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/nextday", function (req, res) {
	var mqnextday = req.session.data["mqnextday"];
	var mqnextdaytotal = req.session.data["mqnextdaytotal"];

	if (!mqnextday) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqnextday = {
			anchor: "mqnextday",
			message: "Select yes if the complaints were resolved by the end of the next working day",
		};
	}

	if (mqnextday == "Yes" && !mqnextdaytotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqnextdaytotal = {
			anchor: "mqnextdaytotal",
			message: "Enter the number of complaints resolved by the end of the next working day",
		};
	}

	if (mqnextday == "Yes" && isNaN(mqnextdaytotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqnextdaytotal = {
			anchor: "mqnextdaytotal",
			message: "Number of resolved complaints must be a number",
		};
	}

	if (mqnextday == "Yes" && mqnextdaytotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqnextdaytotal = {
			anchor: "mqnextdaytotal",
			message: "Number of resolved complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/nextday", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/eight");
	}
});

// Monitoring - Quarterly data - Quality of service  - Eight weeks
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/eight", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/eight", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/eight", function (req, res) {
	var mqeight = req.session.data["mqeight"];
	var mqeighttotal = req.session.data["mqeighttotal"];

	if (!mqeight) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqeight = {
			anchor: "mqeight",
			message: "Select yes if the complaints were resolved with in eight weeks",
		};
	}

	if (mqeight == "Yes" && !mqeighttotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqeighttotal = {
			anchor: "mqeighttotal",
			message: "Enter the number of complaints resolved with in eight weeks",
		};
	}

	if (mqeight == "Yes" && isNaN(mqeighttotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqeighttotal = {
			anchor: "mqeighttotal",
			message: "Number of complaints resolved with in eight weeks must be a number",
		};
	}

	if (mqeight == "Yes" && mqeighttotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqeighttotal = {
			anchor: "mqeighttotal",
			message: "Number of complaints resolved with in eight weeks must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/eight", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/cya");
	}
});

/// Quality of service - Initial
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/initial", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/initial", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/initial", function (req, res) {
	clearvalidation(req);
	var mqqualityinitial = req.session.data["mqqualityinitial"];
	var mqqualityinitialtotal = req.session.data["mqqualityinitialtotal"];

	if (!mqqualityinitial) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqqualityinitial = {
			anchor: "mqqualityinitial",
			message: "Select yes if you are able to provide this information",
		};
	}

	if (mqqualityinitial == "No" && !mqqualityinitialtotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqqualityinitialtotal = {
			anchor: "mqqualityinitialtotal",
			message: "Enter why you are unable to provide this information",
		};
	}

	if (mqqualityinitial == "No" && mqqualityinitialtotal.length > 400) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqqualityinitialtotal = {
			anchor: "mqqualityinitialtotal",
			message: "The reason why should be 400 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/initial", {
			data: req.session.data,
		});
	} else {
		if (mqqualityinitial == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/complaints");
		}
		if (mqqualityinitial == "No") {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/help");
		}
	}
});

// Monitoring - Quarterly data - Quality of service - Help
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/help", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/help", {
		data: req.session.data,
	});
});

/// Vulnerability and debt - Initial
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/initial", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/initial", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/initial", function (req, res) {
	clearvalidation(req);
	var mqdebtinitial = req.session.data["mqdebtinitial"];
	var mqdebtinitialtotal = req.session.data["mqdebtinitialtotal"];

	if (!mqdebtinitial) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqdebtinitial = {
			anchor: "mqdebtinitial",
			message: "Select yes if you are able to provide this information",
		};
	}
	if (mqdebtinitial == "No" && !mqdebtinitialtotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqdebtinitialtotal = {
			anchor: "mqdebtinitialtotal",
			message: "Enter why you are unable to provide this information",
		};
	}

	if (mqdebtinitial == "No" && mqdebtinitialtotal.length > 400) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqdebtinitialtotal = {
			anchor: "mqdebtinitialtotal",
			message: "The reason why should be 400 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/initial", {
			data: req.session.data,
		});
	} else {
		if (mqdebtinitial == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/domestic");
		}
		if (mqdebtinitial == "No") {
			res.redirect("/" + version + "/monitoring/quarterly-data/vulnerability-debt/help");
		}
	}
});

// Monitoring - Quarterly data - Vulnerability and debt - Help
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/help", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/help", {
		data: req.session.data,
	});
});

// Quality of service - cancel
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/cancel", function (req, res) {
	req.session.data["mqqualitycancel"] = "";

	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/cancel", function (req, res) {
	var mqqualitycancel = req.session.data["mqqualitycancel"];
	const urlParams = req.query.v;

	if (!mqqualitycancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqqualitycancel = {
			anchor: "mqqualitycancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/cancel", {
			data: req.session.data,
		});
	} else {
		if (mqqualitycancel == "Yes") {
			req.session.data["mqqualitycomplete"] = "";
			res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Vulnerabiliy debt - cancel
router.get("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cancel", function (req, res) {
	req.session.data["mqvulnerabilitycancel"] = "";

	res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cancel", function (req, res) {
	var mqvulnerabilitycancel = req.session.data["mqvulnerabilitycancel"];
	const urlParams = req.query.v;

	if (!mqvulnerabilitycancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqvulnerabilitycancel = {
			anchor: "mqvulnerabilitycancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/vulnerability-debt/cancel", {
			data: req.session.data,
		});
	} else {
		if (mqvulnerabilitycancel == "Yes") {
			req.session.data["mqvulnerabilitycomplete"] = "";
			res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Account Creation - Private Beta Dropout
router.get("/" + version + "/account-creation/dropout-private-beta", function (req, res) {
	const urlParams = req.query.v;
	req.session.data["privatebetadropout"] = urlParams;

	backURL = req.header("Referer");
	res.render("/" + version + "/account-creation/dropout-private-beta", {
		data: req.session.data,
	});
});

// QS Checkboxes
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/types", function (req, res) {
	req.session.data["mqtypescancel"] = "";

	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/types", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/types", function (req, res) {
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqcomplaintsTypes) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqcomplaintsTypes = {
			anchor: "mqcomplaintsTypes-debt",
			message: "Select a complaint type",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/types", {
			data: req.session.data,
		});
	} else {
		console.log(mqcomplaintsTypes);
		console.log(mqcomplaintsTypes.includes("Back billing"));
		if (mqcomplaintsTypes.includes("Back billing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-back-billing");
		} else if (mqcomplaintsTypes.includes("Quality of service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service");
		} else if (mqcomplaintsTypes.includes("Customer service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service");
		} else if (mqcomplaintsTypes.includes("Vulnerability, debt and switching")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt");
		} else if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type back billing
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-back-billing", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-back-billing", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-back-billing", function (req, res) {
	var mqTypeBackBillingTotal = req.session.data["mqTypeBackBillingTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeBackBillingTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeBackBillingTotal = {
			anchor: "mqTypeBackBillingTotal",
			message: "Enter the number of back billing related complaints for this quarter",
		};
	}

	if (mqTypeBackBillingTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeBackBillingTotal = {
			anchor: "mqTypeBackBillingTotal",
			message: "Number back billing related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-back-billing", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Quality of service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service");
		} else if (mqcomplaintsTypes.includes("Customer service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service");
		} else if (mqcomplaintsTypes.includes("Vulnerability, debt and switching")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt");
		} else if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type Quality of service
router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service", function (req, res) {
	var mqTypeQualityOfServiceTotal = req.session.data["mqTypeQualityOfServiceTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeQualityOfServiceTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeQualityOfServiceTotal = {
			anchor: "mqTypeQualityOfServiceTotal",
			message: "Enter the number of Quality of service related complaints for this quarter",
		};
	}

	if (mqTypeQualityOfServiceTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeQualityOfServiceTotal = {
			anchor: "mqTypeQualityOfServiceTotal",
			message: "Number Quality of service related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-quality-of-service", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Customer service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service");
		} else if (mqcomplaintsTypes.includes("Vulnerability, debt and switching")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt");
		} else if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type charge disputes (NO LONGER USED)

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-charge-disputes", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-charge-disputes", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-charge-disputes", function (req, res) {
	var mqTypeChargeDisputesTotal = req.session.data["mqTypeChargeDisputesTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeChargeDisputesTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeChargeDisputesTotal = {
			anchor: "mqTypeChargeDisputesTotal",
			message: "Enter the number of charge dispute related complaints for this quarter",
		};
	}

	if (mqTypeChargeDisputesTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeChargeDisputesTotal = {
			anchor: "mqTypeChargeDisputesTotal",
			message: "Number charge dispute related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-charge-disputes", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Customer service")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service");
		} else if (mqcomplaintsTypes.includes("Vulnerability, debt and switching")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt");
		} else if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type customer service

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service", function (req, res) {
	var mqTypeCustomerServiceTotal = req.session.data["mqTypeCustomerServiceTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeCustomerServiceTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeCustomerServiceTotal = {
			anchor: "mqTypeCustomerServiceTotal",
			message: "Enter the number of customer service related complaints for this quarter",
		};
	}

	if (mqTypeCustomerServiceTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeCustomerServiceTotal = {
			anchor: "mqTypeCustomerServiceTotal",
			message: "Number customer service related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-customer-service", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Vulnerability, debt and switching")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt");
		} else if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type debt

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt", function (req, res) {
	var mqTypeDebtTotal = req.session.data["mqTypeDebtTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeDebtTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeDebtTotal = {
			anchor: "mqTypeDebtTotal",
			message: "Enter the number of vulnerability, debt and switching complaints for this quarter",
		};
	}

	if (mqTypeDebtTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeDebtTotal = {
			anchor: "mqTypeDebtTotal",
			message: "Number vulnerability, debt and switching complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-debt", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type metering (NO LONGER USED)

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-metering", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-metering", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-metering", function (req, res) {
	var mqTypeMeteringTotal = req.session.data["mqTypeMeteringTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypeMeteringTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeMeteringTotal = {
			anchor: "mqTypeMeteringTotal",
			message: "Enter the number of metering related complaints for this quarter",
		};
	}

	if (mqTypeMeteringTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeMeteringTotal = {
			anchor: "mqTypeMeteringTotal",
			message: "Number metering related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-metering", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Pricing")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing");
		} else if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type pricing

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing", function (req, res) {
	var mqTypePricingTotal = req.session.data["mqTypePricingTotal"];
	var mqcomplaintsTypes = req.session.data["mqcomplaintsTypes"];

	if (!mqTypePricingTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypePricingTotal = {
			anchor: "mqTypePricingTotal",
			message: "Enter the number of pricing related complaints for this quarter",
		};
	}

	if (mqTypePricingTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypePricingTotal = {
			anchor: "mqTypePricingTotal",
			message: "Number pricing related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-pricing", {
			data: req.session.data,
		});
	} else {
		if (mqcomplaintsTypes.includes("Other")) {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
		}
	}
});

// QS type other

router.get("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other", function (req, res) {
	var mqTypeOtherTotal = req.session.data["mqTypeOtherTotal"];

	if (!mqTypeOtherTotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeOtherTotal = {
			anchor: "mqTypeOtherTotal",
			message: "Enter the number of back billing related complaints for this quarter",
		};
	}

	if (mqTypeOtherTotal.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTypeOtherTotal = {
			anchor: "mqTypeOtherTotal",
			message: "Number back billing related complaints must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/quality-of-service/type-other", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/quality-of-service/group-complaints");
	}
});

/// Pricing - Initial
router.get("/" + version + "/monitoring/quarterly-data/pricing/initial", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/pricing/initial", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/initial", function (req, res) {
	clearvalidation(req);
	var mqpricinginitial = req.session.data["mqpricinginitial"];
	var mqpricinginitialtotal = req.session.data["mqpricinginitialtotal"];

	if (!mqpricinginitial) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqpricinginitial = {
			anchor: "mqpricinginitial",
			message: "Select yes if you are able to provide this information",
		};
	}
	if (mqpricinginitial == "No" && !mqpricinginitialtotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqpricinginitialtotal = {
			anchor: "mqpricinginitialtotal",
			message: "Enter why you are unable to provide this information",
		};
	}

	if (mqpricinginitial == "No" && mqpricinginitialtotal.length > 400) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqpricinginitialtotal = {
			anchor: "mqpricinginitialtotal",
			message: "The reason why should be 400 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/initial", {
			data: req.session.data,
		});
	} else {
		if (mqpricinginitial == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/multiple-tariffs");
		}
		if (mqpricinginitial == "No") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/help");
		}
	}
});

/// Monitoring - Quarterly data - Pricing - Help
router.get("/" + version + "/monitoring/quarterly-data/pricing/help", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/help", {
		data: req.session.data,
	});
});

/// Monitoring - Quarterly data - Pricing - cancel
router.get("/" + version + "/monitoring/quarterly-data/pricing/cancel", function (req, res) {
	req.session.data["mqpricingcancel"] = "";

	res.render("/" + version + "/monitoring/quarterly-data/pricing/cancel", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/cancel", function (req, res) {
	var mqpricingcancel = req.session.data["mqpricingcancel"];
	const urlParams = req.query.v;

	if (!mqpricingcancel) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqpricingcancel = {
			anchor: "mqpricingcancel",
			message: "Select yes to cancel",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/cancel", {
			data: req.session.data,
		});
	} else {
		if (mqpricingcancel == "Yes") {
			req.session.data["mqpricingcomplete"] = "";
			res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
		} else {
			res.redirect(urlParams);
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Multiple tariffs
router.get("/" + version + "/monitoring/quarterly-data/pricing/multiple-tariffs", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/multiple-tariffs", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/multiple-tariffs", function (req, res) {
	var mqmultipleTariffs = req.session.data["mqmultipleTariffs"];

	if (!mqmultipleTariffs) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqmultipleTariffs = {
			anchor: "mqmultipleTariffs",
			message: "Select yes if there are multiple tariffs charged on this heat network",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/multiple-tariffs", {
			data: req.session.data,
		});
	} else {
		if (mqmultipleTariffs == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-another");
		}
		if (mqmultipleTariffs == "No") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-name");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Tariff Flat Fee
router.get("/" + version + "/monitoring/quarterly-data/pricing/flat-fee", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/pricing/flat-fee", {
		data: req.session.data,
	});
});

function addTariffEntry(sessionData) {
	const tariffsEntered = sessionData["tariffsEntered"] || [];

	const mqTariffName = sessionData["mqTariffName"];
	const mqTariffType = sessionData["mqTariffType"];
	const mqflatFees = sessionData["mqflatFees"];
	const mqflatFeestotal = sessionData["mqflatFeestotal"];
	const mqUnitRate = sessionData["mqUnitRate"];
	const mqStandingCharge = sessionData["mqStandingCharge"];

	tariffsEntered.push({
		mqTariffName: mqTariffName || null,
		mqTariffType: mqTariffType || null,
		mqflatFees: mqflatFees || null,
		mqflatFeestotal: mqflatFeestotal ? parseFloat(mqflatFeestotal).toFixed(2) : null,
		mqUnitRate: mqUnitRate ? parseFloat(mqUnitRate).toFixed(2) : null,
		mqStandingCharge: mqStandingCharge ? parseFloat(mqStandingCharge).toFixed(2) : null,
	});

	sessionData["tariffsEntered"] = tariffsEntered;
	sessionData["mqTariffName"] = null;
	sessionData["mqTariffType"] = null;
	sessionData["mqflatFees"] = null;
	sessionData["mqflatFeestotal"] = null;
	sessionData["mqUnitRate"] = null;
	sessionData["mqStandingCharge"] = null;
	sessionData["mqtariffAddAnother"] = null;
}

router.post("/" + version + "/monitoring/quarterly-data/pricing/flat-fee", function (req, res) {
	clearvalidation(req);
	const mqflatFees = req.session.data["mqflatFees"];
	const mqflatFeestotal = req.session.data["mqflatFeestotal"];
	const mqmultipleTariffs = req.session.data["mqmultipleTariffs"];

	if (!mqflatFees) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatFees = {
			anchor: "mqflatFees",
			message: "Select yes if this tariff has a flat fee based charging format",
		};
	}

	if (mqflatFees == "Yes" && !mqflatFeestotal) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatFeestotal = {
			anchor: "mqflatFeestotal",
			message: "Enter the fee per day, in pounds ",
		};
	} else if (mqflatFees == "Yes" && !/^[-]?\d+(\.\d+)?$/.test(mqflatFeestotal)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatFeestotal = {
			anchor: "mqflatFeestotal",
			message: "Fee per day must only include numbers and leading hyphens",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/flat-fee", {
			data: req.session.data,
		});
	} else {
		if (mqflatFees == "Yes") {
			addTariffEntry(req.session.data);
			if (mqmultipleTariffs == "Yes") {
				res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-another");
			} else {
				res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-charge");
			}
		} else {
			req.session.data["mqflatFeestotal"] = null;
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/no-flat-fee");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - No Flat Fee
router.get("/" + version + "/monitoring/quarterly-data/pricing/no-flat-fee", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/no-flat-fee", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/no-flat-fee", function (req, res) {
	clearvalidation(req);
	const mqmultipleTariffs = req.session.data["mqmultipleTariffs"];

	const mqUnitRate = req.session.data["mqUnitRate"];
	const mqStandingCharge = req.session.data["mqStandingCharge"];

	if (!mqUnitRate) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqUnitRate = {
			anchor: "mqUnitRate",
			message: "Enter the unit rate per kilowatt hour, in pounds ",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(mqUnitRate)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqUnitRate = {
			anchor: "mqUnitRate",
			message: "Unit rate must only include numbers and leading hyphens",
		};
	} else if (mqUnitRate.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqUnitRate = {
			anchor: "mqUnitRate",
			message: "Unit rate must be 18 characters or less",
		};
	}

	if (!mqStandingCharge) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqStandingCharge = {
			anchor: "mqStandingCharge",
			message: "Enter the standing charge per day, in pounds",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(mqStandingCharge)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqStandingCharge = {
			anchor: "mqStandingCharge",
			message: "Standing charge must only include numbers and leading hyphens",
		};
	} else if (mqStandingCharge.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqStandingCharge = {
			anchor: "mqStandingCharge",
			message: "Standing charge must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/no-flat-fee", {
			data: req.session.data,
		});
	} else {
		addTariffEntry(req.session.data);

		if (mqmultipleTariffs == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-another");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-charge");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Tariff Add another
router.get("/" + version + "/monitoring/quarterly-data/pricing/tariff-another", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-another", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/tariff-another", function (req, res) {
	const mqtariffAddAnother = req.session.data["mqtariffAddAnother"];

	if (!mqtariffAddAnother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqtariffAddAnother = {
			anchor: "mqtariffAddAnother",
			message: "Select yes if you would like to add another tariff",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-another", {
			data: req.session.data,
		});
	} else {
		if (mqtariffAddAnother == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-name");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-charge");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - tariff name
router.get("/" + version + "/monitoring/quarterly-data/pricing/tariff-name", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/tariff-name", function (req, res) {
	const mqTariffName = req.session.data["mqTariffName"];

	if (!mqTariffName) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTariffName = {
			anchor: "mqTariffName",
			message: "Enter how much the additional charge is, in pounds",
		};
	} else if (mqTariffName.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTariffName = {
			anchor: "mqTariffName",
			message: "Tariff name must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-name", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-type");
	}
});

// Monitoring - Quarterly data - Pricing  - Tariff type
router.get("/" + version + "/monitoring/quarterly-data/pricing/tariff-type", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/tariff-type", function (req, res) {
	var mqTariffType = req.session.data["mqTariffType"];

	if (!mqTariffType) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqTariffType = {
			anchor: "mqTariffType",
			message: "Select which type the tariff is",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/tariff-type", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/flat-fee");
	}
});

// Monitoring - Quarterly data - Pricing  - Tariff Add another - Remove tariff
router.post("/" + version + "/monitoring/quarterly-data/pricing/remove-tariff", function (req, res) {
	const tariffId = parseInt(req.body.tariffId, 10);
	let tariffsEntered = req.session.data["tariffsEntered"] || [];

	if (!isNaN(tariffId) && tariffId > 0 && tariffId <= tariffsEntered.length) {
		tariffsEntered.splice(tariffId - 1, 1);
	}

	req.session.data["tariffsEntered"] = tariffsEntered;

	res.redirect("/" + version + "/monitoring/quarterly-data/pricing/tariff-another");
});

// Monitoring - Quarterly data - Pricing  - Connection Charge
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-charge", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-charge", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-charge", function (req, res) {
	var mqconnectionCharge = req.session.data["mqconnectionCharge"];

	if (!mqconnectionCharge) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqconnectionCharge = {
			anchor: "mqconnectionCharge",
			message: "Select yes if your customers pay a connection charge",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-charge", {
			data: req.session.data,
		});
	} else {
		if (mqconnectionCharge == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-flat-fee");
		}
		if (mqconnectionCharge == "No") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-fees");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Connection Charge Flat Fee
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-flat-fee", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-flat-fee", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-flat-fee", function (req, res) {
	const mqflatConnectionFees = req.session.data["mqflatConnectionFees"];

	if (!mqflatConnectionFees) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatConnectionFees = {
			anchor: "mqflatConnectionFees",
			message: "Select yes if your customers pay a flat rate for connection charges",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-flat-fee", {
			data: req.session.data,
		});
	} else {
		if (mqflatConnectionFees == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-name");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-another");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Connection Add another
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-another", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-another", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-another", function (req, res) {
	const mqConnectionAddAnother = req.session.data["mqConnectionAddAnother"];

	if (!mqConnectionAddAnother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqConnectionAddAnother = {
			anchor: "mqConnectionAddAnother",
			message: "Select yes if you would like to add another connection charge",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-another", {
			data: req.session.data,
		});
	} else {
		if (mqConnectionAddAnother == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-name");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-fees");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - connection name
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-name", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-name", function (req, res) {
	const mqConnectionName = req.session.data["mqConnectionName"];

	if (!mqConnectionName) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqConnectionName = {
			anchor: "mqConnectionName",
			message: "Enter the name of the connection",
		};
	} else if (mqConnectionName.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqConnectionName = {
			anchor: "mqConnectionName",
			message: "Connection name must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-name", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-type");
	}
});

// Monitoring - Quarterly data - Pricing  - Connection type
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-type", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-type", function (req, res) {
	var mqConnectionType = req.session.data["mqConnectionType"];

	if (!mqConnectionType) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqConnectionType = {
			anchor: "mqConnectionType",
			message: "Select which type the connection is",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-type", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-add-info");
	}
});

// Monitoring - Quarterly data - Pricing  - Connection Add another - Remove connection
router.post("/" + version + "/monitoring/quarterly-data/pricing/remove-connection", function (req, res) {
	const connectionId = parseInt(req.body.connectionId, 10);
	let allFlatConnectionFees = req.session.data["allFlatConnectionFees"] || [];

	if (!isNaN(connectionId) && connectionId > 0 && connectionId <= allFlatConnectionFees.length) {
		allFlatConnectionFees.splice(connectionId - 1, 1);
	}

	req.session.data["connectionsEntered"] = allFlatConnectionFees;

	res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-another");
});

// Monitoring - Quarterly data - Pricing  - Connection Charge Add to list
router.get("/" + version + "/monitoring/quarterly-data/pricing/connection-add-info", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-add-info", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/connection-add-info", function (req, res) {
	const mqflatConnectionFeesAdd = req.session.data["mqflatConnectionFeesAdd"];
	const mqConnectionName = req.session.data["mqConnectionName"];
	const mqConnectionType = req.session.data["mqConnectionType"];
	const mqflatConnectionFees = req.session.data["mqflatConnectionFees"];

	let allFlatConnectionFees = req.session.data["allFlatConnectionFees"] || [];

	if (!mqflatConnectionFeesAdd) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatConnectionFeesAdd = {
			anchor: "mqflatConnectionFeesAdd",
			message: "Enter how much the connection charge is, in pounds",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(mqflatConnectionFeesAdd)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatConnectionFeesAdd = {
			anchor: "mqflatConnectionFeesAdd",
			message: "Connection charge amount must only include numbers and leading hyphens",
		};
	} else if (mqflatConnectionFeesAdd.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatConnectionFeesAdd = {
			anchor: "mqflatConnectionFeesAdd",
			message: "Connection charge amount must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/connection-add-info", {
			data: req.session.data,
		});
	} else {
		allFlatConnectionFees.push({
			mqConnectionName: mqConnectionName,
			mqConnectionType: mqConnectionType,
			mqFlatConnectionFee: parseFloat(mqflatConnectionFeesAdd).toFixed(2),
		});

		req.session.data["allFlatConnectionFees"] = allFlatConnectionFees;
		req.session.data["mqflatConnectionFeesAdd"] = null;
		req.session.data["mqConnectionAddAnother"] = null;
		req.session.data["mqConnectionName"] = null;
		req.session.data["mqConnectionType"] = null;

		if (mqflatConnectionFees == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-fees");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/connection-another");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - other charge name
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-name", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-name", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-name", function (req, res) {
	const mqOtherChargeName = req.session.data["mqOtherChargeName"];

	if (!mqOtherChargeName) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeName = {
			anchor: "mqOtherChargeName",
			message: "Enter the name of the other charge",
		};
	} else if (mqOtherChargeName.length > 40) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeName = {
			anchor: "mqOtherChargeName",
			message: "Other charge name must be 40 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-name", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-charge-type");
	}
});

// Monitoring - Quarterly data - Pricing  - Other Charge Type
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-charge-type", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-type", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-charge-type", function (req, res) {
	var mqOtherChargeType = req.session.data["mqOtherChargeType"];

	if (!mqOtherChargeType) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeType = {
			anchor: "mqOtherChargeType",
			message: "Select which type the other charge is",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-type", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-charge-amount");
	}
});

// Monitoring - Quarterly data - Pricing  - Other Charge
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-fees", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-fees", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-fees", function (req, res) {
	var mqotherFees = req.session.data["mqotherFees"];

	if (!mqotherFees) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqotherFees = {
			anchor: "mqotherFees",
			message: "Select yes if your customers pay any other charges",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-fees", {
			data: req.session.data,
		});
	} else {
		if (mqotherFees == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-flat-fee");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/total-domestic");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Other Charge Flat Fee
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-flat-fee", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-flat-fee", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-flat-fee", function (req, res) {
	const mqflatOtherFees = req.session.data["mqflatOtherFees"];

	if (!mqflatOtherFees) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqflatOtherFees = {
			anchor: "mqflatOtherFees",
			message: "Select yes if your customers pay a flat rate for any other charges",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-flat-fee", {
			data: req.session.data,
		});
	} else {
		if (mqflatOtherFees == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-name");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-another");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Charges Add another
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-another", function (req, res) {
	clearvalidation(req);
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-another", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-another", function (req, res) {
	const mqChargesAddAnother = req.session.data["mqChargesAddAnother"];

	if (!mqChargesAddAnother) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqChargesAddAnother = {
			anchor: "mqChargesAddAnother",
			message: "Select yes if you would like to add another charge",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-another", {
			data: req.session.data,
		});
	} else {
		if (mqChargesAddAnother == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-name");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/total-domestic");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Charges Add another - Remove charge
router.post("/" + version + "/monitoring/quarterly-data/pricing/remove-charge", function (req, res) {
	const chargeId = parseInt(req.body.chargeId, 10);
	let chargesEntered = req.session.data["chargesEntered"] || [];

	if (!isNaN(chargeId) && chargeId > 0 && chargeId <= chargesEntered.length) {
		chargesEntered.splice(chargeId - 1, 1);
	}

	req.session.data["chargesEntered"] = chargesEntered;
	res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-another");
});

function addChargesEntry(sessionData) {
	const chargesEntered = sessionData["chargesEntered"] || [];
	const mqOtherChargeName = sessionData["mqOtherChargeName"];
	const mqOtherChargeType = sessionData["mqOtherChargeType"];
	const mqOtherChargeAmount = sessionData["mqOtherChargeAmount"];
	const mqOtherChargeUnit = sessionData["mqOtherChargeUnit"];
	const mqOtherChargeReason = sessionData["mqOtherChargeReason"];

	chargesEntered.push({
		name: mqOtherChargeName || null,
		type: mqOtherChargeType || null,
		amount: parseFloat(mqOtherChargeAmount).toFixed(2) || null,
		unit: mqOtherChargeUnit || null,
		reason: mqOtherChargeReason || null,
	});

	sessionData["chargesEntered"] = chargesEntered;
	sessionData["mqOtherChargeName"] = null;
	sessionData["mqOtherChargeType"] = null;
	sessionData["mqOtherChargeAmount"] = null;
	sessionData["mqOtherChargeUnit"] = null;
	sessionData["mqOtherChargeReason"] = null;
	sessionData["mqChargesAddAnother"] = null;
}

// Monitoring - Quarterly data - Pricing  - Other Charge Amount
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-charge-amount", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-amount", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-charge-amount", function (req, res) {
	const mqOtherChargeAmount = req.session.data["mqOtherChargeAmount"];

	if (!mqOtherChargeAmount) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeAmount = {
			anchor: "mqOtherChargeAmount",
			message: "Enter how much the additional charge is, in pounds",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(mqOtherChargeAmount)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeAmount = {
			anchor: "mqOtherChargeAmount",
			message: "Additional charge amount must only include numbers and leading hyphens",
		};
	} else if (mqOtherChargeAmount.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeAmount = {
			anchor: "mqOtherChargeAmount",
			message: "Additional charge amount must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-amount", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-charge-unit");
	}
});

// Monitoring - Quarterly data - Pricing  - Other Charge Unit
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-charge-unit", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-unit", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-charge-unit", function (req, res) {
	const mqOtherChargeUnit = req.session.data["mqOtherChargeUnit"];
	const mqOtherChargeUnitOtherValue = req.session.data["mqOtherChargeUnitOtherValue"];

	if (!mqOtherChargeUnit) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeUnit = {
			anchor: "mqOtherChargeUnit",
			message: "Select the additional charge's unit",
		};
	}

	if (mqOtherChargeUnit == "other" && !mqOtherChargeUnitOtherValue) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeUnitOtherValue = {
			anchor: "mqOtherChargeUnitOtherValue",
			message: "Enter the additional charge's unit",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-unit", {
			data: req.session.data,
		});
	} else {
		if (mqOtherChargeUnit == "other") {
			req.session.data["mqOtherChargeUnit"] = mqOtherChargeUnitOtherValue;
		}
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-charge-reason");
	}
});

// Monitoring - Quarterly data - Pricing  - Other Charge Reason
router.get("/" + version + "/monitoring/quarterly-data/pricing/other-charge-reason", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-reason", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/other-charge-reason", function (req, res) {
	const mqOtherChargeReason = req.session.data["mqOtherChargeReason"];
	const mqflatOtherFees = req.session.data["mqflatOtherFees"];

	if (!mqOtherChargeReason) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqOtherChargeReason = {
			anchor: "mqOtherChargeReason",
			message: "Enter what the additional charge is for",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/other-charge-reason", {
			data: req.session.data,
		});
	} else {
		addChargesEntry(req.session.data);

		if (mqflatOtherFees == "Yes") {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/total-domestic");
		} else {
			res.redirect("/" + version + "/monitoring/quarterly-data/pricing/other-another");
		}
	}
});

// Monitoring - Quarterly data - Pricing  - Total Charges Domestic
router.get("/" + version + "/monitoring/quarterly-data/pricing/total-domestic", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/total-domestic", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/total-domestic", function (req, res) {
	var mqtotalDomesticCosts = req.session.data["mqtotalDomesticCosts"];

	if (!mqtotalDomesticCosts) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqtotalDomesticCosts = {
			anchor: "mqtotalDomesticCosts",
			message: "Enter the total charges across all domestic customers in this quarter, in pounds",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(mqtotalDomesticCosts)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqtotalDomesticCosts = {
			anchor: "mqtotalDomesticCosts",
			message: "Total income for the previous financial year must only include numbers and leading hyphens",
		};
	} else if (mqtotalDomesticCosts.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.mqtotalDomesticCosts = {
			anchor: "mqtotalDomesticCosts",
			message: "Total income for the previous financial year must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/total-domestic", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/total-non-domestic");
	}
});

// Monitoring - Quarterly data - Pricing  - Total Charges Non Domestic
router.get("/" + version + "/monitoring/quarterly-data/pricing/total-non-domestic", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/total-non-domestic", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/total-non-domestic", function (req, res) {
	var totalNonDomesticCosts = req.session.data["totalNonDomesticCosts"];

	if (!totalNonDomesticCosts) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.totalNonDomesticCosts = {
			anchor: "totalNonDomesticCosts",
			message: "Enter the total charges across all non-domestic customers in this quarter, in pounds",
		};
	} else if (!/^[-]?\d+(\.\d+)?$/.test(totalNonDomesticCosts)) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.totalNonDomesticCosts = {
			anchor: "totalNonDomesticCosts",
			message: "Total charges must only include numbers and leading hyphens",
		};
	} else if (totalNonDomesticCosts.length > 18) {
		req.session.data.validationError = "true";
		req.session.data.validationErrors.totalNonDomesticCosts = {
			anchor: "totalNonDomesticCosts",
			message: "Total charges must be 18 characters or less",
		};
	}

	if (req.session.data.validationError == "true") {
		res.render("/" + version + "/monitoring/quarterly-data/pricing/total-non-domestic", {
			data: req.session.data,
		});
	} else {
		res.redirect("/" + version + "/monitoring/quarterly-data/pricing/cya");
	}
});

// Monitoring - Quarterly data - Pricing  - CYA
router.get("/" + version + "/monitoring/quarterly-data/pricing/cya", function (req, res) {
	res.render("/" + version + "/monitoring/quarterly-data/pricing/cya", {
		data: req.session.data,
	});
});

router.post("/" + version + "/monitoring/quarterly-data/pricing/cya", function (req, res) {
	res.redirect("/" + version + "/monitoring/quarterly-data/tasklist");
});
