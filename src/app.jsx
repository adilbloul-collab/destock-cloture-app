import { useState } from "react";

export default function App() {
  const [portes, setPortes] = useState([
    {
      quantite: 1,
      taille: "80",
      ouverture: "Gauche",
      norme: "PL",
      systeme: "Porte à recouvrement",
      modele: "",
      couleur: "",
      vitrage: "",
      remplissage: "Rayon de miel",
      serrure: "Serrure à clé",
      ventilation: "",
      cadre: "Fixe",
      poignee: "",
      bande: "6 cm",
      gamme: "",
      angle: "45°",
      infos: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...portes];
    updated[index][field] = value;
    setPortes(updated);
  };

  const ajouterPorte = () => {
    setPortes([
      ...portes,
      {
        quantite: 1,
        taille: "80",
        ouverture: "Gauche",
        norme: "PL",
        systeme: "Porte à recouvrement",
        modele: "",
        couleur: "",
        vitrage: "",
        remplissage: "Rayon de miel",
        serrure: "Serrure à clé",
        ventilation: "",
        cadre: "Fixe",
        poignee: "",
        bande: "6 cm",
        gamme: "",
        angle: "45°",
        infos: "",
      },
    ]);
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Destock Menuiserie
      </h1>

      <h2 style={{ textAlign: "center", marginBottom: 30 }}>
        Demande de portes intérieures
      </h2>

      {portes.map((porte, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Porte {index + 1}</h3>

          <label>Quantité</label>
          <input
            type="number"
            value={porte.quantite}
            onChange={(e) =>
              handleChange(index, "quantite", e.target.value)
            }
            style={styles.input}
          />

          <label>Taille</label>
          <select
            value={porte.taille}
            onChange={(e) =>
              handleChange(index, "taille", e.target.value)
            }
            style={styles.input}
          >
            <option>60</option>
            <option>70</option>
            <option>80</option>
            <option>90</option>
            <option>100</option>
          </select>

          <label>Ouverture</label>
          <select
            value={porte.ouverture}
            onChange={(e) =>
              handleChange(index, "ouverture", e.target.value)
            }
            style={styles.input}
          >
            <option>Gauche</option>
            <option>Droite</option>
          </select>

          <label>Norme</label>
          <select
            value={porte.norme}
            onChange={(e) =>
              handleChange(index, "norme", e.target.value)
            }
            style={styles.input}
          >
            <option>PL</option>
            <option>CZ</option>
          </select>

          <label>Système</label>
          <select
            value={porte.systeme}
            onChange={(e) =>
              handleChange(index, "systeme", e.target.value)
            }
            style={styles.input}
          >
            <option>Porte à recouvrement</option>
            <option>Porte à chant droit</option>
            <option>Porte inversée</option>
            <option>Porte vitrée</option>
          </select>

          <label>Collection / Modèle</label>
          <input
            type="text"
            value={porte.modele}
            onChange={(e) =>
              handleChange(index, "modele", e.target.value)
            }
            style={styles.input}
          />

          <label>Couleur</label>
          <input
            type="text"
            value={porte.couleur}
            onChange={(e) =>
              handleChange(index, "couleur", e.target.value)
            }
            style={styles.input}
          />

          <label>Vitrage</label>
          <input
            type="text"
            value={porte.vitrage}
            onChange={(e) =>
              handleChange(index, "vitrage", e.target.value)
            }
            style={styles.input}
          />

          <label>Remplissage</label>
          <select
            value={porte.remplissage}
            onChange={(e) =>
              handleChange(index, "remplissage", e.target.value)
            }
            style={styles.input}
          >
            <option>Rayon de miel</option>
            <option>Plaque pleine</option>
          </select>

          <label>Serrure</label>
          <select
            value={porte.serrure}
            onChange={(e) =>
              handleChange(index, "serrure", e.target.value)
            }
            style={styles.input}
          >
            <option>Serrure à clé</option>
            <option>Serrure WC</option>
            <option>Serrure à cylindre</option>
            <option>Serrure économiste</option>
          </select>

          <label>Ventilation</label>
          <input
            type="text"
            value={porte.ventilation}
            onChange={(e) =>
              handleChange(index, "ventilation", e.target.value)
            }
            style={styles.input}
          />

          <label>Cadre</label>
          <select
            value={porte.cadre}
            onChange={(e) =>
              handleChange(index, "cadre", e.target.value)
            }
            style={styles.input}
          >
            <option>Fixe</option>
            <option>Réglable</option>
          </select>

          <label>Poignée</label>
          <input
            type="text"
            value={porte.poignee}
            onChange={(e) =>
              handleChange(index, "poignee", e.target.value)
            }
            style={styles.input}
          />

          <label>Bande</label>
          <select
            value={porte.bande}
            onChange={(e) =>
              handleChange(index, "bande", e.target.value)
            }
            style={styles.input}
          >
            <option>6 cm</option>
            <option>8 cm</option>
          </select>

          <label>Gamme de réglage</label>
          <input
            type="text"
            value={porte.gamme}
            onChange={(e) =>
              handleChange(index, "gamme", e.target.value)
            }
            style={styles.input}
          />

          <label>Angle</label>
          <select
            value={porte.angle}
            onChange={(e) =>
              handleChange(index, "angle", e.target.value)
            }
            style={styles.input}
          >
            <option>45°</option>
            <option>90°</option>
          </select>

          <label>Informations additionnelles</label>
          <textarea
            value={porte.infos}
            onChange={(e) =>
              handleChange(index, "infos", e.target.value)
            }
            style={styles.textarea}
          />
        </div>
      ))}

      <button onClick={ajouterPorte} style={styles.button}>
        + Ajouter une porte
      </button>

      <button style={styles.button}>
        Envoyer la demande
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    padding: 10,
    minHeight: 100,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: 15,
    background: "black",
    color: "white",
    border: "none",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    cursor: "pointer",
  },
};