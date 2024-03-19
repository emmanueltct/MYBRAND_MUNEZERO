//import { createRoot } from 'react-dom/client';
const {
  createRoot
} = React;



function Greetings() {


  const {useState,useEffect}=React

  const [names, setNames]=useState("")
  const [email, setEmail]=useState("")
  const [location, setLocation]=useState("")
  const [budget, setBudjet]=useState("")
  const [subject,setSubject]=useState("")
  const [message, setMessage]=useState("")



const formClear=()=>{
  setNames("")
  setBudjet("")
  setEmail("")
  setLocation("")
  setMessage("")
  setSubject("")
}

const setNameValue=(names)=>{
  setNames(names)
  nameValidation(names)
}


const setEmailValue=(email)=>{
  setEmail(email)
  emailValidation(email)
}


const setLocationValue=(location)=>{
  setLocation(location)
  locationValidation(location)
}

const setBudgetValue=(budget)=>{
  setBudjet(budget)
  budgetValidation(budget)
}
const setSubjectValue=(subject)=>{
  setSubject(subject)
  subjectValidation(subject)
}

const setMessageValue=(message)=>{
  setMessage(message)
  validateTextArea(message)
}


function handleSubmit(e){
  e.preventDefault();
  if(nameValidation(names) && emailValidation(email) && locationValidation(location) && budgetValidation(budget) && subjectValidation(subject) && validateTextArea(message) ){
    const data={
      names,
      email,
      location,
      budget,
      subject,
      message
     }
    querries(data) 
}
}

const querries=async(formData)=>{

  document.querySelector('.loader').style.display='block'
  document.querySelector('#submit-button').style.display='none'
  //console.log(formData.email)
  //https://mybrand-be-3-qrqs.onrender.com

  axios.post("https://mybrand-be-3-qrqs.onrender.com/api/querries", formData)
  .then((response) => {
    
      document.querySelector('.loader').style.display='none'
      document.querySelector('#submit-button').style.display='block'
      if(response.data.error){
          showMessage(response.data.error)
          
    }else{
        //alert(data.message)
        showMessage(response.data.message)
        formClear()
    }
  })
  .catch((error) => console.error(error));
};




      
const nameValidation=(namesValue)=>{
  const nameValue=namesValue.trim();
  const names=document.getElementById("names");
    if(nameValue ===''){
      setErrorFor(names,'Name field is required!');
      return false; 
    
  }else if(nameValue.length<3){
      setErrorFor(names,'Provided name is too short! please write both names'); 
      return false;  
  }
  else if(nameValue.length>40){
      setErrorFor(names,'Provided name is too long! not greater than 40 characters'); 
      return false; 
  }
  else if(!isValidName(nameValue)){
      setErrorFor(names,'Provive first and second name and do not include any number or symbols'); 
      return false
  }
  else{
      setSuccessFor(names);
      return true
  }

}


const emailValidation=(emailValue)=>{
  const email=document.getElementById("email");
  emailValue.trim()
  if(emailValue === ''){
    setErrorFor(email,'Email field is required!');
   return false;
}else if(!isEmail(emailValue)){
    setErrorFor(email,'invalid email format');
    return false; 
    
}else{
    setSuccessFor(email);
    return true
}
}

const locationValidation =(locationValue)=>{
  const location2=document.getElementById("location");
  locationValue.trim();

  if(locationValue ===''){
    setErrorFor(location2,'Location field is required!'); 
    return false;
    
}else if(locationValue.length<5){

    setErrorFor(location2,'too short text of address location'); 
    return false;
}
else{
    setSuccessFor(location2);
    return true;
}
}


const budgetValidation=(budgetValue)=>{
  const budget=document.getElementById("budget");
    if(budgetValue === ''){
      setErrorFor(budget,'Budget field is required!');
      return false;
  }else if(!isCurrency(budgetValue)){
      setErrorFor(budget,'invalid currency!!  accepted format be like 100 USD | 100$ |1000 RWF '); 
      return false;
  }
  else{
      setSuccessFor(budget);
      return true
  }

}

const subjectValidation=(subjectValue)=>{
 
  const subject=document.getElementById("subject");
 
  if(subjectValue === ''){
    setErrorFor(subject,'Subject field is required!');
    return false;

}else if(subjectValue.length<20){
    setErrorFor(subject,'too short subject input, atleast 20 character length');
    return false;
}
else{
    setSuccessFor(subject);
    return true
}

}



function isValidName(names){
    return /^([a-zA-Z]{3,})+((\s)[a-zA-Z]{2,})?$/.test(names)
}
function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}
function isCurrency(budget){
    return /^[0-9]+(\s?)+(rwf|RWF|USD|\$)$/.test(budget);
}


const input=document.querySelectorAll(".input-section input"); 

function setErrorFor(input,message){
  
  const inputSection=input.parentElement;
  const small=inputSection.querySelector('small');
  small.innerText=message;

  inputSection.className='input-section error';
}

function setSuccessFor(input){
  const inputSection=input.parentElement;
  inputSection.className='input-section success';
}


function validateTextArea(messageValue){
   const message=document.getElementById("message");
   messageValue.trim();
    if(messageValue === ''){
        setErrorFor(message,'Subject field is required!');
        return false;
      
    }else if(messageValue.length<20){
        setErrorFor(message,'too short message, atleast 20 character length');
        return false;
    }else{

        setSuccessFor(message);
        document.getElementById("submit-button").style.pointerEvents = "auto";
        return true;
    }
   
}
     








    return  <div className="contact-container">
    <div className="contact-address-section">
        <div className="contact-description">
            <span>Let’s discuss your Project</span>
            <p>There are many variations of passages of Lorem Ipsu available.
                but the majority have suffered alte.
            </p>
        </div>
        <div className="address-card">
            <div className="card-icon" style={{backgroundColor: "#A53DFF"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 4.47991C16.4087 2.88861 14.2504 1.99463 12 1.99463C9.74955 1.99463 7.59129 2.88861 5.99999 4.47991C4.40869 6.07121 3.51471 8.22947 3.51471 10.4799C3.51471 12.7303 4.40869 14.8886 5.99999 16.4799L11.27 21.7599C11.363 21.8536 11.4736 21.928 11.5954 21.9788C11.7173 22.0296 11.848 22.0557 11.98 22.0557C12.112 22.0557 12.2427 22.0296 12.3646 21.9788C12.4864 21.928 12.597 21.8536 12.69 21.7599L18 16.4299C19.5846 14.8452 20.4749 12.696 20.4749 10.4549C20.4749 8.21386 19.5846 6.06459 18 4.47991ZM16.57 14.9999L12 19.5899L7.42999 14.9999C6.52713 14.0962 5.91247 12.9452 5.66369 11.6922C5.4149 10.4392 5.54318 9.14066 6.03229 7.96059C6.52141 6.78052 7.34941 5.77196 8.41162 5.06239C9.47383 4.35281 10.7226 3.97409 12 3.97409C13.2774 3.97409 14.5261 4.35281 15.5884 5.06239C16.6506 5.77196 17.4786 6.78052 17.9677 7.96059C18.4568 9.14066 18.5851 10.4392 18.3363 11.6922C18.0875 12.9452 17.4728 14.0962 16.57 14.9999ZM8.99999 7.40991C8.19271 8.21968 7.73939 9.31648 7.73939 10.4599C7.73939 11.6033 8.19271 12.7001 8.99999 13.5099C9.59975 14.1107 10.3636 14.521 11.1956 14.6893C12.0277 14.8576 12.8909 14.7765 13.6771 14.4561C14.4632 14.1356 15.1372 13.5902 15.6145 12.8882C16.0918 12.1861 16.3511 11.3588 16.36 10.5099C16.3645 9.94311 16.2553 9.38117 16.0389 8.8573C15.8225 8.33343 15.5032 7.85827 15.1 7.45991C14.7037 7.05449 14.2311 6.73145 13.7094 6.50938C13.1878 6.2873 12.6273 6.17059 12.0604 6.16594C11.4935 6.16129 10.9312 6.26881 10.406 6.4823C9.88073 6.69579 9.40291 7.01104 8.99999 7.40991ZM13.69 12.0899C13.311 12.4747 12.8102 12.7158 12.2731 12.7722C11.736 12.8285 11.1961 12.6966 10.7455 12.3988C10.2949 12.1011 9.96179 11.6562 9.803 11.14C9.64421 10.6238 9.66964 10.0685 9.87495 9.56907C10.0803 9.06958 10.4527 8.65693 10.9286 8.40165C11.4045 8.14637 11.9542 8.06432 12.4839 8.16953C13.0136 8.27474 13.4903 8.56067 13.8325 8.97844C14.1747 9.39621 14.3612 9.91988 14.36 10.4599C14.3454 11.0772 14.0865 11.6634 13.64 12.0899H13.69Z" fill="white"/>
                </svg>
            </div>
            <div className="card-text">
                <span>Address:</span>
                <p>New Mexico 31134</p>
            </div>
        </div>
        <div className="address-card">
            <div className="card-icon">
                <span style={{color: "#A53DFF",width:"24px",height:"24px"}} ><i className="fa fa-envelope" style={{width:"100%"}} aria-hidden="true"></i></span>
            </div>
            <div className="card-text">
                <span>My Email:</span>
                <p>mymail@mail.com</p>
            </div>
        </div>

        <div className="address-card">
            <div className="card-icon">
                <span style={{color: "#A53DFF",width:"24px",height:"24px"}} ><i className="fa fa-phone" style={{width:"100%"}} aria-hidden="true"></i></span>
            </div>
            <div className="card-text">
                <span>Call Me Now:</span>
                <p>00-1234 00000</p>
            </div>
        </div>
        <div className="contact-social-media">
                <span style={{borderRadius: "4px", background:"#A53DFF",boxShadow: "0px 12px 64px 0px rgba(28, 25, 25, 0.12)"}}><img src="img/Social-f.svg"/></span>
                <span><img src="img/instagram.svg"/></span>
                <span><img src="img/Social-l.svg" /></span>
        </div>
    </div>
    <div className="contact-form-container">
        <div className="header-paragraph">
            There are many variations of passages of Lorem Ipsu available,
            but the majority have suffered alte.
        </div>
        <div className="contact-form">
            <div id="snackbar"></div>
            <form  id="contact-form" className="form-fieldset" onSubmit={handleSubmit}> 
                <div className="input-section">
                    <label style={{color: "#A53DFF"}}>Name *</label>
                    <input id="names" type="text" value={names} onChange={(e)=>setNameValue(e.target.value)} />
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <small>Erron message</small>
                </div>
                <div  className="input-section">
                    <label>Email *</label>
                    <input id="email" type="text" value={email} onChange={(e)=>setEmailValue(e.target.value)}/>
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <small>Erron message</small>
                </div>
                <div className="input-section">
                    <label>Location</label>
                    <input id="location" type="text" value={location} onChange={(e)=>setLocationValue(e.target.value)}/>
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <small>Erron message</small>
                </div>
                <div className="budget-subject">
                    <div className="input-section">
                        <label>Budget *</label>
                        <input id="budget" type="text" value={budget} onChange={(e)=>setBudgetValue(e.target.value)}  style={{width:"100%"}}/>
                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <small>Erron message</small>
                    </div>
                    <div className="input-section">
                        <label>Subject *</label>
                        <input id="subject" type="text" value={subject} onChange={(e)=>setSubjectValue(e.target.value)}  style={{width:"100%"}}/>
                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <small>Erron message</small>
                    </div>
                </div>
                <div className="input-section">
                    <label>Message</label>
                    <textarea id="message" cols="6" rows="5" value={message} onChange={(e)=>setMessageValue(e.target.value)}></textarea>
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <small>Erron message</small>
                </div>
                <div className="loader"></div>
                <button className="contact-submit-button" id="submit-button" >
                    <span>Submit</span>
                    <img src="img/Paper Plane.png" style={{width:"24px",height:"24px"}}/>
                </button>
            </form>
        </div>
     </div>
</div>;
  }








  // Render the component to the DOM

//const container = document.getElementById('root');
  //const root = createRoot(container);
  //ReactDOM.createRoot(root).render(<Greetings/>);

  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );
  root.render(<Greetings/>);
