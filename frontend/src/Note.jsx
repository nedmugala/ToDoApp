import { useState } from "react"
function Note({note, toggleImportance, editNote,deleteNote}){
    const [edit, setEdit] = useState(false)
    const [noteEdit, setNoteEdit] = useState(note.content)
    let important = note.important? "Make Not Important": "Make Important"

    // MY BUTTON SUB COMPONENT
    function Button ({text, action}){
        return(
            <>
                <button onClick={action} className="noteButton">
                    {text}
                </button>
            </>
        )
    }

//IMPORTANT NOTES
    if (note.important){
        
        return(
            <>
                <b>
                    <div className="note">
                        <li style={{color:"orangered"}}>
                            {note.content}
                        
                            
                        </li>
                        
                        
                        <Button text={important} action={()=> toggleImportance(note)}/>
                        <Button text="Edit" action={()=>{toggleImportance(note); setEdit(!edit)}}/>
                        <Button text="Delete" action={()=> deleteNote(note)}/>
                       
                    </div>
                </b>
               
            </>
        )
    }
    // EDIT MODE
    else if(edit ){
            return(
                <>
                    <form action={()=>{editNote(note, noteEdit); setEdit(!edit)}}>
                        <input type="text" value={noteEdit} name="entry" onChange={(e)=> setNoteEdit(e.target.value)} />
                        <Button text="Update"/>
                        <Button text={"Leave Edit"} action={()=> setEdit(!edit)}/>
                    </form>
                  
                </>
            )
    }

    //REGULAR NOTES
    else{
        return(
            <>
                    <div className="note">
                        <li>
                            {note.content}
                        
                            
                        </li>
                        <Button text={important} action={()=> toggleImportance(note)}/>
                        <Button text="Edit" action={()=>{setEdit(!edit)}}/>
                        <Button text="Delete" action={()=> deleteNote(note)}/>
                    </div>
                   
            </>
        )
    }

}
export default Note