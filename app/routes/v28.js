const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


var version = "v28";

function clearvalidation(req) {
    req.session.data.validationErrors = {}
    req.session.data.validationError = "false"
    req.session.data.includeValidation = req.query.iv || req.session.data.includeValidation
    req.session.data['version'] = version

}
///////////////////////////////////////////////////////////////// DASHBOARD ////////////////////////////////////////////////////

router.get('/' + version + '/account-information', function (req, res) {
    clearvalidation(req);
    generateuser(req)
    const urlParams = req.query.v;
    req.session.data['currentversion'] = urlParams;

    if (urlParams == "ur") {
        req.session.data['organisationdetails'] = "Submitted";
    }

    res.render('/' + version + '/account-information', {
        data: req.session.data
    });
});


//////////////////////////////////////////////////////////// SETUP PAGES /////////////////////////////////////////////////////////

///Company name
router.get('/' + version + '/setup/company-name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/setup/company-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/setup/company-name', function (req, res) {
    clearvalidation(req);
    var companyname = req.session.data['companyname']
    

    if (!companyname) {
        req.session.data.validationError = "true";
            req.session.data.validationErrors.companyname = {
                "anchor": "companyname",
                "message": "Enter a name for your organisation"
            }

    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/setup/company-name', {
            data: req.session.data
        });
    }

    else {

            res.redirect('/' + version + '/account-information?v=complete');
    }

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


    // Helper function to calculate the number of days between two dates
    function calculateDaysBetweenDates(startDay, startMonth, endDay, endMonth) {
        const currentYear = new Date().getFullYear();

        // Create the start date using current year
        const startDate = new Date(currentYear, startMonth - 1, startDay);
        
        // Create the end date using current year, adjusting if it wraps to the next year
        let endDate = new Date(currentYear, endMonth - 1, endDay);
        if (endDate < startDate) {
            // If end date is before start date, add one year to the end date
            endDate = new Date(currentYear + 1, endMonth - 1, endDay);
        }

        // Calculate the difference in time and convert to days
        const timeDifference = endDate - startDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    }




    if (!financialstartday || !financialstartmonth) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialstartdate = {
            "anchor": "orgfinancialstartday",
            "message": "Enter an start date for accounting period"
        }
    }

    if (!financialendday || !financialendmonth) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialenddate = {
            "anchor": "orgfinancialendday",
            "message": "Enter an end date for accounting period"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/date', {
            data: req.session.data
        });
    }
    else {
        const days = calculateDaysBetweenDates(
            parseInt(financialstartday), 
            parseInt(financialstartmonth), 
            parseInt(financialendday), 
            parseInt(financialendmonth)
        );
        req.session.data['financialdays'] = days;
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



    if (!orgsubtype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsubtype = {
            "anchor": "orgsubtype",
            "message": "Select an organisation description"
        }
    }

    if ((orgsubtype == "Other") && !orgsubtypeother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgsubtypeother = {
            "anchor": "orgtradingpostcode",
            "message": "Enter an organisation description"
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

    if (!financialpercentage) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialpercentage = {
            "anchor": "financialpercentage",
            "message": "Confirm whether the percentage entity is satisfied"
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

    if (!financialhedged) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialhedged = {
            "anchor": "financialhedged",
            "message": "Enter the number of months"
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
    req.session.data['parentcompanynumber'] = "";
    req.session.data['parentorgaddressMLine1'] = "";
    req.session.data['parentorgaddressMTown'] = "";
    req.session.data['parentorgaddressMCounty'] = "";
    req.session.data['parentorgaddressMPostcode'] = "";
    req.session.data['parentorgaddressMCountry'] = "";
    req.session.data['parentaccounttype'] = "";
    req.session.data['parentorgaddressPostcode'] = "";
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
        req.session.data['parenttotal'] = "";
        req.session.data['parentsentered'] = "";

        if(orgstructure == "Joint venture") {
            res.redirect('/' + version + '/organisation-details/parent-total');
        }
        else if(orgstructure == "Neither of these") {
            res.redirect('/' + version + '/organisation-details/cya');
        }
        else {
            res.redirect('/' + version + '/organisation-details/company-name');
        }
    }

});



/// Org details - Parent total
router.get('/' + version + '/organisation-details/parent-total', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/parent-total', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/parent-total', function (req, res) {
    clearvalidation(req);
    var parenttotal = req.session.data['parenttotal']



    if (!parenttotal) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parenttotal = {
            "anchor": "parenttotal",
            "message": "Enter the number of parent companies"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/parent-total', {
            data: req.session.data
        });
    }
    else {
        req.session.data['parentsentered'] = 1
            res.redirect('/' + version + '/organisation-details/company-name');
    }

});




///Parent Company name
router.get('/' + version + '/organisation-details/company-name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/company-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/company-name', function (req, res) {
    clearvalidation(req);
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
        if (req.session.data.parentsentered) {
        req.session.data['parentcompanyname' + req.session.data['parentsentered']] = req.session.data['parentcompanyname']
        }

            res.redirect('/' + version + '/organisation-details/addressmanual');

    }

});



// Parent Company - Address manual
router.get('/' + version + '/organisation-details/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/addressmanual', function (req, res) {
    clearvalidation(req);
    var parentorgaddressMLine1 = req.session.data['parentorgaddressMLine1']
    var parentorgaddressMTown = req.session.data['parentorgaddressMTown']
    var parentorgaddressMCountry = req.session.data['parentorgaddressMCountry']

    var parentorgaddressMPostcode = req.session.data['parentorgaddressMPostcode']
    var parentsentered = req.session.data['parentsentered']
    var parenttotal = req.session.data['parenttotal']

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
            "message": "Enter a postal code or zip code",
        }
    }
    if (!parentorgaddressMCountry) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentorgaddressMCountry = {
            "anchor": "parentorgaddressMCountry",
            "message": "Enter a country",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/addressmanual', {
            data: req.session.data
        });
    }

    else {
            req.session.data.parentorgaddressSelect = parentorgaddressMLine1 + ', ' + parentorgaddressMTown + ', ' + parentorgaddressMPostcode + ', ' + parentorgaddressMCountry

        if (req.session.data.parentsentered) {
            req.session.data['parentorgaddressSelect' + req.session.data['parentsentered']] = req.session.data['parentorgaddressSelect']
            req.session.data['parentsentered'] = req.session.data['parentsentered'] + 1;
        }        
        if (parenttotal == parentsentered) {
            res.redirect('/' + version + '/organisation-details/cya');

        }
        else {
            clearparentdata(req);
            res.redirect('/' + version + '/organisation-details/company-name');
        }

        console.log(parenttotal)
        console.log(parentsentered)

    }
});


///CYA
router.get('/' + version + '/organisation-details/cya', function (req, res) {
    clearvalidation(req);

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
            "message": "Select a preferred contact method"
        }
    }

    if ((usertelephone == "Landline") && !usertelephonelandline) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonelandline = {
            "anchor": "usertelephonelandline",
            "message": "Enter a landline telephone number"
        }
    }


    if ((usertelephone == "Mobile") && !usertelephonemobile) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.usertelephonemobile = {
            "anchor": "usertelephonemobile",
            "message": "Enter a mobile telephone number"
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
            "message": "Enter a job title"
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
    const userid = req.query.id;
    req.session.data['userid'] = userid;

        res.render('/' + version + '/manage-users/edit-user', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/edit-user', function (req, res) {
    clearvalidation(req);
    var source = req.query.source;

    var userfirstname = req.session.data['edituserfirstname']
    var userlastname = req.session.data['edituserlastname']
    var usertelephone = req.session.data['editusertelephone']
    var usertelephonemobile = req.session.data['editusertelephonemobile']
    var usertelephonelandline = req.session.data['editusertelephonelandline']
    var userjobtitle = req.session.data['edituserjobtitle']



    if (!userfirstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.edituserfirstname = {
            "anchor": "edituserfirstname",
            "message": "Enter a first name"
        }
    }

    if (!userlastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.edituserlastname = {
            "anchor": "edituserlastname",
            "message": "Enter a last name"
        }
    }


    if (!usertelephone) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.editusertelephone = {
            "anchor": "editusertelephone",
            "message": "Select a preferred contact method"
        }
    }

    if ((usertelephone == "Landline") && !usertelephonelandline) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.editusertelephonelandline = {
            "anchor": "editusertelephonelandline",
            "message": "Enter a landline telephone number"
        }
    }


    if ((usertelephone == "Mobile") && !usertelephonemobile) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.editusertelephonemobile = {
            "anchor": "editusertelephonemobile",
            "message": "Enter a mobile telephone number"
        }
    }

    if (!userjobtitle) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.edituserjobtitle = {
            "anchor": "edituserjobtitle",
            "message": "Enter a job title"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/manage-users/edit-user', {
            data: req.session.data
        });
    }




    else {
        req.session.data['userfirstname' + req.session.data['userid']] = req.session.data['edituserfirstname']
        req.session.data['userlastname' + req.session.data['userid']] = req.session.data['edituserlastname']
        req.session.data['usertelephone' + req.session.data['usertotal']] = req.session.data['editusertelephone']
        req.session.data['usertelephonelandline' + req.session.data['usertotal']] = req.session.data['editusertelephonelandline']
        req.session.data['usertelephonelandlineext' + req.session.data['usertotal']] = req.session.data['editusertelephonelandlineext']
        req.session.data['usertelephonemobile' + req.session.data['usertotal']] = req.session.data['editusertelephonemobile']

        req.session.data['userjobtitle' + req.session.data['userid']] = req.session.data['edituserjobtitle']
        if (source == "myprofile") {
            res.redirect('/' + version + '/my-profile?notification=edituser');
        }
        else {
            res.redirect('/' + version + '/manage-users/user-profile?notification=edituser&id='+ req.session.data['userid']);
        }
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
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;


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


/// Reactivate user
router.get('/' + version + '/manage-users/reactivate-user', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;


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

/// Manage users
router.get('/' + version + '/manage-users', function (req, res) {
    generateuser(req);
    clearvalidation(req);
    const urlParams = req.query.notification;
    req.session.data['manageusersnotification'] = urlParams;


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
                res.redirect('/' + version + '/account-creation/type');
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





///Invite email
router.get('/' + version + '/emails/service-invite', function (req, res) {
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

function clearRegIntro(req) {
    req.session.data['introrelevant'] = ""
    req.session.data['introgroundloop'] = ""
    req.session.data['role'] = ""
    req.session.data['introcommunal'] = ""
    req.session.data['introenergycentre'] = ""
    req.session.data['introprimary'] = ""
    req.session.data['introcommunalnetworks'] = ""
    req.session.data['introconnectedcommunal'] = ""
    req.session.data['introconnectedcommunalhowmany'] = ""
    req.session.data['introcontrol'] = ""
    req.session.data['introcontrolhowmany'] = ""
    req.session.data['introonly'] = ""
    req.session.data['introsupply'] = ""
    req.session.data['introonlysupplier'] = ""
    req.session.data['introsupply20'] = ""
    req.session.data['introsupplydecade'] = ""
    req.session.data['supplywhen'] = ""
    req.session.data['introselfsupply'] = ""
    req.session.data['name'] = ""


}



// Introduction - Initial
router.get('/' + version + '/add-heat-network/introduction/initial', function (req, res) {
    clearvalidation(req);
    clearRegIntro(req);
    res.render('/' + version + '/add-heat-network/introduction/initial', {
        data: req.session.data
    });
});


// Tasklist
router.get('/' + version + '/add-heat-network/tasklist', function (req, res) {
    clearvalidation(req);
    if (req.session.data['introcomplete'] != "true") {
            populateIntrodata(req)
    }
    
    res.render('/' + version + '/add-heat-network/tasklist', {
        data: req.session.data
    });
});



// View

router.get('/' + version + '/add-heat-network/view', function (req, res) {




    const urlParams = req.query.v;

    if (urlParams == "complete") {
        req.session.data['introrelevant'] = "Yes"
        req.session.data['introgroundloop'] = "No"
        req.session.data['introcommunal'] = "No"
        req.session.data['introbuildingstotal'] = "3"
        req.session.data['introbuildingshowmany'] = "3"
        req.session.data['introcommunaloperate'] = "Yes"
        req.session.data['introcommunaloperatehowmany'] = "1"
        req.session.data['introenergycentre'] = "Yes"
        req.session.data['introenergycentrehowmany'] = "1"
        req.session.data['intropipework'] = "Yes"
        req.session.data['introsuppliers'] = "No"
        req.session.data['introsupplycurrent'] = "Yes"
        req.session.data['supplywhen'] = "2022"
        req.session.data['introselfsupply'] = "No"
        req.session.data['introbuy'] = "Yes"
        req.session.data['introsell'] = "No"
        req.session.data['name'] = "Heat Network One"
        req.session.data['introcomplete'] = "true"
        req.session.data['introhnbuildings'] = "2"


    }

    res.render('/' + version + '/add-heat-network/view', {
        data: req.session.data
    });


});

// Add Heat Network - Intro

// Introduction - Intro
router.get('/' + version + '/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    req.session.data['cancels'] = "";
    
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/introduction/cancel', {
        data: req.session.data
    });
});

// Introduction - dropout
router.get('/' + version + '/add-heat-network/introduction/dropout', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.v;
    req.session.data['introdropoutreason'] = urlParams;

    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/introduction/dropout', {
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
            res.redirect('/' + version + '/add-heat-network/introduction/groundloop');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=237');
 
        }
    }
});

// Introduction - Ground loop
router.get('/' + version + '/add-heat-network/introduction/groundloop', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/groundloop', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/groundloop', function (req, res) {
    clearvalidation(req);
    var introgroundloop = req.session.data['introgroundloop']

    if (!introgroundloop) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introgroundloop = {
            "anchor": "introgroundloop",
            "message": "Select whether the heat network includes 2 or more ground source heat pumps connected by a shared ground loop"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/groundloop', {
            data: req.session.data
        });
    }

    else {
        if (introgroundloop == "No") {
            res.redirect('/' + version + '/add-heat-network/introduction/role');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=203');
 
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
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=238');

        }

        else {
            res.redirect('/' + version + '/add-heat-network/introduction/changes');

        }
    }
});

// Introduction - Communal
router.get('/' + version + '/add-heat-network/introduction/communal', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communal', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/communal', function (req, res) {
    clearvalidation(req);
    var introcommunal = req.session.data['introcommunal']

    if (!introcommunal) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcommunal = {
            "anchor": "introcommunal",
            "message": "Select whether the heat network is a communal network"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/communal', {
            data: req.session.data
        });
    }
    else {

        if (introcommunal == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/energycentre');
        }

        else {
            
            res.redirect('/' + version + '/add-heat-network/introduction/buildingstotal');

        }

        }
});

// Introduction - Changes
router.get('/' + version + '/add-heat-network/introduction/changes', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/changes', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/changes', function (req, res) {
    clearvalidation(req);
    res.redirect('/' + version + '/add-heat-network/introduction/communal');

});




// Introduction - Energy centre
router.get('/' + version + '/add-heat-network/introduction/energycentre', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/energycentre', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/energycentre', function (req, res) {
    clearvalidation(req);
    var introenergycentre = req.session.data['introenergycentre']
    var role = req.session.data['role']

    if (!introenergycentre) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introenergycentre = {
            "anchor": "introenergycentre",
            "message": "Select whether the communal network has its own energy centre"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/energycentre', {
            data: req.session.data
        });
    }
    else {      
            if (introenergycentre == "Yes") {
                if (role != "Network operator") {
                    res.redirect('/' + version + '/add-heat-network/introduction/suppliers');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/introduction/supply20');
                }
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/primary');
            }

        }  

});



// Introduction - Primary
router.get('/' + version + '/add-heat-network/introduction/primary', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/primary', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/primary', function (req, res) {
    clearvalidation(req);
    var introprimary = req.session.data['introprimary']
    var company = req.session.data['companyname'] || 'Radienteco Ltd';
    var role = req.session.data['role']



    if (!introprimary) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introprimary = {
            "anchor": "introprimary",
            "message": "Select whether " + company + " operate the primary network?"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/primary', {
            data: req.session.data
        });
    }
    else {        
        if (role != "Network operator") {
            res.redirect('/' + version + '/add-heat-network/introduction/suppliers');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/supply20');
        }
        }

});



// Introduction - Communal buildings
router.get('/' + version + '/add-heat-network/introduction/communalbuildings', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communalbuildings', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/communalbuildings', function (req, res) {
    clearvalidation(req);
    var introcommunalbuildings = req.session.data['introcommunalbuildings']


    if (!introcommunalbuildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcommunalbuildings = {
            "anchor": "introcommunalbuildings",
            "message": "Select if this heat network contains any communal buildings?"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/communalbuildings', {
            data: req.session.data
        });
    }

    else {
        if (introcommunalbuildings == "No") {
            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/communaloperate');
        }

    }

});



// Introduction - Communal Operate
router.get('/' + version + '/add-heat-network/introduction/communaloperate', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communaloperate', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/communaloperate', function (req, res) {
    clearvalidation(req);
    var introcommunaloperate = req.session.data['introcommunaloperate']
    var introcommunaloperatehowmany = req.session.data['introcommunaloperatehowmany']
    var introbuildingshowmany = req.session.data['introbuildingshowmany']


    if (!introcommunaloperate) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcommunaloperate = {
            "anchor": "introcommunaloperate",
            "message": "Select if you operate any of the communal buildings?"
        }
    }
    if (introbuildingshowmany != 1) {

    if (introcommunaloperate == "Yes" && !introcommunaloperatehowmany)  {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introenergycentrehowmany = {
            "anchor": "introenergycentrehowmany",
            "message": "Enter the number of communal buildings that you operate"
        }
    }
}
    

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/communaloperate', {
            data: req.session.data
        });
    }

    else {
        if (introcommunaloperate == "No") {
            req.session.data['introhnbuildings'] = req.session.data['introbuildingshowmany'];

            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
        }
        else {
            if (introbuildingshowmany == 1) {
                req.session.data['introhnbuildings'] = 0
                res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
            }

            else {
                req.session.data['introhnbuildings'] = req.session.data['introbuildingshowmany'] - introcommunaloperatehowmany;
                res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
                }
        }

    }

});



// Introduction - Communal Register
router.get('/' + version + '/add-heat-network/introduction/communalregister', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communalregister', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/communalregister', function (req, res) {
    clearvalidation(req);

            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');



});


// Introduction - Communal Other
router.get('/' + version + '/add-heat-network/introduction/communalother', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communalother', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/communalother', function (req, res) {
    clearvalidation(req);
    var introcommunalother = req.session.data['introcommunalother']


    if (!introcommunalother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcommunalother = {
            "anchor": "introcommunalother",
            "message": "Select if there are communal buildings operated by another organisation"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/communalother', {
            data: req.session.data
        });
    }

    else {
        if (introcommunalother == "No") {
            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/communalotherregister');
        }

    }


});

// Introduction - introenergycentreoperate
router.get('/' + version + '/add-heat-network/introduction/energycentreoperate', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/energycentreoperate', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/energycentreoperate', function (req, res) {
    clearvalidation(req);
    var introenergycentre = req.session.data['introenergycentre']
    var introenergycentrehowmany = parseInt(req.session.data['introenergycentrehowmany'])
    var buildings = req.session.data['introbuildingshowmany']

    var company = req.session.data['companyname'] || 'Radienteco Ltd';


    if (!introenergycentre) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introenergycentre = {
            "anchor": "introenergycentre",
            "message": "Select if " + company + " operate any cenergy centres on the heat network?"
        }
    }
    if (introenergycentre == "Yes" && !introenergycentrehowmany)  {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introenergycentrehowmany = {
            "anchor": "introenergycentrehowmany",
            "message": "Enter the number of enery centres"
        }
    }
    

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/energycentreoperate', {
            data: req.session.data
        });
    }

    else {
        if (buildings == 0 && (introenergycentrehowmany == 0 || introenergycentre == "No")) {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=226');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/summary');

    }
    }

});

// Introduction - introbuildingstotal
router.get('/' + version + '/add-heat-network/introduction/buildingstotal', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/buildingstotal', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/buildingstotal', function (req, res) {
    clearvalidation(req);
    var introbuildingstotal = req.session.data['introbuildingstotal']

    if (!introbuildingstotal) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introbuildingstotal = {
            "anchor": "introbuildingstotal",
            "message": "Enter the number of buildings on this heat network?"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/buildingstotal', {
            data: req.session.data
        });
    }

    else {
        if (introbuildingstotal == 0) {
            req.session.data['introhnbuildings'] = 0;
            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/buildings');
        }

            
    }

});



// Introduction - introbuildings
router.get('/' + version + '/add-heat-network/introduction/buildings', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/buildings', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/buildings', function (req, res) {
    clearvalidation(req);
    var introbuildingstotal = parseInt(req.session.data['introbuildingstotal'])
    var introbuildings = req.session.data['introbuildings']
    var introbuildingshowmany = req.session.data['introbuildingshowmany']
    var company = req.session.data['companyname'] || 'Radienteco Ltd';

    if (!introbuildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introbuildings = {
            "anchor": "introbuildings",
            "message": "Select if " + company + " operate any buildings on the heat network?"
        }
    }

    if (introbuildingstotal > 1) {
        if (introbuildings == "No" && !introbuildingshowmany)  {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.introbuildingshowmany = {
                "anchor": "introbuildingshowmany",
                "message": "Enter the number of buildings"
            }
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/buildings', {
            data: req.session.data
        });
    }

    else {
        if (introbuildingshowmany == '0') {
            res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate');
        }
        if (introbuildings == "No") {
            if (introbuildingstotal == 1) {
                req.session.data['introhnbuildings'] == 0
                res.redirect('/' + version + '/add-heat-network/introduction/energycentreoperate')
            }

            else {
                res.redirect('/' + version + '/add-heat-network/introduction/communaloperate')

            }
        }

        

        else {
            req.session.data['introbuildingshowmany'] = introbuildingstotal
            res.redirect('/' + version + '/add-heat-network/introduction/communaloperate');
        }



    }
});
// Introduction - Pipework
router.get('/' + version + '/add-heat-network/introduction/pipework', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/pipework', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/pipework', function (req, res) {
    clearvalidation(req);
    var intropipework = req.session.data['intropipework']
    var buildings = req.session.data['introhnbuildings']
    var role = req.session.data['role']

    if (!intropipework) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.intropipework = {
            "anchor": "intropipework",
            "message": "Select if you supply all of the buildings you operate on this heat network?"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/pipework', {
            data: req.session.data
        });
    }

    else {
        if (intropipework == "No") {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=227');

        }
        else {
            if (buildings > 0 && (role != "Operator")) {
                res.redirect('/' + version + '/add-heat-network/introduction/suppliers');
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/supplycurrent');

            }
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
            "message": "Select if you supply all of the buildings you operate on this heat network?"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/suppliers', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/introduction/supplycurrent');

    }

});

// Introduction - Supply current
router.get('/' + version + '/add-heat-network/introduction/supplycurrent', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplycurrent', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/supplycurrent', function (req, res) {
    clearvalidation(req);
    var introsupplycurrent = req.session.data['introsupplycurrent']


    if (!introsupplycurrent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsupplycurrent = {
            "anchor": "introsupplycurrent",
            "message": "Select if the heat network already supplying thermal energy"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/supplycurrent', {
            data: req.session.data
        });
    }

    else {
        if (introsupplycurrent == "No") {
            res.redirect('/' + version + '/add-heat-network/introduction/supplystart');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/introduction/supply20');

        }

    }

});

// Introduction - Supply start
router.get('/' + version + '/add-heat-network/introduction/supplystart', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplystart', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/introduction/supplystart', function (req, res) {
    clearvalidation(req);
    var introsupplystart = req.session.data['introsupplystart']


    if (!introsupplystart) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsupplystart = {
            "anchor": "introsupplystart",
            "message": "Select if this heat network will start supplying customers before 27 January 2027"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/supplystart', {
            data: req.session.data
        });
    }

    else {
        if (introsupplystart == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=232');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout?v=233');
        }
            

    }

});


// Introduction - introcontrol
router.get('/' + version + '/add-heat-network/introduction/control', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/control', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/control', function (req, res) {
    clearvalidation(req);
    var introcontrol = req.session.data['introcontrol']
    var controlnumber = parseInt(req.session.data['introcontrolhowmany'])
    var company = req.session.data['companyname'] || 'Radienteco Ltd';


    if (!introcontrol) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcontrol = {
            "anchor": "introcontrol",
            "message": "Select if " + company + " operate all of these connected communal networks?"
        }
    }
    if (introcontrol == "No" && !controlnumber)  {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introcontrolhowmany = {
            "anchor": "introcontrolhowmany",
            "message": "Enter the number of connected communal networks"
        }
    }
    

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/control', {
            data: req.session.data
        });
    }

    else {

        res.redirect('/' + version + '/add-heat-network/introduction/include');

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
        if (introonly == "No") {
                res.redirect('/' + version + '/add-heat-network/introduction/othersuppliers');

        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout-operator');
 
        }
    }
});


// Introduction - Only Supplier
router.get('/' + version + '/add-heat-network/introduction/othersuppliers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/othersuppliers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/othersuppliers', function (req, res) {
    clearvalidation(req);
    var introonlysupplier = req.session.data['introonlysupplier']

    if (!introonlysupplier) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introonlysupplier = {
            "anchor": "introonlysupplier",
            "message": "Select whether there are other suppliers on this heat network"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/othersuppliers', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/introduction/energycentre');

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
        res.redirect('/' + version + '/add-heat-network/introduction/supply20');
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
    var supplywhenyear = req.session.data['supplywhenyear']
    var introcommunal = req.session.data['introcommunal']


    if (!supplywhenyear) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplywhenyear = {
            "anchor": "supplywhenyear",
            "message": "Enter a year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/supplywhen', {
            data: req.session.data
        });
    }

    else {
        req.session.data['supplywhen'] = supplywhenyear

        if (supplywhenyear > 2024) {
            res.redirect('/' + version + '/add-heat-network/introduction/operational');

        }

        else {
            if (introcommunal == "Yes") {
                res.redirect('/' + version + '/add-heat-network/introduction/buy');
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/selfsupply');
    
            }    
        }
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
    var introcommunal = req.session.data['introcommunal']

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
        if (introcommunal == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/buy');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/selfsupply');

        }    }
});

// Introduction - Operationbal
router.get('/' + version + '/add-heat-network/introduction/operational', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/operational', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/operational', function (req, res) {
    clearvalidation(req);
    var introoperationalday = req.session.data['introoperationalday']
    var introoperationalmonth = req.session.data['introoperationalmonth']
    var introoperationalyear = req.session.data['introoperationalyear']
    const operationalDeadline = new Date('2025-04-01');

    function createDateFromInputs(day, month, year) {
        // Convert inputs to integers
        const dayInt = parseInt(day, 10);
        const monthInt = parseInt(month, 10) - 1; // JavaScript months are 0-based
        const yearInt = parseInt(year, 10);
    
        // Validate inputs
        if (
            isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt) ||
            dayInt < 1 || dayInt > 31 ||
            monthInt < 0 || monthInt > 11 ||
            yearInt < 1
        ) {
            throw new Error('Invalid date inputs');
        }
    
        // Create and return the Date object
        const date = new Date(yearInt, monthInt, dayInt);
    
        // Validate the resulting date to ensure it's correct
        if (date.getDate() !== dayInt || date.getMonth() !== monthInt || date.getFullYear() !== yearInt) {
            throw new Error('Invalid date inputs resulted in an invalid date');
        }
    
        return date;
    }

    let introoperationaldate;

    try {
        introoperationaldate = createDateFromInputs(introoperationalday, introoperationalmonth, introoperationalyear);
        console.log('Intro Operational Date:', introoperationaldate);
    } catch (error) {
        console.error('Error creating intro operational date:', error.message);
    }

    var introcommunal = req.session.data['introcommunal']

    if (!introoperationalday || !introoperationalmonth || !introoperationalyear) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introoperationaldate = {
            "anchor": "introoperationalday",
            "message": "Enter a full date"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/operational', {
            data: req.session.data
        });
    }

    else {
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
          ];
        const formattedDate = `${introoperationaldate.getDate()} ${monthNames[introoperationaldate.getMonth()]} ${introoperationaldate.getFullYear()}`;

        req.session.data['supplywhen'] = formattedDate;
        if (introoperationaldate > operationalDeadline) {
            req.session.data['introauthorised'] == "No"
            res.redirect('/' + version + '/add-heat-network/introduction/authorisation');

        }

        else {
            req.session.data['introauthorised'] == "Yes"

            if (introcommunal == "Yes") {
                res.redirect('/' + version + '/add-heat-network/introduction/buy');
            }
            else {
                res.redirect('/' + version + '/add-heat-network/introduction/selfsupply');
    
            }    
        }
    }
});



// Introduction - introselfsupply
router.get('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    var introselfsupply = req.session.data['introselfsupply']

    if (!introselfsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introselfsupply = {
            "anchor": "introselfsupply",
            "message": "Select whether the heat network is a self-supply network"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/buy');
    }

});


// Introduction - Buy Heat
router.get('/' + version + '/add-heat-network/introduction/buy', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/buy', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/buy', function (req, res) {
    clearvalidation(req);
    var introbuy = req.session.data['introbuy']

    if (!introbuy) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introbuy = {
            "anchor": "introbuy",
            "message": "Select whether the heat network buys or sells heat"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/buy', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/sell');
    }

});

// Introduction - Buy Heat
router.get('/' + version + '/add-heat-network/introduction/sell', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/sell', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/sell', function (req, res) {
    clearvalidation(req);
    var introsell = req.session.data['introsell']

    if (!introsell) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsell = {
            "anchor": "introsell",
            "message": "Select whether the heat network buys or sells heat"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/sell', {
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



function populateIntrodata(req) {
    req.session.data['introrelevant'] = "Yes"
    req.session.data['introgroundloop'] = "No"
    req.session.data['introcommunal'] = "No"
    req.session.data['introbuildingstotal'] = "3"
    req.session.data['introbuildingshowmany'] = "3"
    req.session.data['introcommunaloperate'] = "Yes"
    req.session.data['introcommunaloperatehowmany'] = "1"
    req.session.data['introhnbuildings'] = "2"
    req.session.data['introenergycentre'] = "Yes"
    req.session.data['introenergycentrehowmany'] = "2"
    req.session.data['intropipework'] = "Yes"
    req.session.data['introsuppliers'] = "No"
    req.session.data['introsupplycurrent'] = "Yes"
    req.session.data['supplywhen'] = "2022"
    req.session.data['introselfsupply'] = "No"
    req.session.data['introbuy'] = "Yes"
    req.session.data['introsell'] = "No"
    req.session.data['name'] = "Heat Network One"
    req.session.data['introcomplete'] = "true";
}



// Intro - cya
router.get('/' + version + '/add-heat-network/introduction/cya', function (req, res) {


    const urlParams = req.query.v;

    if (urlParams == "complete") {
        populateIntrodata(req)
    }

    res.render('/' + version + '/add-heat-network/introduction/cya', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/introduction/cya', function (req, res) {


        res.redirect('/' + version + '/add-heat-network/introduction/moreinfo');


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


// Energy centre - Energy Centres
router.get('/' + version + '/add-heat-network/energycentre/energycentres', function (req, res) {
    clearvalidation(req);
    req.session.data['energycentres'] = req.session.data['introenergycentrehowmany']
    res.render('/' + version + '/add-heat-network/energycentre/energycentres', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/energycentres', function (req, res) {
    clearvalidation(req);
    var enerycentrescompleted = req.session.data['enerycentrescompleted']


    if (enerycentrescompleted != "true") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddressHasPostcode = {
            "anchor": "",
            "message": "Fill in all energy centre information before continuing",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/energycentres', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/energycentre/cya');
    }
});

function populateECdata(req, id) {
req.session.data['ecaddressHasPostcode'] = req.session.data['ecaddressHasPostcode' + id];
req.session.data['ecaddressPostcode'] = req.session.data['ecaddressPostcode' + id];

req.session.data['ecaddressSelected'] = req.session.data['ecaddressSelected' + id];
req.session.data['ecaddresslatitude'] = req.session.data['ecaddresslatitude' + id];
req.session.data['ecaddresslongitude'] = req.session.data['ecaddresslongitude' + id];
req.session.data['energytype'] = req.session.data['energytype' + id];
req.session.data['techcapacity'] = req.session.data['techcapacity' + id];
req.session.data['techcoolingcapacity'] = req.session.data['techcoolingcapacity' + id];
req.session.data['technologies'] = req.session.data['technologies' + id];

req.session.data['techmeters'] = req.session.data['techmeters' + id];
}

// Energy centre - Has postcode
router.get('/' + version + '/add-heat-network/energycentre/addresspostcode', function (req, res) {
    clearvalidation(req);

    const urlParams = req.query.id;
    if (urlParams) {
        req.session.data['currentecid'] = urlParams
        populateECdata(req, urlParams);

    }


    res.render('/' + version + '/add-heat-network/energycentre/addresspostcode', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/addresspostcode', function (req, res) {
    clearvalidation(req);
    var ecaddressHasPostcode = req.session.data['ecaddressHasPostcode']

    if (!ecaddressHasPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddressHasPostcode = {
            "anchor": "ecaddressHasPostcode",
            "message": "Tell us whether the energy centre has a postcode",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/addresspostcode', {
            data: req.session.data
        });
    }
    else {
        if (ecaddressHasPostcode == "Yes") {
            res.redirect('/' + version + '/add-heat-network/energycentre/address');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/energycentre/addresscoords');
        }
    }
});


// Energy centre - Coordinates
router.get('/' + version + '/add-heat-network/energycentre/addresscoords', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/energycentre/addresscoords', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/addresscoords', function (req, res) {
    clearvalidation(req);
    var ecaddresslatitude = req.session.data['ecaddresslatitude']
    var ecaddresslongitude = req.session.data['ecaddresslongitude']


    if (!ecaddresslatitude) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddresslatitude = {
            "anchor": "ecaddresslatitude",
            "message": "Enter the latitude for the energy centre",
        }
    }

    if (!ecaddresslongitude) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.ecaddresslongitude = {
            "anchor": "ecaddresslongitude",
            "message": "Enter the longitude for the energy centre",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/addresscoords', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/energycentre/addressconfirm');
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
    var energytypes = req.session.data['energytype']

    if (!energytypes) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.energytypes = {
            "anchor": "energytypes",
            "message": "Select a thermal energy type",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/type', {
            data: req.session.data
        });
    }

    else {    
        if (energytypes == "Cooling" ) {
            res.redirect('/' + version + '/add-heat-network/energycentre/coolingcapacity');
        }
        else {
        res.redirect('/' + version + '/add-heat-network/energycentre/capacity');
        }

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
    var energytype = req.session.data['energytype']

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

 if (Array.isArray(energytype) && energytype.includes("Cooling")) {
    res.redirect('/' + version + '/add-heat-network/energycentre/coolingcapacity');
} else {
        res.redirect('/' + version + '/add-heat-network/energycentre/meters');
    }


    }
});


// Energy centre - coolingcapacity
router.get('/' + version + '/add-heat-network/energycentre/coolingcapacity', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/coolingcapacity', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/coolingcapacity', function (req, res) {
    clearvalidation(req);
    var techcoolingcapacity = req.session.data['techcoolingcapacity']
    var services = req.session.data['service']

    if (!techcoolingcapacity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techcoolingcapacity = {
            "anchor": "techcoolingcapacity",
            "message": "Enter a cooling capcity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/coolingcapacity', {
            data: req.session.data
        });
    }
    else {


        res.redirect('/' + version + '/add-heat-network/energycentre/meters');



    }
});



// Energy centre - meters
router.get('/' + version + '/add-heat-network/energycentre/meters', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/energycentre/meters', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/energycentre/meters', function (req, res) {
    clearvalidation(req);
    var techmeters = req.session.data['techmeters']
var technologies = req.session.data['technologies']

    if (!techmeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techmeters = {
            "anchor": "techmeters",
            "message": "Select if the system is capable of thermal meters"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/energycentre/meters', {
            data: req.session.data
        });
    }

    else {
        if (technologies) {
            res.redirect('/' + version + '/add-heat-network/energycentre/summary');

        }
        else {
            res.redirect('/' + version + '/add-heat-network/energycentre/technology');
        }
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
        req.session.data['techtechnologycount'] = req.session.data['techtechnologycount'] + 1 | 1
        res.redirect('/' + version + '/add-heat-network/energycentre/summary');
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
        res.redirect('/' + version + '/add-heat-network/energycentre/summary');
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

function clearECdata(req) {
    req.session.data['ecaddressHasPostcode'] = ""
    req.session.data['ecaddressSelected'] = ""
    req.session.data['ecaddressPostcode'] = ""
    req.session.data['ecaddresslatitude'] = ""
    req.session.data['ecaddresslongitude'] = ""
    req.session.data['energytype'] = ""
    req.session.data['techcapacity'] = ""
    req.session.data['techcoolingcapacity'] = ""
    req.session.data['technologies'] = ""
    req.session.data['techmeters'] = ""
    req.session.data['techtechnology'] = ""
}

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
    var energycentres = req.session.data['energycentres']
    var tech = req.session.data['techtechnology'] || req.session.data['technologyother']

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
        if (tech) {
        req.session.data.technologies = req.session.data.technologies || []
        req.session.data.technologies.push([tech])
        }

        if (techsummaryother == "No") {
            if (energycentres > 1) {

                req.session.data['ecaddressHasPostcode' + req.session.data['currentecid']] = req.session.data['ecaddressHasPostcode'],
                req.session.data['ecaddressPostcode' + req.session.data['currentecid']] = req.session.data['ecaddressPostcode'],

                req.session.data['ecaddressSelected' + req.session.data['currentecid']] = req.session.data['ecaddressSelected'],
                req.session.data['ecaddresslatitude' + req.session.data['currentecid']] = req.session.data['ecaddresslatitude'],
                req.session.data['ecaddresslongitude' + req.session.data['currentecid']] = req.session.data['ecaddresslongitude'],
                req.session.data['energytype' + req.session.data['currentecid']] = req.session.data['energytype'],
                req.session.data['techcapacity' + req.session.data['currentecid']] = req.session.data['techcapacity'],
                req.session.data['techcoolingcapacity' + req.session.data['currentecid']] = req.session.data['techcoolingcapacity'],
                req.session.data['technologies' + req.session.data['currentecid']] = req.session.data['technologies'],

                req.session.data['techmeters' + req.session.data['currentecid']] = req.session.data['techmeters'],
                req.session.data['eccomplete' + req.session.data['currentecid']] = true
                clearECdata(req);

                res.redirect('/' + version + '/add-heat-network/energycentre/energycentres');

            }
            else {
                res.redirect('/' + version + '/add-heat-network/energycentre/cya');

            }
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


// // Energy centre - Another
// router.get('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
//     clearvalidation(req);
//     res.render('/' + version + '/add-heat-network/energycentre/another', {
//         data: req.session.data
//     });
// });


// router.post('/' + version + '/add-heat-network/energycentre/another', function (req, res) {
//     clearvalidation(req);
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
router.get('/' + version + '/add-heat-network/energycentre/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/energycentre/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/energycentre/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});


// Buildings & consumers - How many
router.get('/' + version + '/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/howmany', {
            data: req.session.data
        });
    }


    else {
        if (buildings == 1) {
            res.redirect(301, '/' + version + '/add-heat-network/buildingsandconsumers/address');
        }
        else {
            res.redirect(301, '/' + version + '/add-heat-network/buildingsandconsumers/buildings');
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
        if (Array.isArray(buildingtype) && buildingtype.length > 1) {
            req.session.data['hasbuildingtypes'] = true
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
        } else {
            req.session.data['hasbuildingtypes'] = false
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/customers');
        }
    }
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
    var buildings = req.session.data['introhnbuildings']
    var buildingnumberResidential = req.session.data['buildingnumberResidential']
    var buildingnumberCommercial = req.session.data['buildingnumberCommercial']
    var buildingnumberIndustrial = req.session.data['buildingnumberIndustrial']
    var buildingnumberPublic = req.session.data['buildingnumberPublic']
    var buildingtype = req.session.data['buildingtype']


    const types = ["Residential", "Commercial", "Industrial", "Public", "Mixed0Use"];

    types.forEach(type => {
        if (buildingtype.includes(type) && !req.session.data[`buildingnumber${type}`]) {
            req.session.data.validationError = "true";
            req.session.data.validationErrors[`buildingnumber${type}`] = {
                "anchor": `buildingnumber${type}`,
                "message": "Enter the number of " + type + " buildings",
            };
        }
    });

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildings', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/customers');
    }
});


// Buildings & consumers - Customers
router.get('/' + version + '/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    clearvalidation(req);
    var customers = req.session.data['buildingcustomers']
    var customersResidential = req.session.data['buildingcustomersResidential']
    var customersCommercial = req.session.data['buildingcustomersCommercial']
    var customersIndustrial = req.session.data['buildingcustomersIndustrial']
    var customersPublic = req.session.data['buildingcustomersPublic']
    var buildings = req.session.data['introhnbuildings']
    var hntype = req.session.data['introcommunal']
    var buildingtype = req.session.data['buildingtype']

        if (buildingtype == "Mixed0use") {
            if (!customersResidential && !customersCommercial && !customersIndustrial && !customersPublic) {
                req.session.data.validationError = "true"
                req.session.data.validationErrors.buildingcustomers = {
                    "anchor": "buildingcustomers",
                    "message": "Enter the number of customers",
                }
            }
            
            if (req.session.data.validationError == "true") {
                res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
                    data: req.session.data
                });
            }
        
            else {
                req.session.data['buildingcustomers'] = Number(customersResidential) + Number(customersCommercial) + Number(customersIndustrial) + Number(customersPublic)
                        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/metering');
            }
        }
    
        else {            
            if ((buildings == 1) || (hntype == "Yes")) {
                if (!customers) {
                    req.session.data.validationError = "true"
                    req.session.data.validationErrors.buildingcustomers = {
                        "anchor": "buildingcustomers",
                        "message": "Enter the number of final customers",
                    }
                }
            
                if (req.session.data.validationError == "true") {
                    res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
                        data: req.session.data
                    });
                }
            
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter');    
                }
        }    
        else {

            const types = ["Residential", "Commercial", "Industrial", "Public"];

            types.forEach(type => {
                if (buildingtype.includes(type) && !req.session.data[`buildingcustomers${type}`]) {
                    req.session.data.validationError = "true";
                    req.session.data.validationErrors[`buildingcustomers${type}`] = {
                        "anchor": `buildingcustomers${type}`,
                        "message": "Enter the number of " + type + " customers",
                    };
                }
            });

            if (req.session.data.validationError == "true") {
                res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
                    data: req.session.data
                });
            }

            else {
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter');    
            }
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
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/prepaymentmeters');
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
    var addresscustomersCommercial = req.session.data['buildingcustomersCommercial']

    var buildingtype = req.session.data['buildingtype']


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
        if (buildingtype == "Commercial" | addresscustomersCommercial >= 1) {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/agent');
        }   
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
    var buildinglevelmeter = req.session.data['buildinglevelmeter']
    var buildings = req.session.data['introhnbuildings']
    var buildinglevelmeternumber = req.session.data['buildinglevelmeternumber']


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
        if (smartdisplaymeters == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/smarttechnologies');
        }
        else {
        if ((buildinglevelmeternumber) && (buildinglevelmeternumber < buildings)) {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/capable');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators');
        }
        }


    }
});







// Buildings & consumers -  Smart display meters technologies
router.get('/' + version + '/add-heat-network/buildingsandconsumers/smarttechnologies', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/smarttechnologies', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/smarttechnologies', function (req, res) {

    var buildings = req.session.data['introhnbuildings']
    var buildinglevelmeternumber = req.session.data['buildinglevelmeternumber']



    if ((buildinglevelmeternumber) && (buildinglevelmeternumber < buildings)) {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/capable');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators');
    }});


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
    var hntype = req.session.data['introcommunal']
    var buildings = req.session.data['introhnbuildings']
    var buildinglevelmeternumber = req.session.data['buildinglevelmeternumber']

    if (!buildinglevelmeter) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildinglevelmeter = {
            "anchor": "buildinglevelmeter",
            "message": "Select whether the building has a building-level meter",
        }
    }
    if (!(buildings == 1 || hntype == "Yes")) {
        if (!buildinglevelmeternumber) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildinglevelmeternumber = {
                "anchor": "buildinglevelmeternumber",
                "message": "Enter the number of buildings with a building-level meter",
            }
        }    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/buildinglevelmeter', {
            data: req.session.data
        });
    }

    else {
        if (buildinglevelmeter == "No") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/capable');

        }

        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/finalconsumermeters');

        }
    }
});



// Buildings & consumers -  Capable
router.get('/' + version + '/add-heat-network/buildingsandconsumers/capable', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/capable', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/capable', function (req, res) {
    clearvalidation(req);
    var capable = req.session.data['capable']
    var buildings = req.session.data['introhnbuildings']

    if (!capable) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.capable = {
            "anchor": "capable",
            "message": "Select whether the building has a building-level meter",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/capable', {
            data: req.session.data
        });
    }

    else {
        if (capable == "No" && buildings > 6) {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/apply');

        }

        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/heatcostallocators');

        }
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

// Metering - agentservices services
router.get('/' + version + '/add-heat-network/buildingsandconsumers/agentservices', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/agentservices', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/agentservices', function (req, res) {
    clearvalidation(req);
    var meteringagentservices = req.session.data['meteringagentservices']

    if (!meteringagentservices) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagentservices = {
            "anchor": "meteringagentservices",
            "message": "Select  which services you use your metering and billing agent for?",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/agentservices', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
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

            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/agentservices');


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
            "message": "Tell us whether you have an operation continuity plan in place",
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


// Financial - supply
router.get('/' + version + '/add-heat-network/financial/supply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/financial/supply', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/financial/supply', function (req, res) {
    clearvalidation(req);
    var financialsupply = req.session.data['financialsupply']

    if (!financialsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialsupply = {
            "anchor": "financialsupply",
            "message": "Tell us whether you have a supply continuity plan in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/financial/supply', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/financial/plan');
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
// Consumer - confirm
router.get('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.render('/' + version + '/add-heat-network/consumerprotections/confirm', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    clearvalidation(req);
    var consumerconfirm = req.session.data['consumerconfirm']

    if (!consumerconfirm) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumerconfirm = {
            "anchor": "consumerconfirm",
            "message": "Tell us whether you have a proecdure in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/confirm', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/consumerprotections/difficulties');
    }
});

// Consumer - difficulties
router.get('/' + version + '/add-heat-network/consumerprotections/difficulties', function (req, res) {
    res.render('/' + version + '/add-heat-network/consumerprotections/difficulties', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/consumerprotections/difficulties', function (req, res) {
    clearvalidation(req);
    var consumerdifficulties = req.session.data['consumerdifficulties']

    if (!consumerdifficulties) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumerdifficulties = {
            "anchor": "consumerdifficulties",
            "message": "Tell us whether you have a process for dealing with customers",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/difficulties', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/consumerprotections/cya');
    }
});



// Consumer - cya
router.get('/' + version + '/add-heat-network/consumerprotections/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/consumerprotections/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/consumerprotections/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



////////// SUPPLIERS /////////////



function setSupplier(req, id) {
    req.session.data['suppliername'] = req.session.data['suppliername' + id]
    req.session.data['suppliernameselected'] = req.session.data['suppliernameselected' + id]
    req.session.data['supplieraddressselected'] = req.session.data['supplieraddressselected' + id]
    req.session.data['addedsupplier'] = req.session.data['addedsupplier' + id]
    req.session.data['supplierbuildings'] = req.session.data['supplierbuildings' + id]
    req.session.data['supplierid'] = id
}

function clearSupplier(req) {
    req.session.data['suppliername'] = ""
    req.session.data['suppliernameselected'] = ""
    req.session.data['supplieraddressselected'] = ""
    req.session.data['addedsupplier'] = ""
    req.session.data['supplierbuildings'] = ""
    req.session.data['supplierid'] = ""
    req.session.data['supplierremove'] = ""

}

function removeSupplier(req, id) {
    req.session.data['suppliername' + id] = ""
    req.session.data['suppliernameselected' + id] = ""
    req.session.data['supplieraddressselected' + id] = ""
    req.session.data['addedsupplier' + id] = ""
    req.session.data['supplierbuildings' + id] = ""
    var buildings = req.session.data['buildings']
    buildings.forEach((building) => {
        if (building.supplied == id) {
            building.supplied = 0 
        }
    })
    req.session.data['buildings'] = buildings

}




// Suppliers - How many
router.get('/' + version + '/add-heat-network/suppliers/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/suppliers/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/suppliers/howmany', function (req, res) {
    clearvalidation(req);
    var suppliershowmany = req.session.data['suppliershowmany']


    if (!suppliershowmany) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.suppliershowmany = {
            "anchor": "suppliershowmany",
            "message": "Enter the number of suppliers"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/suppliers/howmany', {
            data: req.session.data
        });
    }


    else {
        if (suppliershowmany == 1) {
            res.redirect('/' + version + '/add-heat-network/suppliers/search');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/suppliers/suppliers');
        }
    }

});


// Supliers - List
router.get('/' + version + '/add-heat-network/suppliers/suppliers', function (req, res) {
    clearvalidation(req);
    clearSupplier(req)

    res.render('/' + version + '/add-heat-network/suppliers/suppliers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/suppliers/suppliers', function (req, res) {
    clearvalidation(req);
    var buildings = req.session.data['buildings']


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/suppliers/suppliers', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/suppliers/cya');
    }
});



// Suppliers - Name
router.get('/' + version + '/add-heat-network/suppliers/name', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.id;
    if (urlParams) {
        setSupplier(req, urlParams)

    }

    else {
        if (req.session.data.suppliertotal) {
            req.session.data.suppliertotal = req.session.data.suppliertotal + 1
            req.session.data['supplierid'] = req.session.data.suppliertotal
        } 
        else {
            req.session.data.suppliertotal = 1
            req.session.data['supplierid'] = req.session.data.suppliertotal
        }
    }

    res.render('/' + version + '/add-heat-network/suppliers/name', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/suppliers/name', function (req, res) {
    clearvalidation(req);
    var suppliername = req.session.data['suppliername']
    var buildinglocationAddress = req.session.data['buildinglocationAddress']

    if (!suppliername) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.suppliername = {
            "anchor": "suppliername",
            "message": "Enter the number of suppliers"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/suppliers/name', {
            data: req.session.data
        });
    }

    else {

        var buildingssetup = req.session.data['buildingssetup'] 
    
        if (buildingssetup != true) {
            var buildingnumber = req.session.data['buildings']
            console.log(buildingnumber);
            const buildings = [];
    
            let buildingCount = (buildingnumber && buildingnumber > 0) ? buildingnumber : 8
            console.log(buildingCount);
            if (buildinglocationAddress) {
                for (let i = 1; i <= 1; i++) {
                    buildings.push({
                        name: 'Building ' + i,
                        id: i,
                        address: buildinglocationAddress,
                        supplied: 0,
                    });
                }
                for (let i = 2; i <= buildingCount; i++) {
                    buildings.push({
                        name: 'Building ' + i,
                        id: i,
                        address: (i * 2) + ' Fake Street, London, SW14 1BB',
                        supplied: 0,
                    });
                }
    
    
            }

            else {
                for (let i = 1; i <= buildingCount; i++) {
                    buildings.push({
                        name: 'Building ' + i,
                        id: i,
                        address: (i * 2) + ' Fake Street, London, SW14 1BB',
                        supplied: 0,
                    });
                }
    
            }
    
    
            req.session.data['buildings'] = buildings
    
            req.session.data['buildingssetup'] = true
    
        }
    


        req.session.data['suppliername' + req.session.data['supplierid']] = req.session.data['suppliername']


        const fs = require('fs');
        const path = require('path');

    // Read the orgs.json file
    fs.readFile(path.join(__dirname, '../data/orgs.json'), 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to read the data file' });
      }
  
      // Parse the JSON file
      const orgs = JSON.parse(data);
  
      // Filter the orgs based on the search query (case-insensitive search)
      const filteredOrgs = orgs.filter(org =>
        org.Name.toLowerCase().includes(suppliername.toLowerCase())
      );
  
      // Return the filtered results
      if (filteredOrgs.length > 0) {
        req.session.data.supplierresults = filteredOrgs;
        res.redirect('/' + version + '/add-heat-network/suppliers/results');
      }

      else {
        res.redirect('/' + version + '/add-heat-network/suppliers/noresults');
      }
    })}
  });

// Suppliers - Results
router.get('/' + version + '/add-heat-network/suppliers/results', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/suppliers/results', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/suppliers/results', function (req, res) {
    clearvalidation(req);
    var suppliernameselected = req.session.data['suppliernameselected']

if (!suppliernameselected) {
    req.session.data.validationError = "true"
    req.session.data.validationErrors.suppliernameselected = {
        "anchor": "suppliernameselected",
        "message": "Select a name"
    }
}

if (req.session.data.validationError == "true") {
    res.render('/' + version + '/add-heat-network/suppliers/results', {
        data: req.session.data
    });
}


else {
    res.redirect('/' + version + '/add-heat-network/suppliers/confirm');
}
});


// Suppliers - Confirm supplier
router.get('/' + version + '/add-heat-network/suppliers/confirm', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/suppliers/confirm', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/suppliers/confirm', function (req, res) {
    clearvalidation(req);
    var introcommunal = req.session.data['introcommunal']

    

    req.session.data['suppliernameselected' + req.session.data['supplierid']] = req.session.data['suppliernameselected']
    req.session.data['supplieraddressselected' + req.session.data['supplierid']] = req.session.data['supplieraddressselected']
    req.session.data['addedsupplier' + req.session.data['supplierid']] = "true"

        res.redirect('/' + version + '/add-heat-network/suppliers/suppliers');



    
});



// Suppliers - Buildings
router.get('/' + version + '/add-heat-network/suppliers/buildings', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/suppliers/buildings', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/suppliers/buildings', function (req, res) {
    clearvalidation(req);
    var buildings = req.session.data['buildings']
    var supplierbuildings = req.session.data['supplierbuildings']


    if (!supplierbuildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplierbuildings = {
            "anchor": "supplierbuildings",
            "message": "Select at least one building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/suppliers/buildings', {
            data: req.session.data
        });
    }

    else {
        req.session.data['supplierbuildings' + req.session.data['supplierid']] = req.session.data['supplierbuildings'];
        res.redirect('/' + version + '/add-heat-network/suppliers/suppliers');
      }
  });


  // Suppliers - cya
router.get('/' + version + '/add-heat-network/suppliers/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/suppliers/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/suppliers/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



/// supplier remove
router.get('/' + version + '/add-heat-network/suppliers/remove', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.id;
    if (urlParams) {
        setSupplier(req, urlParams)
    }
    res.render('/' + version + '/add-heat-network/suppliers/remove', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/suppliers/remove', function (req, res) {
    clearvalidation(req);
    const urlParams = req.query.id;

    var supplierremove = req.session.data['supplierremove']
    var suppliername = req.session.data['suppliername']


    if (!supplierremove ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplierremove = {
            "anchor": "supplierremove",
            "message": "Select whether you wish to remove " + suppliername
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/suppliers/remove', {
            data: req.session.data
        });
    }

    else {
        if (supplierremove == "Yes") {
            clearSupplier(req)
            removeSupplier(req, urlParams)
            res.redirect('/' + version + '/add-heat-network/suppliers/suppliers');
        }

        else {
            clearSupplier(req)
            res.redirect('/' + version + '/add-heat-network/suppliers/suppliers');
        }
    }
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

/// SMRI Personal
router.get('/' + version + '/smri/personal', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/smri/personal', {
        data: req.session.data
    });
});

router.post('/' + version + '/smri/personal', function (req, res) {
    
    clearvalidation(req);
    const urlParams = req.query.id;

    var smrifirstname = req.session.data['smrifirstname']
    var smrilastname = req.session.data['smrilastname']
    var smridobday = req.session.data['smridobday']
    var smridobmonth = req.session.data['smridobmonth']
    var smridobyear = req.session.data['smridobyear']
    const smridob = new Date(`${smridobyear}-${smridobmonth}-${smridobday}`);

    if (!smrifirstname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrifirstname = {
            "anchor": "smrifirstname",
            "message": "Enter a first name"
        }
    }

    if (!smrilastname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrilastname = {
            "anchor": "smrilastname",
            "message": "Enter a last name"
        }
    }



    if ((smridobday.length > 2) || (smridobday.month > 2) || (smridobday.year > 4) || (isNaN(smridob))) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smridob = {
            "anchor": "smridobday",
            "message": "Enter a valid date"
        }
    }

    if (!smridobday || !smridobmonth || !smridobyear) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smridob = {
            "anchor": "smridob",
            "message": "Enter a full date of birth"
        }
    }
    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/smri/personal', {
            data: req.session.data
        });
    }
    else {
        if (urlParams) {
            req.session.data['smritotal'] = urlParams;
        }
        else {
        if (req.session.data.smritotal) {
            req.session.data.smritotal = req.session.data.smritotal + 1
        } 
        else {
            req.session.data.smritotal = 1
        }
    }
        req.session.data['smrifirstname' + req.session.data['smritotal']] = req.session.data['smrifirstname']
        req.session.data['smrilastname' + req.session.data['smritotal']] = req.session.data['smrilastname']
        req.session.data['smridob' + req.session.data['smritotal']] = smridob
        req.session.data['smridobday' + req.session.data['smritotal']] = req.session.data['smridobday']
        req.session.data['smridobmonth' + req.session.data['smritotal']] = req.session.data['smridobmonth']
        req.session.data['smridobyear' + req.session.data['smritotal']] = req.session.data['smridobyear']

        res.redirect('/' + version + '/smri/process');
    }
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


    if (!smriprocess ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smriprocess = {
            "anchor": "smriprocess",
            "message": "Select whether " + smrifirstname + " " + smrilastname + " has been responsible for, contributed to or facilitated any serious process or mismanagement while carrying out a regulated activity"
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


    if (!smriassessments ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smriassessments = {
            "anchor": "smriassessments",
            "message": "Select whether regular assessments are carried out"
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


    if (!smrilist ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrilist = {
            "anchor": "smrilist",
            "message": "Select whether you have a list of all people with SMRI"
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


    if (!smrifitandproper ) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.smrifitandproper = {
            "anchor": "smrifitandproper",
            "message": "Select whether all people with SMRI are fit and proper"
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
