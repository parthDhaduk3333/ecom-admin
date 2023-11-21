import Country from "../../models/Country";
import User from "../../models/User";
import CustomErrorHandler from "../../services/customErrorHandler";

class UserController {
    async users(req, res, next) {
        try {
            const users = await User.find({});
            return res.render('users', { users })
        } catch (err) {
            return next(err);
        }
    }
    async Country(req, res, next) {
        try {
            const countries = await Country.find({});
            return res.render('Country', { countries })
        } catch (err) {
            return next(err)
        }
    }
    async addCountry(req, res, next) {
        const { country, charge } = req.body;
        if (!country || !charge) {
            return next(CustomErrorHandler.error(400, "Please enter all Details"));
        }
        try {
            await Country.create({ name: country, charge })
            return res.redirect("back")
        } catch (err) {
            return next(err)
        }
    }
    async deleteCountry(req, res, next) {
        const { country } = req.query;
        try {
            await Country.findByIdAndDelete(country);
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async updateCountry(req, res, next) {
        const { country, charge, id } = req.body;
        if (!country || !charge) {
            return next(CustomErrorHandler.error(400, "Please enter all Details"));
        }
        try {
            await Country.findByIdAndUpdate(id, { name: country, charge })
            return res.redirect("back")
        } catch (err) {
            return next(err)
        }
    }
}

export default new UserController();