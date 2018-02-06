//Firebase config
var config = {
    apiKey: "*************************",
    authDomain: "**************************",
    databaseURL: "********************************",
    projectId: "*************",
    storageBucket: "",
    messagingSenderId: "***********"
  };
  firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
       window.location.href = './main.html';
    }
    else {
        
    }
});

  function DaeaBunn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        alert('登録できません（' + error.message + '）');
    });
    
  }

  function Daea() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
        alert('ログインできません（' + error.message + '）');
    });
    
  }
  function Sigouy() {
    firebase.auth().signOut(); 
}