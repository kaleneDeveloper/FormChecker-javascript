const form = document.querySelector("form");
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (valid === false) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = "";
    }
};
const pseudoChecker = (value, tag) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay(
            tag,
            "Le pseudo doit faire entre 3 et 20 caractères",
            false
        );
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
            tag,
            "Le pseudo ne doit pas contenir de caractères spéciaux",
            false
        );
        pseudo = null;
    } else {
        errorDisplay(tag, "", true);
        pseudo = value;
    }
};
const emailChecker = (value, tag) => {
    if (value.length == 0) {
        progressBar.classList = "";
        errorDisplay("email", "", true);
    } else if (
        !value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        errorDisplay(tag, "Votre email est incorrect", false);
        email = null;
    } else {
        errorDisplay(tag, "", true);
        email = value;
    }
};
const passwordCheker = (value) => {
    progressBar.classList = "";
    var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (value.length == 0) {
        errorDisplay("password", "", true);
    } else if (!value.match(strongRegex)) {
        errorDisplay(
            "password",
            "Doit contenir au minimum 8 caractères, un sepécial, une majuscule et un nombre",
            false
        );
        progressBar.classList.add("progressRed");
        password = null;
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        password = value;
    }
    if (
        confirmPass !== password &&
        confirmPass !== undefined &&
        confirmPass !== null
    ) {
        errorDisplay(
            "confirm",
            "Les deux mots de pass ne correspond pas !",
            false
        );
    } else if (confirmPass == password) {
        errorDisplay("confirm", "", true);
    }
};
const confirmChecker = (value) => {
    if (value.length == 0) {
        errorDisplay("confirm", "", true);
    } else if (value !== password) {
        errorDisplay(
            "confirm",
            "Les deux mots de pass ne correspond pas !",
            false
        );
        confirmPass = value;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = value;
    }
};

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value, e.target.id);
                break;
            case "email":
                emailChecker(e.target.value, e.target.id);
                break;
            case "password":
                passwordCheker(e.target.value, e.target.id);
                break;
            case "confirm":
                confirmChecker(e.target.value, e.target.id);
                break;
            default:
                null;
        }
    });
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (pseudo && email && password && confirmPass && password == confirmPass) {
        const data = {
            pseudo,
            email,
            password,
        };
        inputs.forEach((input) => (input.value = ""));
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        progressBar.classList = "";
        errorDisplay("password", "", true);
        alert("Inscription validé");
        console.log(data);
    } else {
        alert("Champ non remplis correctement");
    }
});
// for (i = 0; i < inputs.length; i++) {
//     inputs[i].addEventListener("input", (e) => {
//         console.log(e.target.id);
//     });
// }
