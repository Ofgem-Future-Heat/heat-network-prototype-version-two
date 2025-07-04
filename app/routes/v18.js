const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


var version = "v18";


function clearvalidation(req) {
    req.session.data.validationErrors = {}
    req.session.data.validationError = "false"
    req.session.data.includeValidation = req.query.iv || req.session.data.includeValidation
    req.session.data['version'] = version

}

//////// PAGE SETUP //////
router.use(function (req, res, next) {
    req.session.data['version'] = version
    clearvalidation(req);
    next(); // Continue to the actual route handler
});
/////////////// BLANK //////////
router.get('/' + version + '/blank', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/blank', {
        data: req.session.data
    });
});



///////////////////////////////////////////////////////////////// DASHBOARD ////////////////////////////////////////////////////

router.get('/' + version + '/account-information', function (req, res) {
    clearvalidation(req);
    generateuser(req)
    const urlParams = req.query.v;
    req.session.data['currentversion'] = urlParams;

    res.render('/' + version + '/account-information', {
        data: req.session.data
    });
});

//////////////////////////////////////////////////////////// EMAILS /////////////////////////////////////////////////////////



///Invite email
router.get('/' + version + '/emails/service-invite', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/emails/service-invite', {
        data: req.session.data
    });
});


router.post('/' + version + '/emails/service-invite', function (req, res) {
    req.session.data['firstname'] = "";
    req.session.data['lastname'] = "";
    req.session.data['telephone'] = "";
    req.session.data['directorjobtitle'] = "";
    res.redirect('/' + version + '/account-creation/one-login/start-onelogin');

});



//////////////////////////////////////////////////////////// ORG DETAILS /////////////////////////////////////////////////////////

///Org details
router.get('/' + version + '/organisation-details/organisation-details', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.notification;
    req.session.data['orgdetailsnotification'] = urlParams;

    res.render('/' + version + '/organisation-details/organisation-details', {
        data: req.session.data
    });
});

/// Org details - Email address
router.get('/' + version + '/organisation-details/email-address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/email-address', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/email-address', function (req, res) {
    clearvalidation(req);
    var orghasemailaddress = req.session.data['orghasemailaddress']
    var orgemailaddress = req.session.data['orgemailaddress']



    if (!orghasemailaddress) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orghasemailaddress = {
            "anchor": "orghasemailaddress",
            "message": "Select whether your organisation has an alternative email address"
        }
    }


    if ((orghasemailaddress == "Yes") && !orgemailaddress) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgemailaddress = {
            "anchor": "orgemailaddress",
            "message": "Enter an email address"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/email-address', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/profit');
    }

});


/// Org details - Accounts
router.get('/' + version + '/organisation-details/accounts', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/accounts', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/accounts', function (req, res) {
    clearvalidation(req);
    var orgaccounts = req.session.data['orgaccounts']



    if (!orgaccounts) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaccounts = {
            "anchor": "orgaccounts",
            "message": "Select whether your organisation has account for the last 12 months"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/accounts', {
            data: req.session.data
        });
    }
    else {

            res.redirect('/' + version + '/organisation-details/solvent');
    }

});

/// Org details - Financial year date
router.get('/' + version + '/organisation-details/date', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/date', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/date', function (req, res) {
    clearvalidation(req);
    var financialstartday = req.session.data['orgfinancialstartday']
    var financialstartmonth = req.session.data['orgfinancialstartmonth']
    var financialendday = req.session.data['orgfinancialendday']
    var financialendmonth = req.session.data['orgfinancialendmonth']


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
        message: "Enter the start of the accounting period"
    };
} else {
    // Validate financialstartday
    if (!financialstartday) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorStartDate = "true";

        req.session.data.validationErrors.financialstartday = {
            anchor: "orgfinancialstartday",
            message: "Enter a day for the start of the accounting period"
        };
    } else if (/[^0-9]/.test(financialstartday)) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorStartDate = "true";

        req.session.data.validationErrors.financialstartday = {
            anchor: "orgfinancialstartday",
            message: "Start day must be a number"
        };
    }

    // Validate financialstartmonth
    if (!financialstartmonth) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorStartDate = "true";

        req.session.data.validationErrors.financialstartmonth = {
            anchor: "orgfinancialstartmonth",
            message: "Enter a month for the start of the accounting period"
        };
    } else if (/[^0-9]/.test(financialstartmonth)) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorStartDate = "true";

        req.session.data.validationErrors.financialstartmonth = {
            anchor: "orgfinancialstartmonth",
            message: "Start month must be a number"
        };
    }

    // **Only perform valid date check if no validation errors exist**
    if (!req.session.data.validationErrorStartDate) {
        if (!isValidDate(financialstartday, financialstartmonth)) {
            req.session.data.validationError = "true";
            req.session.data.validationErrors.financialstartdate = {
                anchor: "orgfinancialstartday",
                message: "Start date of accounting period must be a real date"
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
        message: "Enter the end of the accounting period"
    };
} else {
    // Validate financialendday
    if (!financialendday) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorendDate = "true";

        req.session.data.validationErrors.financialendday = {
            anchor: "orgfinancialendday",
            message: "Enter a day for the end of the accounting period"
        };
    } else if (/[^0-9]/.test(financialendday)) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorendDate = "true";

        req.session.data.validationErrors.financialendday = {
            anchor: "orgfinancialendday",
            message: "End day must be a number"
        };
    }

    // Validate financialendmonth
    if (!financialendmonth) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorendDate = "true";

        req.session.data.validationErrors.financialendmonth = {
            anchor: "orgfinancialendmonth",
            message: "Enter a month for the end of the accounting period"
        };
    } else if (/[^0-9]/.test(financialendmonth)) {
        req.session.data.validationError = "true";
        req.session.data.validationErrorendDate = "true";

        req.session.data.validationErrors.financialendmonth = {
            anchor: "orgfinancialendmonth",
            message: "End month must be a number"
        };
    }

    // **Only perform valid date check if no validation errors exist**
    if (!req.session.data.validationErrorendDate) {
        if (!isValidDate(financialendday, financialendmonth)) {
            req.session.data.validationError = "true";
            req.session.data.validationErrors.financialenddate = {
                anchor: "orgfinancialendday",
                message: "End date of accounting period must be a real date"
            };
        }
    }
}


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/date', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/accounts');
    }

});

/// Org details - Solvent
router.get('/' + version + '/organisation-details/solvent', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/solvent', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/solvent', function (req, res) {
    clearvalidation(req);
    var orgsolvent = req.session.data['orgsolvent']
    var orgaccounts = req.session.data['orgaccounts']


    if (!orgsolvent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsolvent = {
            "anchor": "orgsolvent",
            "message": "Select whether your organisation is solvent for the next 12 months"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/solvent', {
            data: req.session.data
        });
    }
    else {
        if (orgaccounts == "Yes") {
            res.redirect('/' + version + '/organisation-details/financial-profit');
        }

        else {
            res.redirect('/' + version + '/organisation-details/structure');
        }    
    }

});


/// Org details - Profit
router.get('/' + version + '/organisation-details/profit', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/profit', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/profit', function (req, res) {
    clearvalidation(req);
    var orgprofit = req.session.data['orgprofit']



    if (!orgprofit) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgprofit = {
            "anchor": "orgprofit",
            "message": "Select whether your organisation operates for profit"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/profit', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/what');
    }

});


/// Org details - What
router.get('/' + version + '/organisation-details/what', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/what', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/what', function (req, res) {
    clearvalidation(req);
    var orgsubtype = req.session.data['orgsubtype']
    var orgsubtypeother = req.session.data['orgsubtypeother']
    var orgprofit = req.session.data['orgprofit']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"



    if (!orgsubtype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsubtype = {
            "anchor": "orgsubtype",
            "message": "Select the option that best describes the work " + companyname +" does"
        }
    }

    if ((orgsubtype == "Other") && !orgsubtypeother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsubtypeother = {
            "anchor": "orgtradingpostcode",
            "message": "Enter an organisation description"
        }
    }

    if ((orgsubtype == "Other") && orgsubtypeother.length > 50) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsubtypeother = {
            "anchor": "orgtradingpostcode",
            "message": "Enter the organisation’s description"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/what', {
            data: req.session.data
        });
    }
    else {
        if (orgsubtype == "Other") {
            req.session.data['orgsubtype'] = orgsubtypeother;
            if (orgprofit == "No" ) {
                res.redirect('/' + version + '/organisation-details/socialhousing');
            }

            else {
                res.redirect('/' + version + '/organisation-details/date');
            }

        }

        else if (orgsubtype == "Registered social housing provider" || orgsubtype == "Other social housing provider" || orgsubtype == "Housing association") {
            res.redirect('/' + version + '/organisation-details/socialhousing');
        }

        else if (orgprofit == "Yes" | orgsubtype == "Resident-owned property management company" ) {
            res.redirect('/' + version + '/organisation-details/date');

        }

        else {
            res.redirect('/' + version + '/organisation-details/structure');

        }

    }

});

/// Org details - Social housing
router.get('/' + version + '/organisation-details/socialhousing', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/socialhousing', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/socialhousing', function (req, res) {
    clearvalidation(req);
    var orgsocialhousing = req.session.data['orgsocialhousing']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"


    if (!orgsocialhousing) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsocialhousing = {
            "anchor": "orgsocialhousing",
            "message": "Select whether " +  companyname + " is subject to social housing regulations"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/socialhousing', {
            data: req.session.data
        });
    }
    else {
        if (orgsocialhousing == "No") {
            res.redirect('/' + version + '/organisation-details/date');
        }

        else {
            res.redirect('/' + version + '/organisation-details/structure');
        }
    }

});




/// Org details - Financial protfit
router.get('/' + version + '/organisation-details/financial-profit', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-profit', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-profit', function (req, res) {
    clearvalidation(req);
    var financialprofit = req.session.data['financialprofit']



    if (!financialprofit) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialprofit = {
            "anchor": "financialprofit",
            "message": "Enter the profit or loss for the last financial year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-profit', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/organisation-details/financial-liquid');
    }

});

/// Org details - Financial monthly
router.get('/' + version + '/organisation-details/financial-monthly', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-monthly', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-monthly', function (req, res) {
    clearvalidation(req);
    var financialmonthly = req.session.data['financialmonthly']



    if (!financialmonthly) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialmonthly = {
            "anchor": "financialmonthly",
            "message": "Enter the average monthly costs for the previous financial year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-monthly', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/organisation-details/financial-income');
    }

});

/// Org details - Financial income
router.get('/' + version + '/organisation-details/financial-income', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-income', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-income', function (req, res) {
    clearvalidation(req);
    var financialincome = req.session.data['financialincome']



    if (!financialincome) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialincome = {
            "anchor": "financialincome",
            "message": "Enter the average monthly income for the previous financial year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-income', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/organisation-details/financial-hedged');
    }

});




/// Org details - Financial liquid
router.get('/' + version + '/organisation-details/financial-liquid', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-liquid', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-liquid', function (req, res) {
    clearvalidation(req);
    var financialliquid = req.session.data['financialliquid']



    if (!financialliquid) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialliquid = {
            "anchor": "financialliquid",
            "message": "Enter the total amount of liquid assets"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-liquid', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/organisation-details/financial-exceed');
    }

});

/// Org details - Financial exceed
router.get('/' + version + '/organisation-details/financial-exceed', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-exceed', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-exceed', function (req, res) {
    clearvalidation(req);
    var financialexceed = req.session.data['financialexceed']



    if (!financialexceed) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialexceed = {
            "anchor": "financialexceed",
            "message": "Select whether assets exceeded liabilities"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-exceed', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/financial-costs');
    }

});

/// Org details - Financial costs
router.get('/' + version + '/organisation-details/financial-costs', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-costs', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-costs', function (req, res) {
    clearvalidation(req);
    var financialcosts = req.session.data['financialcosts']



    if (!financialcosts) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialcosts = {
            "anchor": "financialcosts",
            "message": "Enter the total running costs"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-costs', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/financial-monthly');
    }

});



/// Org details - Financial needs
router.get('/' + version + '/organisation-details/financial-needs', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-needs', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-needs', function (req, res) {
    clearvalidation(req);
    var financialneeds = req.session.data['financialneeds']



    if (!financialneeds) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialneeds = {
            "anchor": "financialneeds",
            "message": "Select average monthly cash needs met fixed costs"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-needs', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/financial-authorised');
    }

});


/// Org details - Financial authorised
router.get('/' + version + '/organisation-details/financial-authorised', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-authorised', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-authorised', function (req, res) {
    clearvalidation(req);
    var financialauthorised = req.session.data['financialauthorised']



    if (!financialauthorised) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialauthorised = {
            "anchor": "financialauthorised",
            "message": "Confirm whether the authorised entity is satisfied"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-authorised', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/financial-hedged');
    }

});

/// Org details - Financial percentage
router.get('/' + version + '/organisation-details/financial-percentage', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-percentage', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-percentage', function (req, res) {
    clearvalidation(req);
    var financialpercentage = req.session.data['financialpercentage']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"
    const regex = /^[0-9,\s.]+$/; // Allowed characters: numbers (0-9), commas (,), spaces (\s), and decimal points (.)

    if (!financialpercentage) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialpercentage = {
            "anchor": "financialpercentage",
            "message": "Enter the percentage volume of " + companyname + "’s costs that are hedged"
        }
    }

    else if (!regex.test(financialpercentage)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialpercentage = {
            "anchor": "financialpercentage",
            "message": "Percentage must only include numbers and special characters such as full stops and commas"
        }
    }

    if (financialpercentage > 100) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialpercentage = {
            "anchor": "financialpercentage",
            "message": "Percentage must be 100 or less"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-percentage', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/structure');
    }

});


/// Org details - Financial hedged
router.get('/' + version + '/organisation-details/financial-hedged', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-hedged', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-hedged', function (req, res) {
    clearvalidation(req);
    var financialhedged = req.session.data['financialhedged']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"

    if (!financialhedged) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialhedged = {
            "anchor": "financialhedged",
            "message": "Select whether " + companyname + " hedges their gas, electricity, biomass or other fuel input requirementss"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-hedged', {
            data: req.session.data
        });
    }
    else {
        if (financialhedged == "Yes") {
            res.redirect('/' + version + '/organisation-details/financial-hedged-months');

        }
        else {
            res.redirect('/' + version + '/organisation-details/structure');
        }
    }

});

/// Org details - Financial hedged months
router.get('/' + version + '/organisation-details/financial-hedged-months', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/financial-hedged-months', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/financial-hedged-months', function (req, res) {
    clearvalidation(req);
    var financiallength = req.session.data['financiallength']

    if (!financiallength) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financiallength = {
            "anchor": "financiallength",
            "message": "Enter the number of months"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/financial-hedged-months', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/financial-percentage');
    }

});



function clearparentdata(req) {
    req.session.data['parentcompanyname'] = "";
    req.session.data['parentorgaddressMLine1'] = "";
    req.session.data['parentorgaddressMTown'] = "";
    req.session.data['parentorgaddressMCounty'] = "";
    req.session.data['parentorgaddressMPostcode'] = "";
    req.session.data['parentorgaddressMCountry'] = "";
    req.session.data['parentorgaddressSelect'] = "";


}


/// Org details - Structure
router.get('/' + version + '/organisation-details/structure', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/structure', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/structure', function (req, res) {
    clearvalidation(req);
    var orgstructure = req.session.data['orgstructure']



    if (!orgstructure) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgstructure = {
            "anchor": "orgstructure",
            "message": "Confirm your organisation structure"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/structure', {
            data: req.session.data
        });
    }
    else {
        clearparentdata(req);
        req.session.data['parentsentered'] = 1;

        if(orgstructure == "Neither of these") {
            res.redirect('/' + version + '/organisation-details/cya');
        }
        else {
            res.redirect('/' + version + '/organisation-details/company-name');
        }
    }

});




///Parent Company name
router.get('/' + version + '/organisation-details/company-name', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.id;
    if (urlParams) {
        req.session.data['parentid'] = urlParams

        req.session.data['parentcompanyname'] = req.session.data['parentcompanyname' + urlParams]
    }

    else {
        req.session.data['parentid'] = ""
    }

    const addanother = req.query.another;

    if (addanother) {
        req.session.data['parentcompanyname'] = ""
        req.session.data['parentorgaddressMLine1'] = ""
        req.session.data['parentorgaddressMTown'] = ""
        req.session.data['parentorgaddressMCountry'] = ""
        req.session.data['parentorgaddressMPostcode'] = ""
        req.session.data['parentsaddanother'] = "Yes"
    }

    else {
        req.session.data['parentsaddanother'] = "No"
    }




    res.render('/' + version + '/organisation-details/company-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/company-name', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.id;


    var parentcompanyname = req.session.data['parentcompanyname']
    req.session.data['parentaccounttype'] == "Overseas organisation"
    

    if (!parentcompanyname) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.parentcompanyname = {
                "anchor": "parentcompanyname",
                "message": "Enter a name for your organisation"
            }

    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/company-name', {
            data: req.session.data
        });
    }

    else {
        if (urlParams) {
            req.session.data['parentcompanyname' + urlParams] = req.session.data['parentcompanyname']
            res.redirect('/' + version + '/organisation-details/addressmanual?id=' + urlParams);

        }

        else {
            req.session.data['parentcompanyname' + req.session.data['parentsentered']] = req.session.data['parentcompanyname']
            res.redirect('/' + version + '/organisation-details/addressmanual');

        }
    

    }

});





// Parent Company - Address manual
router.get('/' + version + '/organisation-details/addressmanual', function (req, res) {
    clearvalidation(req);

    const urlParams = req.query.id;

    if (urlParams) {
        req.session.data['parentid'] = urlParams


        req.session.data['parentorgaddressMLine1'] = req.session.data['parentorgaddressMLine1' + urlParams]

        req.session.data['parentorgaddressMTown'] = req.session.data['parentorgaddressMTown' + urlParams]
        req.session.data['parentorgaddressMCountry'] = req.session.data['parentorgaddressMCountry' + urlParams]
        req.session.data['parentorgaddressMPostcode'] = req.session.data['parentorgaddressMPostcode' + urlParams]
        }

    else {

        req.session.data['parentid'] = ""
    }



    res.render('/' + version + '/organisation-details/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/addressmanual', function (req, res) {
    const urlParams = req.query.id;

    clearvalidation(req);
    var parentorgaddressMLine1 = req.session.data['parentorgaddressMLine1']
    var parentorgaddressMTown = req.session.data['parentorgaddressMTown']
    var parentorgaddressMCountry = req.session.data['parentorgaddressMCountry']
    var orgstructure = req.session.data['orgstructure']
    var parentorgaddressMPostcode = req.session.data['parentorgaddressMPostcode']

    if (!parentorgaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentorgaddressMLine1 = {
            "anchor": "parentorgaddressMLine1",
            "message": "Enter the street address",
        }
    }


    if (!parentorgaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentorgaddressMTown = {
            "anchor": "parentorgaddressMTown",
            "message": "Enter the town or city",
        }
    }

    if (!parentorgaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentorgaddressMPostcode = {
            "anchor": "parentorgaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (!parentorgaddressMCountry) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentorgaddressMCountry = {
            "anchor": "parentorgaddressMCountry",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.parentorgaddressSelect = parentorgaddressMLine1 + ', ' + parentorgaddressMTown + ', ' + parentorgaddressMPostcode + ', ' + parentorgaddressMCountry

        if (urlParams) {
            req.session.data['parentorgaddressSelect' + urlParams] = req.session.data['parentorgaddressSelect']
            req.session.data['parentorgaddressMLine1' + urlParams] = req.session.data['parentorgaddressMLine1']
            req.session.data['parentorgaddressMTown' + urlParams] = req.session.data['parentorgaddressMTown']
            req.session.data['parentorgaddressMPostcode' + urlParams] = req.session.data['parentorgaddressMPostcode']
            req.session.data['parentorgaddressMCountry' + urlParams] = req.session.data['parentorgaddressMCountry']

            req.session.data['parentorgaddressSelect' + urlParams] = req.session.data['parentorgaddressSelect']

            res.redirect('/' + version + '/organisation-details/cya');

        }

        else {
            req.session.data['parentorgaddressMLine1' + req.session.data['parentsentered']] = req.session.data['parentorgaddressMLine1']
            req.session.data['parentorgaddressMTown' + req.session.data['parentsentered']] = req.session.data['parentorgaddressMTown']
            req.session.data['parentorgaddressMPostcode' + req.session.data['parentsentered']] = req.session.data['parentorgaddressMPostcode']
            req.session.data['parentorgaddressMCountry' + req.session.data['parentsentered']] = req.session.data['parentorgaddressMCountry']

            req.session.data['parentorgaddressSelect' + req.session.data['parentsentered']] = req.session.data['parentorgaddressSelect']
            req.session.data['parentorgadded' + req.session.data['parentsentered']] = "Yes";
            req.session.data['parentsentered'] = req.session.data['parentsentered'] + 1;

    
            if (orgstructure == "Joint venture") {
                res.redirect('/' + version + '/organisation-details/parent-another');
            }
    
            else {
                res.redirect('/' + version + '/organisation-details/cya');
            }
        }


    }
});




///Parent Another
router.get('/' + version + '/organisation-details/parent-another', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/parent-another', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/parent-another', function (req, res) {
    clearvalidation(req);
    var parentsentered = req.session.data['parentsentered']
    var parentaddanother = req.session.data['parentaddanother']

    
    const parents = [];
    for (let i = 1; i <= parentsentered; i++) {
        parents.push({
            id: i,
            name: req.session.data[`parentcompanyname${i}`],
            address: req.session.data[`parentorgaddressSelect${i}`],
            added: req.session.data[`parentorgadded${i}`]
        });
    }

    const totalYes = parents.filter(parent => parent.added === "Yes").length;
    req.session.data['parentsactual'] = totalYes;

    if (!parentaddanother) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.parentaddanother = {
                "anchor": "parentaddanother",
                "message": "Select whether you'd like to add another parent organisation"
            }

    }

    if (totalYes < 2 && parentaddanother == "No" ) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.parentaddanother = {
                "anchor": "parentaddanother",
                "message": "Joint ventures must have at least 2 parent orgnisations"
            }

    }

    if (totalYes == 6 && parentaddanother == "Yes" ) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.parentaddanother = {
                "anchor": "parentaddanother",
                "message": "You cannot add more than 6 parents organisations"
            }

    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/parent-another', {
            data: req.session.data
        });
    }

    else {
        clearparentdata(req);

        if (parentaddanother == "Yes") {
            res.redirect('/' + version + '/organisation-details/company-name?another=yes');
        }

        else {
            res.redirect('/' + version + '/organisation-details/cya');
        }

    }

});





///Parent Remove
router.post('/' + version + '/organisation-details/remove-parent', function (req, res) {
    const parentId = req.body.parentId;

    // Example: Remove parent logic
    console.log(`Removing parent with ID: ${parentId}`);
    // Perform the necessary action (e.g., update session or database)
    req.session.data['parentorgadded' + parentId] = "No"

    res.redirect('/' + version + '/organisation-details/parent-another');





});




///CYA
router.get('/' + version + '/organisation-details/cya', function (req, res) {
    clearvalidation(req);
    clearparentdata(req);

    res.render('/' + version + '/organisation-details/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/cya', function (req, res) {


        clearvalidation(req);
        req.session.data['organisationdetails'] = 'Submitted';
        res.redirect('/' + version + '/organisation-details/organisation-details?notification=submitted');
    


});

////////////////////////////////////////////////////////////////////////////////////////////////  User Management  ////////////////////////////////////////////////////////////////////////////////////////////////

function clearaddeduser(req) {
    req.session.data['userfirstname'] = "";
    req.session.data['userlastname'] = "";
    req.session.data['usertelephone'] = "";
    req.session.data['usertelephonemobile'] = "";
    req.session.data['usertelephonelandline'] = "";
    req.session.data['usertelephonelandlineext'] = "";
    req.session.data['useremail'] = "";
    req.session.data['userjobtitle'] = "";
    req.session.data['userthirdparty'] = "";
    req.session.data['userorgname'] = "";
    req.session.data['addeduser'] = "";
    req.session.data['adduserpermissionstransfer'] = "";
    req.session.data['adduserpermissionsrightsandpowers'] = "";
    req.session.data['adduserpermissionsusermanagement'] = "";
    req.session.data['adduserpermissionsmonitoring'] = "";
    req.session.data['adduserpermissionsregistration'] = ""
}


function generateuser(req){

    var useradded = req.session.data['addeduser1']
    if (useradded != "true" ) {
    req.session.data['userfirstname1'] = "John";
    req.session.data['userlastname1'] = "Smith";
    req.session.data['usertelephone1'] = "Landline";
    req.session.data['usertelephonelandline1'] = "01234567891";
    req.session.data['usertelephonelandlineext1'] = "123";
    req.session.data['useremail1'] = "john.smith@radienteco.org";
    req.session.data['userjobtitle1'] = "Director";
    req.session.data['addeduser1'] = "true";
    req.session.data['userthirdparty1'] = "No";

    req.session.data['adduserpermissionstransfer1'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers1'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement1'] = "Manage users";
    req.session.data['adduserpermissionsmonitoring1'] = "Submit heat network information";
    req.session.data['adduserpermissionsregistration1'] = "Add or edit heat network information";
    req.session.data['regchange'] = "1";
    req.session.data['currentuserid'] = "1";
    req.session.data['regcontactname'] = "John Smith";
    req.session.data['regcontactemail'] = "john.smith@radienteco.org";
}

}

function generateuser2(req){
    req.session.data['userfirstname2'] = "Jenny";
    req.session.data['userlastname2'] = "Smith";
    req.session.data['usertelephone2'] = "Landline";
    req.session.data['usertelephonelandline2'] = "01234567892";
    req.session.data['usertelephonelandlineext2'] = "2243";
    req.session.data['useremail2'] = "jenny.smith@radienteco.org";
    req.session.data['addeduser2'] = "true";
    req.session.data['userthirdparty2'] = "Yes";
    req.session.data['adduserpermissionstransfer2'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers2'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement2'] = "Manage users";
    req.session.data['adduserpermissionsmonitoring2'] = "Submit heat network information";
    req.session.data['adduserpermissionsregistration2'] = "Add or edit heat network information";
}


function generateuser3(req){
    req.session.data['userfirstname3'] = "Bob";
    req.session.data['userlastname3'] = "Smith";
    req.session.data['usertelephone3'] = "Landline";
    req.session.data['usertelephonelandline3'] = "01234567892";
    req.session.data['usertelephonelandlineext3'] = "2243";
    req.session.data['useremail3'] = "bob.smith@radienteco.org";
    req.session.data['userjobtitle3'] = "Staff";
    req.session.data['addeduser3'] = "true";
    req.session.data['userthirdparty3'] = "No";
    req.session.data['adduserpermissionstransfer3'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers3'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement3'] = "Manage users";
    req.session.data['adduserpermissionsmonitoring3'] = "Submit heat network information";
    req.session.data['adduserpermissionsregistration3'] = "Add or edit heat network information";


}

function generateuser4(req){

    req.session.data['userfirstname4'] = "Dan";
    req.session.data['userlastname4'] = "Smith";
    req.session.data['usertelephone4'] = "Mobile";
    req.session.data['usertelephonemobile4'] = "07334567893";
    req.session.data['useremail4'] = "dan.smith@radienteco.org";
    req.session.data['userjobtitle4'] = "Staff";
    req.session.data['addeduser4'] = "true";
    req.session.data['userthirdparty4'] = "Yes";
    req.session.data['adduserpermissionstransfer4'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers4'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement4'] = "Manage users";
    req.session.data['adduserpermissionsmonitoring4'] = "Submit heat network information";
    req.session.data['adduserpermissionsregistration4'] = "Add or edit heat network information";
}

function generateuser5(req){
    req.session.data['userfirstname5'] = "Jane";
    req.session.data['userlastname5'] = "Smith";
    req.session.data['usertelephone5'] = "Mobile";
    req.session.data['usertelephonemobile5'] = "0222567894";
    req.session.data['useremail5'] = "jane.smith@radienteco.org";
    req.session.data['userjobtitle5'] = "Staff";
    req.session.data['addeduser5'] = "true";
    req.session.data['userthirdparty5'] = "No";
    req.session.data['adduserpermissionstransfer5'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers5'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement5'] = "Manage users";
    req.session.data['adduserpermissionsregistration5'] = "Add or edit heat network information";


}


function generateuser6(req){

    req.session.data['userfirstname6'] = "Donald";
    req.session.data['userlastname6'] = "Smith";
    req.session.data['usertelephone6'] = "Mobile";
    req.session.data['usertelephonemobile6'] = "0222567895";
    req.session.data['useremail6'] = "donald.smith@radienteco.org";
    req.session.data['userjobtitle6'] = "Staff";
    req.session.data['addeduser6'] = "true";
    req.session.data['userthirdparty6'] = "No";
    req.session.data['adduserpermissionstransfer6'] = "Initiate transfer of ownership";
    req.session.data['adduserpermissionsrightsandpowers6'] = "Apply for rights and powers licence";
    req.session.data['adduserpermissionsusermanagement6'] = "Manage users";
    req.session.data['adduserpermissionsregistration6'] = "Add or edit heat network information";
    req.session.data['isdeleted6'] = true;

    req.session.data['usertotal'] = "6";
}



function clearediteduser(req) {
    req.session.data['edituserfirstname'] = "";
    req.session.data['edituserlastname'] = "";
    req.session.data['editusertelephone'] = "";
    req.session.data['edituserjobtitle'] = ""
}


/// Add user
router.get('/' + version + '/manage-users/add-user', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/add-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/add-user', function (req, res) {
    clearvalidation(req);


    var useremail = req.session.data['useremail']


    if (!useremail) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.useremail = {
            "anchor": "useremail",
            "message": "Enter an email address"
        }
    }

    if (useremail.length > 80) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.useremail = {
            "anchor": "useremail",
            "message": "Enter an email address using 80 characters or fewer"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/add-user', {
            data: req.session.data
        });
    }

    else {
        if (req.session.data.usertotal) {
            req.session.data.usertotal = req.session.data.usertotal + 1
        } 
        else {
            req.session.data.usertotal = 2
        }

        req.session.data['useremail' + req.session.data['usertotal']] = req.session.data['useremail']
        res.redirect('/' + version + '/manage-users/add-user-details');


    }


});


/// Add user details
router.get('/' + version + '/manage-users/add-user-details', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/add-user-details', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/add-user-details', function (req, res) {
    clearvalidation(req);


    var userfirstname = req.session.data['userfirstname']
    var userlastname = req.session.data['userlastname']
    var usertelephone = req.session.data['usertelephone']
    var usertelephonemobile = req.session.data['usertelephonemobile']
    var usertelephonelandline = req.session.data['usertelephonelandline']
    var userjobtitle = req.session.data['userjobtitle']



    if (!userfirstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userfirstname = {
            "anchor": "userfirstname",
            "message": "Enter a first name"
        }
    }

    if (!userlastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userlastname = {
            "anchor": "userlastname",
            "message": "Enter a last name"
        }
    }


    if (!usertelephone) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephone = {
            "anchor": "usertelephone",
            "message": "Select a preferred contact method for work"
        }
    }

    if ((usertelephone == "Landline") && !usertelephonelandline) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonelandline = {
            "anchor": "usertelephonelandline",
            "message": "Enter a landline number"
        }
    }


    if ((usertelephone == "Mobile") && !usertelephonemobile) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonemobile = {
            "anchor": "usertelephonemobile",
            "message": "Enter a mobile number"
        }
    }



    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/add-user-details', {
            data: req.session.data
        });
    }

    else {
        req.session.data['userfirstname' + req.session.data['usertotal']] = req.session.data['userfirstname']
        req.session.data['userlastname' + req.session.data['usertotal']] = req.session.data['userlastname']
        req.session.data['usertelephone' + req.session.data['usertotal']] = req.session.data['usertelephone']
        req.session.data['usertelephonelandline' + req.session.data['usertotal']] = req.session.data['usertelephonelandline']
        req.session.data['usertelephonelandlineext' + req.session.data['usertotal']] = req.session.data['usertelephonelandlineext']
        req.session.data['usertelephonemobile' + req.session.data['usertotal']] = req.session.data['usertelephonemobile']
        res.redirect('/' + version + '/manage-users/add-user-org');


    }


});







/// Add user - third party
router.get('/' + version + '/manage-users/add-user-org', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/add-user-org', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/add-user-org', function (req, res) {
    clearvalidation(req);
    var userorgname = req.session.data['userorgname']
    var userthirdparty = req.session.data['userthirdparty']
    var userjobtitle = req.session.data['userjobtitle']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"



    if (!userthirdparty) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userthirdparty = {
            "anchor": "userthirdparty",
            "message": "Select whether this user works for another organisation acting on behalf of " + companyname
        }
    }

    if ((userthirdparty == "No") && !userjobtitle) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userjobtitle = {
            "anchor": "userjobtitle",
            "message": "Enter the user’s job title"
        }
    }
    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/add-user-org', {
            data: req.session.data
        });
    }
    else {
        req.session.data['userorgname' + req.session.data['usertotal']] = req.session.data['userorgname']
        req.session.data['userthirdparty' + req.session.data['usertotal']] = req.session.data['userthirdparty']
        req.session.data['userjobtitle' + req.session.data['usertotal']] = req.session.data['userjobtitle']

        res.redirect('/' + version + '/manage-users/add-user-permissions');
    }

});


/// Add user permissions
router.get('/' + version + '/manage-users/add-user-permissions', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/add-user-permissions', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/add-user-permissions', function (req, res) {
    clearvalidation(req);
    req.session.data['adduserpermissionsview' + req.session.data['usertotal']] = req.session.data['adduserpermissionsview']
    req.session.data['adduserpermissionstransfer' + req.session.data['usertotal']] = req.session.data['adduserpermissionstransfer']
    req.session.data['adduserpermissionsrightsandpowers' + req.session.data['usertotal']] = req.session.data['adduserpermissionsrightsandpowers']
    req.session.data['adduserpermissionsusermanagement' + req.session.data['usertotal']] = req.session.data['adduserpermissionsusermanagement']
    req.session.data['adduserpermissionsmonitoring' + req.session.data['usertotal']] = req.session.data['adduserpermissionsmonitoring']
    req.session.data['adduserpermissionsregistration' + req.session.data['usertotal']] = req.session.data['adduserpermissionsregistration']
    res.redirect('/' + version + '/manage-users?notification=adduserpermissions');

});

/// Edit user
router.get('/' + version + '/manage-users/edit-user', function (req, res) {
    clearvalidation(req);
    generateuser(req);

    const userid = req.query.id;
    
    req.session.data['userid'] = userid;

        res.render('/' + version + '/manage-users/edit-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/edit-user', function (req, res) {
    clearvalidation(req);
    var source = req.query.source;

    var userfirstname = req.session.data['userfirstname']
    var userlastname = req.session.data['userlastname']
    var usertelephone = req.session.data['usertelephone']
    var usertelephonemobile = req.session.data['usertelephonemobile']
    var usertelephonelandline = req.session.data['usertelephonelandline']



    if (!userfirstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userfirstname = {
            "anchor": "userfirstname",
            "message": "Enter a first name"
        }
    }

    if (!userlastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userlastname = {
            "anchor": "userlastname",
            "message": "Enter a last name"
        }
    }


    if (!usertelephone) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephone = {
            "anchor": "usertelephone",
            "message": "Select a preferred contact method for work"
        }
    }

    if ((usertelephone == "Landline") && !usertelephonelandline) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonelandline = {
            "anchor": "usertelephonelandline",
            "message": "Enter a landline number"
        }
    }


    if ((usertelephone == "Mobile") && !usertelephonemobile) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonemobile = {
            "anchor": "usertelephonemobile",
            "message": "Enter a mobile number"
        }
    }



    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/edit-user', {
            data: req.session.data
        });
    }




    else {
        req.session.data['userfirstname' + req.session.data['userid']] = req.session.data['userfirstname']
        req.session.data['userlastname' + req.session.data['userid']] = req.session.data['userlastname']
        req.session.data['usertelephone' + req.session.data['userid']] = req.session.data['usertelephone']
        req.session.data['usertelephonelandline' + req.session.data['userid']] = req.session.data['usertelephonelandline']
        req.session.data['usertelephonelandlineext' + req.session.data['userid']] = req.session.data['usertelephonelandlineext']
        req.session.data['usertelephonemobile' + req.session.data['userid']] = req.session.data['usertelephonemobile']
            res.redirect('/' + version + '/my-profile?notification=edituser');

    }


});


/// Edit user permissions
router.get('/' + version + '/manage-users/edit-user-permissions', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;



    res.render('/' + version + '/manage-users/edit-user-permissions', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/edit-user-permissions', function (req, res) {
    clearvalidation(req);
    req.session.data['adduserpermissionsview' + req.session.data['userid']] = req.session.data['edituserpermissionsview']
    req.session.data['adduserpermissionsusermanagement' + req.session.data['userid']] = req.session.data['edituserpermissionsusermanagement']
    req.session.data['adduserpermissionsmonitoring' + req.session.data['userid']] = req.session.data['edituserpermissionsmonitoring']
    req.session.data['adduserpermissionsregistration' + req.session.data['userid']] = req.session.data['edituserpermissionsregistration']

    res.redirect('/' + version + '/manage-users/user-profile?notification=editpermissions&id='+ req.session.data['userid']);



});

/// Edit user - third party
router.get('/' + version + '/manage-users/edit-user-org', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    res.render('/' + version + '/manage-users/edit-user-org', {
        data: req.session.data
    });
    
});


router.post('/' + version + '/manage-users/edit-user-org', function (req, res) {
    clearvalidation(req);
    var edituserthirdparty = req.session.data['edituserthirdparty']
    var edituserjobtitle = req.session.data['edituserjobtitle']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"


    if (!edituserthirdparty) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.edituserthirdparty = {
            "anchor": "edituserthirdparty",
            "message": "Select whether this user works for another organisation acting on behalf of " + companyname
        }
    }

    if ((edituserthirdparty == "No") && !edituserjobtitle) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.edituserjobtitle = {
            "anchor": "edituserjobtitle",
            "message": "Enter the user’s job title"
        }
    }
    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/edit-user-org', {
            data: req.session.data
        });
    }
    else {
        req.session.data['userthirdparty' + req.session.data['userid']] = req.session.data['edituserthirdparty']
        req.session.data['userjobtitle' + req.session.data['userid']] = req.session.data['edituserjobtitle']

        res.redirect('/' + version + '/manage-users/edit-user-permissions?notification=editthirdparty&id=' + req.session.data['userid']);
    }

});


/// Reg change
router.get('/' + version + '/manage-users/reg-change', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/reg-change', {
        data: req.session.data
    });
});

router.post('/' + version + '/manage-users/reg-change', function (req, res) {
    clearvalidation(req);
    var regchange = req.session.data['regchange']

    if (regchange == "") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.regchange = {
            "anchor": "regchange",
            "message": "You must select someone to be the new regulatory contact"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/reg-change', {
            data: req.session.data
        });
    }

    else {
        req.session.data['regcontactname'] = req.session.data['userfirstname' + regchange] + " " + req.session.data['userlastname' + regchange];
        req.session.data['regcontactemail'] = req.session.data['useremail' + regchange];

        res.redirect('/' + version + '/manage-users?notification=regchange');
        }            


});

/// Delete user
router.get('/' + version + '/manage-users/delete-user', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;


    res.render('/' + version + '/manage-users/delete-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/delete-user', function (req, res) {
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    clearvalidation(req);
    req.session.data['deletedusername'] = req.session.data['userfirstname' + req.session.data['userid']] + " " + req.session.data['userlastname' + req.session.data['userid']];
    req.session.data['adduserpermissionsview' + req.session.data['userid']] = ""
    req.session.data['adduserpermissionstransfer' + req.session.data['userid']] = ""
    req.session.data['adduserpermissionsrightsandpowers' + req.session.data['userid']] = ""
    req.session.data['adduserpermissionsusermanagement' + req.session.data['userid']] = ""
    req.session.data['adduserpermissionsmonitoring' + req.session.data['userid']] = ""
    req.session.data['adduserpermissionsregistration' + req.session.data['userid']] = ""
    req.session.data['isdeleted' + req.session.data['userid']] = true;
    res.redirect('/' + version + '/manage-users?notification=deleted');

});


/// Cancel invite
router.get('/' + version + '/manage-users/cancel-invite', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;


    res.render('/' + version + '/manage-users/cancel-invite', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/cancel-invite', function (req, res) {
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    clearvalidation(req);
    req.session.data['deleteduseremail'] = req.session.data['useremail' + req.session.data['userid']];

    req.session.data['addeduser' + req.session.data['userid']] = false;
    res.redirect('/' + version + '/manage-users?notification=inviteremoved');

});


/// Remove user
router.get('/' + version + '/manage-users/remove-user', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;


    res.render('/' + version + '/manage-users/remove-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/remove-user', function (req, res) {
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    clearvalidation(req);
    req.session.data['deleteduseremail'] = req.session.data['useremail' + req.session.data['userid']];

    req.session.data['addeduser' + req.session.data['userid']] = false;
    res.redirect('/' + version + '/manage-users?notification=removed');

});

/// Reactivate user
router.get('/' + version + '/manage-users/reactivate-user', function (req, res) {
    clearvalidation(req);
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    res.render('/' + version + '/manage-users/reactivate-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/reactivate-user', function (req, res) {
    const userid = req.query.id;
    req.session.data['userid'] = userid;

    clearvalidation(req);
    req.session.data['deletedusername'] = req.session.data['userfirstname' + req.session.data['userid']] + " " + req.session.data['userlastname' + req.session.data['userid']];

    req.session.data['isdeleted' + req.session.data['userid']] = false;
    res.redirect('/' + version + '/manage-users/edit-user-permissions?id=' + userid + '&notification=reactivated');

});

/// Invite accept
router.get('/' + version + '/manage-users/organisation-invite', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/manage-users/organisation-invite', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/organisation-invite', function (req, res) {

    var acceptinvite = req.session.data['acceptinvite']
    clearvalidation(req);


    if (acceptinvite != "yes" && acceptinvite != "no") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.acceptinvite = {
            "anchor": "acceptinvite",
            "message": "Select yes if you wish to accept this invitation"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/organisation-invite', {
            data: req.session.data
        });
    }
    else {
    res.redirect('/' + version + '/account-information');
    }

});

/// Manage users
router.get('/' + version + '/manage-users', function (req, res) {
    generateuser(req);
    clearvalidation(req);
    const urlParams = req.query.notification;
    const variant = req.query.v;

    req.session.data['manageusersnotification'] = urlParams;

    if (variant == "dev") {
        generateuser2(req);
        generateuser3(req);
        generateuser4(req);
        generateuser5(req);
        generateuser6(req);

    }



    res.render('/' + version + '/manage-users/index', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users', function (req, res) {
    clearvalidation(req);
    clearaddeduser(req);
    res.redirect('/' + version + '/manage-users/add-user');
});


/// User profile
router.get('/' + version + '/manage-users/user-profile', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;
    const userid = req.query.id;
    req.session.data['userid'] = userid;
    clearediteduser(req)


    res.render('/' + version + '/manage-users/user-profile', {
        data: req.session.data
    });
});

/// User profile self
router.get('/' + version + '/my-profile', function (req, res) {
    generateuser(req);
    clearvalidation(req);
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;
    clearediteduser(req)


    res.render('/' + version + '/my-profile', {
        data: req.session.data
    });
});


/// Org invite accept
router.get('/' + version + '/manage-users/organisation-invite', function (req, res) {
    clearvalidation(req);


    res.render('/' + version + '/manage-users/organisation-invite', {
        data: req.session.data
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Account creation //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


/// Start
router.get('/' + version + '/account-creation/start', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/start', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/start', function (req, res) {
    req.session.destroy();
    res.redirect('/' + version + '/account-creation/one-login/start-onelogin');

});




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  ONE LOGIN  - P0 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/// Email
router.get('/' + version + '/account-creation/one-login/enter-email-create', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/enter-email-create', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/enter-email-create', function (req, res) {
    clearvalidation(req);
    var email = req.session.data['oneloginemail']

    if (!email) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.email = {
            "anchor": "email",
            "message": "Enter an email address"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/one-login/enter-email-create', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/account-creation/one-login/check-your-email');
    }

});

/// Email
router.get('/' + version + '/account-creation/one-login/check-your-email', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/check-your-email', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/check-your-email', function (req, res) {
    clearvalidation(req);



            res.redirect('/' + version + '/account-creation/one-login/create-password');


});


/// Email sign in
router.get('/' + version + '/account-creation/one-login/enter-email-sign-in', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/enter-email-sign-in', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/enter-email-sign-in', function (req, res) {
    clearvalidation(req);



            res.redirect('/' + version + '/account-creation/one-login/enter-password');


});


/// Create password
router.get('/' + version + '/account-creation/one-login/create-password', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/create-password', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/create-password', function (req, res) {
    clearvalidation(req);

            res.redirect('/' + version + '/account-creation/one-login/get-security-codes');

});


/// Get security codes
router.get('/' + version + '/account-creation/one-login/get-security-codes', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/get-security-codes', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/get-security-codes', function (req, res) {
    clearvalidation(req);
    var authenticate = req.session.data['2faMethod']

    if (!authenticate) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.authenticate = {
            "anchor": "2faMethod",
            "message": "Select a method of authentication"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/one-login/get-security-codes', {
            data: req.session.data
        });
    }

    else {
        if(authenticate == "sms") {
            res.redirect('/' + version + '/account-creation/one-login/enter-phone-number');
        }
        else {
            res.redirect('/' + version + '/account-creation/one-login/setup-authenticator-app');

        }
    }

});


/// Enter phone number
router.get('/' + version + '/account-creation/one-login/enter-phone-number', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/enter-phone-number', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/enter-phone-number', function (req, res) {
    clearvalidation(req);
    var phone = req.session.data['oneloginphone']

    if (!phone) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.phone = {
            "anchor": "international-telephone-number",
            "message": "Enter a phone number"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/one-login/enter-phone-number', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/account-creation/one-login/check-your-phone');
    }

});


/// Check your phone
router.get('/' + version + '/account-creation/one-login/check-your-phone', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/one-login/check-your-phone', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/one-login/check-your-phone', function (req, res) {
    clearvalidation(req);

            res.redirect('/' + version + '/account-creation/one-login/account-created');

});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ACCOUNT CREATE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Start
router.get('/' + version + '/account-creation/intro', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/intro', {
        data: req.session.data
    });
});

///Select org
router.get('/' + version + '/account-creation/select-org', function (req, res) {
    clearvalidation(req);
    const orgtotal = req.query.orgtotal;
    if (orgtotal) {
        req.session.data['orgtotal'] = orgtotal;
    }

    res.render('/' + version + '/account-creation/select-org', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/select-org', function (req, res) {
    clearvalidation(req);
    var orgtotal = req.session.data['orgtotal']
    var orgselect = req.session.data['orgselect']
    if(orgtotal > 1) {
        if (!orgselect) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.orgselect = {
                "anchor": "orgselect",
                "message": "Select which organisation you want to access"
            }
        }
    
    
        if (req.session.data.validationError == "true") {
            res.render('/' + version + '/account-creation/select-org', {
                data: req.session.data
            });
        }
    
        else {
            if (orgselect == "New") {
                res.redirect('/' + version + '/account-creation/intro');
            }
            if (orgselect == "Heating Co") {
                req.session.data.companyname = "Heating Co"
                res.redirect('/' + version + '/account-creation/company-create');
            }
            else {
                req.session.data['companyname'] = orgselect;
                res.redirect('/' + version + '/account-information');
            }
        }
    }
    else {
        res.redirect('/' + version + '/account-creation/type');
 
    }


});


///Legal declaration
router.get('/' + version + '/account-creation/check-answers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/check-answers', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/check-answers', function (req, res) {
    clearvalidation(req);
    var confirmauthority = req.session.data['creatorlegaldeclaration']

    if (!confirmauthority) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.creatorlegaldeclaration = {
            "anchor": "creatorlegaldeclaration",
            "message": "You must tick to confirm that you comply with the conditions for enabling your organisation for the heat network service"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/check-answers', {
            data: req.session.data
        });
    }

    else {
        req.session.data['userfirstname1'] = req.session.data['yourfirstname'];
        req.session.data['userlastname1'] = req.session.data['yourlastname'];
        req.session.data['usertelephone1'] = req.session.data['yourtelephone'];
        req.session.data['usertelephonelandline1'] = req.session.data['yourtelephonelandline'];
        req.session.data['usertelephonelandlineext1'] = req.session.data['yourtelephonelandlineext'];
        req.session.data['usertelephonemobile1'] = req.session.data['yourtelephonemobile'];
        req.session.data['useremail1'] = req.session.data['oneloginemail'];
        req.session.data['userjobtitle1'] = req.session.data['yourjobtitle'];
        req.session.data['addeduser1'] = "true";
        req.session.data['adduserpermissionstransfer1'] = "Initiate transfer of ownership";
        req.session.data['adduserpermissionsrightsandpowers1'] = "Apply for rights and powers licence";
        req.session.data['adduserpermissionsusermanagement1'] = "Manage users";
        req.session.data['adduserpermissionsmonitoring1'] = "Submit heat network information";
        req.session.data['adduserpermissionsregistration1'] = "Add or edit heat network information";
        req.session.data['regchange'] = "1";
        req.session.data['currentuserid'] = "1";
        req.session.data['regcontactname'] = req.session.data['yourfirstname'] + " " + req.session.data['yourlastname'];
        req.session.data['regcontactemail'] = req.session.data['oneloginemail'];

        if (req.session.data.orgtotal) {
            req.session.data.orgtotal = req.session.data.orgtotal + 1
        } 
        else {
            req.session.data.orgtotal = 1
        }

        res.redirect('/' + version + '/account-creation/account-created');
        }
        
});


///Type
router.get('/' + version + '/account-creation/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/type', function (req, res) {
    clearvalidation(req);
    var accounttype = req.session.data['accounttype']

    if (!accounttype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.accounttype = {
            "anchor": "accounttype",
            "message": "Select which type of organisation you work for"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/type', {
            data: req.session.data
        });
    }

    else {
        if (accounttype == "UK public body" || accounttype == "Other UK organisation" || accounttype == "Overseas organisation" || accounttype == "None, I'm a sole trader") {
            res.redirect('/' + version + '/account-creation/company-name');
        }
        else {
            res.redirect('/' + version + '/account-creation/company-number');
        }
    }

});
///Company name
router.get('/' + version + '/account-creation/company-name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/company-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/company-name', function (req, res) {
    clearvalidation(req);
    var companyname = req.session.data['companyname']
    var accounttype = req.session.data['accounttype']
    

    if (!companyname) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.companyname = {
                "anchor": "companyname",
                "message": "Enter a name for your organisation"
            }

    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/company-name', {
            data: req.session.data
        });
    }

    else {
        if (accounttype == "Overseas organisation") {
            res.redirect('/' + version + '/account-creation/addressmanual');
        }
        else {
            res.redirect('/' + version + '/account-creation/address');
        }
    }

});



///Company number
router.get('/' + version + '/account-creation/company-number', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/company-number', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/company-number', function (req, res) {
    clearvalidation(req);
    var orgcompanynumber = req.session.data['companynumber']
    var accounttype = req.session.data['accounttype']

    

    if (!orgcompanynumber) {
        req.session.data.validationError = "true"
            req.session.data.validationErrors.companynumber = {
                "anchor": "companynumber",
                "message": "Enter a company number"
            }
     
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/company-number', {
            data: req.session.data
        });
    }

    else {

        (async () => {
            // Dynamically import 'node-fetch' for CommonJS
            const fetch = (await import('node-fetch')).default;
          
            const API_KEY = 'b38e31d7-61af-448c-8955-425028c1a088'; // Replace with your actual Companies House API key
          
            async function getCompanyDetails(companyNumber) {
              // Concatenate the API key with a colon (:) for Basic Auth
              const apiKeyWithColon = API_KEY + ':';
              
              // Base64 encode the result
              const encodedKey = Buffer.from(apiKeyWithColon).toString('base64');
          
              // Set the headers for the request
              const headers = new Headers({
                'Authorization': 'Basic ' + encodedKey
              });
          
          
              const requestOptions = {
                method: 'GET',
                headers: headers
              };
          
              try {
                const response = await fetch(`https://api.company-information.service.gov.uk/company/${companyNumber}`, requestOptions);
          
                // Log the response status
                console.log(`Response Status: ${response.status} ${response.statusText}`);
          
                if (!response.ok) {
                    req.session.data.validationErrors.companynumber = {
                        "anchor": "companynumber",
                        "message": "Enter a valid company number"
                    }

                    res.render('/' + version + '/account-creation/company-number', {
                        data: req.session.data
                    });
                }
          
                const companyData = await response.json();

          
                // Extracting company name and registered office address
                const companyName = companyData.company_name;
                const address = companyData.registered_office_address;
          
                if (!address) {
                    req.session.data.companyname = companyName;
                    res.redirect('/' + version + '/account-creation/addressmanual')
                }

                else {
                const formattedAddress = `${address.address_line_1}, ${address.address_line_2 || ''}, ${address.locality}, ${address.region || ''}, ${address.postal_code}, ${address.country || ''}`.replace(/, ,/g, ',').replace(/, $/, '');
                req.session.data.companyname = companyName;
                req.session.data.orgaddressSelect = formattedAddress;
                }

                // Returning as a JSON object
                return {
                  companyName: companyName,
                  address: formattedAddress
                };
              } catch (error) {
                console.error('Error fetching company details:', error);
                return { error: error.message };
              }
            }
          
            // Example usage
            getCompanyDetails(orgcompanynumber.toUpperCase())
              .then(() => res.redirect('/' + version + '/account-creation/company-confirm'))
              .catch((error) => console.error('Error:', error));
          })();

          

    }

});


///Your details
router.get('/' + version + '/account-creation/your-details', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/your-details', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/your-details', function (req, res) {
    clearvalidation(req);
    var firstname = req.session.data['yourfirstname']
    var lastname = req.session.data['yourlastname']
    var telephone = req.session.data['yourtelephone']
    var telephonelandline = req.session.data['yourtelephonelandline']
    var telephonemobile = req.session.data['yourtelephonemobile']

    var jobtitle = req.session.data['yourjobtitle']


    if (!firstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourfirstname = {
            "anchor": "yourfirstname",
            "message": "Enter your first name"
        }
    }
    if (!lastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourlastname = {
            "anchor": "yourlastname",
            "message": "Enter your last name"
        }
    }


    if (!telephone) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourtelephone = {
            "anchor": "yourtelephone",
            "message": "Select a preferred contact method"
        }
    }

    if ((telephone == "Landline") && !telephonelandline) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourtelephonelandline = {
            "anchor": "yourtelephonelandline",
            "message": "Enter a landline telephone number"
        }
    }


    if ((telephone == "Mobile") && !telephonemobile) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourtelephonemobile = {
            "anchor": "yourtelephonemobile",
            "message": "Enter a mobile telephone number"
        }
    }

    if (!jobtitle) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.yourjobtitle = {
            "anchor": "yourjobtitle",
            "message": "Enter your job title"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/your-details', {
            data: req.session.data
        });
    }

    else {
        if (telephone == "Landline") {
            req.session.data['yourtelephonemobile'] = "";
        }
            res.redirect('/' + version + '/account-creation/check-answers');
    }

});

///Director select
router.get('/' + version + '/account-creation/director-select', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/director-select', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/director-select', function (req, res) {
    clearvalidation(req);
    var directorselect = req.session.data['directorselect']
    var accounttype = req.session.data['accounttype']

    

    if (!directorselect) {
        req.session.data.validationError = "true"
        if (accounttype == "UK charity registered with the Charity Commission") {
            req.session.data.validationErrors.directorselect = {
                "anchor": "directorselect",
                "message": "Select a trustee"
            }
        }
        else {
            req.session.data.validationErrors.directorselect = {
                "anchor": "directorselect",
                "message": "Select a director"
            }
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/director-select', {
            data: req.session.data
        });
    }

    else {
        if (directorselect == "John Smith") {
           req.session.data['directorfirstname'] = "John"
           req.session.data['directorlastname'] = "Smith"
           res.redirect('/' + version + '/account-creation/director-details');

        }
        else if (directorselect == "Jane Smith") {
            req.session.data['directorfirstname'] = "Jane"
            req.session.data['directorlastname'] = "Smith"
            res.redirect('/' + version + '/account-creation/director-details');

         }
         else {
            req.session.data['directorfirstname'] = ""
            req.session.data['directorlastname'] = ""

            res.redirect('/' + version + '/account-creation/director-details');

         }

    }

});


///Director details
router.get('/' + version + '/account-creation/director-details', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/director-details', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/director-details', function (req, res) {
    clearvalidation(req);
    var email = req.session.data['directoremail']
    var firstname = req.session.data['directorfirstname']
    var lastname = req.session.data['directorlastname']

    if (!email) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.directoremail = {
            "anchor": "directoremail",
            "message": "Enter director email"
        }
    }


    if (!firstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.directorfirstname = {
            "anchor": "directorfirstname",
            "message": "Enter director first name"
        }
    }
    if (!lastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.directorlastname = {
            "anchor": "directorlastname",
            "message": "Enter director last name"
        }
    }



    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/director-details', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/account-creation/what-next');
    }

});



///Director details check
router.get('/' + version + '/account-creation/director-details-check', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/director-details-check', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/director-details-check', function (req, res) {
    clearvalidation(req);
    var firstname = req.session.data['directorfirstname']
    var lastname = req.session.data['directorlastname']




    if (!firstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.directorfirstname = {
            "anchor": "directorfirstname",
            "message": "Enter director first name"
        }
    }
    if (!lastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.directorlastname = {
            "anchor": "directorlastname",
            "message": "Enter director last name"
        }
    }



    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/director-details-check', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/account-creation/confirm-director-authority');
    }

});


///Confirm authority
router.get('/' + version + '/account-creation/confirm-authority', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/confirm-authority', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/confirm-authority', function (req, res) {
    clearvalidation(req);
    var confirmauthority = req.session.data['confirmauthority']

    if (!confirmauthority) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.confirmauthority = {
            "anchor": "confirmauthority",
            "message": "Confirm you want to create an account"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/confirm-authority', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/account-creation/account-created');
        }

});


///Confirm director authority
router.get('/' + version + '/account-creation/confirm-director-authority', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/confirm-director-authority', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/confirm-director-authority', function (req, res) {
    clearvalidation(req);
    var confirmauthority = req.session.data['confirmauthority']

    if (!confirmauthority) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.confirmauthority = {
            "anchor": "confirmauthority",
            "message": "Confirm you want to create an account"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/confirm-director-authority', {
            data: req.session.data
        });
    }

    else {
        if (confirmauthority == "No") {
            res.redirect('/' + version + '/account-creation/dropout-director');
        }
        else {
            res.redirect('/' + version + '/account-creation/account-created');
        }
        }

});



///Company create
router.get('/' + version + '/account-creation/company-create', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/company-create', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/company-create', function (req, res) {
    clearvalidation(req);
    var companycreate = req.session.data['companycreate']
    var accounttype = req.session.data['accounttype']

    if (!companycreate) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.companycreate = {
            "anchor": "companycreate",
            "message": "Select whether you are the regulatory contact"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/company-create', {
            data: req.session.data
        });
    }

    else {
        if (companycreate == "No") {
                res.redirect('/' + version + '/account-creation/dropout-regcontact');
        }
        else {

            res.redirect('/' + version + '/account-creation/your-details');
        }
    }

});






// Company - Address
router.get('/' + version + '/account-creation/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['orgaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressPostcode = {
            "anchor": "orgaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    function validateUKPostcode(postcode) {
        const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
      
        return postcodeRegex.test(postcode);
      }

    if (!validateUKPostcode(userpostcode)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressPostcode = {
            "anchor": "orgaddressPostcode",
            "message": "Enter a valid postcode",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

        async function postcode(postcode) {
            axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                .then(function (response) {
                    var output = JSON.stringify(response.data, null, 2);
                    let totalResults = response.data.header.totalresults;
                    let parsed = JSON.parse(output).results;
                    let locationaddresses = [];
                    if (parsed != undefined) {
                        for (var i = 0; i < parsed.length; i++) {
                            let obj = parsed[i];
                            locationaddresses.push(obj.LPI.ADDRESS);
                        }

                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                        req.session.data.orgaddressnotfound = "";
                        if (totalResults > 99) {
                            res.redirect('/' + version + '/account-creation/addresserror?reason=toomany');
                        }
                        else {
                            res.redirect('/' + version + '/account-creation/addressselect');
                        }
                    }

                    else {
                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                        req.session.data.orgaddressnotfound = true;
                        res.redirect('/' + version + '/account-creation/addresserror');

                    }

                });

        }
        postcode(userpostcode);
        }


});

///Address error
router.get('/' + version + '/account-creation/addresserror', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.reason;
    req.session.data['addresserrorreason'] = urlParams;

    res.render('/' + version + '/account-creation/addresserror', {
        data: req.session.data
    });
});



// Company - Address select
router.get('/' + version + '/account-creation/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/addressselect', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['orgaddressSelect']



    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressSelect = {
            "anchor": "orgaddressSelect",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/addressselect', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/account-creation/company-confirm');
    }    
});


// Company - Address manual
router.get('/' + version + '/account-creation/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/account-creation/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/account-creation/addressmanual', function (req, res) {
    clearvalidation(req);
    var orgaddressMLine1 = req.session.data['orgaddressMLine1']
    var orgaddressMTown = req.session.data['orgaddressMTown']
    var orgaddressMCounty = req.session.data['orgaddressMCounty']
    var orgaddressMCountry = req.session.data['orgaddressMCountry']
    var accounttype = req.session.data['accounttype']

    var orgaddressMPostcode = req.session.data['orgaddressMPostcode']


    if (!orgaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressMLine1 = {
            "anchor": "orgaddressMLine1",
            "message": "Enter the street address",
        }
    }


    if (!orgaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressMTown = {
            "anchor": "orgaddressMTown",
            "message": "Enter the town or city",
        }
    }

    if (!orgaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgaddressMPostcode = {
            "anchor": "orgaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/addressmanual', {
            data: req.session.data
        });
    }

    else {
        if (accounttype == "Overseas organisation") {
            req.session.data.orgaddressSelect = orgaddressMLine1 + ', ' + orgaddressMTown + ', ' + orgaddressMPostcode + ', ' + orgaddressMCountry
        } else {
            req.session.data.orgaddressSelect = orgaddressMLine1 + ', ' + orgaddressMTown + ', ' + orgaddressMCounty + ', ' + orgaddressMPostcode
        }

        
            res.redirect('/' + version + '/account-creation/company-confirm');
    }
});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Register a Heat Network ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Cancel
router.get('/' + version + '/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    req.session.data['cancels'] = "";
    
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/introduction/cancel', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    var cancels = req.session.data['cancels']

    if (!cancels) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.cancels = {
            "anchor": "cancels",
            "message": "Select whether you wish to cancel"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/cancel', {
            data: req.session.data
        });
    }

    else {
        if (cancels == "Yes") {
            res.redirect('/' + version + '/account-information');
        } else {
            res.redirect(backURL);
        }
    }

});



// Add Heat Network - Intro

// Introduction - Relevant
router.get('/' + version + '/add-heat-network/introduction/relevant', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/relevant', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/relevant', function (req, res) {
    clearvalidation(req);
    var introrelevant = req.session.data['introrelevant']

    if (!introrelevant) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introrelevant = {
            "anchor": "introrelevant",
            "message": "Select whether the heat network is a relevant heat network"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/relevant', {
            data: req.session.data
        });
    }

    else {
        if (introrelevant == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/include');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout');
 
        }
    }
});




// Introduction - Role
router.get('/' + version + '/add-heat-network/introduction/role', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/role', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/role', function (req, res) {
    clearvalidation(req);
    var role = req.session.data['role']

    if (!role) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.role = {
            "anchor": "role",
            "message": "Select an activity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/role', {
            data: req.session.data
        });
    }

    else {
        if (role == "Heat supplier") {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout-supplier');

        }

        else {
            res.redirect('/' + version + '/account-information');

        }
    }
});

// Introduction - Suppliers
router.get('/' + version + '/add-heat-network/introduction/suppliers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/suppliers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/suppliers', function (req, res) {
    clearvalidation(req);
    var introsuppliers = req.session.data['introsuppliers']

    if (!introsuppliers) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsuppliers = {
            "anchor": "introsuppliers",
            "message": "Enter the number of suppliers"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/suppliers', {
            data: req.session.data
        });
    }
    else {
            res.redirect(301, '/' + version + '/add-heat-network/introduction/supply');
        
    }
});


// Introduction - Only
router.get('/' + version + '/add-heat-network/introduction/only', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/only', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/only', function (req, res) {
    clearvalidation(req);
    var introonly = req.session.data['introonly']
    var role = req.session.data['role']

    if (!introonly) {
        req.session.data.validationError = "true"
            req.session.data.validationErrors.introonly = {
                "anchor": "introonly",
                "message": "Select whether you are the only operator"
            }
        }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/only', {
            data: req.session.data
        });
    }

    else {
        if (introonly == "Yes") {
            if (role != "Network operator") {
                res.redirect('/' + version + '/add-heat-network/introduction/onlysupply');
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/suppliers');
            }
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout');
 
        }
    }
});

// Introduction - Only supplier
router.get('/' + version + '/add-heat-network/introduction/onlysupply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/onlysupply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/onlysupply', function (req, res) {
    clearvalidation(req);
    var introonlysupply = req.session.data['introonlysupply']
    var role = req.session.data['role']

    if (!introonlysupply) {
        req.session.data.validationError = "true"
            req.session.data.validationErrors.introonlysupply = {
                "anchor": "introonlysupply",
                "message": "Select whether you are the only supplier"
            }
        }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/onlysupply', {
            data: req.session.data
        });
    }

    else {
        if (introonlysupply == "Yes") {
                res.redirect('/' + version + '/add-heat-network/introduction/supply');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/suppliers');
 
        }
    }
});





// Introduction - Supply
router.get('/' + version + '/add-heat-network/introduction/supply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supply', function (req, res) {
clearvalidation(req);
var introsupply = req.session.data['introsupply']

if (!introsupply) {
    req.session.data.validationError = "true"
    req.session.data.validationErrors.introsupply = {
        "anchor": "introsupply",
        "message": "Error text"
    }
}

if (req.session.data.validationError == "true") {
    res.render('/' + version + '/add-heat-network/introduction/supply', {
        data: req.session.data
    });
}

else {
    if (introsupply == "Yes") {
        res.redirect('/' + version + '/add-heat-network/introduction/supply20');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/commissioned');
    }
}
});



// Introduction - Commissioned
router.get('/' + version + '/add-heat-network/introduction/commissioned', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/commissioned', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/commissioned', function (req, res) {
clearvalidation(req);
var introcommissioned = req.session.data['introcommissioned']

if (!introcommissioned) {
    req.session.data.validationError = "true"
    req.session.data.validationErrors.introcommissioned = {
        "anchor": "introcommissioned",
        "message": "Select whther the heat network will be commissioned"
    }
}

if (req.session.data.validationError == "true") {
    res.render('/' + version + '/add-heat-network/introduction/commissioned', {
        data: req.session.data
    });
}

else {
    if (introcommissioned == "Yes") {
        res.redirect('/' + version + '/add-heat-network/introduction/changes');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/changes');
    }
}
});


// Introduction - Supply 20 years
router.get('/' + version + '/add-heat-network/introduction/supply20', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supply20', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supply20', function (req, res) {
clearvalidation(req);
var introsupply20 = req.session.data['introsupply20']

if (!introsupply20) {
    req.session.data.validationError = "true"
    req.session.data.validationErrors.introsupply20 = {
        "anchor": "introsupply20",
        "message": "Select an option"
    }
}

if (req.session.data.validationError == "true") {
    res.render('/' + version + '/add-heat-network/introduction/supply20', {
        data: req.session.data
    });
}

else {
    if (introsupply20 == "Yes") {
        res.redirect('/' + version + '/add-heat-network/introduction/supplywhen');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/supplydecade');
    }
}
});

// Introduction - Supply when
router.get('/' + version + '/add-heat-network/introduction/supplywhen', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplywhen', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supplywhen', function (req, res) {
    clearvalidation(req);
    var supplywhen = req.session.data['supplywhen']

    if (!supplywhen) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplywhen = {
            "anchor": "supplywhen",
            "message": "Enter a year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/supplywhen', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/changes');
    }
});


// Introduction - Supply decade
router.get('/' + version + '/add-heat-network/introduction/supplydecade', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplydecade', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supplydecade', function (req, res) {
    clearvalidation(req);
    var introsupplydecade = req.session.data['introsupplydecade']

    if (!introsupplydecade) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsupplydecade = {
            "anchor": "introsupplydecade",
            "message": "Select a decade"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/supplydecade', {
            data: req.session.data
        });
    }
    else {
        req.session.data.supplywhen = introsupplydecade;
        res.redirect('/' + version + '/add-heat-network/introduction/changes');
    }
});


// Introduction - How many
router.get('/' + version + '/add-heat-network/introduction/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/howmany', function (req, res) {
    clearvalidation(req);
    var buildings = req.session.data['buildings']


    if (!buildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildings = {
            "anchor": "buildings",
            "message": "Enter the number of buildings"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/howmany', {
            data: req.session.data
        });
    }


    else {
        if (buildings == 1) {
            res.redirect(301, '/' + version + '/add-heat-network/introduction/name');
        }
        else {
            res.redirect(301, '/' + version + '/add-heat-network/introduction/selfsupply');
        }
    }

});

// Introduction - Sharedfacilities
router.get('/' + version + '/add-heat-network/introduction/sharedfacilities', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/sharedfacilities', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/sharedfacilities', function (req, res) {
    clearvalidation(req);
    var sharedfacilities = req.session.data['sharedfacilities']
    var sharednumnber = parseInt(req.session.data['sharedfacilitieshowmany'])
    var buildings = parseInt(req.session.data['buildings'])


    if (!sharedfacilities) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.sharedfacilities = {
            "anchor": "sharedfacilities",
            "message": "Select if there are any shared facilities"
        }
    }
    if (buildings > 1) {
        if (sharedfacilities == "Yes" && !sharednumnber)  {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.sharedfacilitieshowmany = {
                "anchor": "sharedfacilitieshowmany",
                "message": "Enter the number of buildings with shared facilities"
            }
        }
    
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/sharedfacilities', {
            data: req.session.data
        });
    }

    else {
        if (sharedfacilities == "Yes") {
            if (sharednumnber) {
                if (sharednumnber >= buildings) {
                    res.redirect('/' + version + '/add-heat-network/introduction/dropout');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/introduction/selfsupply');
                }    
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/dropout');
            }
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/name');
        }
    }

});

// Introduction - Selfsupply
router.get('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    var selfsupply = req.session.data['selfsupply']

    if (!selfsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.selfsupply = {
            "anchor": "selfsupply",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/name');
    }

});

// Introduction - Name
router.get('/' + version + '/add-heat-network/introduction/name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/name', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/name', function (req, res) {
    clearvalidation(req);
    var name = req.session.data['name']

    if (!name) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.name = {
            "anchor": "name",
            "message": "Enter a name",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/name', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/cya');

    }
});

// Intro - cya
router.get('/' + version + '/add-heat-network/introduction/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/introduction/cya', {
        data: req.session.data
    });
    introcomplete = req.session.data['introcomplete']

});


router.post('/' + version + '/add-heat-network/introduction/cya', function (req, res) {

    if (introcomplete == "true") {
        res.redirect('/' + version + '/add-heat-network/confirmchange');
    } else {
        res.redirect('/' + version + '/add-heat-network/introduction/moreinfo');
    }

});


// Confirm changes
router.get('/' + version + '/add-heat-network/confirmchange', function (req, res) {
    clearvalidation(req);
    req.session.data['confirmchange'] = "";
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/confirmchange', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/confirmchange', function (req, res) {
    clearvalidation(req);
    var confirmchange = req.session.data['confirmchange']

    if (!confirmchange) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.confirmchange = {
            "anchor": "confirmchange",
            "message": "Confirm whether you wish to make these changes"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/confirmchange', {
            data: req.session.data
        });
    }

    else {
        if (confirmchange == "Yes") {
            res.redirect('/' + version + '/add-heat-network/tasklist');
        } else {
            res.redirect(backURL);
        }
    }

});




// Energy centre - Address
router.get('/' + version + '/add-heat-network/energycentre/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['ecaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddressPostcode = {
            "anchor": "ecaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    function validateUKPostcode(postcode) {
        const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
        return postcodeRegex.test(postcode);
      }

    if (!validateUKPostcode(userpostcode)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddressPostcode = {
            "anchor": "ecaddressPostcode",
            "message": "Enter a valid postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/address', {
            data: req.session.data
        });
    }

    else {


        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

        async function postcode(postcode) {
            axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                .then(function (response) {
                    var output = JSON.stringify(response.data, null, 2);
                    let parsed = JSON.parse(output).results;
                    let locationaddresses = [];
                    if (parsed != undefined) {

                        for (var i = 0; i < parsed.length; i++) {
                            let obj = parsed[i];
                            locationaddresses.push(obj.LPI.ADDRESS);
                        }
                        req.session.data.ecAddressSelect = locationaddresses;
                        req.session.data.ecorgaddressesnotfound = "";
                        res.redirect('/' + version + '/add-heat-network/energycentre/addressselect');
                    }

                    else {
                        req.session.data.ecAddressSelect = locationaddresses;
                        req.session.data.ecaddressesnotfound = true;
                        res.redirect('/' + version + '/add-heat-network/energycentre/addressmanual');
                    }

                });

        }
        postcode(userpostcode);

    }
});







// Energy center - Address select
router.get('/' + version + '/add-heat-network/energycentre/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/addressselect', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['ecaddressSelected']

    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddressSelected = {
            "anchor": "ecAddressSelectRadios",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.ecAddress = req.session.data['ecaddressSelected']
        res.redirect('/' + version + '/add-heat-network/energycentre/addressconfirm');

    }
});

// Energy centre - Address confirm
router.get('/' + version + '/add-heat-network/energycentre/addressconfirm', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/addressconfirm', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/energycentre/addressconfirm', function (req, res) {
        res.redirect('/' + version + '/add-heat-network/energycentre/type');
});


// Energy centre - Address manual
router.get('/' + version + '/add-heat-network/energycentre/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/addressmanual', {
        data: req.session.data
    });
});




// Energy Centre - Type
router.get('/' + version + '/add-heat-network/energycentre/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/type', function (req, res) {
    clearvalidation(req);
    var services = req.session.data['service']

    if (!services) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.services = {
            "anchor": "services",
            "message": "Select a thermal energy type",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/type', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/capacity');

    }

});
// Energy centre - Capacity
router.get('/' + version + '/add-heat-network/energycentre/capacity', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/capacity', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/capacity', function (req, res) {
    clearvalidation(req);
    var techcapacity = req.session.data['techcapacity']

    if (!techcapacity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techcapacity = {
            "anchor": "techcapacity",
            "message": "Enter a capcity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/capacity', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/storage');
    }
});


// Energy centre - storage
router.get('/' + version + '/add-heat-network/energycentre/storage', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/storage', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/storage', function (req, res) {
    clearvalidation(req);
    var techstorage = req.session.data['techstorage']


    if (!techstorage) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techstorage = {
            "anchor": "techstorage",
            "message": "Select if the system is capable of thermal storage"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/storage', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/electricity');
    }

});

// Energy centre - electricity
router.get('/' + version + '/add-heat-network/energycentre/electricity', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/electricity', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/electricity', function (req, res) {
    clearvalidation(req);
    var techelectricity = req.session.data['techelectricity']


    if (!techelectricity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techelectricity = {
            "anchor": "techelectricity",
            "message": "Select if the system is capable of thermal electricity"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/electricity', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/technology');
    }

});







// Energy centre - technology
router.get('/' + version + '/add-heat-network/energycentre/technology', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/technology', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/technology', function (req, res) {
    clearvalidation(req);
    var techtechnology = req.session.data['techtechnology']
    var techtechnologyother = req.session.data['techtechnologyother']


    if (!techtechnology) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techtechnology = {
            "anchor": "techtechnology",
            "message": "Select a technology"
        }
    }

    if (techtechnology == "Other" && !techtechnologyother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techtechnologyother = {
            "anchor": "techtechnologyother",
            "message": "Enter a technology name"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/technology', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/energysource');
    }
});



// Energy centre - energysource
router.get('/' + version + '/add-heat-network/energycentre/energysource', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/energysource', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/energysource', function (req, res) {
    clearvalidation(req);
    var techenergysource = req.session.data['techenergysource']
    var techenergysourceother = req.session.data['techenergysourceother']


    if (!techenergysource) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techenergysource = {
            "anchor": "techenergysource",
            "message": "Select an energy source"
        }
    }

    if (techenergysource == "Other" && !techenergysourceother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techenergysourceother = {
            "anchor": "techenergysourceother",
            "message": "Enter an energy source name"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/energysource', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/when');
    }
});

// Energy centre when
router.get('/' + version + '/add-heat-network/energycentre/when', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/when', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/when', function (req, res) {
    clearvalidation(req);

        res.redirect('/' + version + '/add-heat-network/energycentre/summary');
});

// Energy centre - summary
router.get('/' + version + '/add-heat-network/energycentre/summary', function (req, res) {
    clearvalidation(req);


    res.render('/' + version + '/add-heat-network/energycentre/summary', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/energycentre/summary', function (req, res) {
    clearvalidation(req);
    var techsummaryother = req.session.data['techsummaryother']

    if (!techsummaryother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techsummaryother = {
            "anchor": "techsummaryother",
            "message": "Select an option"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/summary', {
            data: req.session.data
        });
    }

    else {
        req.session.data.technologies = req.session.data.technologies || []
        req.session.data.technologies.push([
            req.session.data['techtechnology'] || req.session.data['technologyother'],
            req.session.data['techenergysource'] || req.session.data['techenergysourceother'],
            req.session.data['techwhenyear']]
        )

        if (techsummaryother == "No") {
            res.redirect('/' + version + '/add-heat-network/energycentre/another');
        } else {
            req.session.data['techtechnology'] = "";
            req.session.data['technologyother'] = "";
            req.session.data['techenergysource'] = "";
            req.session.data['techenergysourceother'] = "";
            req.session.data['techwhenyear'] = "";

            res.redirect('/' + version + '/add-heat-network/energycentre/technology');
        }

    }

});


// Energy centre - Another
router.get('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/another', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
    clearvalidation(req);
    var techanother = req.session.data['techanother']


    if (!techanother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techanother = {
            "anchor": "techanother",
            "message": "Select if the system is capable of thermal electricity"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/another', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/cya');
    }

});

// Energy centre - cya
router.get('/' + version + '/add-heat-network/energycentre/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/energycentre/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/energycentre/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



// Buildings & consumers - Buildings
router.get('/' + version + '/add-heat-network/buildingsandconsumers/buildings', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildings', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/buildings', function (req, res) {
    clearvalidation(req);
    var buildingaddressPostcode = req.session.data['buildingaddressPostcode']
    var buildingType = req.session.data['buildingtype']
    var commercialcustomers = req.session.data['buildingaddressCustomersCommercial']

    if (!buildingaddressPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildings = {
            "anchor": "buildings",
            "message": "Fill in all address information before continuing",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildings', {
            data: req.session.data
        });
    }
    else {
        if (buildingType == "Commercial" | commercialcustomers >= 1) {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
        }
        else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/agent');
        }
    }
});


// Buildings & consumers - Address
router.get('/' + version + '/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['buildingaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");
    var usernumber = req.session.data['buildingaddressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    function validateUKPostcode(postcode) {
        const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
      
        return postcodeRegex.test(postcode);
      }

    if (!validateUKPostcode(userpostcode)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a valid postcode",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

            async function find(postcode, number) {
                axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&minmatch=0.4&query=' + number + ',' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                    .then(function (response) {
                        var output = JSON.stringify(response.data, null, 2);
                        let parsed = JSON.parse(output).results;
                        let locationaddresses = [];

                        if (parsed != undefined) {
                            for (var i = 0; i < parsed.length; i++) {
                                let obj = parsed[i];
                                locationaddresses.push(obj.LPI.ADDRESS);
                            }

                            req.session.data.buildinglocationAddress = locationaddresses;
                            req.session.data.buildinglocationAddressSelect = [];
                            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm');
                        }
                        else {
                            async function postcode(postcode) {
                                axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                                    .then(function (response) {
                                        var output = JSON.stringify(response.data, null, 2);
                                        let parsed = JSON.parse(output).results;
                                        let locationaddresses = [];

                                        if (parsed != undefined) {
                                            for (var i = 0; i < parsed.length; i++) {
                                                let obj = parsed[i];
                                                locationaddresses.push(obj.LPI.ADDRESS);
                                            }
    
                                            req.session.data.buildinglocationAddressSelect = locationaddresses;
                                            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressselect');
                                            }

                                        else {
                                            req.session.data.validationError = "true"
                                            req.session.data.validationErrors.buildingaddressPostcode = {
                                                "anchor": "buildingaddressPostcode",
                                                "message": "Enter a valid postcode",
                                            }
                                    
                                            res.render('/' + version + '/add-heat-network/buildingsandconsumers/address', {
                                                data: req.session.data
                                            });
                                        }


                                    });

                            }
                            postcode(userpostcode);

                        }
                    });
            }

            find(userpostcode, usernumber)

        }


});


// Buildings & consumers - Address select
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['buildingaddressSelect']
    var buildings = req.session.data['buildings']
    var role = req.session.data['role']



    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressSelect = {
            "anchor": "buildingaddressSelect",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = req.session.data['buildingaddressSelect']

        if (buildings > 1) {
            if (role == "Network operator"){
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
            }

            else if (role != "Heat supplier"){
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/type');
            }
    
        }
        else {
            if (role == "Network operator"){
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
            }
            
            else {
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/type');
            }    
    
        }
    }
});


// Buildings & consumers - Contract
router.get('/' + version + '/add-heat-network/buildingsandconsumers/contract', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/contract', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/contract', function (req, res) {
    clearvalidation(req);
    var buildingcontract = req.session.data['buildingcontract']


    if (!buildingcontract) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingcontract = {
            "anchor": "buildingcontract",
            "message": "Select if you have a contract to supply thermal energy"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/contract', {
            data: req.session.data
        });
    }

    else {
        if (buildingcontract == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/type');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
        }
    }

});


// Buildings & consumers - Address manual
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', function (req, res) {
    clearvalidation(req);
    var buildingaddressMLine1 = req.session.data['buildingaddressMLine1']
    var buildingaddressMLine2 = req.session.data['buildingaddressMLine2']
    var buildingaddressMTown = req.session.data['buildingaddressMTown']
    var buildingaddressMCounty = req.session.data['buildingaddressMCounty']

    var buildingaddressMPostcode = req.session.data['buildingaddressMPostcode']
    var buildings = req.session.data['buildings']


    if (!buildingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMLine1 = {
            "anchor": "buildingaddressMLine1",
            "message": "Enter the first line of the address",
        }
    }


    if (!buildingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMTown = {
            "anchor": "buildingaddressMTown",
            "message": "Enter a town or city",
        }
    }

    if (!buildingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMPostcode = {
            "anchor": "buildingaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = buildingaddressMLine1 + ', ' + buildingaddressMLine2 + ', ' + buildingaddressMTown + ', ' + buildingaddressMCounty + ', ' + buildingaddressMPostcode

        if ((buildings > 1) && (role == "Network operator")){
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
        }
        else if ((buildings = 1) && (role == "Network operator")){
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
        }

        else if ((buildings > 1) && (role != "Heat supplier")){
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/contract');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/type');
        }  
    }
});


// Buildings & consumers - Type
router.get('/' + version + '/add-heat-network/buildingsandconsumers/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/type', function (req, res) {
    clearvalidation(req);

    var buildingtype = req.session.data['buildingtype']
    req.session.data['buildingtypealt'] = req.session.data['buildingtype']

    if (!buildingtype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingtype = {
            "anchor": "buildingtype",
            "message": "Select a type of building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/type', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers');
    }
});


// Buildings & consumers - Class
router.get('/' + version + '/add-heat-network/buildingsandconsumers/class', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/class', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/class', function (req, res) {
    clearvalidation(req);

    var buildingclass = req.session.data['buildingclass']

    if (!buildingclass) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingclass = {
            "anchor": "buildingclass",
            "message": "Select a class of building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/class', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers');
    }
});


// Buildings & consumers - Address customers
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
    clearvalidation(req);
    var addresscustomers = req.session.data['buildingaddressCustomers']
    var addresscustomersResidential = req.session.data['buildingaddressCustomersResidential']
    var addresscustomersCommercial = req.session.data['buildingaddressCustomersCommercial']
    var addresscustomersIndustrial = req.session.data['buildingaddressCustomersIndustrial']
    var addresscustomersPublic = req.session.data['buildingaddressCustomersPublic']


    var buildingtype = req.session.data['buildingtype']

    var buildings = req.session.data['buildings']

    if (buildingtype == "Mixed0use") {
        if (!addresscustomersResidential && !addresscustomersCommercial) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildingaddressCustomersResidential = {
                "anchor": "buildingaddressCustomersResidential",
                "message": "Enter the number of customers",
            }
        }

    
    
        if (req.session.data.validationError == "true") {
            res.render('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', {
                data: req.session.data
            });
        }
    
        else {
            req.session.data['buildingaddressCustomers'] = Number(addresscustomersResidential) + Number(addresscustomersCommercial) + Number(addresscustomersIndustrial) + Number(addresscustomersPublic)
            if (buildings > 1){
                if (addresscustomersResidential >= 1) {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
                }
            }
            else {
                if (addresscustomersCommercial >= 1) {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
                }   
            }
    
        }
    }

    else {
        if (!addresscustomers) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildingaddressCustomers = {
                "anchor": "buildingaddressCustomers",
                "message": "Enter the number of final customers",
            }
        }
    
    
        if (req.session.data.validationError == "true") {
            res.render('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', {
                data: req.session.data
            });
        }
    
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/metering');


            // if (buildings > 1){
            //     if (buildingtype == "Residential" ) {
            //         res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities');
            //     }
            //     else {
            //         res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
            //     }            }
            // else {
            //     if (buildingtype == "Commercial" | addresscustomersCommercial >= 1) {
            //         res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
            //     }
            //     else {
            //         res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
            //     }   
            // }
    
    
        }
    
    }
});

// Buildings & consumers -  Metering
router.get('/' + version + '/add-heat-network/buildingsandconsumers/metering', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/metering', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/metering', function (req, res) {
    clearvalidation(req);
    var meteringregulations = req.session.data['meteringregulations']

    if (!meteringregulations) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringregulations = {
            "anchor": "meteringregulations",
            "message": "Select whether the heat network is exempt from metering regulations",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/metering', {
            data: req.session.data
        });
    }

    else {
        if (meteringregulations == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/meteringreason');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter');
        }



    }
});


// Buildings & consumers -  Final customer meters
router.get('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters', function (req, res) {
    clearvalidation(req);
    var finalconsumermeters = req.session.data['finalconsumermeters']
    var finalconsumermetersnumber = req.session.data['finalconsumermetersnumber']


    if (!finalconsumermeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.finalconsumermeters = {
            "anchor": "finalconsumermeters",
            "message": "Select whether any dwellings have final consumer meters",
        }
    }

    if (finalconsumermeters == "Yes" && !finalconsumermetersnumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.finalconsumermetersnumber = {
            "anchor": "finalconsumermetersnumber",
            "message": "Enter how many dwellings have final consumer meters",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators');
    }
});



// Buildings & consumers -  Heat cost allocators
router.get('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators', function (req, res) {
    clearvalidation(req);
    var heatcostallocators = req.session.data['heatcostallocators']
    var heatcostallocatorsnumber = req.session.data['heatcostallocatorsnumber']


    if (!heatcostallocators) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.heatcostallocators = {
            "anchor": "heatcostallocators",
            "message": "Select whether any dwellings have heat cost allocators",
        }
    }

    if (heatcostallocators == "Yes" && !heatcostallocatorsnumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.heatcostallocatorsnumber = {
            "anchor": "heatcostallocatorsnumber",
            "message": "Enter how many dwellings have heat cost allocators",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters');
    }
});

// Buildings & consumers -  Pre payment meters
router.get('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters', function (req, res) {
    clearvalidation(req);
    var prepaymentmeters = req.session.data['prepaymentmeters']
    var prepaymentmetersnumber = req.session.data['prepaymentmetersnumber']


    if (!prepaymentmeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.prepaymentmeters = {
            "anchor": "prepaymentmeters",
            "message": "Select whether any dwellings have pre-payment meters",
        }
    }

    if (prepaymentmeters == "Yes" && !prepaymentmetersnumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.prepaymentmetersnumber = {
            "anchor": "prepaymentmetersnumber",
            "message": "Enter how many dwellings have pre-payment meters",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/smartdisplaymeters');
    }
});


// Buildings & consumers -  Smart display meters
router.get('/' + version + '/add-heat-network/buildingsandconsumers/smartdisplaymeters', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/smartdisplaymeters', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/smartdisplaymeters', function (req, res) {
    clearvalidation(req);
    var smartdisplaymeters = req.session.data['smartdisplaymeters']
    var smartdisplaymetersnumber = req.session.data['smartdisplaymetersnumber']


    if (!smartdisplaymeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smartdisplaymeters = {
            "anchor": "smartdisplaymeters",
            "message": "Select whether any dwellings have smart display meters",
        }
    }

    if (smartdisplaymeters == "Yes" && !smartdisplaymetersnumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smartdisplaymetersnumber = {
            "anchor": "smartdisplaymetersnumber",
            "message": "Enter how many dwellings have smart display meters",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/smartdisplaymeters', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
    }
});

// Buildings & consumers -  Building level meters
router.get('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter', function (req, res) {
    clearvalidation(req);
    var buildinglevelmeter = req.session.data['buildinglevelmeter']

    if (!buildinglevelmeter) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildinglevelmeter = {
            "anchor": "buildinglevelmeter",
            "message": "Select whether the building has a building-level meter",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters');
    }
});



// Buildings & consumers -  Metering reason
router.get('/' + version + '/add-heat-network/buildingsandconsumers/meteringreason', function (req, res) {
    clearvalidation(req);

    
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/meteringreason', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/meteringreason', function (req, res) {
    var addresscustomersCommercial = req.session.data['buildingaddressCustomersCommercial']

    var buildingtype = req.session.data['buildingtype']

    var buildings = req.session.data['buildings']

    clearvalidation(req);
    var meteringregulations = req.session.data['meteringregulations']

    if (!meteringregulations) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringregulations = {
            "anchor": "meteringregulations",
            "message": "Select whether the heat network supplies metering",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/meteringreason', {
            data: req.session.data
        });
    }

    else {
            if (buildings > 1){

                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
        }
            else {
                if (buildingtype == "Commercial" | addresscustomersCommercial >= 1) {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
                }   
            }
    }
});


// Buildings & consumers -  Microbusinesses
router.get('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses', function (req, res) {
    clearvalidation(req);
    var consumertypemicrobusiness = req.session.data['consumertypemicrobusiness']

    if (!consumertypemicrobusiness) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumertypemicrobusiness = {
            "anchor": "consumertypemicrobusiness",
            "message": "Select whether the heat network supplies microbusinesses",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/smallmediumbusinesses');

    }
});



// Buildings & consumers -  Small medium businesses
router.get('/' + version + '/add-heat-network/buildingsandconsumers/smallmediumbusinesses', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/smallmediumbusinesses', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/smallmediumbusinesses', function (req, res) {
    clearvalidation(req);
    var smallmediumbusinesses = req.session.data['smallmediumbusinesses']

    if (!smallmediumbusinesses) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smallmediumbusinesses = {
            "anchor": "smallmediumbusinesses",
            "message": "Select whether the heat network supplies smallmediumbusinesses",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/smallmediumbusinesses', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/agent');

    }
});

// Metering - agent
router.get('/' + version + '/add-heat-network/buildingsandconsumers/agent', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/agent', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/agent', function (req, res) {
    clearvalidation(req);
    var meteringagent = req.session.data['meteringagent']

    if (!meteringagent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagent = {
            "anchor": "meteringagent",
            "message": "Select whether you use a metering agent",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/agent', {
            data: req.session.data
        });
    }
    else {
        if (meteringagent == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/agent-name');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
        }

    }
});

// Metering - agent name
router.get('/' + version + '/add-heat-network/buildingsandconsumers/agent-name', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/agent-name', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/agent-name', function (req, res) {
    clearvalidation(req);
    var meteringagentname = req.session.data['meteringagentname']

    if (!meteringagentname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagentname = {
            "anchor": "meteringagentname",
            "message": "Enter a metering agent name",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/agent-name', {
            data: req.session.data
        });
    }
    else {

            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');


    }
});



// Buildings & consumers - cya
router.get('/' + version + '/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});










// Metering - Viable
router.get('/' + version + '/add-heat-network/metering/viable', function (req, res) {
    clearvalidation(req);

        res.render('/' + version + '/add-heat-network/metering/viable', {
            data: req.session.data
        });

});


router.post('/' + version + '/add-heat-network/metering/viable', function (req, res) {
    clearvalidation(req);
    var buildingclass = req.session.data['buildingclass']
    var meteringmeters = req.session.data['meteringmeters']


    if (!meteringmeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringmeters = {
            "anchor": "meteringmeters",
            "message": "Enter the number of meters",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/viable', {
            data: req.session.data
        });
    }
    else { 

        if (buildingclass.includes("Open")) {
            res.redirect('/' + version + '/add-heat-network/metering/open');
        }

        else if (buildingclass.includes("Exempt")) {
            res.redirect('/' + version + '/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
        }
    }
});


// Metering - Open
router.get('/' + version + '/add-heat-network/metering/open', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/open', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/open', function (req, res) {
    clearvalidation(req);
    var buildingclass = req.session.data['buildingclass']
    var meteringopen1 = req.session.data['meteringopen1']
    var meteringopen2 = req.session.data['meteringopen2']
    var meteringopen3 = req.session.data['meteringopen3']

    if (!meteringopen1 | !meteringopen2 | !meteringopen3) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringopen = {
            "anchor": "meteringopen",
            "message": "Enter all information about open class buildings",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/open', {
            data: req.session.data
        });
    }
    else {

        if (buildingclass.includes("Exempt")) {
            res.redirect('/' + version + '/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
        }
    }
});


// Metering - Exempt
router.get('/' + version + '/add-heat-network/metering/exempt', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/exempt', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/exempt', function (req, res) {
    clearvalidation(req);
    var meteringexempt = req.session.data['meteringexempt']

    if (!meteringexempt) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringexempt = {
            "anchor": "meteringexempt",
            "message": "Enter why some buildings on the heat network are in the exempt class",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/exempt', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
    }
});

// Metering - Smart
router.get('/' + version + '/add-heat-network/metering/smart', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/smart', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/smart', function (req, res) {
    clearvalidation(req);
    var meteringsmart = req.session.data['meteringsmart']

    if (!meteringsmart) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringsmart = {
            "anchor": "meteringsmart",
            "message": "Select whether smart pre-payment meters are available",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/smart', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/electrical');
    }
});

// Metering - electrical
router.get('/' + version + '/add-heat-network/metering/electrical', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/electrical', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/electrical', function (req, res) {
    clearvalidation(req);
    var meteringelectrical = req.session.data['meteringelectrical']

    if (!meteringelectrical) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringelectrical = {
            "anchor": "meteringelectrical",
            "message": "Select whether electrical sub-metering is available",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/electrical', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/cya');
    }
});


// Metering - type
router.get('/' + version + '/add-heat-network/metering/type-check', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/type-check', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/type-check', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']


    if (metertype.includes("Building level meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/level');
    }

    else if (metertype.includes("Final consumer meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/consumer');
    }

    else if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});

// Metering - level
router.get('/' + version + '/add-heat-network/metering/level', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/level', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/level', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']

    if (metertype.includes("Final consumer meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/consumer');
    }

    else if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});


// Metering - consumer
router.get('/' + version + '/add-heat-network/metering/consumer', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/consumer', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/consumer', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']

    if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});

// Metering - cost
router.get('/' + version + '/add-heat-network/metering/cost', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/cost', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/cost', function (req, res) {
    clearvalidation(req);

        res.redirect('/' + version + '/add-heat-network/metering/smart');
});

// Metering - agent
router.get('/' + version + '/add-heat-network/metering/agent', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/agent', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/agent', function (req, res) {
    clearvalidation(req);
    var meteringagent = req.session.data['meteringagent']

    if (!meteringagent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagent = {
            "anchor": "meteringagent",
            "message": "Select whether you use a metering agent",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/agent', {
            data: req.session.data
        });
    }
    else {
        if (meteringagent == "Yes") {
            res.redirect('/' + version + '/add-heat-network/metering/agent-name');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/metering/type-check');
        }

    }
});

// Metering - agent name
router.get('/' + version + '/add-heat-network/metering/agent-name', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/agent-name', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/agent-name', function (req, res) {
    clearvalidation(req);
    var meteringagentname = req.session.data['meteringagentname']

    if (!meteringagentname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagentname = {
            "anchor": "meteringagentname",
            "message": "Enter a metering agent name",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/agent-name', {
            data: req.session.data
        });
    }
    else {

            res.redirect('/' + version + '/add-heat-network/metering/type-check');


    }
});


// Metering - cya
router.get('/' + version + '/add-heat-network/metering/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/metering/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/metering/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});







// Billing - often
router.get('/' + version + '/add-heat-network/billing/often', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/often', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/often', function (req, res) {
    clearvalidation(req);
    var billingoften = req.session.data['billingoften']

    if (!billingoften) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingoften = {
            "anchor": "billingoften",
            "message": "Select how often you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/often', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/calculated');
    }
});


// Billing - calculated
router.get('/' + version + '/add-heat-network/billing/calculated', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/calculated', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/calculated', function (req, res) {
    clearvalidation(req);
    var billingcalculated = req.session.data['billingcalculated']

    if (!billingcalculated) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingcalculated = {
            "anchor": "billingcalculated",
            "message": "Select how calculated you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/calculated', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/compare');
    }
});


// Billing - compare
router.get('/' + version + '/add-heat-network/billing/compare', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/compare', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/compare', function (req, res) {
    clearvalidation(req);
    var billingcompare = req.session.data['billingcompare']

    if (!billingcompare) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingcompare = {
            "anchor": "billingcompare",
            "message": "Select how compare you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/compare', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/otherinfo');
    }
});

// Billing - available
router.get('/' + version + '/add-heat-network/billing/available', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/available', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/available', function (req, res) {
    clearvalidation(req);
    var billingavailable = req.session.data['billingavailable']

    if (!billingavailable) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingavailable = {
            "anchor": "billingavailable",
            "message": "Select at least one option",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/available', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/cya');
    }
});

// Billing - other info
router.get('/' + version + '/add-heat-network/billing/otherinfo', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/otherinfo', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/otherinfo', function (req, res) {
    clearvalidation(req);
    var billinginfo = req.session.data['billinginfo']

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
        res.redirect('/' + version + '/add-heat-network/billing/cya');
//    }
});


// Billing - cya
router.get('/' + version + '/add-heat-network/billing/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/billing/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/billing/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});





// Financial - plan
router.get('/' + version + '/add-heat-network/financial/plan', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/financial/plan', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/financial/plan', function (req, res) {
    clearvalidation(req);
    var financialplan = req.session.data['financialplan']

    if (!financialplan) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialplan = {
            "anchor": "financialplan",
            "message": "Tell us whether you have a continuity plan in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/financial/plan', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/financial/arrangement');
    }
});

// Financial - arrangement
router.get('/' + version + '/add-heat-network/financial/arrangement', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/financial/arrangement', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/financial/arrangement', function (req, res) {
    clearvalidation(req);
    var financialarrangement = req.session.data['financialarrangement']

    if (!financialarrangement) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialarrangement = {
            "anchor": "financialarrangement",
            "message": "Tell us whether you have a continuity arrangement in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/financial/arrangement', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/financial/cya');
    }
});

// Financial - cya
router.get('/' + version + '/add-heat-network/financial/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/financial/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/financial/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});




// Consumer - vulnerable
router.get('/' + version + '/add-heat-network/consumerprotections/vulnerable', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/consumerprotections/vulnerable', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/consumerprotections/vulnerable', function (req, res) {
    clearvalidation(req);
    var consumervulnerable = req.session.data['consumervulnerable']
    var consumervulnerableammount = req.session.data['consumervulnerableammount']

    if (!consumervulnerable) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumervulnerable = {
            "anchor": "consumervulnerable",
            "message": "Tell us whether the heat network supply vulnerable customers",
        }
    }

    if (consumervulnerable == "Yes" && !consumervulnerableammount) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumervulnerableammount = {
            "anchor": "consumervulnerableammount",
            "message": "Enter the total number of vulnerable customer",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/vulnerable', {
            data: req.session.data
        });
    }
    else {
        if (consumervulnerable == "Yes") {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/psr');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/confirm');
        }
    }
});


// Consumer - psr
router.get('/' + version + '/add-heat-network/consumerprotections/psr', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/consumerprotections/psr', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/consumerprotections/psr', function (req, res) {
    clearvalidation(req);
    var consumerpsr = req.session.data['consumerpsr']

    if (!consumerpsr) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumerpsr = {
            "anchor": "consumerpsr",
            "message": "Tell us whether you have a Priority Service Register (PSR)",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/psr', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/confirm');

    }
});


// Consumer - procedure
router.get('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.render('/' + version + '/add-heat-network/consumerprotections/confirm', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



////////////////////////////////////////////////////////////////////////////// SMRI //////////////////////////////////////////////////////////////////////////////

function setSMRIUser(req) {
    req.session.data['smriprocess'] = "Yes"
    req.session.data['smriassessments'] = "Yes"
    req.session.data['smrilist'] = "Yes"
    req.session.data['smrifitandproper'] = "Yes"
    req.session.data['smrideclarationdate'] = "01/11/2024"
}

function clearSMRIUser(req) {
    req.session.data['smriprocess'] = ""
    req.session.data['smriassessments'] = ""
    req.session.data['smrilist'] = ""
    req.session.data['smrifitandproper'] = ""
    req.session.data['smrideclarationdate'] = ""
}


/// SMRI List
router.get('/' + version + '/smri/list', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.notification;
    const urlParamsVersion = req.query.v;
    req.session.data['smristatus'] = urlParamsVersion;

    if (urlParamsVersion == "submitted") {
        setSMRIUser(req);
        req.session.data['smrideclaration'] = "Yes";
    }
    if (urlParamsVersion == "expired") {
        setSMRIUser(req);
        req.session.data['smrideclaration'] = "Yes";
    }
    if (urlParamsVersion == "new") {
        clearSMRIUser(req);
        req.session.data['smrideclaration'] = "No";
    }
    req.session.data['smrinotification'] = urlParams;
    res.render('/' + version + '/smri/list', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/list', function (req, res) {
    clearSMRIUser(req);
 res.redirect('/' + version + '/smri/process');

});


/// SMRI Process
router.get('/' + version + '/smri/process', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/smri/process', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/process', function (req, res) {
    clearvalidation(req);
    var smriprocess = req.session.data['smriprocess']
    var smrifirstname = req.session.data['smrifirstname']
    var smrilastname = req.session.data['smrilastname']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"

    if (!smriprocess ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smriprocess = {
            "anchor": "smriprocess",
            "message": "Select whether " + companyname + " has a process in place to ensure that all people with SMRI are fit and proper"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/smri/process', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/smri/assessments');
    }
});

/// SMRI assessments
router.get('/' + version + '/smri/assessments', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/smri/assessments', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/assessments', function (req, res) {
    clearvalidation(req);
    var smriassessments = req.session.data['smriassessments']
    var smrifirstname = req.session.data['smrifirstname']
    var smrilastname = req.session.data['smrilastname']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"

    if (!smriassessments ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smriassessments = {
            "anchor": "smriassessments",
            "message": "Select whether " + companyname + " carries out regular assessments to ensure all people with SMRI remain fit and proper"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/smri/assessments', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/smri/smrilist');
    }
});


/// SMRI list
router.get('/' + version + '/smri/smrilist', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/smri/smrilist', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/smrilist', function (req, res) {
    clearvalidation(req);
    var smrilist = req.session.data['smrilist']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"

    if (!smrilist ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrilist = {
            "anchor": "smrilist",
            "message": "Select whether you have a list of all people at " + companyname + " with SMRI"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/smri/smrilist', {
            data: req.session.data
        });
    }

    else {
        if (smrilist == "Yes") {
            res.redirect('/' + version + '/smri/fitandproper');
        }
        else {
            res.redirect('/' + version + '/smri/dropout');
        }
    }
});

/// SMRI fitandproper
router.get('/' + version + '/smri/fitandproper', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/smri/fitandproper', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/fitandproper', function (req, res) {
    clearvalidation(req);
    var smrifitandproper = req.session.data['smrifitandproper']
    var companyname = req.session.data['companyname'] || "Radienteco Ltd"

    if (!smrifitandproper ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrifitandproper = {
            "anchor": "smrifitandproper",
            "message": "Select whether everybody with SMRI at " + companyname + " is fit and proper"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/smri/fitandproper', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/smri/declaration');
    }
});


/// SMRI declaration
router.get('/' + version + '/smri/declaration', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/smri/declaration', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/declaration', function (req, res) {
    clearvalidation(req);

    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

    req.session.data['smrideclaration'] = "Yes"
    req.session.data['smrideclarationdate'] = today
        
        res.redirect('/' + version + '/smri/list?notification=submitted');
});
