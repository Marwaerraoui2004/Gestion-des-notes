import axios from "axios";
import { useState } from "react";
import Note from "./Note";
import '../styles/style.css'; 
import '../styles/style2.css'; 


export default function Logine() {
  const [cin, setCin] = useState("JK52034");
  const [password, setPassword] = useState("123456");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [envoi, setEnvoi] = useState(false);  
  const url = "https://notes.devlop.tech/api/login";

  const envoyer = async () => {
    setEnvoi(true);  
    try {
      const response = await axios.post(url, { cin, password });
      console.log("Réponse serveur :", response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      setIsLoggedIn(true);  
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setIsLoggedIn(false); 
    } finally {
      setEnvoi(false);  
    }
  };







  

  return (
    <div className="login-container">
      {envoi ? (
        <div className="spinner"></div>  
      ) : isLoggedIn ? (
        <Note />  
      ) : (
        <div className="login-form">
          <h1 className="titree">Login</h1>
          <input type="text"  className="input-field" placeholder="Entrez votre CIN" value={cin} onChange={(e) => setCin(e.target.value)}/>
          <input
            type="password"
            className="input-field"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="login-button" type="button" onClick={envoyer}>
            Valider
          </button>
        </div>
      )}
      
    </div>
  );
}
