export enum TypesOfProjects {
    WebApp = "Web app",
    MobileApp = "Mobile app",
    DesktopApp = "Desktop app",
    FunStuff = "Fun Stuff"
}

export interface ProjectInfo{
    name:string,
    image:string,
    type:TypesOfProjects,
    github?:string,
    demo?:string
}
export interface SkillsProps {
    name:string,
    percent:number
}