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