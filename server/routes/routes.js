module.exports = function(app, events) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    function mySetHeader(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.setHeader('Content-Type', 'application/json'); // If needed

    }
    app.post('/getEvents', function(req, res) {
        mySetHeader(res);
        events.find({}, function (err, events) {
            res.json(events);
        });
    });

    app.post('/createEvent',function (req, res){
        mySetHeader(res);
        let title = req.body.title,
            text = req.body.text,
            date = req.body.date;

        let event = new events();
        event.title = title;
        event.text = text;
        event.date = date;
        event.id = event._id ;

        event.save(function (err) {
            if (err) {
                res.status(500);
                return;
            }
        });

        res.json(event);
    });

    app.post('/deleteEvent', function(req, res) {
        mySetHeader(res);
        let id = req.body.id;
        events.findById(id, function (err , Obj) {
            Obj.remove()
        });
        res.json({answer: true})
    });

    app.put('/editEvent', function(req, res) {
        mySetHeader(res);
        let data = req.body;
        events.findById(data.id , function (err , Obj) {
            Obj.title = data.title;
            Obj.text = data.text;
            Obj.date = data.date;
            Obj.save();
        });
         res.json(data)
    });
};