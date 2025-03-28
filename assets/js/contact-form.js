// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("serviceRequestForm");
//     const submitButton = form.querySelector(".submit-btn");

//     const messageDiv = document.createElement("div");
//     messageDiv.style.display = "none";
//     messageDiv.style.marginTop = "10px";
//     messageDiv.style.fontWeight = "bold";
//     submitButton.parentNode.appendChild(messageDiv);

//     form.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         submitButton.disabled = true;
//         submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;

//         const formData = new FormData(form);
//         formData.append("recaptchaResponse", grecaptcha.getResponse());

//         try {
//             const response = await fetch("https://hope-clinic.onrender.com/send-email", {
//                 method: "POST",
//                 body: JSON.stringify(Object.fromEntries(formData)),
//                 headers: { "Content-Type": "application/json" },
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 messageDiv.textContent = "Request submitted successfully!";
//                 messageDiv.style.color = "#28a745";

//                 form.reset();

//                 document.getElementById("appointmentReason").selectedIndex = 0;
//                 document.getElementById("firstTimeClient").selectedIndex = 0;

//                 grecaptcha.reset();

//             } else {
//                 messageDiv.textContent = result.message || "Failed to send request";
//                 messageDiv.style.color = "#dc3545";
//             }
//         } catch (error) {
//             messageDiv.textContent = "Error sending request. Try again.";
//             messageDiv.style.color = "#dc3545";
//         } finally {
//             submitButton.innerHTML = "Submit";
//             submitButton.disabled = false;
//             messageDiv.style.display = "block";

//             setTimeout(() => {
//                 messageDiv.style.display = "none";
//             }, 3000);
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("serviceRequestForm");
    const submitButton = form.querySelector(".submit-btn");

    const messageDiv = document.createElement("div");
    messageDiv.style.display = "none";
    messageDiv.style.marginTop = "10px";
    messageDiv.style.fontWeight = "normal";
    submitButton.parentNode.appendChild(messageDiv);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;

        const formData = new FormData(form);
        formData.append("recaptchaResponse", grecaptcha.getResponse());

        try {
            const response = await fetch("https://hope-clinic.onrender.com/send-email", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();

            if (response.ok) {
                messageDiv.textContent = "Request submitted successfully!";
                messageDiv.style.color = "#28a745";

                form.reset();
                resetNiceSelect(); 

                grecaptcha.reset(); 
            } else {
                messageDiv.textContent = result.message || "Failed to send request";
                messageDiv.style.color = "#dc3545";
            }
        } catch (error) {
            messageDiv.textContent = "Error sending request. Try again.";
            messageDiv.style.color = "#dc3545";
        } finally {
            submitButton.innerHTML = "Submit";
            submitButton.disabled = false;
            messageDiv.style.display = "block";

            setTimeout(() => {
                messageDiv.style.display = "none";
            }, 3000);
        }
    });

    function resetNiceSelect() {
        $("select").each(function () {
            $(this).val($(this).find("option:first").val()); 
        });
        $("select").niceSelect("update"); 
    }
});
