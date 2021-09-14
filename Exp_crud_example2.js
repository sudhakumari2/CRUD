const express = require('express')
const app = express();
app.use(express.json())
const port = 5000;
// DataBase conection:-
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Sudha@123',
      database : 'sudhakumari'
    }
});
knex.schema.hasTable("usersContactDetail").then(function (exists) {
	if (!exists) {
		return knex.schema.createTable("usersContactDetail", function (t) {
			t.increments("id").primary();
			t.string('email')
			t.string("name");
			t.string("role");
			t.string("contactNumber");
			t.string("message");
		});
	}
});
app.post('/createmydata', (req, res) => {
    knex('usersContactDetail').insert({
        email: req.body.email,
        name: req.body.name,
        role:req.body.role,
        contactNumber:req.body.contactNumber,
        message:req.body.message
    }).then(() => {
        console.log(' crete!...')
        res.send('create')
    }).catch((er) => {
        console.log(er);
        res.send(er)
    })

})
// Getting all customer data:-
app.get('/getcontactdata',(req,res) => {
    knex().select('*')
    .from('usersContactDetail')
    .then((data) =>{
        console.log('data is coming!....');
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})
// update particular data the  by id :-
app.put('/updating/:id',(req,res) => {
    knex.update(
        req.body
    )
    .table('usersContactDetail').where('id',req.params.id)
    .then(() => {
        res.send('data updating....')
    })
    .catch((err) => {
        res.send(err)
    })
})

// delete the data by id
app.delete('/deletingdata/:id',(req,res) => {
    knex('usersContactDetail')
    .where({'id':req.params.id}).del()
    .then(() => {
        res.send('data deleted!!')
    })
    .catch((err) => {
        res.send(err)
    })
})

app.listen(port,() => {
    console.log(`your port is working ${port}`)
})