import axios from "axios";
import { useState, useEffect } from "react";

export default function Note() {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ModifyNote, setModifyNote] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 
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
  };





  const modifier = (nt) => {
    setModifyNote(nt);
    setTitle(nt.title);
    setContent(nt.content);
    setIsAdding(true); 
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




  





  return (
    <>
      
      <h1 className="titre">Les Notes</h1>
      {note.length === 0 ? (
        <p>Aucune note trouvée</p>
      ) : (
        <div className="divparent" >
          {note.map((nt) => (
            <div key={nt.id} className="mydiv">
              <h3 className="note-title">{nt.title}</h3>
              <p className="note-content">{nt.content}</p>
              <button onClick={() => modifier(nt)}>Modifier</button>
              <button onClick={() => supprimer(nt.id)}>Supprimer</button>
              </div>
          ))}
        </div>
      )}
      
      <div>
        <h2>{ModifyNote ? "Modifier une note" : "Ajouter une note"}</h2>
        <input type="text" placeholder="Entrez le titre de la note" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Entrez le contenu de la note" value={content} onChange={(e) => setContent(e.target.value)} className="input-field" />
        
        <button type="button" onClick={ModifyNote ? updateNote : ajouterNotes}> {ModifyNote ? "Mettre à jour" : "Ajouter"} </button>
        
        <button style={{ float: "right" }} onClick={logout}>Logout</button>
      </div>
    </>
  );
}
