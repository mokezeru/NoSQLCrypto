const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

//the model for Person(author and student),Book, and BorrowedBook
//=========Person Class===================================
class Person{
    constructor(name,email){
        this.name = name;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
}
//============Book============================================
class Book{
    constructor(isbn,author,tags){
        this.isbn = isbn;
        this.author = author;
        this.tags = tags;
        this.borrowed = null;
    }
    changeBorrowed(borrow){
        this.borrowed = borrow;
        //borrow.changeBook(this);
    }
}
//===========BorrowedBook============================================
class BorrowedBook{
    constructor(student,borrowedDate,dueDate){
        this.student=student;
        this.borrowedDate = borrowedDate;
        this.dueDate = dueDate;
        this.book=null;
    }
    changeBook(book){
        this.book = book;
    }
}
//===========================end of the model=============================

//create db connection using the connect method of MongoClient instance
MongoClient.connect(url,{ useNewUrlParser: true },(err,db)=>{
    if(err) throw err;
    console.log('db connection successful');
    var dbo = db.db('library');
    
//let's create sample author,student, book objects and set the book object as borrowed by the student
    var author = new Person('Daniel Stiella','dstiella@gmail.com');
    var stu = new Person('Mequannint Zeru','mzeru@mum.edu');
    var bDate = new Date(2018,6,10);
    var dueDate = new Date(2018,7,9);
    var borrowedbk = new BorrowedBook(stu,bDate,dueDate);
    var tags = ['five days in paris','five days','paris'];
    var book = new Book('12345',author,tags);
    book.changeBorrowed(borrowedbk);
    var obj ={book:book};
//===============================================================
    dbo.collection('books').insertOne(obj,(err,result)=>{
        if(err) throw err;
        console.log('book added successfully');
    });

    db.close();
});