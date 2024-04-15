import { SkillsProps } from "../ts/defines";

export default function Skills({name,percent}:SkillsProps){

    return (
        <div className = "skill">
            <div className="skill-heading"><h6 className = "skill-name">{name}</h6> <h6 className="skill-percent">{percent}%</h6></div>
            <div className = "skill-bar-background"><div style={{width:`${percent}%`}} className="skill-bar"></div></div>
        </div>
    )
}