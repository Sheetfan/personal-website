import tetrisImg from "../img/Tetris.png";
import snakeImg from "../img/Snake.png";
import minesweeperImg from "../img/Minesweeper.png";
import brickBreakerImg from "../img/BrickBreaker.png";
import { ProjectInfo,TypesOfProjects } from "../ts/defines";
import Project from "./Project";

export default function Projects(){

    const projectData:ProjectInfo[] = [
        {name:"Tetris",image:tetrisImg,type:TypesOfProjects.FunStuff,github:"https://github.com/Sheetfan/tetris"},
        {name:"Mindsweeper",image:minesweeperImg,type:TypesOfProjects.FunStuff,github:"https://github.com/Sheetfan/Minesweeper"},
        {name:"Snake",image:snakeImg,type:TypesOfProjects.FunStuff,github:"https://github.com/Sheetfan/snake-in-sfml"},
        {name:"BrickBreaker",image:brickBreakerImg,type:TypesOfProjects.FunStuff,github:"https://github.com/Sheetfan/BrickBreaker"}

    ]
    const projects = projectData.map((project)=>(<Project name = {project.name} image={project.image} type = {project.type} github={project.github} demo={project.demo}/>))
    return (
        <section id="projects" className="projects">
            <h1>Projects</h1>
            <div className="projects-container">
                {projects}
            </div>
        </section>
    );
}