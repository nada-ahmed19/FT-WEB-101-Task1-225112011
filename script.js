// ---------- Dark / light button ----------
// Only toggles the class "dark" on body. All colours live in CSS.
var themeBtn = document.getElementById("theme-btn");
var themeLabel = document.getElementById("theme-label");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeLabel.textContent = "Light mode";
  } else {
    themeLabel.textContent = "Dark mode";
  }
});

// ---------- Scroll reveal ----------
// Adds the class "visible" when an element enters the screen.
var revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

// ---------- Active link in the bar ----------
// Marks the link of the section that is on screen.
var sections = document.querySelectorAll("main section");
var navLinks = document.querySelectorAll(".links a");

if ("IntersectionObserver" in window) {
  var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(function (section) {
    spyObserver.observe(section);
  });
}

// ---------- Scroll progress bar ----------
var progress = document.getElementById("progress");

function updateProgress() {
  var max = document.documentElement.scrollHeight - window.innerHeight;
  var ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = "scaleX(" + ratio + ")";
}
window.addEventListener("scroll", updateProgress);
updateProgress();

// ---------- Card glow follows the mouse ----------
document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("pointermove", function (event) {
    var box = card.getBoundingClientRect();
    card.style.setProperty("--mx", event.clientX - box.left + "px");
    card.style.setProperty("--my", event.clientY - box.top + "px");
  });
});

// ---------- Form ----------
// Rejects an empty email, otherwise says hello with the typed name.
var form = document.getElementById("contact-form");
var hello = document.getElementById("hello");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();

  if (email === "") {
    hello.textContent = "Please enter your email.";
  } else if (name === "") {
    hello.textContent = "Hello! Thanks for your message.";
  } else {
    hello.textContent = "Hello, " + name + "! Thanks for your message.";
  }

  hello.classList.remove("show");
  void hello.offsetWidth; // restart the animation
  hello.classList.add("show");
});
