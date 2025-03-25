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

$(document).ready(function () {
    $("#serviceRequestForm").submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        
        // Verify reCAPTCHA was completed
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showMessage("Please complete the reCAPTCHA verification", "error");
            return;
        }

        // Show loading spinner
        $(".submit-btn").prop("disabled", true).html('<span class="spinner"></span> Submitting...');

        let formData = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            petName: $("#petName").val(),
            appointmentReason: $("#appointmentReason").val(),
            firstTimeClient: $("#firstTimeClient").val(),
            recaptchaResponse: recaptchaResponse // Add the reCAPTCHA response to form data
        };

        $.ajax({
            url: "https://hope-clinic.onrender.com/send-email",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function () {
                showMessage("Your request has been submitted successfully!", "success");
                $("#serviceRequestForm")[0].reset(); // Reset form after submission
                grecaptcha.reset(); // Reset the reCAPTCHA
            },
            error: function () {
                showMessage("Error submitting form. Please try again.", "error");
                grecaptcha.reset(); // Reset the reCAPTCHA on error
            },
            complete: function () {
                // Restore button text after submission
                $(".submit-btn").prop("disabled", false).html("Submit");
            }
        });
    });

    function showMessage(message, type) {
        const messageContainer = $(".message-container");
        messageContainer.text(message).removeClass("success error").addClass(type).fadeIn();

        setTimeout(() => {
            messageContainer.fadeOut();
        }, 3000);
    }
});
