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

    // Debugging function to log select element states
    function logSelectState(selectElement, label) {
        console.log(`${label} - Current State:`, {
            selectedIndex: selectElement.selectedIndex,
            value: selectElement.value,
            options: Array.from(selectElement.options).map((opt, idx) => ({
                index: idx,
                value: opt.value,
                text: opt.text,
                selected: opt.selected
            }))
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Debugging: Log initial state before submission
        logSelectState(appointmentReasonSelect, "Appointment Reason Before Submit");
        logSelectState(firstTimeClientSelect, "First Time Client Before Submit");

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
                // More robust dropdown reset method
                function resetDropdown(selectElement) {
                    // Try multiple methods to reset
                    try {
                        // Method 1: Set to default value
                        const defaultOption = Array.from(selectElement.options).find(
                            opt => opt.value === "default" || opt.value === ""
                        );
                        
                        if (defaultOption) {
                            selectElement.value = defaultOption.value;
                        } else if (selectElement.options.length > 0) {
                            // Method 2: Fall back to first option
                            selectElement.selectedIndex = 0;
                        }

                        // Force trigger change event
                        const event = new Event('change', { bubbles: true });
                        selectElement.dispatchEvent(event);
                    } catch (error) {
                        console.error("Error resetting dropdown:", error);
                    }
                }

                // Reset both dropdowns
                resetDropdown(appointmentReasonSelect);
                resetDropdown(firstTimeClientSelect);

                // Debugging: Log state after reset
                logSelectState(appointmentReasonSelect, "Appointment Reason After Reset");
                logSelectState(firstTimeClientSelect, "First Time Client After Reset");

                messageDiv.textContent = "Request submitted successfully!";
                messageDiv.style.color = "#28a745";

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

