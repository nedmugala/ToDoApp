function Note({note, toggleImportant,style}){
     if(note.important){

        return(
            <>
                <li style={style}>
                    {note.content}
                </li>
                <button onClick={()=>toggleImportant(note, note.id)}>
                    {note.important? "Mark Not important" : "Mark Important"}
                </button>
            </>
        )

     }
    return(
        <>
            <li>
                {note.content}
            </li>
            <button onClick={()=>toggleImportant(note, note.id)}>
                {note.important? "Mark Not important" : "Mark Important"}
            </button>
        </>
    )
}
export default Note