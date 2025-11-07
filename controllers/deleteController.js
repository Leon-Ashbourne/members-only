const query = require("../models/query"); 


const messageIdGet = (req, res, next) => {
    const id = req.body.msgId;
    res.locals.id = id;

    next();
};

const deleteMessagePost = async (req, res) => {
    const { id } = res.locals;

    await query.deleteMessagePost(id);
    res.redirect("/");
}


exports.deletePost = [
    (req, res, next) => {
        let status;
        if(req.user) {
            status = req.user.status;
        }else {
            return res.redirect("/log-in");
        };

        if(status === "admin") next();
        else res.redirect("/");
    },
    messageIdGet,
    deleteMessagePost
]