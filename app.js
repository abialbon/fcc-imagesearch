const
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    google      = require("google-images"),
    CSE_ID      = process.env.CSE_ID,
    API_KEY     = process.env.API_KEY,
    searcher    = new google(CSE_ID, API_KEY),
    Search      = require("./models/search.js"),
    PORT        = process.env.PORT || 3000,
    IP          = process.env.IP || '127.0.0.1',
    DB_URL      = process.env.DB_URL;
    
mongoose.connect(DB_URL);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   res.render('index'); 
});

app.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    const offset = req.query.offset ? req.query.offset : 1;
    
    Search.create({ searchTerm : searchTerm }, (error, data) => {
       if (error) {
           console.log('Failed to save to database!');
       } else {
           console.log('Search term saved to database!');
       }
    });
    
    searcher.search(searchTerm, { page: offset})
        .then((images) => {
            res.json(images);
        })
});

app.get('/api/recentsearches', (req, res) => {
    Search.find({}, (error, searches) => {
        res.json(searches.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))); 
   });
});

app.listen(PORT, IP, () => {
   console.log('The app is now running!') 
});