// $(document).ready(function () {
//     $("#serviceRequestForm").submit(function (event) {
//         event.preventDefault(); // Prevent default form submission
        
//         // Verify reCAPTCHA was completed
//         const recaptchaResponse = grecaptcha.getResponse();
//         if (!recaptchaResponse) {
//             alert("Please complete the reCAPTCHA verification");
//             return;
//         }
        
//         let formData = {
//             firstName: $("#firstName").val(),
//             lastName: $("#lastName").val(),
//             email: $("#email").val(),
//             phone: $("#phone").val(),
//             petName: $("#petName").val(),
//             appointmentReason: $("#appointmentReason").val(),
//             firstTimeClient: $("#firstTimeClient").val(),
//             recaptchaResponse: recaptchaResponse // Add the reCAPTCHA response to form data
//         };

//         $.ajax({
//             url: "https://hope-clinic.onrender.com/send-email",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify(formData),
//             success: function (response) {
//                 alert("Your request has been submitted successfully!");
//                 $("#serviceRequestForm")[0].reset(); // Reset form after submission
//                 grecaptcha.reset(); // Reset the reCAPTCHA
//             },
//             error: function (xhr, status, error) {
//                 alert("Error submitting form. Please try again.");
//                 console.error("Error:", error);
//                 grecaptcha.reset(); // Reset the reCAPTCHA on error
//             }
//         });
//     });
// });

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
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 messageDiv.textContent = "Request Submitted Successfully!";
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
                messageDiv.textContent = "Email sent successfully!";
                messageDiv.style.color = "#28a745";

                form.reset();
                grecaptcha.reset();

                document.getElementById("appointmentReason").value = "";
                document.getElementById("firstTimeClient").value = "";
            } else {
                messageDiv.textContent = result.message || "Failed to send email";
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


