function Header(){

    const menuList = ["Home","Settings","Customise","About", "Help"]

    return(
        <>
            <nav>
                <h1>
                    MY TODO LIST
                </h1>
                <ul>
                        {menuList.map((item,i)=> <li key={i}><a href="#"> {item}</a></li>)}
                </ul>
            </nav>
        </>
    )
}
export default Header