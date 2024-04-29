import { useRef, FormEvent, useState } from "react";
import emailjs from '@emailjs/browser';

interface IFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface IFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContectMe(){
    const [emailSent,setEmailSent] = useState(false);
    const [errors, setErrors] = useState<IFormErrors>({});
    const [formState, setFormState] = useState<IFormState>({ name: '', email: '', subject: '', message: '' });
    const form = useRef<HTMLFormElement>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const validateForm = () => {
      const formErrors:IFormErrors = {};
      if (!formState.name.trim()) {
          formErrors.name = "Name is required";
      }
      if (!formState.email) {
          formErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
          formErrors.email = "Email address is invalid";
      }
      if (!formState.subject.trim()) {
          formErrors.subject = "Subject is required";
      }
      if (!formState.message.trim()) {
          formErrors.message = "Message is required";
      }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if(!validateForm()){
      setEmailSent(false);
      return
    }
    if(form.current){
      emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      // console.log(import.meta.env.VITE_SERVICE_ID,import.meta.env.VITE_TEMPLATE_ID,import.meta.env.VITE_PUBLIC_KEY)
      setErrors({});
      setEmailSent(true);
    }
    
  };

return (
  <section id="contect-me" className="contect-me">
      <h1>Contect me!</h1>
      {emailSent && <div>Email sent!</div>}
      <form ref={form} onSubmit={sendEmail}>
          {errors.name && <div className="error">{errors.name}</div>}
          <input type="text" value={formState.name} onChange={handleChange} placeholder="Name" name="name"/>

          {errors.email && <div className="error">{errors.email}</div>}
          <input type="email" value={formState.email} onChange={handleChange} placeholder="Email" name="email"/>
          
          {errors.subject && <div className="error">{errors.subject}</div>}
          <input type="text" value={formState.subject} onChange={handleChange} placeholder="Subject" name="subject"/>

          {errors.message && <div className="error">{errors.message}</div>}
          <textarea value={formState.message} onChange={handleChange} placeholder="Message" name="message"></textarea>
          <button type="submit">Submit</button>
      </form>
  </section>
);
}