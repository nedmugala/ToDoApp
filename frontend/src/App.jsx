import Header from "./Header"
import './app.css'
import axios from "axios"
import { useState, useEffect } from "react"
import Note from "./Note"
import noteServices from './services/notes'
import Footer from "./Footer"

function App(){
        const [notes, setNotes] = useState([])
        const [important, setImportant] = useState(false)
        const [newNote, setNewNote] = useState('Enter New Note')
        
        const importantStyles = {
            backgroundColor: "black",
            color: "white",
            fontFamily: "monospace",
            padding : "30px",
            textAlign :"Center"
        }
        const normalStyles = {...importantStyles,
            backgroundColor :"orangered"
        }
     
        const styles = important? importantStyles: normalStyles

        const url = "http://localhost:3000/api/notes"
        useEffect(()=>{
                noteServices
                    .getAll()
                    .then((res)=> setNotes(res))
        }
        ,[])
        
        const notesToShow = important? notes.filter(note=>note.important): notes

        //ADDING A NEW NOTE
        function addNote(e){
            e.preventDefault()
            const newObj = {
                content : newNote,
                important: Math.random() >0.5
            }
            noteServices
                .create(newObj)
                .then((response)=> setNotes(notes.concat(response)))
        }
        function handleNewNote(e){
            setNewNote(e.target.value)
        }

        //CHANGING THE IMPORTANCE OF THE NOTE
        const toggleImportance =(note)=>{
                const id = note.id
                const newNote = {...note, 
                    important: !note.important
                }

                noteServices
                    .update(id, newNote)
                    .then((response) => {
                        
                        return setNotes(notes.map(item=> item.id ===id? response : item))}
                )
        }
        //CHANGING THE CONTENTS OF THE NOTE
        const editNote =(note,edited)=>{
            const id = note.id
            const newNote = {...note, 
                content: edited
            }

            noteServices
                .update(id, newNote)
                .then((response) => {
                    
                    return setNotes(notes.map(item=> item.id ===id? response : item))}
            )
    }
    //DELETE NOTE
    function deleteNote (note){
        const id = note.id
        axios
            .delete(`${url}/${id}`)
            .then(()=> setNotes(notes.filter((note)=> note.id !==id)))
    }

    return(
        <>
            <Header/>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} name="Entry" onChange={handleNewNote} />
                <button>
                    Add
                </button>
            </form>
            <button type="button" onClick={()=> setImportant(!important)}>
                    {important? "Show All":"Show Important"}
            </button>
            <main className="previewPane">
                {
                    notesToShow.map((note)=> <Note key={note.id} deleteNote={deleteNote} editNote={editNote} note = {note} toggleImportance={toggleImportance} />)
                }
            </main>
            <Footer styles={styles}/>
            
        </>
    )
}
export default App