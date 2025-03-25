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
    const appointmentReasonSelect = document.getElementById("appointmentReason");
    const firstTimeClientSelect = document.getElementById("firstTimeClient");

    const messageDiv = document.createElement("div");
    messageDiv.style.display = "none";
    messageDiv.style.marginTop = "10px";
    messageDiv.style.fontWeight = "bold";
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
                // Force reset dropdowns using multiple methods
                function forceResetDropdown(selectElement) {
                    // Method 1: Direct value setting
                    selectElement.value = "default";

                    // Method 2: Programmatic selection
                    for (let i = 0; i < selectElement.options.length; i++) {
                        if (selectElement.options[i].value === "default") {
                            selectElement.selectedIndex = i;
                            break;
                        }
                    }

                    // Method 3: Dispatch events to trigger any listeners
                    const changeEvent = new Event('change', { bubbles: true });
                    const inputEvent = new Event('input', { bubbles: true });
                    selectElement.dispatchEvent(changeEvent);
                    selectElement.dispatchEvent(inputEvent);
                }

                // Reset both dropdowns
                forceResetDropdown(appointmentReasonSelect);
                forceResetDropdown(firstTimeClientSelect);

                messageDiv.textContent = "Request submitted successfully!";
                messageDiv.style.color = "#28a745";

                // Additional reset methods
                form.reset();
                grecaptcha.reset();

            } else {
                messageDiv.textContent = result.message || "Failed to send request";
                messageDiv.style.color = "#dc3545";
            }
        } catch (error) {
            console.error("Submission Error:", error);
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
});

