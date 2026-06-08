const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

let notes =[{
id: "1",
content: "HTML is easy",
important: true
},
{
id: "2",
content: "Browser can execute only JavaScript",
important: false
},
{
id: "3",
content: "GET and POST are the most important methods of HTTP protocol",
important: true
},
            {
                id : "4",
                content:"My Name is Neddy this is my first Deployed App",
                important : true
            }

]
const idGenerator=()=>{
    let maxId = notes.length > 0? Math.max(...notes.map(n=>Number(n.id))) : 0
    return String(maxId+1)
}

app.post('/api/notes', (request,response)=>{
    const body = request.body
    if(!body.content){
        return response.status(400).json({
            error:'Content Missing'
        })
    }
    
    const note = {
        "id" : idGenerator(),
        "content" : body.content,
        "important" : body.important || false
    }
   
    notes.push(note)
    console.log(note)
    response.json(note)
  
    
})

app.get('/', (request, response)=> {
    response.send('<h1> Hello World! </h1> <a href="/api/notes">Go to Notes </a>')
})
app.get('/api/notes', (request, response)=>{
    response.json(notes)
})
app.get('/api/notes/:id', (request, response)=>{
    const id = request.params.id
    const note = notes.find((note)=> note.id === id)
    if(note) {
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})
app.put('/api/notes/important/:id',(request, response)=>{
    console.log(request.body)
    const id = request.params.id
    const note = notes.find(n=> n.id===id)
    note.important = request.body.important
    response.json(note)

})

app.delete('/api/notes/:id', (request, response)=> {
    const id = request.params.id
    notes = notes.filter((note)=> note.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`server running at port http://localhost:${PORT}`)
