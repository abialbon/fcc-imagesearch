const
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    google      = require("google-images"),
    PORT        = process.env.PORT || 3000,
    IP          = process.env.IP || '127.0.0.1';
    
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   res.render('index'); 
});

app.listen(PORT, IP, () => {
   console.log('The app is now running!') 
});