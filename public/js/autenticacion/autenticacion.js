class Autenticacion {
  autEmailPass(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        if (res.user.emailVerified) {
          $("#avatar").attr("src", './imagenes/usuarioauth.png')
          swal({
            title: `Bienvenido ${res.user.displayName}`,
            icon: `success`
          });

          console.log('works sign in with email already created') 

          $("#logreg-forms").css("display", "none")
          $("#mainForm").css("display", "block")
          $("#seccion1").css("display", "block")
          $("#seccion2").css("display", "none")
          $("#seccion3").css("display", "none")
          $("#seccion4").css("display", "none")
          $("#seccion5").css("display", "none")
          $("#seccion6").css("display", "none")
          $("#seccion7").css("display", "none")
        } 
        // else if (!res.user.emailVerified){
        //   console.log('hey')
        // } 
        else {
          firebase.auth().signOut();
          swal({
            title: `Please verify your account trougth Email`,
            icon: `error`
          });
          $("#mainForm").css("display", "none");
          $("#logreg-forms").css("display", "block");
        }
    });
  }

  crearCuentaEmailPass(email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: nombres
        })

        const configuration = {
        //url: "https://vsi-project.firebaseapp.com" //internet
        //url: "https://vsi-project.web.app"
      //url: 'http://localhost:5501/public/index.html' //para desarrollo
        //url: 'http://localhost:5001/public'
        //url: 'http://localhost:3000/' 
        }

        res.user.sendEmailVerification() // pass the obj configuration as a parameter
        .catch(error => {
          console.error(error.message)
          swal({
            title: `${error.message}`,
            icon: `error`
          })
        })
        firebase.auth().signOut()

        swal({
          title: `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          icon: `success`
        })

        console.log("create email works");
        $("#logreg-forms").css("display", "none")
        // ****
        //$("#mainForm").css("display", "block")

        $("#seccion1").css("display", "block");
        $("#seccion2").css("display", "none");
        $("#seccion3").css("display", "none");
        $("#seccion4").css("display", "none");
        $("#seccion5").css("display", "none");
        $("#seccion6").css("display", "none");
        $("#seccion7").css("display", "none");


      })
      .catch(error => {
        console.error(error.message);
        swal({
          title: `${error.message}`,
          icon: `error`
        });
      });
  }

  authCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        $("#avatar").attr("src", result.user.photoURL);
        //toggle()
        swal({
          title: `Bienvenido ${result.user.displayName} !! `,
          icon: `success`
        });

        let loginForm = document.querySelector("#logreg-forms")
        let mainForm = document.querySelector("#mainForm")
        loginForm.style.display = "none";
        mainForm.style.display = "block";

        $('#seccion1').css('display', 'block')
        $("#seccion2").css("display", "none");
        $("#seccion3").css("display", "none");
        $("#seccion4").css("display", "none");
        $("#seccion5").css("display", "none");
        $("#seccion6").css("display", "none");
        $("#seccion7").css("display", "none");


      })
      .catch(error => {
        console.error(error);
        swal({
          title: `Error trying to autenticate with Google: ${error.message}`,
          icon: `error`
        });
        $("#mainForm").css("display", "none");
        $("#logreg-forms").css("display", "block")
      });
  }

  
  authCuentaFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        $("#avatar").attr("src", result.user.photoURL);
        
        //toggle()
        swal({
          title: `Bienvenido ${result.user.displayName} !! `,
          icon: `success`
        });

        let loginForm = document.querySelector("#logreg-forms");
        let mainForm = document.querySelector("#mainForm")
        loginForm.style.display = "none"
        mainForm.style.display = "block"

        $("#seccion1").css("display", "block");
        $("#seccion2").css("display", "none");
        $("#seccion3").css("display", "none");
        $("#seccion4").css("display", "none");
        $("#seccion5").css("display", "none");
        $("#seccion6").css("display", "none");
        $("#seccion7").css("display", "none");

      })
      .catch(error => {
        console.error(error);
        swal({
          title: `Error trying to autenticate with Facebook: ${error}`,
          icon: `error`
        });
        $("#mainForm").css("display", "none");
        $("#logreg-forms").css("display", "block");
      });
  }
}

 
const toggle = () => {
  let logButton = document.querySelector('#btnInicioSesion')
  let form = document.querySelector('#mainForm')
  let carousel = document.querySelector("#carousel") 

  logButton.innerHTML = "Log Out"
  form.style.display = 'none'
  carousel.style.display = "block"
}