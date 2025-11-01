const navToggle = document.querySelector(".nav-toggle"),
    navMenu = document.querySelector(".nav-menu"),
    themeToggle = document.getElementById("themeToggle"),
    body = document.body,
    projectsData = [{ title: "My Geometry Dash Texture Packs:", subtitle: "Projects I've made for Geometry Dash. Click the 'View' button to see more details and download.", projects: [{ title: "Arial I", description: "A minimalism texture pack consist the ui of white and black and mainly uses the Arial font with a chill music in background. This Texture Pack will Support A LOT of Geode Mods. This Texture is inspired by Futura UI 1.7 and Helvetica XXIV. (WIP)", link: "https://hypernotepad.com/n/0739fdc1ccec932c", image: "https://files.catbox.moe/tlmc2a.png" } }],
    archivedData = [{ title: "Archived Projects:", subtitle: "These are released or not to the public and has been discontinued or cancelled for various reasons.", projects: [{ title: "PrimeTP (Public) (Geometry Dash Texture Pack)", description: "A Texture Pack made for fun, contains lunchly, prime, and thick of it. A brainrot Texture Pack Made by me.", link: "https://github.com/haturz1/PrimeTP-DISCONTINUED-" } }];

function createElement(tagName, className, attributes = {}) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    Object.entries(attributes).forEach(([attrName, attrValue]) => {
        element.setAttribute(attrName, attrValue);
    });
    return element;
}

function createProjectCard(e) {
    const t = createElement("div", "project-card");
    if (e.image) {
        const n = createElement("img", "project-image", { src: e.image, alt: e.title, loading: "lazy" });
        t.appendChild(n)
    }
    const n = createElement("div", "project-content"),
        a = createElement("h3", "project-title");
    a.textContent = e.title, n.appendChild(a);
    const i = createElement("p", "project-description");
    if (i.textContent = e.description, n.appendChild(i), e.link) {
        const t = createElement("a", "project-link", { href: e.link, target: "_blank", rel: "noopener" });
        t.textContent = "View Project", n.appendChild(t)
    }
    return t.appendChild(n), t
}

function createSection(e) {
    const t = createElement("div", "section-header"),
        n = createElement("h2", "section-title");
    n.textContent = e.title, t.appendChild(n);
    const a = createElement("p", "section-subtitle");
    a.textContent = e.subtitle, t.appendChild(a);
    const i = createElement("div", "projects-grid");
    return e.projects.forEach((e => { i.appendChild(createProjectCard(e)) })), { section: t, grid: i }
}

function toggleMobileMenu() {
    const e = "true" === navToggle.getAttribute("aria-expanded");
    navToggle.setAttribute("aria-expanded", !e), navMenu.classList.toggle("active");
    const t = navToggle.querySelectorAll("span");
    e ? (t[0].style.transform = "none", t[1].style.opacity = "1", t[2].style.transform = "none") : (t[0].style.transform = "rotate(45deg) translate(5px, 5px)", t[1].style.opacity = "0", t[2].style.transform = "rotate(-45deg) translate(7px, -6px)")
}

function initTheme() { "light" === localStorage.getItem("theme") && body.classList.add("light-mode") }

function toggleTheme() {
    body.classList.toggle("light-mode");
    const e = body.classList.contains("light-mode");
    localStorage.setItem("theme", e ? "light" : "dark")
}

function initProjects() {
    const e = document.getElementById("projects"),
        t = document.getElementById("archived"),
        { section: n, grid: a } = createSection(projectsData[0]);
    e.appendChild(n), e.appendChild(a);
    const { section: i, grid: o } = createSection(archivedData[0]);
    t.appendChild(i), t.appendChild(o)
}
document.addEventListener("click", (e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute("aria-expanded", "false"), navMenu.classList.remove("active");
        const e = navToggle.querySelectorAll("span");
        e[0].style.transform = "none", e[1].style.opacity = "1", e[2].style.transform = "none"
    }
})), navToggle.addEventListener("click", toggleMobileMenu), themeToggle.addEventListener("click", toggleTheme), window.addEventListener("resize", (() => {
    if (window.innerWidth > 767) {
        navToggle.setAttribute("aria-expanded", "false"), navMenu.classList.remove("active");
        const e = navToggle.querySelectorAll("span");
        e[0].style.transform = "none", e[1].style.opacity = "1", e[2].style.transform = "none"
    }
})), document.addEventListener("DOMContentLoaded", (() => { initTheme(), initProjects() })), document.querySelectorAll('a[href^="#"]').forEach((e => {
    e.addEventListener("click", (function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute("href"));
        t && (t.scrollIntoView({ behavior: "smooth", block: "start" }), window.innerWidth <= 767 && toggleMobileMenu())
    }))
}));
const warning = document.getElementById("devtools-warning");

function showWarning() { warning.style.display = "block", setTimeout((() => { warning.style.display = "none" }), 2e3) }
document.addEventListener("keydown", (function(e) {
    ("F12" === e.key || e.ctrlKey && e.shiftKey && "i" === e.key.toLowerCase() || e.ctrlKey && "u" === e.key.toLowerCase()) && (e.preventDefault(), showWarning())
})), document.addEventListener("contextmenu", (function(e) { e.preventDefault(), showWarning() }));

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hero, .section-header, .project-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
