import { useState,useEffect } from 'react'

import Note from './Note'
import noteServices from './services/notes'


function App() {
  const [notes, setNotes] = useState([])
  const [important, setImportant]= useState(false)
  const [noteEntry, setNoteEntry] = useState('Enter Note...')
  const  notesToShow = important? notes.filter((note)=>note.important): notes

  useEffect(()=>{
    noteServices.getAll()
    .then((initialnotes)=>{
      setNotes(initialnotes)
    })
  },[])

  function toggleImportant(note, id){
    const url = `http://localhost:3001/notes/${id}`
    const newObj = {
        ...note, important : !note.important
      }
      noteServices.update(id, newObj).then(
          (response)=>{
            setNotes(notes.map(note => note.id === id? response: note ))
          }
        )
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const newObj ={
      content : noteEntry,
      important : Math.random() >0.5
    }
    setNoteEntry("Enter Note ...")
          noteServices
          .create(newObj).then((response)=> {
            console.log(response)
            setNotes(notes.concat(response))})
  }

  const style ={
    color : "orangered",
    textShadow : "1px 1px 1px black",
    fontWeight: "bolder",
    fontFamily : "monospace",
    fontSize :"1.005rem"
  }
  function makeNotImportant (notes){
    set
  }

  return (
    <>
        <h1>
          My  To Do App
        </h1>
        <button onClick={()=>setImportant(!important)}> {important? "Show All":"Show Important"}</button>
        <ul>
            {notesToShow.map((note)=>{
                return <Note note={note} key={note.id} toggleImportant={toggleImportant} style={style}/>
            })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" value={noteEntry} onChange={(e)=>setNoteEntry(e.target.value)} id='data' />
          <button>
            Add Note
          </button>
        </form>
    </>
  )
}

export default App
