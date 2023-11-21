class LoginController {
    async login(req, res, next) {
        return res.render('login');
    }
    async loginData (req,res,next) {
        console.log("works");
        return res.redirect('/')
    }
}

export default new LoginController();