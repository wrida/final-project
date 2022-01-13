import React from 'react'

const ContactUs = () => {
    const submitForm =()=> {

    }
    return (
        <div className="contact">
            <svg style={{height:"30px", width:"30px",transformRotate:"45"}} xmlns="http://www.w3.org/2000/svg" className="h-12 transform rotate -45" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
</svg>
           <span style={{paddingTop:'500px',fontSize:"50px",fontFamily:"Helvet",fontStyle:"oblique"}}>Contact Us</span>
           <form style={{display:"flex",justifyContent:"center",flexDirection:"column"}} onSubmit ={submitForm}>
               <label>Name</label>
               <input placeholder="Name" />
               <label>Email</label>
               <input placeholder="Email" />
               <label>Message</label>
               <textarea style={{border: '1px solid rgb(0,0,196)',maxWidth:"400px",minHeight:"100px"}} placeholder="Message"></textarea>
               <button style ={{fontFamily:"monospace",fontSize:"25px",marginRight:"35",marginLeft:"35px",marginTop:"20px",backgroundColor:"blue",color:"white" ,transitionDuration:"200"}}>
                   Submit
               </button>
           </form>
        </div>
    )
}

export default ContactUs
