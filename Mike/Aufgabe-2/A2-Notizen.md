# Nachschlagewerke:

https://wiki.selfhtml.org/wiki/CSS/Tutorials/Einstieg/vom_Entwurf_zum_Layout
https://de.ryte.com/wiki/Mobile_First/
https://de.wikipedia.org/wiki/Webdesign-Layouttyp
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
https://www.youtube.com/watch?v=UuHvG-1Np0w CSS Grid Layouts in 7 min.

# Responsive Design:

Zitat: Weil eine einheitliche Darstellung mobiler Webseiten nicht möglich war, entwickelte man ein dynamisches Design, das seit etwa 2010 den Standard mobilfreundlichen Designs markierte, das Responsive Design. Ein Manko dessen war, dass manche Seiten auf dem Smartphone im „Endlosmodus“ angezeigt wurden. Die Lösung war dann oft, das mobile Design zu entschlacken. Darunter litt aber zusehends die Usability, die man damit ursprünglich verbessern wollte, weil sie mobilen Nutzern nur einen Teil der Inhalte zur Verfügung stellt.

# Media Queries:

Ist eine Funktion von CSS 3 und wurde 2012 von W3C standartisiert, erlaubt "Content" Renderung also Anpassung. Medienabfragen, unterschiedliche Ausgabemedien (Handy, Tablet, kleiner Desktop / groß). Also Anzeigefenster werden damit festgelegt die Technik dazu => CSS Breakpoints.

## CSS Breakpoints in Pixels:

0-480
481-768
769-1279
1280+

# CSS Rastersysteme

## CSS Grid

Vanilla ist das CSS Grid Layout..

```
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
  <div class="four">Four</div>
  <div class="five">Five</div>
  <div class="six">Six</div>
</div>
```

```
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column: 1 / 3;
  grid-row: 1;
}
.two {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
```

oder

```
.container {
  display: grid;
  grid-template-rows:200px 1fr 100px;
  grid-template-columns:25% 25% 25% 25%;
}
```

## Responsive CSS Grids

```
.container {
  height:100vh;
  display: grid;
  grid-template-rows: 80px 4fr 1fr 40px;
  grid-template-columns: 100%;
  grid-template-areas:
    "header"
    "content"
    "sidebar"
    "footer"
  ;
}

@media screen and (min-width: 44.001em) {
  .container {
    grid-template-rows: 200px 1fr 100px;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-areas:
      "header header header header"
      "content content content sidebar"
      "footer footer footer footer"
    ;
  }
}
```

# Bekannte Bibliotheken:

-bootstrap
-tailwind CSS
-material UI
-bulma

# Standard Layout Typen

-festes Layout (festgelegte Pixelwerte, unflexibel was verschiedene Ausgabemedien angeht Handy, Tablet, Desktop)
-fluides Layout (% Werte passen die Größe an Anzeigefester (Viewport) / Ausgabemedien an)
-elastisches Layout (Hauptfokus ist Typografie also Schrift -Freundlichkeit und als Maß nutzt man em also, 1 em = 16 px als Standard im Webbrowser als Beispiel Wikipedia)

# Layout Ansätze

-Desktop First
-Mobile First

# Mobile First:

Entwicklungsansatz, da die Nutzer immer mehr vom Handy aus auf das WWW zugreifen. Es besagt das die Prioritäten andersherum gesetzt werden. Das Design bzw. die Struktur einer Website orientiert sich an der Usability auf mobilen Endgeräten, allen voran Smartphones. Javascript wird ein wenig umgegangen durch mobile Features in HTML 5.

## Vorteile

-mobile Optimierung beginnt schon seit Website Konzeption
-durch den Content-bezogenen Ansatz (Content soll kleiner, flexibler sein) wird automatisch die Website minimalistischer
-freundlicher für neue Erweiterungen durch den minimalistischen Charakter
-Google belohnt mobile Optimierung weil die Web-Crawler von Desktop auf Mobile umgestellt wurden

## Nachteile

-Fehleranfälligkeit ist höher
-Desktop-optimierte Websites sind schwieriger mobil umzusetzen, bzw. benötigt es einen kompletten Relaunch (neue mobil first Entwicklung) je nach Use Case
-auch der Content lässt sich nicht problemlos runterskalieren, man denke große Produktbilder

# Desktop First

Beim Mobile-First-Design wird das Nutzererlebnis auf kleineren Bildschirmen priorisiert. Im Gegensatz dazu wird beim Desktop-First-Design der Fokus auf größere Bildschirme wie Desktops und Laptops gelegt. Es wird eine Website mit einem Layout und Design erstellt, das auf das Desktop-Erlebnis optimiert ist und dann an kleinere Bildschirme wie Tablets und Smartphones angepasst wird.

Desktop-First-Design ist ein Webdesign-Ansatz, bei dem das Desktop- oder Laptop-Erlebnis im Vordergrund steht. Dabei wird die Website zunächst für den Desktop-Nutzer entworfen und dann an kleinere Bildschirme angepasst.

## Vorteile

-Mehr Flexibilität & Komplexität

## Nachteile

-schlechtere Mobilität
-unklare Zukunftssicherheit (Trend mehr mobile User)

# Fazit mobile vs desktop first

Je nach Use Case, Zielgruppe, Art der Inhalte, Ziele, Budget, Nutzerforschung sollte der Entwicklungsansatz gewählt werden.
