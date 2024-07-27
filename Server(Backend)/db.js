//npm install pg
//DATABASE FINISHED!
const {Pool} = require('pg')
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'Online Library Management System', //What did you call the postgres file? put it here!
    password: '0910393428',
    port: '5432'
})
pool.query('SELECT NOW()',(err,res)=>{
    if(err) {console.log('error ',err.stack)}
    else {console.log('connected: ',res.rows)}
}) 

//get all Authors , Genres , Books , Borrowers , Borrowing_Records !

const allauthors = async()=>{
    try{ const result = await pool.query('SELECT * FROM Authors') 
    console.log(result.rows)
    return (result.rows)}
    catch(err){ console.log('error:', err.stack )} 
} 
const allbooks = async()=>{
    try{ const result = await pool.query('SELECT * FROM Books') //I assume books table title is 'Books'
    console.log(result.rows)
    return (result.rows)}
    catch(err){ console.log('error:', err.stack )} 
} 
const allgenres = async()=>{
    try{ const result = await pool.query('SELECT * FROM Genres') //I assume genres table title is 'Genres'
    console.log(result.rows)
    return (result.rows)}
    catch(err){ console.log('error:', err.stack )} 
} 
const allborrowers = async()=>{
    try{ const result = await pool.query('SELECT * FROM Borrowers') //I assume borrowers table title is 'Borrowers'
    console.log(result.rows)
    return (result.rows)}
    catch(err){ console.log('error:', err.stack )} 
} 
const allborrowingrecords = async()=>{
    try{ const result = await pool.query('SELECT * FROM Borrowing_records') //I assume borrowing records table title is 'Borrowing_records'
    console.log(result.rows)
    return (result.rows)}
    catch(err){ console.log('error:', err.stack )} 
} 
//get a specific specific book , specific borrower , specific borrowerrecord! 
//!!!!!I USED RETURNING* and result.rows[0] for to get specific below,could be wrong!!!!
const specificauthor = async(author_id)=>{
    try{ const result = await pool.query('SELECT FROM Authors WHERE author_id=$1 RETURNING*', [author_id],)
        console.log(result.rows[0])
        return(result.rows[0])}
   catch(err){console.log('error',err.stack)}
}
const specificgenere = async(genre_id)=>{
    try{ const result = await pool.query('SELECT FROM Genres WHERE genre_id=$1 RETURNING*', [genre_id],)
        console.log(result.rows[0])  
        return(result.rows[0])}
   catch(err){console.log('error',err.stack)}
}
const specificbook = async(book_id)=>{
    try{ const result = await pool.query('SELECT FROM Books WHERE book_id=$1 RETURNING*', [book_id],)
        console.log(result.rows[0])
        return(result.rows[0])}
   catch(err){console.log('error',err.stack)}
}
const specificborrower = async(borrower_name)=>{
    try{ const result = await pool.query('SELECT FROM Borrowers WHERE borrower_id=$1 RETURNING*', [borrower_id],)
        console.log(result.rows[0])
        return(result.rows[0])}
   catch(err){console.log('error',err.stack)}
}
const specificborrowingrecord = async(record_id)=>{
    try{ const result = await pool.query('SELECT FROM Borrowing_records WHERE record_id=$1 RETURNING*', [record_id],)
        console.log(result.rows[0])
        return(result.rows[0])}
   catch(err){console.log('error',err.stack)}
}
//Delete Book , Borrower , Borrower record !!!! I made Book primary Title not id!!!
const deletebook = async(book_id)=>{ 
    try{
    const result = await pool.query('DELETE FROM Books WHERE book_id=$1 RETURNING*',[book_id])
    console.log(result.rows[0])
    return result.rows[0]}
    catch(err){console.log('error',err.satck)}
}
const deleteborrower = async(borrower_id)=>{ 
    try{
    const result = await pool.query('DELETE FROM Borrowers WHERE borrower_id=$1 RETURNING*',[borrower_id])
    console.log(result.rows[0])
    return result.rows[0]}
    catch(err){console.log('error',err.satck)}
}
const deleteborrowingrecord = async(record_id)=>{ 
    try{
    const result = await pool.query('DELETE FROM Borrowing_records WHERE record_id=$1 RETURNING*',[record_id])
    console.log(result.rows[0])
    return result.rows[0]}
    catch(err){console.log('error',err.satck)}
}
//Create Book,Borrower,Borrowing Record
const createbook = async(title ,author_id,genre_id, PublicationYear,ISBN,copies_available)=>{
    try{
const result = await pool.query('INSERT INTO Books (title ,author_id,genre_id, PublicationYear,ISBN,copies_available) VALUES ($1,$2,$3,$4,$5,$6) RETURNING*',[title ,author_id,genre_id, PublicationYear,ISBN,copies_available])
    }
    catch(err){console.log('error: ',err.stack)}
}
const createborrower = async(borrower_name, address, phone, email)=>{
    try{
const result = await pool.query('INSERT INTO Borrowers (borrower_name, address, phone, email) VALUES ($1,$2,$3,$4) RETURNING*',[borrower_name, address, phone, email] )
    }
    catch(err){console.log('error: ',err.stack)}
}
const createborrowingrecord = async(book_id,borrower_id, borrow_date)=>{
    try{
const result = await pool.query('INSERT INTO Borrowing_records (book_id,borrower_id, borrow_date) VALUES ($1,$2,$3) RETURNING*',[book_id,borrower_id, borrow_date] )
    }
    catch(err){console.log('error: ',err.stack)}
}
//UPDATE BOOK,BORROWER,BORROWING RECORD BELOW!
const updatespecificbook = async(book_id,title,author_id,genre_id,PublicationYear,ISBN,copies_available)=>{
    try{
          const result= await pool.query('UPDATE Books SET (title=$2,author_id=$3,genre_id=$4,PublicationYear=$5,ISBN=$6,copies_available=$7) WHERE book_id=$1 RETURNING*',[book_id,title,author_id,genre_id,PublicationYear,ISBN,copies_available])
          console.log(result.rows[0])
          return result.rows[0]
    } 
    catch(err){console.log('error: ',err.stack)}
}
const updatespecificborrower = async(borrower_id,borrower_name,address,phone,email)=>{
    try{
          const result= await pool.query('UPDATE Borrowers SET (borrower_name=$2,address=$3,phone=$4,email=$5) WHERE borrower_id=$1 RETURNING*',[borrower_id,borrower_name,address,phone,email])
          console.log(result.rows[0])
          return result.rows[0]
    }
    catch(err){console.log('error: ',err.stack)}
}
const updatespecificborrowingrecord = async(record_id,book_id,borrower_id,borrow_date)=>{
    try{
          const result= await pool.query('UPDATE Borrowers SET (book_id=$2,borrower_id=$3,borrow_date=$4) WHERE record_id=$1 RETURNING*',[record_id,book_id,borrower_id,borrow_date])
          console.log(result.rows[0])
          return result.rows[0]
    }
    catch(err){console.log('error: ',err.stack)}
}

//Exporting all functions publicly
module.exports = {allauthors , allgenres , allbooks , allborrowers , allborrowingrecords , specificbook, specificborrower, specificborrowingrecord, deletebook, deleteborrower, deleteborrowingrecord, createbook, createborrower, createborrowingrecord, updatespecificbook,updatespecificborrower,updatespecificborrowingrecord}
//Finished