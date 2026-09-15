import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Ban,
  Building2,
  Cake,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Gift,
  Heart,
  Home,
  Hotel,
  Images,
  Landmark,
  LockKeyhole,
  LoaderCircle,
  LogOut,
  Mail,
  MailCheck,
  Menu as MenuIcon,
  MessageCircle,
  Moon,
  Phone,
  Plus,
  Shirt,
  Sparkles,
  SunMedium,
  Trash2,
  Upload,
  UtensilsCrossed,
  Wine,
  X
} from "lucide-react";
import { apiRequest, downloadCsv } from "./lib/api";

const navItems = [
  { id: "home", icon: Home },
  { id: "story", icon: Images },
  { id: "schedule", icon: CalendarDays },
  { id: "dress", icon: Shirt },
  { id: "menu", icon: UtensilsCrossed },
  { id: "rsvp", icon: MailCheck },
  { id: "gifts", icon: Gift },
  { id: "accommodations", icon: Hotel },
  { id: "contact", icon: Phone },
  { id: "faq", icon: MessageCircle }
];

function OverviewIconSvg({ size = 54, strokeWidth = 1.2, children, ...props }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="8 8 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function OverviewHomeIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M15.5 32.2 32 17.6l16.5 14.6" />
      <path d="M20.5 28.6V49h23V28.6" />
      <path d="M28.5 49V37h7v12" />
      <path d="M15 49h34" />
    </OverviewIconSvg>
  );
}

function OverviewPhotoIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <g transform="rotate(-8 25 34)">
        <rect x="15.5" y="22" width="20" height="25" rx="1.6" />
        <path d="M18.5 39.5 23 35l3.2 3.1 3.1-3.7 4.2 5.1" />
        <circle cx="29.4" cy="27.8" r="2.2" />
      </g>
      <g transform="rotate(6 39 30)">
        <rect x="28.5" y="17.5" width="20" height="25" rx="1.6" />
        <path d="M31.5 35 36 30.4l3.2 3.3 3.2-4 3.1 4.8" />
        <circle cx="42.4" cy="23.2" r="2.2" />
      </g>
    </OverviewIconSvg>
  );
}

function OverviewCalendarIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <rect x="18" y="17" width="28" height="34" rx="2" />
      <path d="M18 25h28" />
      <path d="M25 13.5V20" />
      <path d="M39 13.5V20" />
      <path d="M29.2 39.6c-3.8-3-5.8-5.1-5.8-7.4 0-2 1.4-3.4 3.4-3.4 1.2 0 2.2.8 3 2 0.8-1.2 1.8-2 3-2 2 0 3.4 1.4 3.4 3.4 0 2.3-2 4.4-5.8 7.4l-.6.5-.6-.5Z" />
      <path d="M39.5 44c3.9-2.4 5.9-5.7 5.9-9.6" />
      <path d="M43.2 40.2c2.4.3 4.1-.6 5.4-2.4" />
      <path d="M42.6 36.2c2.1-.8 3.1-2.2 3.4-4.1" />
    </OverviewIconSvg>
  );
}

function OverviewEnvelopeIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <rect x="14.5" y="23" width="35" height="23" rx="2" />
      <path d="m16 26 16 12.5L48 26" />
      <path d="m16 44 11.6-10" />
      <path d="m48 44-11.6-10" />
      <path d="M32 35.8c-4.1-3.1-6.1-5-6.1-7.2a3.2 3.2 0 0 1 3.3-3.2c1.3 0 2.2.8 2.8 1.8.6-1 1.5-1.8 2.8-1.8a3.2 3.2 0 0 1 3.3 3.2c0 2.2-2 4.1-6.1 7.2Z" />
    </OverviewIconSvg>
  );
}

function OverviewBowTieIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M14.5 24.5c7.5.6 13.4 3.3 17.5 7.5-4.1 4.2-10 6.9-17.5 7.5-2.2-4.6-2.2-10.4 0-15Z" fill="currentColor" strokeWidth="0.8" />
      <path d="M49.5 24.5C42 25.1 36.1 27.8 32 32c4.1 4.2 10 6.9 17.5 7.5 2.2-4.6 2.2-10.4 0-15Z" fill="currentColor" strokeWidth="0.8" />
      <rect x="28.4" y="27.6" width="7.2" height="8.8" rx="1.8" fill="currentColor" strokeWidth="0.8" />
      <path d="M12 41.5c4.1 1.2 8.5 1.2 13.3-.1" />
      <path d="M38.7 41.4c4.8 1.3 9.2 1.3 13.3.1" />
    </OverviewIconSvg>
  );
}

function OverviewClocheIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M15 43h34" />
      <path d="M19 40c1.5-11.3 7.8-19.4 13-19.4S43.5 28.7 45 40" />
      <path d="M28 20.8a4 4 0 0 1 8 0" />
      <path d="M12.5 36.5h3.2" />
      <path d="M10.8 31.7l2.4 1.7" />
      <path d="M16.8 27.8l1.2 2.7" />
      <path d="M44 31c3.4-2 5.1-4.8 5.1-8.3" />
      <path d="M47.1 28.1c2.1.2 3.7-.6 4.8-2" />
      <path d="M46.6 24.6c1.8-.7 2.8-1.9 3.1-3.5" />
    </OverviewIconSvg>
  );
}

function OverviewGiftIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <rect x="17" y="29" width="30" height="22" rx="1.5" />
      <path d="M15.5 25h33v7H15.5z" />
      <path d="M32 25v26" />
      <path d="M24 25c-1.7-2.8-1.6-5.4.3-6.6 2-1.3 5.1.1 7.7 6.6" />
      <path d="M40 25c1.7-2.8 1.6-5.4-.3-6.6-2-1.3-5.1.1-7.7 6.6" />
      <path d="M46 45c3.5-2.1 5.2-4.9 5.2-8.5" />
      <path d="M49.2 42c2 .2 3.5-.5 4.6-1.9" />
      <path d="M48.7 38.6c1.7-.7 2.6-1.8 2.9-3.3" />
    </OverviewIconSvg>
  );
}

function OverviewBuildingIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M19 50V23.5L32 16l13 7.5V50" />
      <path d="M16 50h32" />
      <path d="M27.5 50V39h9v11" />
      <path d="M25 28h3.5" />
      <path d="M35.5 28H39" />
      <path d="M25 35h3.5" />
      <path d="M35.5 35H39" />
      <path d="M12.8 50V37.5" />
      <path d="M8.8 39.5c1.6-4.2 3-6.3 4-6.3s2.4 2.1 4 6.3" />
      <path d="M51.2 50v-9" />
      <path d="M48.3 43.2c1.2-3.1 2.2-4.7 2.9-4.7.8 0 1.8 1.6 3 4.7" />
    </OverviewIconSvg>
  );
}

function OverviewPhoneIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M26.6 15.5c-4.8 2.7-6.3 6.4-3.7 11.4 3 5.7 7.5 10.2 13.2 13.2 5 2.6 8.7 1.1 11.4-3.7l-7.2-5.5-4.7 3c-3.5-2.1-6.4-5-8.5-8.5l3-4.7-3.5-5.2Z" />
      <path d="M40.6 28.8c4.5-2.6 6.8-6.4 6.8-11.2" />
      <path d="M44.4 24.7c2.6.3 4.6-.7 6-2.6" />
      <path d="M43.7 20.6c2.3-.9 3.5-2.4 3.9-4.5" />
    </OverviewIconSvg>
  );
}

function OverviewChatIcon(props) {
  return (
    <OverviewIconSvg {...props}>
      <path d="M17 24.5h24.5a7 7 0 0 1 7 7v6.5a7 7 0 0 1-7 7H29.8L20 51l2.4-6H17a7 7 0 0 1-7-7v-6.5a7 7 0 0 1 7-7Z" />
      <path d="M27.5 16h19a7 7 0 0 1 7 7v6.5c0 2.2-1 4.2-2.5 5.5" />
      <path d="M24.5 35h.1" />
      <path d="M31.5 35h.1" />
      <path d="M38.5 35h.1" />
    </OverviewIconSvg>
  );
}

const overviewIconById = {
  home: OverviewHomeIcon,
  story: OverviewPhotoIcon,
  schedule: OverviewCalendarIcon,
  rsvp: OverviewEnvelopeIcon,
  dress: OverviewBowTieIcon,
  menu: OverviewClocheIcon,
  gifts: OverviewGiftIcon,
  accommodations: OverviewBuildingIcon,
  contact: OverviewPhoneIcon,
  faq: OverviewChatIcon
};
const scheduleIcons = [Landmark, Camera, Sparkles, Wine, UtensilsCrossed, DancingCoupleIcon, Cake];
const dressLooks = {
  morning: {
    women: ["g1.jpg", "g2.jpg"],
    men: ["n1.jpg", "n2.jpg", "n3.jpg"]
  },
  evening: {
    women: ["g3.jpg", "g4.jpg", "g5.jpg"],
    men: ["n4.jpg", "n5.jpg", "n6.jpg"]
  }
};
const dressPeriodIcons = { morning: SunMedium, evening: Moon };

function DancingCoupleIcon({ size = 42, strokeWidth = 1.2, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="15" cy="8" r="3.7" />
      <circle cx="33" cy="8" r="3.7" />
      <path d="M16 13c4.8 5 11.2 5 16 0" />
      <path d="M15 14l-7 26h15l-8-26z" />
      <path d="M32 13v24" />
      <path d="M29 17l3-4 4 4" />
      <path d="M10 22l-5 5" />
      <path d="M36 20l7 6" />
      <path d="M31 37l-5 6" />
      <path d="M34 37l5 6" />
    </svg>
  );
}

function CoupleNames({ names }) {
  const [left, right] = names.split(" & ");

  if (!left || !right) {
    return names;
  }

  return (
    <>
      <span>{left} &</span>
      <span>{right}</span>
    </>
  );
}

function parseDistance(distance) {
  return Number(distance?.match(/\d+/)?.[0] || 9999);
}

function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");
  return isAdmin ? <AdminApp /> : <PublicWeddingSite />;
}

function PublicWeddingSite() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sitePassword = import.meta.env.VITE_SITE_PASSWORD;
  const [siteUnlocked, setSiteUnlocked] = useState(() => !sitePassword || window.localStorage.getItem("wedding_site_access") === sitePassword);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      frameId = undefined;
    };

    const onScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  };

  if (!siteUnlocked) {
    return <PasswordGate changeLanguage={changeLanguage} i18n={i18n} onUnlock={() => setSiteUnlocked(true)} sitePassword={sitePassword} t={t} />;
  }

  return (
    <div className="site-shell">
      <TopBar t={t} i18n={i18n} changeLanguage={changeLanguage} />
      <Header
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        scrollProgress={scrollProgress}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        t={t}
      />
      <main>
        <Hero scrollTo={scrollTo} t={t} />
        <Overview scrollTo={scrollTo} t={t} />
        <StorySection t={t} />
        <ScheduleSection t={t} />
        <DressCodeSection t={t} />
        <MenuSection t={t} />
        <RsvpSection t={t} />
        <GiftsSection t={t} />
        <AccommodationsSection t={t} />
        <ContactSection t={t} />
        <FaqSection t={t} />
        <LegalSection t={t} />
        <BottomCta scrollTo={scrollTo} t={t} />
      </main>
      <Footer scrollTo={scrollTo} t={t} />
    </div>
  );
}

function TopBar({ t, i18n, changeLanguage }) {
  return (
    <div className="top-strip">
      <div className="container top-strip-inner">
        <span className="top-note">
          <LockKeyhole size={13} />
          {t("topBar")}
        </span>
        <span className="top-email">
          <Mail size={14} />
          {t("email")}
        </span>
        <div className="language-switch" aria-label="Language switcher">
          {["fr", "en"].map((lng) => (
            <button
              key={lng}
              className={i18n.language === lng ? "active" : ""}
              type="button"
              onClick={() => changeLanguage(lng)}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ activeSection, mobileOpen, scrollProgress, setMobileOpen, scrollTo, t }) {
  return (
    <header className="main-header">
      <div className="container nav-wrap">
        <button className="logo-mark" type="button" onClick={() => scrollTo("home")} aria-label={t("hero.names")}>
          {t("brand.initials.left")}<span></span>{t("brand.initials.right")}
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              type="button"
              onClick={() => scrollTo(item.id)}
            >
              {t(`nav.${item.id}`)}
            </button>
          ))}
        </nav>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div id="mobile-navigation" className="mobile-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={activeSection === item.id ? "active" : ""} key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                <Icon size={18} />
                {t(`nav.${item.id}`)}
              </button>
            );
          })}
        </div>
      )}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }}></div>
    </header>
  );
}

function PasswordGate({ changeLanguage, i18n, onUnlock, sitePassword, t }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (password.trim() === sitePassword) {
      window.localStorage.setItem("wedding_site_access", sitePassword);
      onUnlock();
      return;
    }

    setError(t("access.error"));
  };

  return (
    <main className="access-gate">
      <form className="access-card" onSubmit={submit}>
        <div className="access-language language-switch" aria-label="Language switcher">
          {["fr", "en"].map((lng) => (
            <button key={lng} className={i18n.language === lng ? "active" : ""} type="button" onClick={() => changeLanguage(lng)}>
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="logo-mark">
          {t("brand.initials.left")}<span></span>{t("brand.initials.right")}
        </div>
        <p>{t("access.label")}</p>
        <h1>{t("access.title")}</h1>
        <label>
          {t("access.password")}
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
        </label>
        <button className="primary-button clay" type="submit">
          {t("access.submit")}
          <ArrowRight size={18} />
        </button>
        {error && <p className="form-status error">{error}</p>}
      </form>
    </main>
  );
}

function Hero({ scrollTo, t }) {
  return (
    <section id="home" className="hero-section section-offset">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="script-line">{t("hero.eyebrow")}</p>
          <h1>
            <CoupleNames names={t("hero.names")} />
          </h1>
          <Divider />
          <div className="date-stack">
            <strong>{t("brand.date")}</strong>
            <span>{t("brand.place")}</span>
          </div>
          <button className="primary-button" type="button" onClick={() => scrollTo("overview")}>
            {t("hero.cta")}
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="hero-art">
          <div className="brush-stroke"></div>
          <div className="paper-tape tape-one"></div>
          <div className="paper-tape tape-two"></div>
          <div className="polaroid-frame">
            <img
              src="/images/couple-hero.webp"
              alt={t("hero.photoAlt")}
              width="1179"
              height="2096"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Overview({ scrollTo, t }) {
  const items = t("overview.items", { returnObjects: true });

  return (
    <section id="overview" className="overview-section">
      <div className="container">
        <p className="overview-heading">{t("overview.title")}</p>
        <Heart className="tiny-heart" size={18} />
        <div className="overview-grid">
          {items.map((item, index) => {
            const Icon = overviewIconById[item.id] || Heart;
            return (
              <button className="overview-card" key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                <span className="icon-wash">
                  <Icon size={54} strokeWidth={1.2} />
                </span>
                <span className="card-number">{item.number}</span>
                <span className="card-title">{item.title}</span>
                <span className="card-description">{item.description}</span>
                <ArrowRight className="card-arrow" size={24} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StorySection({ t }) {
  const items = t("story.items", { returnObjects: true });
  const intro = t("story.intro", { returnObjects: true });
  const closing = t("story.closing", { returnObjects: true });

  return (
    <section id="story" className="story-section section-offset">
      <div className="container">
        <SectionTitle title={t("story.title")} subtitle={t("story.subtitle")} />
        {Array.isArray(intro) && (
          <div className="story-intro">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        <div className="story-grid">
          <div className="story-timeline">
            {items.map((item, index) => (
              <article className="story-moment" key={item.year}>
                <div className="story-moment-marker">
                  <span className="story-chapter" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.year}</strong>
                </div>
                <div className="story-moment-copy">
                  <h3>{item.title}</h3>
                  {item.subtitle && <em>{item.subtitle}</em>}
                  {Array.isArray(item.description) ? item.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
          <div className="story-collage" aria-label={t("story.title")}>
            <span className="story-paper story-paper-one" aria-hidden="true" />
            <span className="story-paper story-paper-two" aria-hidden="true" />
            <span className="story-paper story-paper-three" aria-hidden="true" />
            <figure className="story-frame story-frame-monochrome">
              <img
                className="story-photo story-photo-monochrome"
                src="/images/couple-monochrome.webp"
                alt={t("story.photoAlt", { number: 1 })}
                width="960"
                height="1706"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="story-frame story-frame-editorial">
              <img
                className="story-photo story-photo-editorial"
                src="/images/couple-editorial.webp"
                alt={t("story.photoAlt", { number: 2 })}
                width="1179"
                height="2096"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="story-frame story-frame-close">
              <img
                className="story-photo story-photo-close"
                src="/images/couple.webp"
                alt={t("story.photoAlt", { number: 3 })}
                width="1179"
                height="2096"
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>
        </div>
        {Array.isArray(closing) && (
          <div className="story-closing">
            {closing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ScheduleSection({ t }) {
  const items = t("schedule.items", { returnObjects: true });

  return (
    <section id="schedule" className="schedule-section section-offset">
      <div className="container">
        <SectionTitle title={t("schedule.title")} subtitle={t("schedule.subtitle")} />
        <div className="schedule-scroller">
          <div className="schedule-track">
            {items.map((item, index) => {
              const Icon = scheduleIcons[index] || Heart;
              return (
                <article className="schedule-item" key={`${item.time}-${item.title}`}>
                  <Icon size={42} strokeWidth={1.2} />
                  <span className="schedule-dot"></span>
                  <strong>{item.time}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <img className="timeline-banner" src="/images/timeline-dinner.webp" alt="" />
    </section>
  );
}

function RsvpSection({ t }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    attendance: "both",
    dietaryRequirements: "",
    message: ""
  });
  const [lookupState, setLookupState] = useState("idle");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const attendsReception = form.attendance === "reception" || form.attendance === "both";

  useEffect(() => {
    if (form.fullName.trim().length < 3) {
      setLookupState("idle");
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const result = await apiRequest(`/guests/lookup?name=${encodeURIComponent(form.fullName.trim())}`);
        setLookupState(result.found ? "ok" : "missing");
      } catch {
        setLookupState("idle");
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [form.fullName]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.fullName.trim() || !form.email.trim() || !form.attendance) {
      setStatus({ type: "error", message: t("rsvp.required") });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await apiRequest("/rsvp", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          dietaryRequirements: attendsReception ? form.dietaryRequirements : ""
        })
      });
      const emailWasExpected = ["ceremony", "reception", "both"].includes(form.attendance);
      const emailFailed = emailWasExpected && result.confirmationEmail === "failed";
      setStatus({
        type: emailFailed ? "warning" : "success",
        message: emailFailed ? t("rsvp.emailFailed") : result.confirmationEmail === "sent" ? t("rsvp.successEmailSent") : t("rsvp.success")
      });
      setForm((current) => ({ ...current, dietaryRequirements: "", message: "" }));
    } catch (error) {
      setStatus({ type: "error", message: error.code === "REQUEST_TIMEOUT" ? t("rsvp.timeout") : error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="rsvp-section section-offset">
      <div className="container">
        <SectionTitle title={t("rsvp.title")} subtitle={t("rsvp.subtitle")} />
        <div className="rsvp-grid">
          <form className="rsvp-form" onSubmit={submit}>
            <label>
              {t("rsvp.name")} <span>*</span>
              <input name="fullName" value={form.fullName} onChange={updateField} placeholder={t("rsvp.lookupIdle")} required />
            </label>
            <p className={`lookup-state ${lookupState}`}>
              {lookupState === "ok" && <CheckCircle2 size={16} />}
              {lookupState === "ok" ? t("rsvp.lookupOk") : lookupState === "missing" ? t("rsvp.lookupMissing") : t("rsvp.lookupIdle")}
            </p>
            <div className="form-row">
              <label>
                {t("rsvp.email")} <span>*</span>
                <input name="email" type="email" value={form.email} onChange={updateField} required />
              </label>
              <label>
                {t("rsvp.phone")}
                <input name="phone" value={form.phone} onChange={updateField} />
              </label>
            </div>
            <fieldset>
              <legend>
                {t("rsvp.attendance")} <span>*</span>
              </legend>
              <div className="attendance-options">
                {Object.entries(t("rsvp.options", { returnObjects: true })).map(([value, label]) => (
                  <label className="radio-card" key={value}>
                    <input type="radio" name="attendance" value={value} checked={form.attendance === value} onChange={updateField} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {attendsReception && (
              <label>
                {t("rsvp.dietary")}
                <textarea name="dietaryRequirements" value={form.dietaryRequirements} onChange={updateField} rows="3" />
              </label>
            )}
            <label>
              {t("rsvp.message")}
              <textarea name="message" value={form.message} onChange={updateField} rows="4" />
            </label>
            <button className="primary-button clay" type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("rsvp.submitting") : t("rsvp.submit")}
              {isSubmitting ? <LoaderCircle className="button-spinner" size={18} /> : <ArrowRight size={18} />}
            </button>
            {status.message && <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
          </form>
          <aside className="rsvp-card">
            <MailCheck size={54} strokeWidth={1.2} />
            <div className="rsvp-event-list">
              <p>{t("rsvp.eventLabel")}</p>
              {t("rsvp.eventDetails", { returnObjects: true }).map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>
            <p>{t("rsvp.deadlineLabel")}</p>
            <strong>{t("rsvp.deadline")}</strong>
            <Divider />
            <em>{t("rsvp.aside")}</em>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DressCodeSection({ t }) {
  const periods = t("dress.periods", { returnObjects: true });

  return (
    <section id="dress" className="dress-section section-offset">
      <div className="container dress-panel">
        <SectionTitle title={t("dress.title")} subtitle={t("dress.subtitle")} />
        <p className="dress-intro">{t("dress.copy")}</p>
        <div className="dress-periods">
          {Array.isArray(periods) && periods.map((period) => {
            const PeriodIcon = dressPeriodIcons[period.id] || Shirt;
            const looks = dressLooks[period.id] || { women: [], men: [] };

            return (
              <article className={`dress-period dress-period-${period.id}`} key={period.id}>
                <header className="dress-period-header">
                  <span className="dress-period-number">{period.number}</span>
                  <PeriodIcon size={27} strokeWidth={1.35} />
                  <div>
                    <p>{period.time}</p>
                    <h3>{period.title}</h3>
                    <span>{period.copy}</span>
                  </div>
                </header>

                <div className="dress-palette-block">
                  <h4>{t("dress.paletteLabel")}</h4>
                  <div className="dress-palette">
                    {period.colors.map((color) => (
                      <div className="dress-swatch" key={`${period.id}-${color.hex}`}>
                        <span className="dress-swatch-color" style={{ backgroundColor: color.hex }}></span>
                        <code>{color.hex}</code>
                        {color.menOnly && <small>{t("dress.menOnly")}</small>}
                      </div>
                    ))}
                  </div>
                </div>

                {period.rules?.length > 0 && (
                  <div className="dress-rules">
                    {period.rules.map((rule) => (
                      <p className={rule.type} key={rule.text}>
                        {rule.type === "avoid" ? <Ban size={18} /> : <CheckCircle2 size={18} />}
                        <span>{rule.text}</span>
                      </p>
                    ))}
                  </div>
                )}

                <div className="dress-inspiration">
                  <h4>{t("dress.inspiration")}</h4>
                  <div className="dress-galleries">
                    {[["women", t("dress.forHer")], ["men", t("dress.forHim")]].map(([group, label]) => (
                      <div className={`dress-gallery dress-gallery-${group}`} key={group}>
                        <p>{label}</p>
                        <div className="dress-gallery-grid">
                          {looks[group].map((file, index) => (
                            <figure key={file}>
                              <img
                                src={`/images/dress_code/${file}`}
                                alt={t("dress.imageAlt", { group: label, number: index + 1 })}
                                loading="lazy"
                                decoding="async"
                              />
                            </figure>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="dress-shared-note">
          <Heart size={17} />
          <p>{t("dress.sharedNote")}</p>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ t }) {
  const menuItems = t("menu.items", { returnObjects: true });

  return (
    <section id="menu" className="menu-section section-offset">
      <div className="container">
        <SectionTitle title={t("menu.title")} subtitle={t("menu.subtitle")} />
        <div className="menu-grid">
          {menuItems.map((item) => (
            <article className="menu-column" key={item.course}>
              <h3>{item.course}</h3>
              <p>{item.dish}</p>
            </article>
          ))}
        </div>
        <div className="menu-divider">
          <Heart size={30} />
        </div>
        <p className="menu-note">{t("menu.note")}</p>
      </div>
    </section>
  );
}

function GiftsSection({ t }) {
  const paragraphs = t("gifts.copy", { returnObjects: true });

  return (
    <section id="gifts" className="gifts-section section-offset">
      <div className="container gifts-panel">
        <div className="gifts-copy">
          <SectionTitle title={t("gifts.title")} subtitle={t("gifts.subtitle")} align="left" />
          {Array.isArray(paragraphs) && paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <strong>{t("gifts.signature")}</strong>
        </div>
        <a className="primary-button" href={t("gifts.url")} target="_blank" rel="noreferrer">
          {t("gifts.cta")}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function AccommodationsSection({ t }) {
  const railRef = useRef(null);
  const items = [...t("accommodations.items", { returnObjects: true })]
    .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));

  const moveRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(rail.clientWidth * 0.88, 280), behavior: "smooth" });
  };

  return (
    <section id="accommodations" className="accommodation-section section-offset">
      <div className="container">
        <div className="accommodation-heading">
          <SectionTitle title={t("accommodations.title")} subtitle={t("accommodations.subtitle")} />
          <div className="hotel-controls">
            <button type="button" onClick={() => moveRail(-1)} aria-label={t("accommodations.previous")}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => moveRail(1)} aria-label={t("accommodations.next")}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="hotel-grid" ref={railRef}>
          {items.map((item, index) => (
            <article className="hotel-card" key={item.name}>
              <div className="hotel-card-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Building2 size={30} strokeWidth={1.25} />
              </div>
              <div className="hotel-card-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="hotel-distance">{item.distance}</span>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {t("accommodations.maps")}
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="accommodation-note">{t("accommodations.note")}</p>
      </div>
    </section>
  );
}

function ContactSection({ t }) {
  const planners = t("contact.planners", { returnObjects: true });

  return (
    <section id="contact" className="contact-section section-offset">
      <div className="container contact-grid">
        <div>
          <SectionTitle title={t("contact.title")} subtitle={t("contact.subtitle")} align="left" />
          <p className="section-copy">{t("contact.copy")}</p>
        </div>
        <div className="contact-card">
          <Phone size={40} strokeWidth={1.2} />
          {Array.isArray(planners) &&
            planners.map((planner) => (
              <div className="planner-entry" key={`${planner.role}-${planner.name}`}>
                <span>{planner.role}</span>
                <h3>{planner.name}</h3>
                <div className="planner-contact-links">
                  {planner.phone && (
                    <a href={`tel:${planner.phone}`}>
                      <Phone size={15} />
                      {planner.phone}
                    </a>
                  )}
                  {planner.phone && (
                    <a href={`https://wa.me/${planner.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      <MessageCircle size={15} />
                      {t("contact.whatsapp")}
                    </a>
                  )}
                  {planner.email && (
                    <a href={`mailto:${planner.email}`}>
                      <Mail size={15} />
                      {planner.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ t }) {
  const items = t("faq.items", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="faq-section section-offset">
      <div className="container">
        <SectionTitle title={t("faq.title")} subtitle={t("faq.subtitle")} />
        <div className="faq-list">
          {items.map((item, index) => (
            <article className="faq-item" key={item.question}>
              <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span>{item.question}</span>
                <ChevronDown className={openIndex === index ? "open" : ""} size={20} />
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  {(Array.isArray(item.answer) ? item.answer : [item.answer]).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta({ scrollTo, t }) {
  return (
    <section className="bottom-cta">
      <div className="bottom-cta-copy">
        <h2>{t("bottomCta.title")}</h2>
        <Divider />
        <p>{t("bottomCta.copy")}</p>
        <button className="primary-button clay" type="button" onClick={() => scrollTo("rsvp")}>
          {t("bottomCta.button")}
          <ArrowRight size={18} />
        </button>
      </div>
      <img src="/images/stationery-cta-sg.png" alt="" />
    </section>
  );
}

function LegalSection({ t }) {
  return (
    <section id="legal" className="legal-section section-offset">
      <div className="container legal-grid">
        <article>
          <h2>{t("legal.noticeTitle")}</h2>
          <p>{t("legal.notice")}</p>
        </article>
        <article id="privacy">
          <h2>{t("legal.privacyTitle")}</h2>
          <p>{t("legal.privacy")}</p>
        </article>
      </div>
    </section>
  );
}

function Footer({ scrollTo, t }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <button className="logo-mark" type="button" onClick={() => scrollTo("home")} aria-label={t("hero.names")}>
            {t("brand.initials.left")}<span></span>{t("brand.initials.right")}
          </button>
          <Heart size={16} />
          <strong>{t("brand.date")}</strong>
        </div>
        <div className="footer-column">
          <h3>{t("footer.navigation")}</h3>
          <div className="footer-links">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                {t(`nav.${item.id}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h3>{t("footer.follow")}</h3>
          <div className="social-row">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Camera size={20} />
            </a>
            <a href={`mailto:${t("email")}`} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>{t("footer.legal")}</h3>
          <a href="#legal">{t("footer.legalNotice")}</a>
          <a href="#privacy">{t("footer.privacy")}</a>
        </div>
      </div>
      <p>{t("brand.copyright")}</p>
    </footer>
  );
}

function SectionTitle({ title, subtitle, align = "center" }) {
  return (
    <div className={`section-title ${align === "left" ? "left" : ""}`}>
      <h2>{title}</h2>
      <Divider />
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function Divider() {
  return (
    <div className="ornament">
      <span></span>
      <Heart size={18} />
      <span></span>
    </div>
  );
}

function AdminApp() {
  const { t, i18n } = useTranslation();
  const [token, setToken] = useState(() => window.localStorage.getItem("wedding_admin_token"));
  const [password, setPassword] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [guestForm, setGuestForm] = useState({ fullName: "", email: "", phone: "", allowedPlusOnes: 0 });
  const [message, setMessage] = useState("");
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  };

  const loadDashboard = async () => {
    try {
      const data = await apiRequest("/admin/dashboard");
      setDashboard(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  const login = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await apiRequest("/admin/login", {
        method: "POST",
        body: JSON.stringify({ password })
      });
      window.localStorage.setItem("wedding_admin_token", result.token);
      setToken(result.token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("wedding_admin_token");
    setToken("");
    setDashboard(null);
  };

  const addGuest = async (event) => {
    event.preventDefault();
    await apiRequest("/admin/guests", {
      method: "POST",
      body: JSON.stringify({
        ...guestForm,
        allowedPlusOnes: Number(guestForm.allowedPlusOnes)
      })
    });
    setGuestForm({ fullName: "", email: "", phone: "", allowedPlusOnes: 0 });
    loadDashboard();
  };

  const removeGuest = async (guestId) => {
    await apiRequest(`/admin/guests/${guestId}`, { method: "DELETE" });
    loadDashboard();
  };

  const importGuests = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const apiBase = import.meta.env.VITE_API_URL || "";
    const response = await fetch(`${apiBase}/api/admin/guests/import`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("wedding_admin_token")}`
      },
      body: formData
    });

    if (!response.ok) {
      setMessage(t("admin.importFailed"));
      return;
    }

    loadDashboard();
  };

  if (!token) {
    return (
      <div className="admin-shell login-view">
        <form className="admin-login" onSubmit={login}>
          <AdminLanguageSwitch changeLanguage={changeLanguage} i18n={i18n} />
          <LogoBlock />
          <h1>{t("admin.title")}</h1>
          <label>
            {t("admin.password")}
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="primary-button clay" type="submit">
            {t("admin.login")}
            <ArrowRight size={18} />
          </button>
          {message && <p className="form-status error">{message}</p>}
        </form>
      </div>
    );
  }

  const stats = dashboard?.stats || {};
  const guests = dashboard?.guests || [];
  const responses = dashboard?.rsvps || [];
  const statLabels = t("admin.statLabels", { returnObjects: true });
  const attendanceLabels = t("admin.attendanceLabels", { returnObjects: true });

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <LogoBlock />
        <AdminLanguageSwitch changeLanguage={changeLanguage} i18n={i18n} />
        <button className="text-link" type="button" onClick={logout}>
          <LogOut size={16} />
          {t("admin.logout")}
        </button>
      </aside>
      <main className="admin-main">
        <div className="admin-heading">
          <div>
            <span>{t("admin.title")}</span>
            <h1>{t("admin.stats")}</h1>
          </div>
          <div className="admin-actions">
            <label className="outline-button">
              <Upload size={16} />
              {t("admin.import")}
              <input type="file" accept=".csv,.xlsx" onChange={importGuests} hidden />
            </label>
            <button className="outline-button" type="button" onClick={downloadCsv}>
              <Download size={16} />
              {t("admin.export")}
            </button>
          </div>
        </div>
        {message && <p className="form-status error">{message}</p>}
        <div className="stat-grid">
          {["attending", "declined", "pending"].map((key) => (
            <article className="stat-card" key={key}>
              <span>{statLabels[key] || key}</span>
              <strong>{stats[key] ?? 0}</strong>
            </article>
          ))}
        </div>
        <section className="admin-section">
          <h2>{t("admin.addGuest")}</h2>
          <form className="guest-form" onSubmit={addGuest}>
            <input placeholder={t("admin.fullName")} value={guestForm.fullName} onChange={(event) => setGuestForm({ ...guestForm, fullName: event.target.value })} required />
            <input placeholder={t("admin.email")} type="email" value={guestForm.email} onChange={(event) => setGuestForm({ ...guestForm, email: event.target.value })} />
            <input placeholder={t("admin.phone")} value={guestForm.phone} onChange={(event) => setGuestForm({ ...guestForm, phone: event.target.value })} />
            <input placeholder={t("admin.allowedPlusOnes")} type="number" min="0" value={guestForm.allowedPlusOnes} onChange={(event) => setGuestForm({ ...guestForm, allowedPlusOnes: event.target.value })} />
            <button className="icon-button filled" type="submit" aria-label={t("admin.addGuest")}>
              <Plus size={18} />
            </button>
          </form>
        </section>
        <section className="admin-section">
          <h2>{t("admin.guests")}</h2>
          <DataTable
            columns={[t("admin.fullName"), t("admin.email"), t("admin.phone"), t("admin.allowedPlusOnes"), ""]}
            emptyLabel={t("admin.empty")}
            rows={guests.map((guest) => [
              guest.fullName,
              guest.email || "-",
              guest.phone || "-",
              guest.allowedPlusOnes ?? 0,
              <button className="icon-button" type="button" onClick={() => removeGuest(guest._id || guest.id)} aria-label={t("admin.delete")} key="delete">
                <Trash2 size={16} />
              </button>
            ])}
          />
        </section>
        <section className="admin-section">
          <h2>{t("admin.responses")}</h2>
          <DataTable
            columns={[t("admin.fullName"), t("admin.email"), t("admin.status"), t("rsvp.dietary"), t("rsvp.message")]}
            emptyLabel={t("admin.empty")}
            rows={responses.map((rsvp) => [
              rsvp.fullName,
              rsvp.email,
              attendanceLabels[rsvp.attendance] || rsvp.attendance,
              rsvp.dietaryRequirements || "-",
              <span className="admin-message-cell" key="message">{rsvp.message || "-"}</span>
            ])}
          />
        </section>
      </main>
    </div>
  );
}

function AdminLanguageSwitch({ changeLanguage, i18n }) {
  return (
    <div className="admin-language language-switch" aria-label="Language switcher">
      {["fr", "en"].map((lng) => (
        <button key={lng} className={i18n.language === lng ? "active" : ""} type="button" onClick={() => changeLanguage(lng)}>
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function LogoBlock() {
  const { t } = useTranslation();

  return (
    <div className="footer-brand compact">
      <div className="logo-mark">
        {t("brand.initials.left")}<span></span>{t("brand.initials.right")}
      </div>
      <Heart size={16} />
      <strong>{t("brand.date")}</strong>
    </div>
  );
}

function DataTable({ columns, rows, emptyLabel = "-" }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${column}-${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyLabel}</td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
