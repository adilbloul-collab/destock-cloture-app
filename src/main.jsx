import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const logo = "IMG_1762.png";

const TVA = 0.20;

const panneaux = {
  "4mm": {
  2: {
    0.63: 10.14,
    1.03: 12,
    1.23: 13.36,
    1.53: 16.23,
    1.73: 17.58,
    1.93: 19.1,
  },
},

  hybride: {
    2.5: {
      0.63: 12.9,
      1.03: 15.89,
      1.23: 17.92,
      1.53: 21.98,
      1.73: 24.01,
      1.93: 25.87,
    },
  },

  "5mm": {
    2.5: {
      0.63: 16.9,
      1.03: 20.86,
      1.23: 23.33,
      1.53: 28.74,
      1.73: 29.92,
      1.93: 34.49,
    },
  },
};

const occultants = {
  aucun: 0,

  pvc: {
    2: {
      0.63: 22,
      1.03: 31.51,
      1.23: 37.92,
      1.53: 40.86,
      1.73: 43.91,
      1.93: 50.47,
    },

    2.5: {
      0.63: 30,
      1.03: 43,
      1.23: 48,
      1.53: 55,
      1.73: 61,
      1.93: 66,
    },
  },

  composite: {
    2: {
      0.63: 31,
      1.03: 43.15,
      1.23: 47.56,
      1.53: 54.15,
      1.73: 58.51,
      1.93: 63.2,
    },

    2.5: {
      0.63: 39,
      1.03: 51.82,
      1.23: 57.28,
      1.53: 65.46,
      1.73: 70.89,
      1.93: 76.35,
    },
  },

  aluminium: {
    2: {
      0.63: 52,
      1.03: 71.64,
      1.23: 81.89,
      1.53: 97.28,
      1.73: 107.55,
      1.93: 117.8,
    },

    2.5: {
      0.63: 66,
      1.03: 87.26,
      1.23: 100.11,
      1.53: 119.37,
      1.73: 132.21,
      1.93: 145.06,
    },
  },
};

const poteaux = [
  { taille: 1.07, prix: 9.23 },
  { taille: 1.27, prix: 10.53 },
  { taille: 1.57, prix: 12.82 },
  { taille: 1.87, prix: 14.68 },
  { taille: 2.27, prix: 16.78 },
  { taille: 2.47, prix: 18.75 },
];

function trouverPoteau(hauteur, pose) {
  const besoin =
    pose === "sceller"
      ? hauteur + 0.5
      : hauteur;

  return (
    poteaux.find((p) => p.taille >= besoin) ||
    poteaux[poteaux.length - 1]
  );
}

function App() {
  const [longueur, setLongueur] = useState(10);

  const [hauteur, setHauteur] =
    useState(1.53);

  const [largeur, setLargeur] =
    useState(2.5);

  const [typePanneau, setTypePanneau] =
    useState("5mm");

  const [pose, setPose] =
    useState("sceller");

  const [occultation, setOccultation] =
    useState("aucun");

  const calcul = useMemo(() => {
    const prixPanneau =
      panneaux[typePanneau]?.[largeur]?.[
        hauteur
      ];

    if (!prixPanneau) return null;

    const nbPanneaux = Math.ceil(
      longueur / largeur
    );

    const nbPoteaux = nbPanneaux + 1;

    const poteau = trouverPoteau(
      hauteur,
      pose
    );

    const totalPanneaux =
      nbPanneaux * prixPanneau;

    const totalPoteaux =
      nbPoteaux * poteau.prix;

    let totalOccultation = 0;

    if (occultation !== "aucun") {
      const prixOccultation =
        occultants[occultation]?.[
          largeur
        ]?.[hauteur] || 0;

      totalOccultation =
        nbPanneaux * prixOccultation;
    }

    let totalFixation = 0;

    if (pose === "platine") {
      const prixParPoteau =
        5.5 + 3 * 0.7 + 3 * 0.05;

      totalFixation =
        nbPoteaux * prixParPoteau;
    }

    const totalHT =
      totalPanneaux +
      totalPoteaux +
      totalOccultation +
      totalFixation;

    const totalTTC =
      totalHT * (1 + TVA);

    const prixML =
      totalTTC / longueur;

    return {
      nbPanneaux,
      nbPoteaux,
      poteau,
      totalHT,
      totalTTC,
      prixML,
      totalOccultation,
      totalFixation,
    };
  }, [
    longueur,
    hauteur,
    largeur,
    typePanneau,
    pose,
    occultation,
  ]);

  return (
    <div className="app">

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "220px",
            maxWidth: "90%",
          }}
        />
      </div>

      <div className="card">
        <label>Longueur (ml)</label>

        <input
          type="number"
          value={longueur}
          onChange={(e) =>
            setLongueur(
              Number(e.target.value)
            )
          }
        />

        <label>Hauteur</label>

        <select
          value={hauteur}
          onChange={(e) =>
            setHauteur(
              Number(e.target.value)
            )
          }
        >
          <option value={0.63}>0.63m</option>
          <option value={1.03}>1.03m</option>
          <option value={1.23}>1.23m</option>
          <option value={1.53}>1.53m</option>
          <option value={1.73}>1.73m</option>
          <option value={1.93}>1.93m</option>
        </select>

        <label>Largeur panneau</label>

        <select
          value={largeur}
          onChange={(e) =>
            setLargeur(
              Number(e.target.value)
            )
          }
        >
          <option value={2}>2m</option>
          <option value={2.5}>2m50</option>
        </select>

        <label>Type panneau</label>

        <select
          value={typePanneau}
          onChange={(e) =>
            setTypePanneau(e.target.value)
          }
        >
          <option value="4mm">
            Fil 4 mm
          </option>

          <option value="hybride">
            Hybride 4/5 mm
          </option>

          <option value="5mm">
            Fil 5 mm
          </option>
        </select>

        <label>Occultation</label>

        <select
          value={occultation}
          onChange={(e) =>
            setOccultation(
              e.target.value
            )
          }
        >
          <option value="aucun">
            Aucun
          </option>

          <option value="pvc">
            PVC
          </option>

          <option value="composite">
            Composite
          </option>

          <option value="aluminium">
            Aluminium
          </option>
        </select>

        <label>Pose</label>

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
      </div>

      {calcul && (
        <div className="card">
          <p>
            Panneaux :
            <strong>
              {" "}
              {calcul.nbPanneaux}
            </strong>
          </p>

          <p>
            Poteaux :
            <strong>
              {" "}
              {calcul.nbPoteaux}
            </strong>
          </p>

          <p>
            Taille poteaux :
            <strong>
              {" "}
              {calcul.poteau.taille} m
            </strong>
          </p>

          {pose === "platine" && (
            <p>
              Platines + goujons +
              capuchons :
              <strong>
                {" "}
                {calcul.totalFixation.toFixed(
                  2
                )} €
              </strong>
            </p>
          )}

          {occultation !== "aucun" && (
            <p>
              Occultation :
              <strong>
                {" "}
                {calcul.totalOccultation.toFixed(
                  2
                )} €
              </strong>
            </p>
          )}

          <hr />

          <p>
            Total HT :
            <strong>
              {" "}
              {calcul.totalHT.toFixed(
                2
              )} €
            </strong>
          </p>

          <p className="result">
            Total TTC :
            {" "}
            {calcul.totalTTC.toFixed(
              2
            )} €
          </p>

          <p className="result">
            Prix / ml :
            {" "}
            {calcul.prixML.toFixed(
              2
            )} €
          </p>
        </div>
      )}
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);