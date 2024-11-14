import Hamburger from "./hamburger"
import React, { useState } from "react";
export default function Nav() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li className="burger_button"><a href="https://usv.ro/"><button style={{ color:"white", fontSize:"20px"}} className="btn">Home</button></a></li>
                    <li className="burger_button"><a href="https://orar.usv.ro/"><button style={{ color:"white", fontSize:"20px"}} className="btn">Schedule</button></a></li>
                    <li className="burger_button"><a href="http://localhost:3000/"><button style={{ color:"white", fontSize:"20px"}} className="btn">Exams</button></a></li>
                    
                </ul>
                    <div className="hamburger" onClick={toggleHamburger}>
                        <Hamburger isOpen={hamburgerOpen}/>
                    </div>
            </div>

            <style jsx>{`
                .navigation {
                    width: 100%;
                    height: 55px;
                    background-color: #192041;
                }

                .navigation ul {
                    display: ${hamburgerOpen ? 'inline' : 'none'};
                    background-color: #192041;
                    margin-top:55px;
                    height: 170px;
                    position: absolute;
                }

                .navigation ul li {
                    list-style-type: none;
                    padding-right: 20px;
                }

                .navigation ul li a{
                    color: white;
                }


            `}</style>
        </div>
    )
}
