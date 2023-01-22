Kryteria przyjęcia
Utworzono repozytorium goit-js-hw-09.
Przy oddaniu pracy domowej dołączono linki: do plików źródłowych i strony roboczej na GitHub Pages.
Wiersz poleceń nie zawiera błędów i ostrzeżeń.
Projekt utworzono z pomocą parcel-project-template.
Sformatowano kod Prettier.
Pliki startowe
Pobierz pliki startowe z gotowymi znacznikami, stylami i załączonymi plikami skryptów dla każdego zadania. Skopiuj je do swojego projektu, całkowicie zastępując folder src w parcel-project-template.

Zadanie 1 - zmiana koloru
Wykonuj to zadanie w plikach 01-color-switcher.html i 01-color-switcher.js. Obejrzyj wersję demonstracyjną wideo o działaniu zmiany koloru.

W HTML znajdują się przyciski «Start» i «Stop».

<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>

Napisz skrypt, który po kliknięciu przycisku «Start», raz na sekundę zmienia kolor tła <body> na wartość losową używając stylu inline. Po kliknięciu przycisku «Stop», kolor tła powinien przestać się zmieniać.

UWAGA
Zwróć uwagę na to, że przycisk «Start» można klikać w nieskończoność. Zrób tak, żeby przycisk «Start» był nieaktywny, dopóki zmiana tematu jest uruchomiona (disabled).

Aby wygenerować losowy kolor użyj funkcji getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

Zadanie 2 - odliczanie czasu
Wykonuj to zadanie w plikach 02-timer.html i 02-timer.js. Napisz skrypt licznika, który odlicza czas do określonego zdarzenia. Taki licznik można wykorzystywać na blogach czy w sklepach internetowych, stronach z różnymi wydarzeniami, podczas przerwy technicznej itd. Obejrzyj wersję demonstracyjną wideo o działaniu licznika.

Elementy interfesju
W HTML znajduje się znacznik licznika, pola wyboru końcowej daty i przycisku, po którego kliknięciu licznik powinien się uruchomić. Popraw wizualnie elementy interfejsu.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

Biblioteka flatpickr
Używaj biblioteki flatpickr po to, aby pozwolić użytkownikowi wybrać ostateczną datę i godzinę w różnych przeglądarkach w jednym elemencie interfejsu. Aby połączyć kod CSS biblioteki z projektem, należy dodać jeszcze jeden import, oprócz tego opisanego w dokumentacji.

// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

Biblioteka czeka na jej inicjalizację w elemencie input[type="text"], dlatego dodaliśmy do HTML input#datetime-picker.

<input type="text" id="datetime-picker" />

Drugim argumentem funkcji flatpickr(selector, options) można przekazać nieobowiązkowy obiekt parametrów. Przygotowaliśmy dla Ciebie obiekt, który jest niezbędny do wykonania zadania. Zorientuj się, za co odpowiada każda właściwość w dokumentacji «Options» i użyj jej w swoim kodzie.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

Wybór daty
Metoda onClose() z obiektu parametrów pojawia się za każdym razem przy zamknięciu elementu interfejsu, który tworzy flatpickr. To właśnie w nim należy opracować datę wybraną przez użytkownika. Parametr selectedDates to tablica wybranych dat, dlatego bierzemy pierwszy element.

Jeśli użytkownik wybrał datę z przeszłości, pokaż window.alert() o treści "Please choose a date in the future".
Jeśli użytkownik wybrał odpowiednią datę (z przyszłości), przycisk «Start» staje się aktywny.
Przycisk «Start» powinien być nieaktywny dotąd, dopóki użytkownik nie wybierze daty z przyszłości.
Po kliknięciu przycisku «Start» zaczyna się odliczanie czasu do wybranej daty od momentu kliknięcia.
Odliczanie czasu
Po kliknięciu na przycisk «Start» skrypt powinien wyliczać raz na sekundę ile czasu pozostało do wskazanej daty i aktualizować interfejs licznika, pokazując cztery liczby: dni, godziny, minuty i sekundy w formacie xx:xx:xx:xx.

Liczba dni może się składać z więcej niż dwóch cyfr.
Licznik powinien się zatrzymać, po dojściu do daty końcowej, czyli 00:00:00:00.
NIE BĘDZIEMY KOMPLIKOWAĆ
Jeśli licznik jest uruchomiony, należy odświeżyć stronę, aby go zrestartować i wybrać nową datę.

Aby obliczyć wartości użyj gotowej funkcji convertMs, gdzie ms - różnica między końcową i aktualną datą w milisekundach.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

Formatowanie czasu
Funkcja convertMs() przywraca obiekt z obliczonym pozostałym czasem do daty końcowej. Zwróć uwagę, że nie formatuje wyniku. To znaczy, że jeśli pozostały 4 minuty czy sekundy, to funkcja przywróci 4, a nie 04. W interfejsie licznika konieczne jest dodanie 0 jeśli liczba zawiera mniej niż dwa symbole. Napisz funkcję addLeadingZero(value), która używa metody padStart() i przed renderowaniem interfejsu sformatuj wartość.

Biblioteka powiadomień
UWAGA
Następna funkcja nie jest obowiązkowa przy oddawaniu zadania, ale będzie dobrą dodatkową praktyką.

Aby wyświetlić użytkownikowi powiadomienie, zamiast window.alert() użyj biblioteki notiflix.

Zadanie 3 - generator obietnic
Wykonuj to zadanie w plikach 03-promises.html i 03-promises.js. Obejrzyj wersję demonstracyjną wideo o działaniu generatora obietnic.

W HTML znajduje się znacznik formularza, w którego pola użytkownik będzie wprowadzał pierwsze opóźnienie w milisekundach, stopień zwiększenia opóźnienia dla każdej kolejnej obietnicy i liczbę obietnic, które należy utworzyć.

<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>

Napisz skrypt, który po wysłaniu formularza wywoła funkcję createPromise(position, delay) tyle razy, ile wprowadzono w pole amount. Po każdym wywołaniu przekaż jej numer utworzonej obietnicy (position) i opóźnienie, uwzględniając wprowadzone przez użytkownika pierwsze opóźnienie (delay) i stopień (step).

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

Uzupełnij kod funkcji createPromise tak, aby przywracała jedną obietnicę, którą realizuje się lub odkłada poprzez delay czasu. Wartością obietnicy powinien być obiekt, w którym będą właściwości position i delay z wartościami parametrów o tej samej nazwie. Użyj kodu początkowego funkcji, aby wybrać to, co należy zrobić z obietnicą - zrealizować lub odłożyć.

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

Biblioteka powiadomień
UWAGA
Następna funkcja nie jest obowiązkowa przy oddawaniu zadania, ale będzie dobrą dodatkową praktyką.

Aby wyświetlić użytkownikowi powiadomienie, zamiast console.log() użyj biblioteki notiflix.
