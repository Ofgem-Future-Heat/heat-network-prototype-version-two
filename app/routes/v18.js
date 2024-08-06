const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


var version = "v18";

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
    res.render('/' + version + '/account-information', {
        data: req.session.data
    });
});

//////////////////////////////////////////////////////////// ORG DETAILS /////////////////////////////////////////////////////////

///Org details
router.get('/' + version + '/orgniastion-details/orgniastion-details', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/orgniastion-details/orgniastion-details', {
        data: req.session.data
    });
});


/// Org details - Trading name
router.get('/' + version + '/organisation-details/trading-name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/trading-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/trading-name', function (req, res) {
    clearvalidation(req);
    var orghastradingname = req.session.data['orghastradingname']
    var orgtradingname = req.session.data['orgtradingname']



    if (!orghastradingname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orghastradingname = {
            "anchor": "orghastradingname",
            "message": "Select whether your organisation has a trading name"
        }
    }


    if ((orghastradingname == "Yes") && !orgtradingname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgtradingname = {
            "anchor": "orgtradingname",
            "message": "Enter an trading name"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/trading-name', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/trading-address');
    }

});

/// Org details - Trading address
router.get('/' + version + '/organisation-details/trading-address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/trading-address', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/trading-address', function (req, res) {
    clearvalidation(req);
    var orghastradingaddress = req.session.data['orghastradingaddress']
    var userpostcode = req.session.data['orgtradingpostcode'].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");


    if (!orghastradingaddress) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orghastradingaddress = {
            "anchor": "orghastradingaddress",
            "message": "Select whether your organisation has a trading address"
        }
    }


    if ((orghastradingaddress == "Yes") && !userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgtradingpostcode = {
            "anchor": "orgtradingpostcode",
            "message": "Enter a postcode"
        }
    }    

    function validateUKPostcode(postcode) {
        const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
      
        return postcodeRegex.test(postcode);
      }
      
    if ((orghastradingaddress == "Yes") && !validateUKPostcode(userpostcode)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgtradingpostcode = {
            "anchor": "orgtradingpostcode",
            "message": "Enter a valid postcode",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/trading-address', {
            data: req.session.data
        });
    }

    else {
    if (orghastradingaddress == "Yes") {






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
                        req.session.data.tradingAddressSelect = locationaddresses;
                        req.session.data.tradingaddressesnotfound = "";
                        res.redirect('/' + version + '/organisation-details/trading-address-select');
                    }

                    else {
                        req.session.data.tradingAddressSelect = locationaddresses;
                        req.session.data.tradingaddressesnotfound = true;
                        res.redirect('/' + version + '/organisation-details/trading-address-manual');
                    }

                });

        }
        postcode(userpostcode);
        }

    else {
        res.redirect('/' + version + '/organisation-details/accounts');

    }
}

});



// Org details - Trading address select
router.get('/' + version + '/organisation-details/trading-address-select', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/trading-address-select', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/trading-address-select', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['tradingaddressSelect']



    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressSelect = {
            "anchor": "tradingaddressSelect",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/trading-address-select', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/organisation-details/trading-address-confirm');
    }    
});


// Org details - Trading address manual
router.get('/' + version + '/organisation-details/trading-address-manual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/trading-address-manual', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/trading-address-manual', function (req, res) {
    clearvalidation(req);
    var tradingaddressMLine1 = req.session.data['tradingaddressMLine1']
    var tradingaddressMTown = req.session.data['tradingaddressMTown']
    var tradingaddressMCounty = req.session.data['tradingaddressMCounty']

    var tradingaddressMPostcode = req.session.data['tradingaddressMPostcode']


    if (!tradingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMLine1 = {
            "anchor": "tradingaddressMLine1",
            "message": "Enter the street address",
        }
    }


    if (!tradingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMTown = {
            "anchor": "tradingaddressMTown",
            "message": "Enter the town or city",
        }
    }

    if (!tradingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMPostcode = {
            "anchor": "tradingaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/trading-address-manual', {
            data: req.session.data
        });
    }

    else {
        console.log("success");
            req.session.data.tradingaddressSelect = tradingaddressMLine1 + ', ' + tradingaddressMTown + ', ' + tradingaddressMCounty + ', ' + tradingaddressMPostcode;
            res.redirect('/' + version + '/organisation-details/trading-address-confirm');

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
            "message": "Select whether your organisation has a trading name"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/accounts', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/organisation-details/profit');
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
        }
        req.session.data['orgdetailscomplete'] = true;

        res.redirect('/' + version + '/organisation-details/structure');
    }

});

/// Org details - Structure
router.get('/' + version + '/organisation-details/structure', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/structure', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/structure', function (req, res) {
    clearvalidation(req);
    var orgparent = req.session.data['orgparent']



    if (!orgparent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.orgparent = {
            "anchor": "orgparent",
            "message": "Confirm your organisation structure"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/structure', {
            data: req.session.data
        });
    }
    else {
        if(orgparent == "Yes") {
            res.redirect('/' + version + '/organisation-details/parent-name');
        }
        else {
            res.redirect('/' + version + '/organisation-details/organisation-details');
        }
    }

});

/// Org details - Parent name
router.get('/' + version + '/organisation-details/parent-name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/parent-name', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/parent-name', function (req, res) {
    clearvalidation(req);
    var parentname = req.session.data['parentname']



    if (!parentname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentname = {
            "anchor": "parentname",
            "message": "Enter a parent organisation name"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/parent-name', {
            data: req.session.data
        });
    }
    else {

            res.redirect('/' + version + '/organisation-details/parent-address');
    }

});

// Org details - Parent address
router.get('/' + version + '/organisation-details/parent-address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/organisation-details/parent-address', {
        data: req.session.data
    });
});


router.post('/' + version + '/organisation-details/parent-address', function (req, res) {
    clearvalidation(req);
    var parentaddressMLine1 = req.session.data['parentaddressMLine1']
    var parentaddressMTown = req.session.data['parentaddressMTown']
    var parentaddressMCountry = req.session.data['parentaddressMCountry']
    var parentaddressMPostcode = req.session.data['parentaddressMPostcode']


    if (!parentaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentaddressMLine1 = {
            "anchor": "parentaddressMLine1",
            "message": "Enter the street address",
        }
    }


    if (!parentaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentaddressMTown = {
            "anchor": "parentaddressMTown",
            "message": "Enter the town or city",
        }
    }

    if (!parentaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentaddressMPostcode = {
            "anchor": "parentaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (!parentaddressMCountry) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.parentaddressMCountry = {
            "anchor": "parentaddressMCountry",
            "message": "Enter a country",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/organisation-details/parent-address', {
            data: req.session.data
        });
    }

    else {
            req.session.data.parentaddressSelect = parentaddressMLine1 + ', ' + parentaddressMTown + ', ' + parentaddressMPostcode + ', ' + parentaddressMCountry;
            res.redirect('/' + version + '/organisation-details/organisation-details');

        }

        

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
    var userfirstname = req.session.data['userfirstname']
    var userlastname = req.session.data['userlastname']
    var usertelephone = req.session.data['usertelephone']
    var usertelephonemobile = req.session.data['usertelephonemobile']
    var usertelephonelandline = req.session.data['usertelephonelandline']
    var userjobtitle = req.session.data['userjobtitle']


    if (!useremail) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.useremail = {
            "anchor": "useremail",
            "message": "Enter an email address"
        }
    }

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



    if (!userthirdparty) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userthirdparty = {
            "anchor": "userthirdparty",
            "message": "Select whether the user is a third party"
        }
    }


    if ((userthirdparty == "Yes") && !userorgname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.userorgname = {
            "anchor": "userorgname",
            "message": "Enter an organisation name"
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

    res.render('/' + version + '/manage-users/edit-user-permissions', {
        data: req.session.data
    });
});


router.post('/' + version + '/manage-users/edit-user-permissions', function (req, res) {
    clearvalidation(req);
    req.session.data['adduserpermissionstransfer' + req.session.data['userid']] = req.session.data['edituserpermissionstransfer']
    req.session.data['adduserpermissionsrightsandpowers' + req.session.data['userid']] = req.session.data['edituserpermissionsrightsandpowers']
    req.session.data['adduserpermissionsusermanagement' + req.session.data['userid']] = req.session.data['edituserpermissionsusermanagement']
    req.session.data['adduserpermissionsmonitoring' + req.session.data['userid']] = req.session.data['edituserpermissionsmonitoring']
    req.session.data['adduserpermissionsregistration' + req.session.data['userid']] = req.session.data['edituserpermissionsregistration']

    res.redirect('/' + version + '/manage-users/user-profile?notification=editpermissions&id='+ req.session.data['userid']);



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
        req.session.data.validationErrors.email = {
            "anchor": "regchange",
            "message": "Select a new regulatory contact"
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
    res.redirect('/' + version + '/manage-users?notification=reactivated');

});

/// Manage users
router.get('/' + version + '/manage-users', function (req, res) {
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
    var companynumber = req.session.data['companynumber']
    var accounttype = req.session.data['accounttype']

    

    if (!companynumber) {
        req.session.data.validationError = "true"
        if (accounttype == "Company registered in the UK") {
            req.session.data.validationErrors.companynumber = {
                "anchor": "companynumber",
                "message": "Enter a company number"
            }
        }
        else if (accounttype == "UK mutual society registered with the Financial Conduct Authority") {
            req.session.data.validationErrors.companynumber = {
                "anchor": "companynumber",
                "message": "Enter a registration number"
            }
        }
        else {
            req.session.data.validationErrors.companynumber = {
                "anchor": "companynumber",
                "message": "Enter a charity number"
            }

        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/account-creation/company-number', {
            data: req.session.data
        });
    }

    else {
        req.session.data.companyname = "Radianteco Ltd";
        req.session.data.tradingaddressSelect = "";
        res.redirect('/' + version + '/account-creation/company-confirm');
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
    var userpostcode = req.session.data['tradingaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2").replace(" ", "");
    var usernumber = req.session.data['tradingaddressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressPostcode = {
            "anchor": "tradingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    function validateUKPostcode(postcode) {
        const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|([A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
      
        return postcodeRegex.test(postcode);
      }

    if (!validateUKPostcode(userpostcode)) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressPostcode = {
            "anchor": "tradingaddressPostcode",
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
                    let parsed = JSON.parse(output).results;
                    let locationaddresses = [];
                    if (parsed != undefined) {

                        for (var i = 0; i < parsed.length; i++) {
                            let obj = parsed[i];
                            locationaddresses.push(obj.LPI.ADDRESS);
                        }

                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                        req.session.data.tradingaddressnotfound = "";
                        res.redirect('/' + version + '/account-creation/addressselect');
                    }

                    else {
                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                        req.session.data.tradingaddressnotfound = true;
                        res.render('/' + version + '/account-creation/addressmanual', {
                            data: req.session.data
                        });
                    }

                });

        }
        postcode(userpostcode);
        }


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
    var addressselect = req.session.data['tradingaddressSelect']



    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressSelect = {
            "anchor": "tradingaddressSelect",
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
    var tradingaddressMLine1 = req.session.data['tradingaddressMLine1']
    var tradingaddressMTown = req.session.data['tradingaddressMTown']
    var tradingaddressMCounty = req.session.data['tradingaddressMCounty']
    var tradingaddressMCountry = req.session.data['tradingaddressMCountry']
    var accounttype = req.session.data['accounttype']

    var tradingaddressMPostcode = req.session.data['tradingaddressMPostcode']


    if (!tradingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMLine1 = {
            "anchor": "tradingaddressMLine1",
            "message": "Enter the street address",
        }
    }


    if (!tradingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMTown = {
            "anchor": "tradingaddressMTown",
            "message": "Enter the town or city",
        }
    }

    if (!tradingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.tradingaddressMPostcode = {
            "anchor": "tradingaddressMPostcode",
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
            req.session.data.tradingaddressSelect = tradingaddressMLine1 + ', ' + tradingaddressMTown + ', ' + tradingaddressMPostcode + ', ' + tradingaddressMCountry
        } else {
            req.session.data.tradingaddressSelect = tradingaddressMLine1 + ', ' + tradingaddressMTown + ', ' + tradingaddressMCounty + ', ' + tradingaddressMPostcode
        }

        
            res.redirect('/' + version + '/account-creation/company-confirm');
    }
});





//////////////////////////////////////////////// Register a Heat Network ////////////////////////////////////////////////

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

// Introduction - Behalf
router.get('/' + version + '/add-heat-network/introduction/behalf', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/behalf', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/behalf', function (req, res) {
    clearvalidation(req);
    var introbehalf = req.session.data['introbehalf']

    if (!introbehalf) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introbehalf = {
            "anchor": "introbehalf",
            "message": "Select whether you are adding this heat network on behalf of anther organisation"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/behalf', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/introduction/declaration');
    }
});

// Introduction - Declaration
router.get('/' + version + '/add-heat-network/introduction/declaration', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/declaration', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/declaration', function (req, res) {
    clearvalidation(req);
    var declaration = req.session.data['declaration']

    if (declaration != "declaration1,declaration2") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.declaration = {
            "anchor": "declaration",
            "message": "Tick both declarations to continue"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/declaration', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/include');

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
            res.redirect(301, '/' + version + '/add-heat-network/introduction/howmany');

        }
        else {
            res.redirect(301, '/' + version + '/add-heat-network/introduction/energycentre');

        }
    }
});

// Introduction - Energycentre
router.get('/' + version + '/add-heat-network/introduction/energycentre', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/energycentre', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/energycentre', function (req, res) {
    clearvalidation(req);
    var energycentre = req.session.data['energycentre']

    if (!energycentre) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.energycentre = {
            "anchor": "energycentre",
            "message": "Select whether your organisation operates any energy centres"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/energycentre', {
            data: req.session.data
        });
    }

    else {
        res.redirect(301, '/' + version + '/add-heat-network/introduction/howmany');
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
            res.redirect(301, '/' + version + '/add-heat-network/introduction/sharedfacilities');
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
                    console.log(buildings, sharednumnber)
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
        console.log(userpostcode)
        console.log(validateUKPostcode(userpostcode))

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
            axios.get('https://api.os.uk/search/places/v2/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
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
                        res.redirect('/' + version + '/add-heat-network/energycentre/addressselect');
                            }

                    else {
                        req.session.data.validationError = "true"
                        req.session.data.validationErrors.ecaddressPostcode = {
                            "anchor": "ecaddressPostcode",
                            "message": "Enter a valid postcode",
                        }
                                
                        res.render('/' + version + '/add-heat-network/energycentre/address', {
                            data: req.session.data
                        });
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
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
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
        console.log(userpostcode)
        console.log(validateUKPostcode(userpostcode))

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

        console.log(buildings);
        console.log(role)
        if (buildings > 1) {
            if (role == "Network operator"){
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
            }

            else if (role != "Heat supplier"){
                res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/contract');
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
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/class');
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
            if (buildings > 1){
                if (buildingtype == "Residential" ) {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');
                }            }
            else {
                if (buildingtype == "Commercial" | commercialcustomers >= 1) {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/microbusinesses');
                }
                else {
                    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
                }   
            }
    
    
        }
    
    }


});

// Introduction - Sharedfacilities
router.get('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities', function (req, res) {
    clearvalidation(req);
    var sharedfacilities = req.session.data['sharedfacilities']


    if (!sharedfacilities) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.sharedfacilities = {
            "anchor": "sharedfacilities",
            "message": "Select if there are any shared facilities"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/sharedfacilities', {
            data: req.session.data
        });
    }

    else {

            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/buildings');

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
        res.redirect('/' + version + '/add-heat-network/billing/available');
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

