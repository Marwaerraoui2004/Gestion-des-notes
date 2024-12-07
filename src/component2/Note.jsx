import axios from "axios";
import { useState, useEffect } from "react";




export default function Note() {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ModifyNote, setModifyNote] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 
  const [titleNote, setTitleNote] = useState(""); 
  const [clicked,setclicked]=useState(false)


  const url = "https://notes.devlop.tech/api/notes";
  const logoutUrl = "https://notes.devlop.tech/api/logout";
  const token = localStorage.getItem("token");




  const getNote = async () => {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Notes récupérées :", response.data);
    setNote(response.data);
  };

  useEffect(() => {
    getNote();
  }, [token]);





  const ajouterNotes = async () => {
    const response = await axios.post(
      url,
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Note ajoutée :", response.data);
    setNote((prevNotes) => [...prevNotes, response.data]);
    setTitle("");
    setContent("");
    setIsAdding(false); 
    setclicked(false)
    
  };

 


  const updateNote = async () => {
    if (!ModifyNote) return;
    const response = await axios.put(
      `${url}/${ModifyNote.id}`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Note mise à jour :", response.data);
    setNote((prevNotes) =>
      prevNotes.map((nt) => (nt.id === ModifyNote.id ? response.data : nt))
    );
    setModifyNote(null);
    setTitle("");
    setContent("");
    setclicked(false)

  };





  const modifier = (nt) => {
    setModifyNote(nt);
    setTitle(nt.title);
    setContent(nt.content);
    setIsAdding(true); 
    setclicked(true)


  };




  
  const logout = async () => {
    await axios.post(
      logoutUrl,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.removeItem("token");
    window.location.reload();
  };




  const supprimer = async (id) => {
    await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Note avec l'ID ${id} supprimée.`);
    getNote(); 
  };





  const rechercher = () => {
    if (titleNote.trim() === "") {
      getNote(); 
    } else {
      const filteredNotes = note.filter((nt) =>
        nt.title.toLowerCase().includes(titleNote.toLowerCase())
      );
      setNote(filteredNotes);
    }
  };




    const ajouterUneNote=()=>{
      setclicked(true)
    }





  return (
    <div id="anim">
        
        <div onClick={ajouterUneNote}>
        <h1 className="titre" onClick={rechercher}>Mes Notes</h1>
          <img src="./ajouter.svg" alt="Ajouter une note" style={{ width: '60px', height: '60px' }} className={clicked ? "hidden" : ""}/>
        </div>

        <div className={clicked ? "hidden" : ""}>
        <div style={{display: "flex", alignItems: "center"}}>
        <input type="text" value={titleNote} onChange={(e) => setTitleNote(e.target.value)} placeholder="Rechercher par titre" className="NoteSearch"  style={{marginRight: "10px"}} />
        
        <div onClick={rechercher}>
          <img src="./loupe.svg" alt="Loupe" style={{ width: '30px', height: '30px' }} />
        </div> 
    </div>
          {note.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="divparent">
              {note.map((nt) => (

                <div key={nt.id} className="mydiv" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                      <img src="partager.svg" alt="" style={{ width: "20px", height: "20px" }} />
                      </div>
                    <div onClick={() => supprimer(nt.id)} style={{ position: "absolute", top: "10px", right: "10px" }}>
                      <img src="./supp.png" alt="Supprimer" style={{ width: "20px", height: "20px" }}  />
                    </div>
                  
                    <h3 className="note-title">{nt.title}</h3>
                    <p className="note-content">{nt.content}</p>
                  
                    <div onClick={() => modifier(nt)}  style={{ position: "absolute", bottom: "10px", left: "10px" }} >
                      <img   src="./styloo.svg"  alt="Modifier"  style={{ width: "30px", height: "30px" }} />
                    </div>
              </div>
              
              
              ))}
            </div>
          )}
        </div>

        {clicked && (
          <div className="formulair">
            <h2>{ModifyNote ? "Modifier une note" : "Ajouter une note"}</h2>
            <input type="text" placeholder="Entrez le titre de la note" value={title} onChange={(e) => setTitle(e.target.value)} className="Noteinput" />
            <textarea type="text" placeholder="Entrez le contenu de la note" value={content} onChange={(e) => setContent(e.target.value)} className="Noteinput" />
            <button type="button" onClick={ModifyNote ? updateNote : ajouterNotes} id="mybtn">{ModifyNote ? "Mettre à jour" : "Ajouter"}</button>
          </div>
        )}

        <div style={{ float: "right", position: "relative" }} onClick={logout}>
          <dotlottie-player src="https://lottie.host/629d1f3e-3148-4de8-b40f-8faf8e536265/F6myzzZOxK.lottie"  background="transparent" speed="1" style={{ width: "90px", height: "90px", position: "absolute", right: "10%", transform: "translateX(-50%)" }} loop autoplay />
        </div>
    </div>
  );
}



   

