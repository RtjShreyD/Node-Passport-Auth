const User = require("../models/User");
const nodemailer = require("nodemailer");
const utility = require("./utility");
const bcrypt = require('bcryptjs');
const passport = require('passport');

var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shreyanshece1041@gmail.com',
        pass: 'lwlymzpjnxfnflul'
    }
});


const createPerson = (req, res) => {
    const { name, email, password, password2 } = req.body;
  
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }

    else {
        // Validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({ msg: 'Email already exists' });
                    //User exists
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else 
                {
                    let temp = ""
                    // generateOTP
                    let otpStr = utility.generateOTP().toString();
                    console.log(otpStr);
                    
                    //hash the OTP
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(otpStr, salt, (err, otphash) => {
                            if(err) throw err;
                            temp = otphash;
                            console.log("OTP hashed saving to temp");
                            console.log(temp);
                        })
                    });

                    // create new user
                    console.log("hashed otp goint inside User obj", temp);
                    const newUser = new User({
                        name,
                        email,
                        password,
                        temp
                    });
                   
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => {
                        console.log("Temp value in hash password before saving user", temp)
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{ 
                            if(err) throw err;
                            // Set password to hasg
                            newUser.password = hash;
                            newUser.temp = temp;

                            //Save the user
                            newUser.save()
                                .then(user => {
                                    console.log("Temp value currently at saving", newUser.temp)
                                    req.flash('success_msg', 'You are now registered and need to verify email to login.');
                                    var mailOptions = {
                                        from: 'shreyanshece1041@gmail.com',
                                        to: newUser.email,
                                        subject: 'OTP for verification',
                                        text: otpStr
                                    };
                            
                                    console.log(mailOptions);
                                      
                                    mail.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log('Email sent: ' + info.response);
                                        }
                                    });
                                    
                                    res.redirect('/users/verifyotp');
                                })
                                .catch(err => console.log(err));
                        });
                    });


                }
            });
    }

};

const loginPerson = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true
    })(req, res, next);
};

const logoutPerson = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};

module.exports = { createPerson, loginPerson, logoutPerson };