const sqlite3 = require('sqlite3').verbose() //comunicação

const db = new sqlite3.Database('./HTML.db') //referenciando a raiz do projeto

db.serialize(function(){
    //CRIAR A TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagem TEXT, 
            title TEXT,
            category TEXT, 
            description TEXT,
            link TEXT

        );
    `)

    //DELETAR DADOS NA TABELE

    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
    //     if (err) return console.log(err)
    //     console.log("DELETEI", this)
    // })

    //INSERIR OS DADOS NA TABELA
    // const query=`
    // INSERT INTO ideas(
    //     imagem,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES(?,?,?,?,?);`
    
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
    //     "https://rocketseat.com.br"
    // ]


    // db.run(query, values, function(err){
    //     if (err) return console.log(err)
    //     console.log(this)
    // })


    // //CONSULTAR DADOS NA TABELA

    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

})
module.exports = db