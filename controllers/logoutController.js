exports.logoutPost = (req, res) => {
    req.logout(
        (err) => {
            if(err) throw err;
            res.redirect('/');
        }
    )
}