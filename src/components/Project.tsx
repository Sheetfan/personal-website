import {ProjectInfo} from "../ts/defines";

export default function Project({name,image,type,github = "#",demo = "#"}:ProjectInfo){
    return (
        <div className="project">
            <div className="project-info">
                <h2>{name}</h2>
                <h6>{type}</h6>
                {github !== "#" ? <a href={github}>github</a>:""}
                {demo !== "#" ? <a href={demo}>demo</a>:""}
            </div>
            <img src={image} alt="" />
        </div>
    )
}