# Private metoder

## Hva

Private metoder kan ikke brukes av andre enn klassen selv.

Vi bruker ofte metoder "utenfra", for eksempel når vi skriver `document.getElementById()`. De fleste metoder vi lager eksisterer fordi de skal brukes fra utsiden, av den som bruker objektet i sin kode. Men noen metoder er lurt at ikke kan brukes utenfra, bare av den som lager klassen.

## Hvorfor

Objekter er nyttige blandt annet fordi de kan "pakke inn" deler av programmet, og dele opp programmet i logiske deler. Å "pakke in" ting, og å kunne glemme detaljene en liten stund, gjør det enklere å kode. Foreksempel er det enklere å skrive `document.getElementById()` enn å skrive alle stegene nettleseren går igjennom for å utføre metoden. Vi kan også bruke funksjoner for å forenkle ting, men objekter foretrekkes ofte fordi de lar oss også "pakke inn" informasjonen funksjonen trenger, og lar oss lage systemer av "ting" på en måte som ligner litt på hvordan ting er i virkeligheten.

For å få til å gjøre sine oppgaver avhenger `document` objektet av at dets interne data får være i fred, at vi ikke kan tukle med informasjonen på måter som gjør at metodene ikke fungerer lengre. Derfor er det ønskelig at objekter kan ha _privat data_, og _private metoder_ (mest fordi de påvirker _privat data_ vi ikke vil skal endres utenfra).

## Syntaks

Når du ser `#` (hashtag) forran navnet på en metode i en klasse er det en _privat metode_. For eksempel:

```javascript
class Player {
    constructor() {
        this.element = this.#build();
    }

    #build() {
        return document.createElement("div");
    }
}
```

`build()` metoden kan ikke brukes av den som bruker objektet i sin kode, metoden kan kun brukes internt i klassen når objektet lages. Slik slipper du at noen som bruker et Player objekt "lager" et html-element på nytt, og overskriver det tidligere, ved å kjøre `player.build()`.
