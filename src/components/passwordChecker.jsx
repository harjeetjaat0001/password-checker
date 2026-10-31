
import { useState } from "react"


export default function PasswordChecker(){
  // state add krege 

  const[password,setPassword]=useState("");
  const[showPassword,setShowPassword]=useState(false);

  // rules validation check karge regex ka use kar ke (regular epression).

  const checks ={
    length:password.length >=8,
    uppercase:/[A-Z]/.test(password), //Yeh ek Regular Expression (Regex) hai. .test() method password ke andar check karta hai ki koi capital letter (A-Z) hai ya nahi, aur true/false deta hai.
    lowercase:/[a-z]/.test(password),
    number:/[0-9]/.test(password),
    special:/[^A-Za-z0-9\s]/.test(password),
  };
  // ab score or precentage nikale ge 
  const score = Object.values(checks).filter(Boolean).length;
  const Percent =(score/5) *100;

  // ab level decide krege 
  let level = "none";
  if(password.length > 0){
    if(score === 5) level= "strong";
    else if(score >=3) level ="medium";
    else level = "weak"
  }

  const TIPS ={
    none:"Start Typing to check your password",
    weak:"Too easy to guess. Add more character types and use at least 8 characters.",
    medium:"Getting better . Meet all the rules below to make it strong.",
    strong:"Great! This Password meets all the Rules."
  }

  let barcolor = "#111"
  if(level=== "weak") barcolor="#ef4444";
  if(level === "medium") barcolor ="#f59e0b"
  if(level === "strong") barcolor ="#16a34a"

  return(
    <div className="pass-container">
      <div className="pass-card">
        {/* Tittle  or subtitle likhee gee  */}
        <h2 className="pass-tittle">Password Checker</h2>
        <p className="pass-subtitle">Type a Password to Check its Strength</p>

        {/* input box or hide / show button bneyege  */}

        <div className="pass-input-wrapper">
          <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pass-input"
           />
           
           <button 
           type="button"
           onClick={()=>setShowPassword(!showPassword)}
           className="pass-show-btn">
            {showPassword ? "Hide" : "Show"}
           </button>
        </div>

        {/* strength text like ge  */}

        <div className="pass-strength-header">
          <span>Strength : <span style={{color:barcolor}}> {` ${Percent}%`} </span></span>
          <span className="pass-level-text" style={{textTransform:"capitalize",color: barcolor}}> {level}</span>
        </div>

        {/* progress bar background  */}
        <div className="pass-progress-bg">
          <div className="pass-progress-fill" style={{width:`${Percent}%`,backgroundColor:barcolor }}></div>
        </div>

        {/* tip box bnyege  */}
        <div className="pass-tip-box">
        {TIPS[level]}
        </div>
    
        {/* rules checklist  */}
        <ul className="pass-checklist">
          <li style={{color: checks.length ? "#16a34a" : "#ef4444"}}> {checks.length ? "✅" : "❌"} At least 8 Characters</li>

          <li style={{color:checks.uppercase ? "#16a34a " : "#ef4444"}}>{checks.uppercase ? "✅" : "❌"} one uppercase letter (A-Z) </li>

          <li style={{color:checks. lowercase? "#16a34a " : "#ef4444"}}> {checks.lowercase ? "✅" : "❌"} one lowercase letter (a-z) </li>

          <li style={{color:checks. number? "#16a34a " : "#ef4444"}}> {checks.number ? "✅" : "❌"} one number (0-9)</li>

          <li style={{color:checks. special? "#16a34a " : "#ef4444"}}> {checks.special ? "✅" : "❌"} one special character (!@#$&...)</li>
        </ul>

      </div>
    </div>
  )
}