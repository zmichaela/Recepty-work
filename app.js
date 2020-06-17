/*
Co budeme dělat:

1) Do prvku s id="recepty" vygenerujeme z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - při kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) DOMÁCÍ ÚKOL:
Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.
*/

const elRecepty = document.querySelector("#recepty");
const elHledat = document.querySelector("#hledat");
const elTlacitko = document.querySelector(".hledani button");
const elKategorie = document.querySelector("#kategorie");
const elRazeni = document.querySelector("#razeni");

let vyhledaneRecepty = recepty;

vyhledejRecepty();
zobrazRecept(0);
//skryjFormular();

elTlacitko.addEventListener("click", vyhledejRecepty);
elHledat.addEventListener("input", vyhledejRecepty);
elKategorie.addEventListener("input", vyhledejRecepty);
elRazeni.addEventListener("input", vyhledejRecepty);

function vyhledejRecepty() {
  let textHledani = elHledat.value.toLowerCase();
  let textKategorie = elKategorie.value;
  let textRazeni = elRazeni.value;

  vyhledaneRecepty = recepty;

  //hledání podle názvu receptu - s anonymní funkcí
  vyhledaneRecepty = vyhledaneRecepty.filter(function (recept) {
    return recept.nadpis.toLowerCase().includes(textHledani);
  });

  //hledání podle kategorií - s anonymní (arrow) funkcí
  if (textKategorie != "") {
    vyhledaneRecepty = vyhledaneRecepty.filter(
      (recept) => recept.kategorie === textKategorie
    );
  }

  //řazení 
  if (textRazeni === "1") {
    vyhledaneRecepty.sort(
      (recept1, recept2) => recept2.hodnoceni - recept1.hodnoceni
    );
  } else if (textRazeni === "2") {
    vyhledaneRecepty.sort(
      (recept1, recept2) => recept1.hodnoceni - recept2.hodnoceni
    ); 
  }
  vypisSeznamReceptu();
  zobrazRecept(0);
}



function vypisSeznamReceptu() {
  let obsah = "";

  for (let i = 0; i < vyhledaneRecepty.length; i++) {
    let recept = vyhledaneRecepty[i];
    obsah += `<div class="recept" data-index=${i} onclick="zobrazRecept()">
                <div class="recept-obrazek">
                    <img src="${recept.img}" alt="Obrazek">
                </div>

                <div class="recept-info">
                    <h3>${recept.nadpis}</h3>
                </div>
            </div>`;
  }

  elRecepty.innerHTML = obsah;
}


function zobrazRecept (index) {
  let foto = document.querySelector("#recept-foto");
  let kategorie = document.querySelector("#recept-kategorie");
  let hodnoceni = document.querySelector("#recept-hodnoceni");
  let nazev = document.querySelector("#recept-nazev");
  let popis = document.querySelector("#recept-popis");

  let recept = vyhledaneRecepty[index];

  foto.src = recept.img;
  kategorie.textContent = recept.kategorie;
  hodnoceni.textContent = recept.hodnoceni;
  nazev.textContent = recept.nadpis;
  popis.textContent = recept.popis;

}


function pridatRecept () {

}

//function skryjFormular () {
//  document.querySelector("#recept-novy").style.display = "none";

//}