import React, { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-12-11T16:00:00+05:30");
const venue = "Harsh Garden Marriage Home";
const venueAddress =
  "125, Futta Tora Police Chowki, ke samne, Tajganj, Agra, Uttar Pradesh 282004";
const mapSearch =
  "https://www.google.com/maps/search/?api=1&query=532C%2BJ93+Tora+Police+Chowki+Tajganj+Agra";
const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const events = [
  {
    weekday: "Budhvaar",
    day: "09",
    name: "Lagun",
    time: "5:00 PM se",
    detail:
      "Shubh muhurat mein lagun ki rasm, parivaar aur apnon ke beech.",
  },
  {
    weekday: "Guruvaar",
    day: "10",
    name: "Mehendi",
    time: "4:00 PM se",
    detail: "Mehendi, chai aur lok geet ke saath ek pyaari shaam.",
    attire: "Peela aur hara, halke kapde",
  },
  {
    weekday: "Shukrawaar",
    day: "11",
    name: "Shaadi",
    time: "Baraat 4:00 PM",
    detail: "Baraat ki dhoom, phere aur saat vachan mandap ke neeche.",
  },
  {
    weekday: "Shanivaar",
    day: "12",
    name: "Reception",
    time: "6:00 PM se",
    detail: "Dawat, shubhkamnayein aur naach-gaana, jashn ke aakhri din.",
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7.5 3v4M16.5 3v4M4 9.5h16M8 13h2m4 0h2m-8 4h2m4 0h2" />
    </svg>
  );
}

function ExperienceIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10v4h3l4 3V7l-4 3H4Z" />
      {active ? (
        <path d="M15 9v6m4-6v6" />
      ) : (
        <path d="m15 9 5 3-5 3z" />
      )}
    </svg>
  );
}

function FloralBand() {
  return (
    <svg viewBox="0 0 900 150" preserveAspectRatio="xMidYMid slice">
      <defs>
        <g id="band-blossom">
          <g fill="#f3f5e8" opacity=".38">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-13"
                rx="11"
                ry="20"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          <circle r="6" fill="#dfce7d" opacity=".7" />
        </g>
        <pattern id="garden-pattern" width="220" height="150" patternUnits="userSpaceOnUse">
          <rect width="220" height="150" fill="#335021" />
          <path
            d="M-15 115C44 52 79 116 129 61S194 48 235 12M-18 25C47 83 79 69 114 116s80 19 124 35"
            fill="none"
            stroke="#8ba65c"
            strokeWidth="2"
            opacity=".42"
          />
          <path
            d="M45 79c-25-24-20-42 9-45 7 22 4 36-9 45Zm48 22c11-29 31-37 51-18-12 21-28 27-51 18Zm45-57c-8-28 4-43 31-37 1 23-10 35-31 37ZM1 38c10-25 28-29 47-12C38 47 21 51 1 38Z"
            fill="#a5bf75"
            opacity=".46"
          />
          <use href="#band-blossom" x="48" y="46" />
          <use href="#band-blossom" x="158" y="102" transform="scale(.82) translate(35 22)" />
          <use href="#band-blossom" x="128" y="27" transform="scale(.62)" />
          <circle cx="185" cy="27" r="2" fill="#d9e3bd" opacity=".6" />
          <circle cx="18" cy="125" r="2.5" fill="#d9e3bd" opacity=".5" />
        </pattern>
      </defs>
      <rect width="900" height="150" fill="url(#garden-pattern)" />
    </svg>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const secondsLeft = Math.max(
    0,
    Math.floor((weddingDate.getTime() - remaining) / 1000),
  );

  if (!secondsLeft) {
    return (
      <div className="countdown finished" aria-live="polite">
        <span className="countdown-label">The celebration has begun</span>
        <span className="countdown-hindi">शुभ विवाह</span>
      </div>
    );
  }

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="countdown" aria-live="polite">
      <span className="countdown-label">Counting down to forever</span>
      <div className="countdown-units">
        {[
          ["Days", days],
          ["Hours", hours],
          ["Minutes", minutes],
          ["Seconds", seconds],
        ].map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-number">
              {String(value).padStart(2, "0")}
            </span>
            <span className="countdown-name">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeddingCalendar() {
  const calendarDays = useMemo(() => {
    const firstWeekday = (new Date(Date.UTC(2026, 11, 1)).getUTCDay() + 6) % 7;
    const daysInMonth = new Date(Date.UTC(2027, 0, 0)).getUTCDate();
    return [
      ...Array(firstWeekday).fill(null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, []);

  const weeks = [];
  for (let index = 0; index < calendarDays.length; index += 7) {
    weeks.push(calendarDays.slice(index, index + 7));
  }

  const calendarUrl = new URL("https://calendar.google.com/calendar/render");
  calendarUrl.search = new URLSearchParams({
    action: "TEMPLATE",
    text: "Wedding Reception: Shivam & Shikha",
    dates: "20261211T103000Z/20261211T133000Z",
    details:
      "You are cordially invited with your family to the wedding of Shivam Rathour and Shikha Rathore.",
    location: `${venue}, ${venueAddress}`,
  }).toString();

  return (
    <div className="calendar-wrap">
      <div className="calendar" aria-label="December 2026 calendar">
        <h3>December 2026</h3>
        <table>
          <thead>
            <tr>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <th scope="col" key={day}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, row) => (
              <tr key={row}>
                {Array.from({ length: 7 }, (_, column) => {
                  const day = week[column] ?? null;
                  return (
                    <td
                      className={
                        day === 11
                          ? "wedding-day"
                          : [9, 10, 12].includes(day)
                            ? "event-day"
                            : ""
                      }
                      key={column}
                    >
                      {day === 11 ? (
                        <span className="day-heart">{day}</span>
                      ) : (
                        day
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        className="calendar-link"
        href={calendarUrl.toString()}
        target="_blank"
        rel="noreferrer"
      >
        <CalendarIcon />
        Add to calendar
      </a>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [experienceOn, setExperienceOn] = useState(false);
  const [audioError, setAudioError] = useState("");
  const audioRef = useRef(null);
  const scrollStartTimeout = useRef(null);
  const scrollPosition = useRef(0);

  useEffect(
    () => () => window.clearTimeout(scrollStartTimeout.current),
    [],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("invitation-locked", !isOpen);
    return () => document.documentElement.classList.remove("invitation-locked");
  }, [isOpen]);

  useEffect(() => {
    if (!autoScroll) return undefined;

    document.documentElement.classList.add("invitation-auto-scrolling");
    let frameId;
    let previousTime = 0;
    const scroll = (time) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (previousTime) {
        scrollPosition.current += ((time - previousTime) / 1000) * 32;
      }
      previousTime = time;
      if (scrollPosition.current >= maxScroll) {
        window.scrollTo(0, maxScroll);
        audioRef.current?.pause();
        setAutoScroll(false);
        setExperienceOn(false);
        return;
      }
      window.scrollTo(0, scrollPosition.current);
      frameId = window.requestAnimationFrame(scroll);
    };

    frameId = window.requestAnimationFrame(scroll);
    const pauseOnInput = (event) => {
      if (event.type === "keydown" && event.key === "Tab") return;
      if (event.target.closest?.(".floating-controls")) return;
      audioRef.current?.pause();
      setAutoScroll(false);
      setExperienceOn(false);
    };
    ["wheel", "touchstart", "mousedown", "keydown"].forEach((event) =>
      window.addEventListener(event, pauseOnInput, { passive: true }),
    );

    return () => {
      window.cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("invitation-auto-scrolling");
      ["wheel", "touchstart", "mousedown", "keydown"].forEach((event) =>
        window.removeEventListener(event, pauseOnInput),
      );
    };
  }, [autoScroll]);

  const openInvitation = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    scrollPosition.current = 0;
    setAudioError("");
    setExperienceOn(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch((error) => {
        console.error("Unable to play the invitation music:", error);
        setAudioError("Music could not start. Auto-scroll is still running.");
      });
    }
    scrollStartTimeout.current = window.setTimeout(() => {
      scrollPosition.current = window.scrollY;
      setAutoScroll(true);
      scrollStartTimeout.current = null;
    }, 2000);
  };

  const toggleExperience = () => {
    if (experienceOn) {
      window.clearTimeout(scrollStartTimeout.current);
      scrollStartTimeout.current = null;
      audioRef.current?.pause();
      setExperienceOn(false);
      setAutoScroll(false);
      return;
    }

    if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2) {
      document.documentElement.classList.add("invitation-auto-scrolling");
      window.scrollTo(0, 0);
      scrollPosition.current = 0;
    } else {
      scrollPosition.current = window.scrollY;
    }
    setAudioError("");
    setExperienceOn(true);
    setAutoScroll(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current
        .play()
        .catch((error) => {
          console.error("Unable to play the invitation music:", error);
          setAudioError("Music could not start. Auto-scroll is still running.");
        });
    }
  };

  return (
    <>
      <main className="page">
        <header className="hero" aria-label="The couple">
          <div className="hero-artwork">
            <img
              className="art top"
              src={asset("hero-foliage.jpg")}
              alt=""
            />
            <div className="band" aria-hidden="true">
              <FloralBand />
            </div>
            <figure className="photo groom">
              <img
                src={asset("shivam.jpg")}
                alt="Shivam Rathour, the groom, in a maroon suit"
              />
            </figure>
            <figure className="photo bride">
              <img
                src={asset("shikha.jpg")}
                alt="Shikha Rathore, the bride, in a peach gown"
              />
            </figure>
            <div className="who groom-label">
              <small>Groom</small>
              <h1>Shivam Rathour</h1>
            </div>
            <div className="who bride-label">
              <small>Bride</small>
              <h2>Shikha Rathore</h2>
            </div>
            <img
              className="hero-flower"
              src={asset("floral-corner.jpg")}
              alt=""
            />
            <p className="hero-date">Friday&nbsp; | &nbsp;11 December 2026</p>
          </div>
        </header>

        <section className="ceremony section" id="ceremony">
          <div className="section-heading">
            <span className="eyebrow">With the blessings of our families</span>
            <h2>Happy Marriage Ceremony</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <div className="parents">
            <div className="parent-block">
              <span className="parent-label">Mr. &amp; Mrs.</span>
              <strong>Amar Singh Rathour</strong>
              <strong>Savitri Devi</strong>
              <p>Near Kamla Nehru Inter School, Bhodhasram Road, Firozabad</p>
            </div>
            <div className="parent-block">
              <span className="parent-label">Mr. &amp; Mrs.</span>
              <strong>Rati Ram Rathore</strong>
              <strong>Rani Devi</strong>
              <p>Rathore Gali, Rambagh, Agra</p>
            </div>
          </div>
          <p className="invitation-copy">
            You are cordially invited with your family
            <br />
            on the auspicious occasion of the marriage of our children.
          </p>
        </section>

        <section className="reception section" id="reception">
          <div className="section-heading">
            <span className="eyebrow">Save the date</span>
            <h2>Banquet &amp; Reception</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <p className="section-kicker">Wedding ceremony timings</p>
          <p className="reception-time">4:00 <span>PM</span></p>
          <div className="date-display">
            <span>Friday</span>
            <strong>11</strong>
            <span>December</span>
          </div>
          <p className="year">2026</p>
          <Countdown />
          <WeddingCalendar />
        </section>

        <section className="events-section section" id="events">
          <div className="section-heading">
            <span className="eyebrow">Jashn</span>
            <h2>Kaarykram</h2>
            <span className="heading-rule" aria-hidden="true" />
            <p className="section-description">
              Chaar din, chaar khaas mauke. Aap sabke saath har rasm manane ka
              intezaar rahega.
            </p>
          </div>
          <div className="event-list">
            {events.map((event) => (
              <article
                className={`event-card${event.name === "Shaadi" ? " event-featured" : ""}`}
                key={event.name}
              >
                <div className="event-date">
                  <span>{event.weekday}</span>
                  <strong>{event.day}</strong>
                  <span>December</span>
                </div>
                <div className="event-info">
                  <h3>{event.name}</h3>
                  <span className="event-time">{event.time}</span>
                  <p>{event.detail}</p>
                  {event.attire && <span className="attire">{event.attire}</span>}
                </div>
                <span className="event-sparkle" aria-hidden="true">
                  ✳
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="venue-section section" id="venue">
          <div className="section-heading">
            <span className="eyebrow">We can’t wait to celebrate with you</span>
            <h2>Wedding Venue</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <p className="venue-name">{venue}</p>
          <p className="venue-address">{venueAddress}</p>
          <a
            className="map-card"
            href={mapSearch}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the venue location in Google Maps"
          >
            <span className="map-road road-one" aria-hidden="true" />
            <span className="map-road road-two" aria-hidden="true" />
            <span className="map-pin" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span className="map-label map-label-one">Taj Enclave Rd</span>
            <span className="map-label map-label-two">125 Feet Rd</span>
            <span className="map-caption">Tap to open Google Maps</span>
          </a>
          <a className="directions-link" href={mapSearch} target="_blank" rel="noreferrer">
            Get directions <span aria-hidden="true">↗</span>
          </a>
        </section>

        <footer className="thanks section">
          <span className="footer-flourish" aria-hidden="true">
            ❧
          </span>
          <p className="eyebrow">With love and gratitude</p>
          <h2>We look forward to celebrating with you</h2>
          <p>Your presence is the greatest gift to us.</p>
          <span className="footer-names">Shivam <i>&amp;</i> Shikha</span>
        </footer>
      </main>

      <div className={`intro${isOpen ? " intro-open" : ""}`} aria-hidden={isOpen}>
        <img className="intro-foliage" src={asset("hero-foliage.jpg")} alt="" />
        <div className="intro-floral-band" aria-hidden="true">
          <FloralBand />
        </div>
        <img className="intro-flower" src={asset("floral-corner.jpg")} alt="" />
        <div className="intro-card">
          <span className="eyebrow">Together with their families</span>
          <h1>Shivam <i>&amp;</i> Shikha</h1>
          <span className="intro-rule" aria-hidden="true" />
          <p>Joyfully invite you to celebrate their wedding</p>
          <span className="intro-date">Friday · 11 December 2026 · Agra</span>
          <button className="open-button" onClick={openInvitation}>
            Open invitation
          </button>
        </div>
      </div>

      <div className="floating-controls" aria-label="Invitation controls">
        {isOpen && (
          <button
            className="control-button"
            type="button"
            onClick={toggleExperience}
            aria-label={
              experienceOn
                ? "Pause music and auto-scroll"
                : "Play music and start auto-scroll"
            }
            title={
              experienceOn
                ? "Pause music and auto-scroll"
                : "Play music and start auto-scroll"
            }
            aria-pressed={experienceOn}
          >
            <ExperienceIcon active={experienceOn} />
          </button>
        )}
      </div>
      {audioError && (
        <p className="experience-status" role="status">
          {audioError}
        </p>
      )}
      <audio ref={audioRef} loop preload="none" src={asset("wedding-melody.mp3")} />
    </>
  );
}

export default App;
