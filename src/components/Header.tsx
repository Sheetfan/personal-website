import Navbar from "./Navbar";
import face from "../img/Myface.jfif";

export default function Header(){
    return (
        <header>
            <Navbar/>
            <div className="header-container">
                <img src={face} alt="" />
                <h1>Buzwane Mahlangu</h1>
                <span>Front-end Developer</span>
            </div>
            
        </header>
    )
}