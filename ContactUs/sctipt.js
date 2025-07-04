$(function () {
    $('#btn').click(function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();
        let flag = true;


        // first name
        var v = /^[a-zA-Z\s]{3,25}$/;
        if (name === "") {
            $("#err_name").html("Please enter first name").css("color", "red");
            flag = false;
        } else if (!v.test(name)) {
            $("#err_name").html("Please enter a valid name (more than 3 character)").css("color", "red");
            flag = false;
        }

        // Email ID
        var v = /^[a-z0-9\.\s-_]+@+[a-z]+\.+[a-z]{2,3}$/
        if (email == "") {

            $("#err_email").html("Please enter Email ID").css("color", "red");
            flag = false
        } else if (!v.test(email)) {

            $("#err_email").html("Please enter valid Email ID").css("color", "red");
            flag = false
        }

        //subject
        if (subject == "") {
            $("#err_subject").html("Please enter your subject.").css("color", "red");
            flag = false
        }

        //message
        if (message == "") {
            $("#err_message").html("Please enter your message.").css("color", "red");
            flag = false
        }

        if (flag == true) {
            $('#contactSuccess').removeClass('d-none');
            $("#err_name").html("");
            $("#err_email").html("");
            $("#err_message").html("");
            $("#err_subject").html("");
        }
        $(this).trigger('reset');

    });
});