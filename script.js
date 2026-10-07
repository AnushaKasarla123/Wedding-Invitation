document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       OPENING ENVELOPE
    ===================================================== */

    const openingScreen =
        document.getElementById("openingScreen");

    const openInvitation =
        document.getElementById("openInvitation");

    const mainWebsite =
        document.getElementById("mainWebsite");

    document.body.classList.add("no-scroll");

    if (openInvitation) {

        openInvitation.addEventListener("click", (event) => {

            event.preventDefault();

            if (openInvitation.classList.contains("opened")) {
                return;
            }

            openInvitation.classList.add("opened");
            openInvitation.classList.add("open");

            setTimeout(() => {

                if (openingScreen) {
                    openingScreen.classList.add("hide");
                }

                if (mainWebsite) {
                    mainWebsite.classList.add("show");
                }

                document.body.classList.remove("no-scroll");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 1250);

        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach((element) => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date(
            "2026-11-15T10:52:00+05:30"
        ).getTime();


    function setCountdownValue(id, value) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    }


    function updateCountdown() {

        const distance =
            weddingDate - Date.now();


        if (distance <= 0) {

            [
                "days",
                "hours",
                "minutes",
                "seconds"
            ].forEach((id) => {

                setCountdownValue(id, "00");

            });

            return;

        }


        const days =
            Math.floor(
                distance / 86400000
            );


        const hours =
            Math.floor(
                (distance % 86400000) /
                3600000
            );


        const minutes =
            Math.floor(
                (distance % 3600000) /
                60000
            );


        const seconds =
            Math.floor(
                (distance % 60000) /
                1000
            );


        setCountdownValue(
            "days",
            String(days).padStart(2, "0")
        );

        setCountdownValue(
            "hours",
            String(hours).padStart(2, "0")
        );

        setCountdownValue(
            "minutes",
            String(minutes).padStart(2, "0")
        );

        setCountdownValue(
            "seconds",
            String(seconds).padStart(2, "0")
        );

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       FLOATING PETALS
    ===================================================== */

    const petalsContainer =
        document.querySelector(".petals");


    function createPetal() {

        if (
            !petalsContainer ||
            document.hidden
        ) {
            return;
        }


        const petal =
            document.createElement("span");


        petal.className = "petal";


        const size =
            Math.random() * 7 + 7;


        petal.style.width =
            `${size}px`;


        petal.style.height =
            `${size * 1.4}px`;


        petal.style.left =
            `${Math.random() * 100}%`;


        petal.style.animationDuration =
            `${Math.random() * 5 + 6}s`;


        petal.style.opacity =
            `${Math.random() * 0.45 + 0.2}`;


        petalsContainer.appendChild(petal);


        setTimeout(() => {

            petal.remove();

        }, 12000);

    }


    /* Start petals immediately */

    createPetal();


    setInterval(
        createPetal,
        900
    );


    /* =====================================================
       RSVP → WHATSAPP
    ===================================================== */

    const rsvpForm =
        document.getElementById("rsvpForm");


    if (rsvpForm) {

        rsvpForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("guestName")
                        ?.value
                        .trim();


                const attendance =
                    document
                        .getElementById("attendance")
                        ?.value;


                const guestCount =
                    document
                        .getElementById("guestCount")
                        ?.value;


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                /* =================================================
                   YOUR WHATSAPP NUMBER

                   India country code = 91

                   Example:
                   919876543210

                   Do NOT use:
                   +91
                   spaces
                   hyphens
                ================================================= */

                const whatsappNumber =
                    "919110564174";


                /* WhatsApp message */

                const whatsappMessage =
                    `Wedding RSVP 💍

Name: ${name || "Not provided"}

Attendance: ${attendance || "Not selected"}

Number of Guests: ${guestCount || "Not provided"}

Message: ${message || "No message"}`;


                /* WhatsApp URL */

                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


                /* Open WhatsApp */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }

});