const connection = require('../lib/database');
module.exports = function(app, passport){
    app.get('/account_verificationn', (req, res) => {
        if(req.session.loggedin){
            res.render('./account/accountVerification.ejs',{
                title: 'Account Verification',
                 loginmsg: req.session.loggedin
            })
        }else{
            res.render('./account/profile.ejs', {
                title: 'Account'
            })
        }
    })
    app.post('/account_verification', (req, res) => {
        var html = `
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <i class="fas fa-address-card mr-1"></i> Account Verification
                            <section class="content-header"></section>
                            <div class="row">
                                <div class="col-sm-12 text-center">
                                    <div class="card">
                                    `;

        if(!req.session.loggedin){
            if(req.body.verify == 0){
                connection.query('UPDATE user01y SET verify=0 WHERE `userId` = ? order by id desc limit 1', ['bb'], function(error, results) {})
            }else if(req.body.verify == 1){
                connection.query('UPDATE user01y SET verify=1 WHERE `userId` = ? order by id desc limit 1', ['bb'], function(error, results) {})
            }
            connection.query('SELECT * FROM user01y WHERE `userId` = ? order by id desc limit 1', ['bb'], function(error, results) {
                if (results.length > 0) {
                    if(results[0].verify == 0){
                        html += `
                        <div class="card-header">
                            <span class="btn btn-circle btn-sm btn-success">1</span>
                            <span class=" text-bold">&nbsp;&nbsp; Overview </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">2</span>
                            <span>&nbsp;&nbsp; Phone Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">3</span>
                            <span>&nbsp;&nbsp; Email Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">4</span>
                            <span>&nbsp;&nbsp; Document Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">5</span>
                            <span>&nbsp;&nbsp; Successful </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-8">
                                <div class="card bg-light"><label>Account succesfully created.</label>
                                    <div class="card-body text-left">
                                        <label>Fullname: </label> `+results[0].fullname+`<br>
                                        <label>Username: </label> `+results[0].userId+`
                                    </div>
                                    <div class="card-footer">
                                        <input type="checkbox"> I agree for all condition
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-center" style="background: none;">
                            <span class="btn btn-default ">Cancel</span> 
                            <span class="btn btn-success account-verification" verify="1">Next</span>
                        `;
                    }else if(results[0].verify == 1){
                        html += `
                        <div class="card-header">
                            <span class="btn btn-circle btn-sm btn-success">1</span>
                            <span class=" text-bold">&nbsp;&nbsp; Overview </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">2</span>
                            <span class="text-bold">&nbsp;&nbsp; Phone Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">3</span>
                            <span>&nbsp;&nbsp; Email Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">4</span>
                                <span>&nbsp;&nbsp; Document Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                                <span class="btn btn-sm btn-default btn-circle">5</span>
                                <span>&nbsp;&nbsp; Successful </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-8">
                                <div class="card bg-light"><label>Phone verification </label><span class="notice"></span>
                                    <div class="card-body text-left">
                                        <label>Enter Personal Phone (+88): </label> <input id="phone-verification-num" type="number" placeholder="01200001111">
                                    </div>
                                    <div class="card-footer">
                                        <span class="btn btn-success phone-verification">Save</span>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-center" style="background: none;">
                            <span class="btn btn-default ">Cancel</span> 
                            <span class="btn btn-success account-verification" verify="2">Next</span>
                        `;
                    }else if(results[0].verify == 2){
                        html += `
                        <div class="card-header">
                            <span class="btn btn-circle btn-sm btn-success">1</span>
                            <span class=" text-bold">&nbsp;&nbsp; Overview </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">2</span>
                            <span class="text-bold">&nbsp;&nbsp; Phone Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">3</span>
                            <span class="text-bold">&nbsp;&nbsp; Email Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">4</span>
                                <span>&nbsp;&nbsp; Document Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                                <span class="btn btn-sm btn-default btn-circle">5</span>
                                <span>&nbsp;&nbsp; Successful </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-8">
                                <div class="card bg-light"><label>Email verification</label> <span class="notice"></span>
                                    <div class="card-body text-left">
                                        <label>Enter Your Email: </label> <input id="email-verification" type="email" placeholder="example01@gmail.com"><br>
                                        <span class="emailpin d-none"><label>Email pin number: </label> <input id="emailPin" type="number" placeholder="228800"></span>
                                    </div>
                                    <div class="card-footer">
                                        <span class="btn btn-success email-verification">Save</span>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-center" style="background: none;">
                            <span class="btn btn-default ">Cancel</span> 
                            <span class="btn btn-success account-verification" verify="3">Next</span>
                        `;
                    }else if(results[0].verify == 3){
                        html += `
                        <div class="card-header">
                            <span class="btn btn-circle btn-sm btn-success">1</span>
                            <span class=" text-bold">&nbsp;&nbsp; Overview </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">2</span>
                            <span class="text-bold">&nbsp;&nbsp; Phone Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">3</span>
                            <span class="text-bold">&nbsp;&nbsp; Email Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">4</span>
                            <span class="text-bold">&nbsp;&nbsp; Document Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-default btn-circle">5</span>
                            <span>&nbsp;&nbsp; Successful </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-8">
                                <div class="card bg-light"><label>Document verification</label><span class="notice"></span>
                                    <div class="card-body text-left">
                                        Enter Your NID Card
                                        <img src="./dist/img/idcard.jpg" width="100" height="100" class="img-circle"><br><br>
                                        <label>Enter Your NID: </label> <input id="accountNid" type="file" accept="image/*" capture>
                                    </div>
                                    <div class="card-footer">
                                        <span class="btn btn-success document-verification">Save</span>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-center" style="background: none;">
                            <span class="btn btn-default ">Cancel</span> 
                            <span class="btn btn-success account-verification" verify="4">Next</span>
                        `;
                    }else if(results[0].verify == 4){
                        html += `
                        <div class="card-header">
                            <span class="btn btn-circle btn-sm btn-success">1</span>
                            <span class=" text-bold">&nbsp;&nbsp; Overview </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">2</span>
                            <span class="text-bold">&nbsp;&nbsp; Phone Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">3</span>
                            <span class="text-bold">&nbsp;&nbsp; Email Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">4</span>
                            <span class="text-bold">&nbsp;&nbsp; Document Verification </span> &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                            <span class="btn btn-sm btn-success btn-circle">5</span>
                            <span class="text-bold">&nbsp;&nbsp; Successful </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                              <div class="col-lg-4"></div>
                              <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="./dist/img/done.png" width="100" height="100" class="img-circle"><br><br>
                                        <label class="text-success">Verification Successful</label>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <div class="btn btn-success account-verification" verify="0">Preview & Change</div>
                        `;
                    }
                    
                    html += `
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script src="js/accountVerification.js"></script>
                    `;
                    return res.json([{
                        message: 'Yes of course!',
                        result: html
                    }])
                }
            });
            
            
            
        }else{
            return res.json([{
                message: 'Not now',
                result: 'Please login'
            }])
        }
    })
    app.post('/phone_verification_num', (req, res) => {
        if(req.body.verify.match("^(?:\\+88|88)?(01[3-9]\\d{8})$")){}else{
            return res.json([{
                message: 'Not now!',
                result: '<span class="text-danger">Invalid Phone!</span>'
            }])
        }
        connection.query('SELECT * FROM `user01y` WHERE `phone` = ?', [req.body.verify], function(error, result) {
            if(result.length == 0){
                connection.query('UPDATE `user01y` SET `phone`=?,`verify`=2 WHERE `userId`=? ', [req.body.verify,'bb'], function(err, rest) {
                    if(err){
                        return res.json([{
                            message: 'Yes of course',
                            result: err
                        }])
                    }else{
                        return res.json([{
                            message: 'Yes of course',
                            result: '<span class="text-success">Succesful</span>'
                        }])
                    }
                })
            }else{
                return res.json([{
                    message: 'Not now!',
                    result: '<span class="text-danger">Already exist!</span>'
                }])
            }
        })
    })
    app.post('/email_verification', (req, res) => {
        if(req.body.verify.match("[a-zA-Z0-9]+\@gmail.com")){}else{
            return res.json([{
                message: 'Not now!',
                result: '<span class="text-danger">Invalid Email!</span>'
            }])
        }
        connection.query('SELECT * FROM `user01y` WHERE `email` = ?', [req.body.verify], function(error, result) {
            if(result.length == 0){
                connection.query('UPDATE `user01y` SET `email`=?,`verify`=3 WHERE `userId`=? ', [req.body.verify,'bb'], function(err, rest) {
                    if(err){
                        return res.json([{
                            message: 'Not now!',
                            result: err
                        }])
                    }else{
                        return res.json([{
                            message: 'Yes of course',
                            result: '<span class="text-success">Succesful</span>'
                        }])
                    }
                })
            }else{
                return res.json([{
                    message: 'Not now!',
                    result: '<span class="text-danger">Already exist!</span>'
                }])
            }
        })
    })
    app.post('/document_verification', (req, res) => {
        if(req.body.verify){
            return res.json([{
                message: 'Not now!',
                result: req.body.verify
            }])
        }else{
            return res.json([{
                message: 'Not now!',
                result: '<span class="text-danger">Enter Your NID!</span>'
            }])
        }
        connection.query('SELECT * FROM `user01y` WHERE `document` = ?', [req.body.verify], function(error, result) {
            if(result.length == 0){
                connection.query('UPDATE `user01y` SET `document`=?,`verify`=3 WHERE `userId`=? ', [req.body.verify,'bb'], function(err, rest) {
                    if(err){
                        return res.json([{
                            message: 'Not now!',
                            result: err
                        }])
                    }else{
                        return res.json([{
                            message: 'Yes of course',
                            result: '<span class="text-success">Succesful</span>'
                        }])
                    }
                })
            }else{
                return res.json([{
                    message: 'Not now!',
                    result: '<span class="text-danger">Already exist!</span>'
                }])
            }
        })
    })
}