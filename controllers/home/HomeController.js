import User from '../../models/User';
class HomeController {
    async home (req,res,next) {
        return res.render('index')
    }
};

export default new HomeController();