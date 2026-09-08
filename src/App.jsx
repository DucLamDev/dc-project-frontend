import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  Download,
  Flower2,
  Gift,
  Heart,
  Home,
  Hotel,
  Images,
  LockKeyhole,
  LogOut,
  Mail,
  MailCheck,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Plus,
  Shirt,
  Sparkles,
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
  { id: "rsvp", icon: MailCheck },
  { id: "dress", icon: Shirt },
  { id: "menu", icon: UtensilsCrossed },
  { id: "gifts", icon: Gift },
  { id: "accommodations", icon: Hotel },
  { id: "contact", icon: Phone },
  { id: "faq", icon: MessageCircle }
];

const overviewIcons = [Home, Images, CalendarDays, MailCheck, Shirt, UtensilsCrossed, Gift, Building2, Phone, MessageCircle];
const scheduleIcons = [Heart, Camera, Sparkles, Wine, UtensilsCrossed, MusicNoteFallback, CakeFallback];
const hotelImages = ["hotel-ranch.webp", "hotel-spa.webp", "hotel-cliffs.webp"];

function MusicNoteFallback(props) {
  return <Sparkles {...props} />;
}

function CakeFallback(props) {
  return <Heart {...props} />;
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
        <CeremonySection t={t} />
        <ScheduleSection t={t} />
        <RsvpSection t={t} />
        <DressCodeSection t={t} />
        <MenuSection t={t} />
        <GiftsSection t={t} />
        <AccommodationsSection t={t} />
        <ContactSection t={t} />
        <FaqSection t={t} />
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
        <button className="logo-mark" type="button" onClick={() => scrollTo("home")} aria-label="Danielle and Chris">
          D<span></span>C
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
        <button className="icon-button mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Menu">
          {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
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

function Hero({ scrollTo, t }) {
  return (
    <section id="home" className="hero-section section-offset">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="script-line">{t("hero.eyebrow")}</p>
          <h1>{t("hero.names")}</h1>
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
            <img src="/images/hero-couple.webp" alt="" />
          </div>
          <Flower2 className="botanical-line hero-flower" strokeWidth={1} />
          <div className="date-stamp">
            <span>DANIELLE & CHRIS</span>
            <strong>{t("hero.stamp")}</strong>
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
            const Icon = overviewIcons[index] || Heart;
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

  return (
    <section id="story" className="story-section section-offset">
      <div className="container">
        <SectionTitle title={t("story.title")} subtitle={t("story.subtitle")} />
        <div className="story-grid">
          <div className="story-timeline">
            {items.map((item) => (
              <article className="story-moment" key={item.year}>
                <span className="timeline-dot"></span>
                <strong>{item.year}</strong>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="story-collage">
            <img src="/images/story-collage.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CeremonySection({ t }) {
  return (
    <section id="ceremony" className="ceremony-section">
      <div className="container ceremony-grid">
        <div>
          <SectionTitle title={t("ceremony.title")} subtitle={t("ceremony.subtitle")} align="left" />
          <p className="section-copy">{t("ceremony.copy")}</p>
        </div>
        <div className="venue-panel">
          <MapPin size={38} strokeWidth={1.2} />
          <h3>{t("ceremony.address")}</h3>
          <p>{t("brand.place")}</p>
          <span>{t("ceremony.gps")}</span>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Coto+de+Caza+Golf+%26+Racquet+Club" target="_blank" rel="noreferrer">
            {t("ceremony.maps")}
            <ArrowRight size={16} />
          </a>
        </div>
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
    partySize: "1",
    menuChoice: "menu1",
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
      await apiRequest("/rsvp", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          partySize: Number(form.partySize),
          menuChoice: attendsReception ? form.menuChoice : undefined,
          dietaryRequirements: attendsReception ? form.dietaryRequirements : ""
        })
      });
      setStatus({ type: "success", message: t("rsvp.success") });
      setForm((current) => ({ ...current, dietaryRequirements: "", message: "" }));
    } catch (error) {
      setStatus({ type: "error", message: error.message });
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
            <div className="form-row">
              <label>
                {t("rsvp.partySize")} <span>*</span>
                <select name="partySize" value={form.partySize} onChange={updateField}>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              {attendsReception && (
                <label>
                  {t("rsvp.menuChoice")}
                  <select name="menuChoice" value={form.menuChoice} onChange={updateField}>
                    {Object.entries(t("rsvp.menus", { returnObjects: true })).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
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
              <ArrowRight size={18} />
            </button>
            {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
          </form>
          <aside className="rsvp-card">
            <MailCheck size={54} strokeWidth={1.2} />
            <p>{t("rsvp.deadlineLabel")}</p>
            <strong>{t("rsvp.deadline")}</strong>
            <Divider />
            <em>{t("rsvp.aside")}</em>
            <Flower2 className="rsvp-flower" strokeWidth={1} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function DressCodeSection({ t }) {
  return (
    <section id="dress" className="dress-section section-offset">
      <div className="container dress-panel">
        <SectionTitle title={t("dress.title")} subtitle={t("dress.subtitle")} />
        <p className="dress-intro">{t("dress.copy")}</p>
        <div className="dress-code-layout">
          <article className="dress-look-card">
            <h3>{t("dress.forHer.title")}</h3>
            <p>{t("dress.forHer.copy")}</p>
            <img className="dress-look-image women" src="/images/dress-code-women.png" alt="" />
          </article>
          <div className="dress-center-line" aria-hidden="true"></div>
          <article className="dress-look-card">
            <h3>{t("dress.forHim.title")}</h3>
            <p>{t("dress.forHim.copy")}</p>
            <img className="dress-look-image men" src="/images/dress-code-men.png" alt="" />
          </article>
        </div>
        <div className="dress-bottom-note">
          <p>{t("dress.note")}</p>
          <div className="mini-heart-line">
            <span></span>
            <Heart size={14} />
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ t }) {
  const [activeMenu, setActiveMenu] = useState("menu1");
  const menuItems = t(`menu.items.${activeMenu}`, { returnObjects: true });

  return (
    <section id="menu" className="menu-section section-offset">
      <div className="container">
        <SectionTitle title={t("menu.title")} subtitle={t("menu.subtitle")} />
        <div className="segmented-control" role="tablist" aria-label="Menu options">
          {["menu1", "menu2"].map((menu) => (
            <button key={menu} className={activeMenu === menu ? "active" : ""} type="button" onClick={() => setActiveMenu(menu)}>
              {t(`menu.${menu}`)}
            </button>
          ))}
        </div>
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
      </div>
    </section>
  );
}

function GiftsSection({ t }) {
  return (
    <section id="gifts" className="gifts-section section-offset">
      <div className="container gifts-panel">
        <div>
          <SectionTitle title={t("gifts.title")} subtitle={t("gifts.subtitle")} align="left" />
          <p>{t("gifts.copy")}</p>
        </div>
        <a className="primary-button" href="https://revolut.me/" target="_blank" rel="noreferrer">
          {t("gifts.cta")}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function AccommodationsSection({ t }) {
  const items = t("accommodations.items", { returnObjects: true });

  return (
    <section id="accommodations" className="accommodation-section section-offset">
      <div className="container">
        <SectionTitle title={t("accommodations.title")} subtitle={t("accommodations.subtitle")} />
        <div className="hotel-grid">
          {items.map((item, index) => (
            <article className="hotel-card" key={item.name}>
              <img src={`/images/${hotelImages[index % hotelImages.length]}`} alt="" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.distance}</p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url.replace("https://", "")}
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
  return (
    <section id="contact" className="contact-section section-offset">
      <div className="container contact-grid">
        <div>
          <SectionTitle title={t("contact.title")} subtitle={t("contact.subtitle")} align="left" />
          <p className="section-copy">{t("contact.copy")}</p>
        </div>
        <div className="contact-card">
          <Phone size={40} strokeWidth={1.2} />
          <span>{t("contact.planner")}</span>
          <h3>{t("contact.name")}</h3>
          <a href={`tel:${t("contact.phone")}`}>{t("contact.phone")}</a>
          <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ t }) {
  const items = t("faq.items", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(0);

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
              {openIndex === index && <p>{item.answer}</p>}
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
        <Flower2 className="cta-flower" strokeWidth={1} />
        <h2>{t("bottomCta.title")}</h2>
        <Divider />
        <p>{t("bottomCta.copy")}</p>
        <button className="primary-button clay" type="button" onClick={() => scrollTo("rsvp")}>
          {t("bottomCta.button")}
          <ArrowRight size={18} />
        </button>
      </div>
      <img src="/images/stationery-cta.webp" alt="" />
    </section>
  );
}

function Footer({ scrollTo, t }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <button className="logo-mark" type="button" onClick={() => scrollTo("home")} aria-label="Danielle and Chris">
            D<span></span>C
          </button>
          <Heart size={16} />
          <strong>{t("brand.date")}</strong>
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <div className="footer-links">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                {t(`nav.${item.id}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h3>Suivez-nous</h3>
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
          <h3>Informations légales</h3>
          <a href="#legal">Mentions légales</a>
          <a href="#privacy">Politique de confidentialité</a>
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
  const { t } = useTranslation();
  const [token, setToken] = useState(() => window.localStorage.getItem("wedding_admin_token"));
  const [password, setPassword] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [guestForm, setGuestForm] = useState({ fullName: "", email: "", phone: "", allowedPlusOnes: 0 });
  const [message, setMessage] = useState("");

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
      setMessage("Import failed");
      return;
    }

    loadDashboard();
  };

  if (!token) {
    return (
      <div className="admin-shell login-view">
        <form className="admin-login" onSubmit={login}>
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

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <LogoBlock />
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
          {["attending", "declined", "pending", "menu1", "menu2"].map((key) => (
            <article className="stat-card" key={key}>
              <span>{key}</span>
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
            rows={guests.map((guest) => [
              guest.fullName,
              guest.email || "-",
              guest.phone || "-",
              guest.allowedPlusOnes ?? 0,
              <button className="icon-button" type="button" onClick={() => removeGuest(guest._id || guest.id)} aria-label="Delete" key="delete">
                <Trash2 size={16} />
              </button>
            ])}
          />
        </section>
        <section className="admin-section">
          <h2>{t("admin.responses")}</h2>
          <DataTable
            columns={[t("admin.fullName"), t("admin.email"), t("admin.status"), t("rsvp.menuChoice"), t("rsvp.dietary")]}
            rows={responses.map((rsvp) => [
              rsvp.fullName,
              rsvp.email,
              rsvp.attendance,
              rsvp.menuChoice || "-",
              rsvp.dietaryRequirements || "-"
            ])}
          />
        </section>
      </main>
    </div>
  );
}

function LogoBlock() {
  return (
    <div className="footer-brand compact">
      <div className="logo-mark">
        D<span></span>C
      </div>
      <Heart size={16} />
      <strong>10 OCTOBRE 2026</strong>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>-</td>
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
