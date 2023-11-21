import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import CustomErrorHandler from "../../services/customErrorHandler";

class CategoryController {
    async category(req, res, next) {
        try {
            const categories = await Category.find({});
            return res.render('category', { categories });
        } catch (err) {
            return next(err);
        }
    }
    async addcategory(req, res, next) {
        const { category } = req.body;
        if (!category) {
            return next(CustomErrorHandler.error(400, "Please enter all Details"));
        }
        try {
            const exists = await Category.exists({name:category})
            if (exists) {
                return next(CustomErrorHandler.error("This Category is already exists"))
            }
            await Category.create({ name: category })
            return res.redirect("back")
        } catch (err) {
            return next(err)
        }
    }
    async deletecategory(req, res, next) {
        const { category } = req.query;
        if (!category) {
            return next(CustomErrorHandler.error(400, "Please enter category"))
        }
        try {
            const subcategories = await SubCategory.find({category})
            subcategories.map(async item => {
                await SubCategory.findByIdAndDelete(item._id)
            })
        } catch (err) {
            return next(err);
        }
        try {
            await Category.findByIdAndDelete(category)
        } catch (err) {
            return next(err)
        }
        return res.redirect('back')
    }
}

export default new CategoryController();