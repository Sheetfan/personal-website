import Canvas from "./Canvas"

export default function AboutMe(){
    return(
        <section id="about-me" className="about-me">
            <div className="about-me-container">
                <div className="about-me-info">
                    <h1>About me</h1>
                    <p>
                        I am Buzwane Mahlangu and I am software developer born in Gauteng in South Africa.
                        I have a big passion for coding, problem solving, creating games and websites.
                        I enjoy learning new web technologies
                    </p>
                </div>
            </div>
            <Canvas/>
        </section>
    )
}