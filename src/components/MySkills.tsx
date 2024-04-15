import Skill from "./Skill";

export default function MySkills(){
    const skillsData = [
        {name:"HTML",percent:95},
        {name:"Js",percent:90},
        {name:"Scss",percent:85},
        {name:"React",percent:79},
        {name:"PHP",percent:70},
    ]
    const skills = skillsData.map((skill)=>(<Skill name = {skill.name} percent={skill.percent}/>));
    return (
        <section className="my-skills" id="my-skills">
            <h1>My Skills</h1>
            <div className="grid-skills">
                {skills}
            </div>
        </section>
    )
}