import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContectMe(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [errors, setErrors] = useState({});
    let [emailSent,setEmailSent] = useState(false);
    const form = useRef();

    

    const validateForm = () => {
      let formErrors = {};
      if (!name.trim()) {
          formErrors.name = "Name is required";
      }
      if (!email) {
          formErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          formErrors.email = "Email address is invalid";
      }
      if (!subject.trim()) {
          formErrors.subject = "Subject is required";
      }
      if (!message.trim()) {
          formErrors.message = "Message is required";
      }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
  };

const sendEmail = (e) => {
  e.preventDefault();
  if(!validateForm()){
    setEmailSent(false);
    return
  }
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
    setErrors({});
    setEmailSent(true);
};

return (
        <section id="contect-me" className="contect-me">
            <h1>Contect me!</h1>
            {emailSent && <div>Email sent!</div>}
            <form ref={form} onSubmit={sendEmail}>
                {errors.name && <div className="error">{errors.name}</div>}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" name="user_name"/>

                {errors.email && <div className="error">{errors.email}</div>}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="user_email"/>
                
                {errors.subject && <div className="error">{errors.subject}</div>}
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" name="subject"/>

                {errors.message && <div className="error">{errors.message}</div>}
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" name="message"></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
);
}