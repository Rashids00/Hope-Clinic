// $(document).ready(function () {
//     try {
//         emailjs.init("BPCfl3aDRifrpftPf"); 
//     } catch (error) {
//         console.error("EmailJS initialization failed:", error);
//         return;
//     }

//     $("#serviceRequestForm").submit(function (event) {
//         event.preventDefault(); 

//         if (typeof emailjs === "undefined") {
//             alert("Email service not available. Please try again later.");
//             return;
//         }
        

//         var recaptchaResponse = grecaptcha.getResponse();
//         if (recaptchaResponse.length === 0) {
  
//             alert("Please complete the reCAPTCHA verification.");
//             return;
//         }

//         var formData = {
//             firstName: $("#firstName").val(),
//             lastName: $("#lastName").val(),
//             email: $("#email").val(),
//             phone: $("#phone").val(),
//             petName: $("#petName").val(),
//             appointmentReason: $("#appointmentReason").val(),
//             firstTimeClient: $("#firstTimeClient").val(),
//             'g-recaptcha-response': recaptchaResponse 
//         };

//         emailjs.send("service_zlcda44", "template_tt72as8", formData)
//             .then(function (response) {
//                 alert("Email sent successfully!");
//                 $("#serviceRequestForm")[0].reset(); 
//                 grecaptcha.reset(); 
//             }, function (error) {
//                 alert("Failed to send email. Error: " + JSON.stringify(error));
//             });
//     });
// });

$(document).ready(function () {
    $("#serviceRequestForm").submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        let formData = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            petName: $("#petName").val(),
            appointmentReason: $("#appointmentReason").val(),
            firstTimeClient: $("#firstTimeClient").val(),
        };

        $.ajax({
            url: "http://localhost:3000/send-email",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Your request has been submitted successfully!");
                $("#serviceRequestForm")[0].reset(); // Reset form after submission
            },
            error: function (xhr, status, error) {
                alert("Error submitting form. Please try again.");
                console.error("Error:", error);
            }
        });
    });
});