# Ramschema-applikation för kurser vid Dalslands Universitet

Detta är en SPA (Single Page Application) byggd med **Angular** och **TypeScript**. Applikationen låter användare söka, filtrera och sortera kurser – samt skapa ett eget ramschema med valda kurser. All data hanteras lokalt med hjälp av `localStorage`, vilket gör att användarens schema sparas mellan sidladdningar.

## Funktioner

### Huvudsidor
- **Startsidan (`/home`)** - Presentation av den fiktiva skolan och lite påhittat innehåll med enbart syfte att vara estetiskt tilltalande
- **Kurssidan (`/courses`)** – sök, filtrera, sortera och välj kurser.
- **Ramschema (`/my-courses`)** – se ditt ramschema, totalpoäng och ta bort kurser.
- **Notfound** - En sida som tar emot alla sökvägar som inte leder till någon sida, för att ge tydlig feedback till besökande

---

## Grundkrav som uppfyllts

### Teknik och struktur
- Applikationen skapad med **Angular** och **TypeScript**.
- Routing används för att navigera mellan 4 sidor.
- Komponentbaserad struktur.
- All kursdata och ramschemahantering hanteras genom **egna services**.

###  Kurssida
- Visar lista med kurser.
- Filtrering via sökfält (kurskod eller kursnamn).
- Filtrering via dropdown för ämne.
- Sortering på:
  - Kurskod
  - Kursnamn
  - Poäng
  - Ämne
- Möjlighet att lägga till kurser till ramschema (utan dubletter).
- Visar antal kurser i aktuell filtrering/sökning.
- "Lägg till"-knapp ändras till tillagd och inaktiveras efter att kurs lagts till

### Ramschema
- Kurser som lagts till kan ses i ramschemat.
- Visar sammanlagd **högskolepoäng**.
- Möjlighet att ta bort kurser från schemat.
- Data sparas i `localStorage` och laddas automatiskt vid start.
- Inga dubletter tillåts i ramschemat, och det är inte heller möjligt att lägga till samma kurs två gånger i och med att lägg till-knappen inaktiveras.

### Användargränssnitt
- Enhetlig och prydlig design.
- Responsiv design – fungerar på både stora och små skärmar.
- Innehåll presenteras på ett lättillgängligt och tydligt sätt.

### Interaktivitet
- Inget behov av sidladdning – all data uppdateras dynamiskt.
- Visuella effekter (t.ex. hover-effekter) för förbättrad användarupplevelse.

---

## Funktionalitet för högre betyg

### Komponentuppdelning
- Separat **filter- och sorteringsservice (`CourseFilterService`)** skapad för logik kring filtrering, sortering och sidhantering.

### Tjänstefunktionalitet
- Services följer **Single Responsibility Principle**:
  - `CourseService` – hämtar kursdata.
  - `SchemaService` – hanterar localStorage.
  - `CourseFilterService` – all filtrerings-, sorterings- och pagineringslogik.

### Mer utvecklat användargränssnitt
- Hero-bild med overlay-intro på startsidan.
- Grid-baserad layout med kort för introduktionsavsnitt.
- **Font Awesome-ikoner** integrerade i introduktionsavsnittet samt i footer för förbättrad läsbarhet och mer inbjudande design.
- Hover-animationer och lättare skuggor på kort för modern känsla.
- Hover-animationer på samtliga länkar
- Färgval som uppfyller tillgänglighetskrav och bra kontrast.
- "Lägg till"-knapp ändras till "Tillagd", blir grå och inte längre klickbar efter att kurs lagts till. Detta blir tydligt mot besökare vilka kurser de lagt till och tydlig respons på att de lyckades lägga till.


### Git och publicering
- Projektet är versionshanterat med **Git**.
- Projektet publiceras på Netlify.

---