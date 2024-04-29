import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContectMe(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm('service_dquj1e2', 'template_j1637h7', form.current, {
      publicKey: 'I8rIgKKoN6pLbppxi',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
};

return (
        <section id="contect-me" className="contect-me">
            <h1>Contect me!</h1>
            <form ref={form} onSubmit={sendEmail}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" name="user_name"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="user_email"/>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" name="subject"/>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" name="message"></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
);
}