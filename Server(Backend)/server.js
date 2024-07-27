//npm install express , npm install lodash!,
//use host:3000/all-authors or all-genres or all-books or all-borrowers or all-borrowingrecords
// or specificbook or specificborrower or specificborrowingrecord
//or deletebook or delete borrower or deleteborrowingrecord        and author
//or createbook or createborrower or createborrowingrecord         
//or updatebook or updateborrower or updateborrowingrecord
//SERVER FINISHED!
const express = require('express')
const path= require('path')
const {allauthors , allgenres , allbooks , allborrowers , allborrowingrecords , specificbook, specificborrower, specificborrowingrecord, deletebook, deleteborrower, deleteborrowingrecord, createbook, createborrower, createborrowingrecord, updatespecificbook,updatespecificborrower,updatespecificborrowingrecord} = require('./db')
const app = express()
app.use(express.static(path.join(__dirname,'../Client(Frontend)'))) //npm install path
app.use(express.json())
const PORT = 3000
app.listen(PORT,()=>{console.log('listening to: ',PORT)})

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'../Client(Frontend)/index.html'))})  //npm insatl path

//get all Authors , Genres , Books , Borrowers , Borrowing_Records !!!!

app.get('/all-authors',async(req,res)=>{
    try{
        const result = await allauthors()
        res.send(result)
    }
    catch(err){ console.log('error ',err)}
})

app.get('/all-genres',async(req,res)=>{
    try{
        const result = await allgenres()
        res.send(result)
    }
    catch(err){ console.log('error ',err)}
})

app.get('/all-books',async(req,res)=>{
    try{
        const result = await allbooks()
        res.send(result)
    }
    catch(err){ console.log('error ',err)}
})

app.get('/all-borrowers',async(req,res)=>{
    try{
        const result = await allborrowers()
        res.send(result)
    }
    catch(err){ console.log('error ',err)}
})

app.get('/all-borrowingrecords',async(req,res)=>{
    try{
        const result = await allborrowingrecords()
        res.send(result)
    }
    catch(err){ console.log('error ',err)}
})

//get a specific author, specific genre , specific book , specific borrower , specific borrowrecord!
//!!!!!I USED RETURNING* and result.rows[0] to get specific author, could be wrong!!!!
app.get('/specificauthor', async(req,res)=>{
    try{
        let author_id=1      
        const result = await specificauthor(author_id)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})
app.get('/specificgenre', async(req,res)=>{
    try{
        let genre_id=1      
        const result = await specificgenre(genre_id)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})

app.get('/specificbook', async(req,res)=>{
    try{
        let book_id=1      
        const result = await specificbook(book_id)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})
app.get('/specificborrower', async(req,res)=>{
    try{
        let borrower_id=1                        
        const result = await specificborrower(borrower_id)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})
app.get('/specificborrowingrecord', async(req,res)=>{
    try{
        let record_id = 1                                    
        const result = await specificrecord(record_id)
        res.send(result)
    }
    catch(err){console.log('error',err)}
})
//Delete Book, Borrower and BorrowingRecord!

app.delete('/deletebook', async(req,res)=>{
    const{book_id}=req.body                    //new line
    try{
        const result = await deletebook(book_id)
        res.send(result)
    }
    catch(err){console.log('error',err)}
})
app.delete('/deleteborrower', async(req,res)=>{
    const{borrower_id}=req.body //new line
    try{
        const result = await deleteborrower(borrower_id)
        res.send(result)
    }
    catch(err){console.log('error',err)}
})
app.delete('/deleteborrowingrecord', async(req,res)=>{
    const{record_id}=req.body
    try{
        const result = await deleteborrowingrecord(record_id)
        res.send(result)
    }
    catch(err){console.log('error',err)}
})
//Crete Book, Borrower , BorrowingRecord!
app.post('/createbook', async(req,res)=>{
    const{title,author_id,genre_id,PublicationYear,ISBN,copies_available}=req.body  //new line
    try{
        const result=await createbook(title, author_id,genre_id,PublicationYear, ISBN, copies_available)
        res.send(result)
    }
    catch(err){console.log('eror',err)}
})
app.post('/createborrower', async(req,res)=>{
    const{borrower_name,address,phone,email}=req.body // new line
    try{
        const result=await createborrower(borrower_name, address, phone, email)
        res.send(result)
    }
    catch(err){console.log('eror',err)}
})
app.post('/createborrowingrecord', async(req,res)=>{
    const{book_id,borrower_id,borrow_date}= req.body //new line
    try{
        const result=await createborrowerrecord(book_id,borrower_id ,borrow_date)
        res.send(result)
    }
    catch(err){console.log('eror',err)}
})
//update a specific author, specific genre , specific book , specific borrower , specific borrowrecord!
//!!!!!I USED RETURNING* and result.rows[0],could be wrong!!!!

app.put('/updatespecificbook', async(req,res)=>{
    const{book_id,title,author_id,genre_id,PublicationYear,ISBN,copies_available}=req.body //new line
    try{
        const result = await updatespecificbook(book_id,title,author_id,genre_id,PublicationYear,ISBN,copies_available)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})
app.put('/updatespecificborrower', async(req,res)=>{
    const{borrower_id,borrower_name,address,phone,email}=req.body
    try{                                      
        const result = await updatespecificborrower(borrower_id,borrower_name,address,phone,email)
        res.send(result)
    }
    catch(err){ console.log('error',err)}
})
app.put('/updatespecificborrowingrecord', async(req,res)=>{
    const{record_id,book_id,borrower_id,borrow_date}=req.body // new line
    try{                          
        const result = await updatespecificrecord(record_id,book_id,borrower_id,borrow_date)
        res.send(result)
    }
    catch(err){console.log('error',err)}
})