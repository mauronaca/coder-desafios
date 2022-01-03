db = connect("localhost:27017/ecommerce");
print(db);
cursor = db.collection.find();

while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}
