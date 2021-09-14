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

// we are inserting the data in the table
knex('user').insert({ id: 4, first_name: 'seema', last_name: 'kumari' })
.then((data)=>{
    console.log("insert data");
}).catch((err)=>{
    console.log(err)
})

// we are gettting the data from table 
knex.select('*').from('user')
.then((data)=>{
    // console.log(data)
}).catch((err)=>{
    // console.log(err)
})

// update the data in table
knex.update({id:10,first_name: 'anchal', last_name: 'prasad'})
.table('user').where("id",7).then((data)=>{
    // console.log("updating");
}).catch((err)=>{
    // console.log("not updating")
})

// delete the data from table
knex('user').where('id',3).del().then((data)=>{
    // console.log("delete")
}).catch((err)=>{
    // console.log(err)
})