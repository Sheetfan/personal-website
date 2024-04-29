import { useEffect, useRef } from "react";

interface Mouse{
    x:number | undefined,
    y:number | undefined
}

class Circle {
    x: number;
    y: number;
    dx:number;
    dy:number;
    radiusCurrent:number;
    colour:string;
    originalRadius:number;
    canvas:HTMLCanvasElement | null

    constructor(x:number, y:number, dx:number, dy:number, radius:number, colour:string, canvas: HTMLCanvasElement | null) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radiusCurrent = radius;
        this.originalRadius = radius;
        this.colour = colour;
        this.canvas = canvas;
    }

    update(mouse:Mouse, mouseDistance:number, maxRadius:number):void {
        if (!this.canvas) return; // to check if canvas is null

        // bounce if the circle touches the edge of the screen
        if (this.x > this.canvas.width - this.radiusCurrent || this.x < 0 + this.radiusCurrent) {
            this.dx = -this.dx;
        }
        if (this.y > this.canvas.height - this.radiusCurrent || this.y < 0 + this.radiusCurrent) {
            this.dy = -this.dy;
        }

        // moves the circle on screen
        this.x += this.dx;
        this.y += this.dy;

        // when the mouse is near a circle it will increase in size
        if (mouse.x - this.x < mouseDistance && this.x - mouse.x < mouseDistance &&
            mouse.y - this.y < mouseDistance && this.y - mouse.y < mouseDistance) {
            if (this.radiusCurrent < maxRadius) { // this will make sure the circle is never bigger then a set max size
                this.radiusCurrent += 1;
            }
        } else if (this.radiusCurrent >= this.originalRadius) {
            this.radiusCurrent -= 1;
        }
    }

    draw():void {
        if (!this.canvas) return;
        const c = this.canvas.getContext('2d');
        c.beginPath();
        c.arc(this.x, this.y, this.radiusCurrent, 0, Math.PI * 2);
        c.fillStyle = this.colour;
        c.fill();
    }
}
export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    let circles:Circle[] = [];
    const mouse: Mouse = { x: undefined, y: undefined };
    let maxRadius = 40;
    let minRadius = 4;
    let mouseDistance = 50;
    let circleSpeed = 0.25;
    let colourArray = [
        "#00FA73",
        "#00FA20",
        "#00FAC9",
        "#41FA00",
        "#00D8FA"
    ];

    const generateRandomFloatInRange = (min:number, max:number):number => {
        return (Math.random() * (max - min + 1)) + min;
    }

    const animate = () => {
        if (!canvasRef.current) return;
        const c = canvasRef.current.getContext('2d');
        if (!c) return;
        requestAnimationFrame(animate);
        c.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        for(let i = 0; i < circles.length; i++){
            circles[i].update(mouse, mouseDistance, maxRadius);
            circles[i].draw();
        }  
    }

    const init = () => {
        circles = [];
        const canvas = canvasRef.current;
                
        if (!canvas) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // generates all the circles
        for(let i = 0; i < 50; i++){
            const radius = generateRandomFloatInRange(1,minRadius);
            const x = generateRandomFloatInRange(radius,canvas.width - radius);
            const y = generateRandomFloatInRange(radius,canvas.height - radius);
            const dx = generateRandomFloatInRange(-circleSpeed,circleSpeed);
            const dy = generateRandomFloatInRange(circleSpeed,circleSpeed);
            const colour = colourArray[Math.floor(Math.random() * colourArray.length)]
            
            circles.push(new Circle(x,y,dx,dy,radius,colour,canvasRef.current));
        }
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
            init();
            animate();

            const handleMouseMove = (e: MouseEvent): void => {
                const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
                const scaleX = canvas.width / rect.width; // Calculate the scale for the canvas width
                const scaleY = canvas.height / rect.height; 

                const mouseX = (e.clientX - rect.left) * scaleX;
                const mouseY = (e.clientY - rect.top) * scaleY;
                mouse.x = mouseX;
                mouse.y = mouseY;
            };
    
            const handleResize = (): void => {
                init();
            };
            window.addEventListener("mousemove",handleMouseMove);            
            window.addEventListener("resize",handleResize);
        
        return ()=>{
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        }
        
    },[])
    return <canvas ref={canvasRef} />;
    
}
