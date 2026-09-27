// smooth scolling

document.querySelectorAll('a[herf^="#"]').forEach(link =>{
    link.addEventListener("click", function (e) {


        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


//scoll Animation

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach(section =>  {
    observer.observe(section);
});


//Current Year 

const year = new Date().getFullYear();

const footer =document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        `© ${year} Sanjeev Kumar. All Rights Reserved.`; 
}

//=================
// Typing Animation
//=================

// Skills circle animation
const skillCards = document.querySelectorAll(".skill-card");

function animateSkill(card) {
    const circle = card.querySelector(".skill-circle");
    const percentageText = circle.querySelector("span");
    const target = Number(card.dataset.percent);

    if (!Number.isFinite(target)) return;

    const finalPercent = Math.min(100, Math.max(0, target));

    // Animation kam rakhne ki browser setting ka dhyan
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        circle.style.setProperty(
            "--angle",
            `${finalPercent * 3.6}deg`
        );
        percentageText.textContent = `${finalPercent}%`;
        return;
    }

    const duration = 1600; // 1.6 seconds
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Animation shuru mein tez, end mein smooth
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentPercent = Math.round(finalPercent * eased);
        const currentAngle = finalPercent * eased * 3.6;

        percentageText.textContent = `${currentPercent}%`;
        circle.style.setProperty(
            "--angle",
            `${currentAngle}deg`
        );

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const skillObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.25 }
);

skillCards.forEach(card => {
    const circle = card.querySelector(".skill-circle");
    const percentageText = circle?.querySelector("span");

    if (!circle || !percentageText) return;

    // Scroll karke section tak pahunchne se pehle 0% dikhaye
    circle.style.setProperty("--angle", "0deg");
    percentageText.textContent = "0%";

    skillObserver.observe(card);
});

skillCards.forEach((card) => skillObserver.observe(card));
    setTimeout(typeEffect,deleting ? 60 : 100);  

typeEffect();