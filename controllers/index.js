const connection = require('../lib/database');
const bcrypt = require('bcrypt');
const users = [];
module.exports = function(app,passport) {
    app.get('/', (req, res) => {
        var currency = 'Skrill';
        connection.query('SELECT * FROM `currency`', function(error, results) {
            if (results.length > 0) {
                currency = results              
            }else{
                currency = 'null' 
            }
            if(req.session.loggedin){
            res.render('index.ejs', {
                title: 'Home',
                loginmsg: req.session.username,
                currency: currency
            })
        }else{
            res.render('index.ejs',{
                currency: currency
            })
        }
        });
        
        
    })

    app.get('/login', (req, res) => {
        res.render('login.ejs')
    })
    app.post(
        '/logininnn', 
        passport.authenticate('signin-check', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            console.log("hello-login");
        }
    );
    app.post('/loginin', async (req, res) => {
        try{
            if(req.body.email == ''){
                res.render('login.ejs',{message: 'Email/userId feild empty!'})
            }else if(req.body.password == ''){
                res.render('login.ejs',{message: 'Password feild empty!'})
            }else{
                //const pass = await bcrypt.hash(req.body.password, 10);
                const pass = req.body.password;
                const username = req.body.email;
                connection.query('SELECT * FROM user01y WHERE `userId` = ?', [username], function(error, results, fields) {
                    if (results.length > 0) {
                        if(results[0].password === pass){
                            req.session.loggedin = true;
                            req.session.username = username;
                            //res.render('login.ejs',{loginmsg: 'okk!'})
                            res.redirect('/home') 
                        }else{
                            res.render('login.ejs',{message: 'Incorrect password!'})
                        }
                    } else {
                        res.render('login.ejs',{message: 'Incorrect userId!'})
                    }			
                    res.end();
                });
            }
        }catch (e){
            console.log(e)
        }
    })
    app.get('/home', (req, res) => {
        res.redirect('/')
    })

    app.get('/register', (req, res) => {
        res.render('register.ejs')
    })
    app.post('/register', (req, res) => {
        try {
            if(req.body.fullname == ''){
                res.render('register.ejs', {message: 'Fullname feild is empty!'})
            }else if(req.body.email == ''){
                res.render('register.ejs', {message: 'Email/userId feild is empty!'})
            }else if(req.body.password == ''){
                res.render('register.ejs', {message: 'Password feild is empty!'})
            }else if(req.body.repass == ''){
                res.render('register.ejs', {message: 'Retype password feild is empty!'})
            }else if(req.body.password !== req.body.repass){
                res.render('register.ejs', {message: 'Password doesnt match!'})
            }else{
                var fullname = req.body.fullname;
                var email = req.body.email;
                var pass = req.body.password;
                var userform = {
                    fullname: fullname,
                    userId: email,
                    password: pass
                }
                connection.query('SELECT * FROM user01y WHERE `userId` = ?', [email], function(error, results) {
                    if (results.length > 0) {
                        res.render('register.ejs', {message: 'Email/userId already exist!'})
                    } else {
                        connection.query('INSERT INTO `user01y` SET ?',userform, function(err,result){
                            if(result){
                                console.log('success');
                            }else{
                                console.log(err)
                            }
                        })
                        connection.query('SELECT * FROM user01y WHERE `userId` = ?', [email], function(error, results) {
                            if(results.length === 1){
                                return res.render('register.ejs',{message: 'Successful'})
                            }else{
                                return res.render('register.ejs',{message: 'Try again'})
                            }
                        })
                    }			
                    res.end();
                });
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })
    app.get('/account', (req, res) => {
        if(req.session.loggedin){
            connection.query('SELECT * FROM user01y WHERE `userId` = ? order by id desc limit 1', [req.session.username], function(error, results) {
                if (results.length > 0) {
                    //res.render('register.ejs', {message: 'Email/userId already exist!'})
                    res.render('./account/profile.ejs', {
                        title: 'Account',
                        loginmsg: req.session.username,
                        account: results
                    })
                }			
            });
        }else{
            res.render('./account/profile.ejs', {
                title: 'Account'
            })
        }
    })
    
    app.post('/currencyAvailable', (req, res) => {
        connection.query('SELECT * FROM `currency`', function(error, results) {
            if (results.length > 0) {
                return res.json([{
                    message: 'Yes of course!',
                    data: results
                }])
            }else{
                return res.json([{
                    message: 'Not now',
                    data: ' (empty)'
                }])
            }			
            res.end();
        });
    })
    app.post('/currencyReceive', (req, res) => {
        connection.query('SELECT * FROM `currency` WHERE `id`!=?',[req.body.currencyId], function(error, results) {
            if (results.length > 0) {
                return res.json([{
                    message: 'Yes of course!',
                    data: results
                }])
            }else{
                return res.json([{
                    message: 'Not now',
                    data: ' (empty)'
                }])
            }			
            res.end();
        });
    })
    app.post('/currencyBuySell', (req, res) => {
        connection.query('SELECT * FROM `currency` limit 5', function (err, result){
            if(result.length > 0){
                return res.json([{
                    message: 'Yes of course',
                    data: result
                }])
            }else{
                return res.json([{
                    message: 'Not now',
                    data: ' (empty)'
                }])
            }
        })
    })
    app.post('/currencyExchange', (req, res) => {
        connection.query('SELECT * FROM `exchange` limit 5', function(err, result) {
            if(result.length > 0){
                return res.json([{
                    message: 'Yes of course',
                    data: result
                }])
            }else{
                return res.json([{
                    message: 'Not now',
                    data: ' (empty)'
                }])
            }
        })
    })
}
