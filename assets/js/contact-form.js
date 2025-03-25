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

    function resetDropdowns() {
        // Find the first option (the disabled placeholder)
        const appointmentReasonFirstOption = appointmentReasonSelect.querySelector('option[disabled]');
        const firstTimeClientFirstOption = firstTimeClientSelect.querySelector('option[disabled]');

        if (appointmentReasonFirstOption) {
            appointmentReasonFirstOption.selected = true;
        }
        if (firstTimeClientFirstOption) {
            firstTimeClientFirstOption.selected = true;
        }
    }

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

                resetDropdowns();

                form.reset();
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
});


