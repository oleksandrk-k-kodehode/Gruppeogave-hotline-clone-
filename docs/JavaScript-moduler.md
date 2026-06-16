# JavaScript moduler

## Hva

JavaScript moduler kan inkluderes i andre javascriptfiler på en ryddig måte, uten å føre til kollisjoner i variabelnavn. Brukeren av en modul velger selv hvilket navn den skal få og moduler skal ikke påvirke det globale objektet direktet.

## Hvordan

Koden som skal moduliseres puttes i en egen fil, og vi legger til en eksport-instruks med hva som skal eksporteres til den som importerer modulen.

### Viktig gotcha!

Med en gang kan det virke logisk at moduler legges til i HTML dokumented slik:

```html
<script src="modul.js" type="module">
```

Men det er skriptet som **_bruker_** modulen, som skal legges til slik. Dette kan være forvirrende i og med at vi beskriver skriptet som bruker moduler, som om det var en modul. Dette gjøres fordi det er kunn skript lastet med `type=module` som kan bruke `import` instruksen, ikke fordi skriptet som bruker moduler nødvendigvis er en modul.

JavaScript forstår to typer skript: Ordinære, gammeldagse skript, som inkluders som vanlig (på engelsk: `Classic Scripts`), og moderne skript som bruker moduler (på engelsk: `Module Scripts`).

Altså inkluderes ikke moduler direkte, men av et hovedskript, som inkluderes med en `type=module` attributt:

```html
<script src="app.js" type="module">
```

## Forskjeller på moduler og vanlige skript

- Moduler får automatisk en `defer` attribut
- Moduler har en isolert scope, ikke samme globale scope som vanlige skript
- Alle moduler kjører i `strict mode` med flere begrensninger og feilmeldinger enn vanlige skript
- Regler for henting av modul-skript fra server er strengere (Cross Origin Resource Sharing)

## Syntax

### I modul-fil:

```javascript
class EksporterbarKlasse = {
    // ..
}

export ExporterbarKlasse;
```

### I applikasjon som bruker modul:

```javascript
import { Klasse } from "./EksporterbarKlasse.js";

const objekt = new Klasse();
```

### Viktig gotcha!

`import`-instruksen i forrige eksempel ser ut til å bruke destructuring runt navnet, men dette er en spesiell `import`-syntaks og fungerer ikke helt som om den importerte koden er pakket inn i et objekt. Den eneste viktige forskjellen er kanskje at `import` ikke har tilgang til objekter opprettet under "run-time", og kan ikke brukes på dynamisk definerte verdier.

"Destrukturerings"-syntaksen kan hoppes over ved bruk av `export default`:

#### I modul-fil:

```javascript
class EksporterbarKlasse = {
    // ..
}

export default ExporterbarKlasse;
```

#### I applikasjon som bruker modul:

```javascript
import Klasse from "./EksporterbarKlasse.js";

const objekt = new Klasse();
```
