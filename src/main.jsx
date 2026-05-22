import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const TVA = 0.20;

const panneaux = [
  { hauteur: 1.03, largeur: 2, prix: 12 },
  { hauteur: 1.23, largeur: 2, prix: 13.36 },
  { hauteur: 1.53, largeur: 2, prix: 16.23 },
  { hauteur: 1.73, largeur: 2, prix: 17.58 },
  { hauteur: 1.93, largeur: 2, prix: 19.1 },

  { hauteur: 1.03, largeur: 2.5, prix: 20.86 },
  { hauteur: 1.23, largeur: 2.5, prix: 23.33 },
  { hauteur: 1.53, largeur: 2.5, prix: 28.74 },
  { hauteur: 1.73, largeur: 2.5, prix: 29.92 },
  { hauteur: 1.93, largeur: 2.5, prix: 34.49 },
];

const poteaux = [
  { taille: 1.07, prix: 9.23 },
  { taille: 1.27, prix: 10.53 },
  { taille: 1.57, prix: 12.82 },
  { taille: 1.87, prix: 14.68 },
  { taille: 2.27, prix: 16.78 },
  { taille: 2.47, prix: 18.75 },
];

function trouverPoteau(hauteur, pose) {
  const besoin = pose === "sceller"
    ? hauteur + 0.5
    : hauteur;

  return (
    poteaux.find((p) => p.taille >= besoin) ||
    poteaux[poteaux.length - 1]
  );
}

function App() {
  const [longueur, setLongueur] = useState(10);
  const [hauteur, setHauteur] = useState(1.53);
  const [largeurPanneau, setLargeurPanneau] = useState(2.5);
  const [pose, setPose] = useState("sceller");
  const [marge, setMarge] = useState(2);

  const calcul = useMemo(() => {
    const panneau = panneaux.find(
      (p) =>
        p.hauteur === Number(hauteur) &&
        p.largeur === Number(largeurPanneau)
    );

    if (!panneau) return null;

    const nbPanneaux = Math.ceil(
      longueur / largeurPanneau
    );

    const nbPoteaux = nbPanneaux + 1;

    const poteau = trouverPoteau(
      Number(hauteur),
      pose
    );

    const prixPanneaux =
      nbPanneaux * panneau.prix;

    const prixPoteaux =
      nbPoteaux * poteau.prix;

    const prixPlatines =
      pose === "platine"
        ? nbPoteaux * 5.5
        : 0;

    const totalHT =
      (prixPanneaux +
        prixPoteaux +
        prixPlatines) *
      marge;

    const totalTTC = totalHT * (1 + TVA);

    const prixML =
      totalTTC / longueur;

    return {
      nbPanneaux,
      nbPoteaux,
      poteau,
      totalHT,
      totalTTC,
      prixML,
    };
  }, [
    longueur,
    hauteur,
    largeurPanneau,
    pose,
    marge,
  ]);

  return (
    <div className="app">
      <h1>Destock Menuiserie</h1>

      <div className="card">
        <label>Longueur totale (ml)</label>
        <input
          type="number"
          value={longueur}
          onChange={(e) =>
            setLongueur(Number(e.target.value))
          }
        />

        <label>Hauteur panneau</label>
        <select
          value={hauteur}
          onChange={(e) =>
            setHauteur(Number(e.target.value))
          }
        >
          <option value={1.03}>1.03 m</option>
          <option value={1.23}>1.23 m</option>
          <option value={1.53}>1.53 m</option>
          <option value={1.73}>1.73 m</option>
          <option value={1.93}>1.93 m</option>
        </select>

        <label>Largeur panneau</label>
        <select
          value={largeurPanneau}
          onChange={(e) =>
            setLargeurPanneau(
              Number(e.target.value)
            )
          }
        >
          <option value={2}>2 mètres</option>
          <option value={2.5}>2m50</option>
        </select>

        <label>Type de pose</label>
        <select
          value={pose}
          onChange={(e) =>
            setPose(e.target.value)
          }
        >
          <option value="sceller">
            À sceller
          </option>
          <option value="platine">
            Sur platine
          </option>
        </select>

        <label>Coefficient marge</label>
        <select
          value={marge}
          onChange={(e) =>
            setMarge(Number(e.target.value))
          }
        >
          <option value={1.8}>Eco</option>
          <option value={2}>Standard</option>
          <option value={2.3}>Premium</option>
        </select>
      </div>

      {calcul && (
        <div className="card">
          <p>
            Panneaux :{" "}
            <strong>
              {calcul.nbPanneaux}
            </strong>
          </p>

          <p>
            Poteaux :{" "}
            <strong>
              {calcul.nbPoteaux}
            </strong>
          </p>

          <p>
            Taille poteaux :{" "}
            <strong>
              {calcul.poteau.taille} m
            </strong>
          </p>

          <p>
            Total HT :{" "}
            <strong>
              {calcul.totalHT.toFixed(2)} €
            </strong>
          </p>

          <p className="result">
            Total TTC :{" "}
            {calcul.totalTTC.toFixed(2)} €
          </p>

          <p className="result">
            Prix/ml :{" "}
            {calcul.prixML.toFixed(2)} €
          </p>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);