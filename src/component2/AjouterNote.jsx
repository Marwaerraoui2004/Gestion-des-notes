import axios from "axios";
import { useState } from "react";

export default function AjouterNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const url = "https://notes.devlop.tech/api/notes";

  const ajouterNotes = async () => {
    const response = await axios.post(
      url,
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Note ajoutée :", response.data);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>Ajouter une note</h2>
      <input  type="text" placeholder="Entrez le titre de la note" value={title} onChange={(e) => setTitle(e.target.value)}  className="Noteinput"/>
      <input type="text"  placeholder="Entrez le contenu de la note" value={content} onChange={(e) => setContent(e.target.value)} className="Noteinput"/>
      <button type="button" onClick={ajouterNotes}>Ajouter</button>
    </div>
  );
}
