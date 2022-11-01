$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader_text').show()
        $('.loader').show()

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader_text').hide();
                $('.loader').hide()
                $('#result').fadeIn(600);
                $('#result').text('Result: ' + data);
                if(data=="Glioma Tumor"){
                    $('.meningioma').hide();
                    $(".pituitary").hide();
                    $(".glioma").fadeIn(600);
                }
                else if(data=="Meningioma Tumor"){
                    $('.meningioma').fadeIn(600);
                    $(".pituitary").hide();
                    $(".glioma").hide();
                }
                else if(data=="Pituitary Tumor"){
                    $('.meningioma').hide();
                    $(".pituitary").fadeIn(600);
                    $(".glioma").hide();
                }
                else{
                    $('.meningioma').hide();
                    $(".pituitary").hide();
                    $(".glioma").hide();
                }


            },
        });
    });

});