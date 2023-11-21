class Auth {
    async loginCheck(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        return next();
    }
    async authCheck(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
}

export default new Auth();