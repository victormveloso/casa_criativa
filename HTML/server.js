
//usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

//pegando o db na raiz do projeto
const db = require("./db")
// definindo constantes
// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title:"Cursos de Programação",
//         category:"Estudo",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title:"Exercícios",
//         category:"Saúde",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title:"Meditação",
//         category:"Mentalidade",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title:"karaokê",
//         category:"Diversão em família",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729075.svg",
//         title:"Cafezola",
//         category:"Hora da risada",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729018.svg",
//         title:"Rich Cousin",
//         category:"Aprendizado Foda",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, magni. Consequuntur impedit rem quaerat, ullam alias distinctio laudantium nesciunt placeat necessitatibus atque eius animi magnam sapiente et? Laboriosam, quaerat repellat",
//         url:"https://rocketseat.com.br"
//     }
    
// ]

//configurar os arquivos estaticos CSS, scripts imagens

server.use(express.static("public"))

//habilitar uso do re.body

server.use(express.urlencoded({
    extended: true
}))

//Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express:server,
    noCache: true //boolean
})

//ao configurar o nunjucks e o render no lugar de sendFille eu não preciso mais do sendFile 
//uso isso para declarar variáveis no html

//criei uma rota '/'
//e capturo o pedido do cliente para responder
/* server.get("/", function(req, res) {
    //Enviando o File "Index que é a página que criamos"
    //variável do __dirname encontra no diretório o arquivo
    return res.sendFile(__dirname + "/index.html")
    console.log("Cheguei")
}) */

//Criando uma rota '/'
//capturo um pedido do cliente para responder

server.get("/", function(req, res) {



    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Errro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
    
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render( "index.html", { ideas: lastIdeas })

    })

})

//chamando outras páginas 

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Errro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdeas})
    })
    
})

server.post("/", function(req, res){

    //INSERIR OS DADOS NA TABELA
    const query=`
    INSERT INTO ideas(
        imagem,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);` //placeholders
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
        
    ]


    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Errro no banco de dados")
        }
        
        return res.redirect("/ideias")
        
    })

})

//liguei meu servidor na porta 3000
server.listen(3000) 