import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSectionId ='';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight+5) {
                    currentSectionId = section.id;
                }
            });
            
            if(currentSectionId !== ''){
                console.log(currentSectionId);
                setActiveSection(currentSectionId);
            }
            
        };

        const handleSize = () =>{
            if(innerWidth > 600){
                setIsOpen(false);
            }
        }

        addEventListener('scroll', handleScroll);
        addEventListener("resize",handleSize);

        return () => {
            removeEventListener('scroll', handleScroll);
        };
    }, []);

    function toggleNav(){
        setIsOpen(prev => !prev);
    }
    return(
        <nav>
            <div className="desktop-nav">
                <ul className="group-1">
                    <li><a href="#about-me" className={activeSection === 'about-me' ? 'desktop-nav-highlight' : ''}>About me!</a></li>
                    <li><a href="#my-skills" className={activeSection === 'my-skills' ? 'desktop-nav-highlight' : ''}>My Skills</a></li>
                    <li><a href="#projects" className={activeSection === 'projects' ? 'desktop-nav-highlight' : ''}>Projects</a></li>
                    <li><a href="#contect-me" className={activeSection === 'contect-me' ? 'desktop-nav-highlight' : ''}>Contect me</a></li>
                </ul>
                <FontAwesomeIcon className="large-icon bar" icon={faBars} onClick={toggleNav}/>
                
                <ul className="group-2">
                    <li><a href="https://www.linkedin.com/in/buzwane-mahlangu-abb829215/"><FontAwesomeIcon className="large-icon" icon={faLinkedin} /></a></li>
                    <li><a href="https://github.com/Sheetfan"><FontAwesomeIcon className="large-icon" icon={faGithub} /></a></li>
                </ul>
            </div>
            <div style={isOpen ? {display:"block"}:{}} className="mobile-nav">
                <ul>
                    <li className={activeSection === 'about-me' ? 'mobile-nav-highlight' : ''}><a href="#about-me"><h1>About me!</h1></a></li>
                    <li className={activeSection === 'my-skills' ? 'mobile-nav-highlight' : ''}><a href="#my-skills"><h1>My Skills</h1></a></li>
                    <li className={activeSection === 'projects' ? 'mobile-nav-highlight' : ''}><a href="#projects"><h1>Projects</h1></a></li>
                    <li className={activeSection === 'contect-me' ? 'mobile-nav-highlight' : ''}><a href="#contect-me"><h1>Contect me</h1></a></li>
                </ul>
            </div>
        </nav>
    )
}