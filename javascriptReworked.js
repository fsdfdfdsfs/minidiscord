// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBNg0E4b1MAKeza_HiFwH7EHxqes57g5mw",
  authDomain: "mini-1867a.firebaseapp.com",
  projectId: "mini-1867a",
  storageBucket: "mini-1867a.firebasestorage.app",
  messagingSenderId: "996393456029",
  appId: "1:996393456029:web:614d11d69e411b7adb1f74",
  measurementId: "G-HCTZRSPDC5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

let messageHis = [];

function addmessagestoscrn() {
  const input = document.getElementById("TypedMessage");
  const message = input.value.trim();

  if (!message) {
    alert("Please type a message before submitting.");
    return;
  }

  db.collection("messages").add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Message saved with ID:", docRef.id);
    messageHis.push(message);
    input.value = ""; // clear input
    displayMessages(); // refresh message list
  })
  .catch((error) => {
    console.error("Error adding message:", error);
  });
}

// Optional: display messages from messageHis array in the page
function displayMessages() {
  const container = document.getElementById("messageList");
  container.innerHTML = "";

  messageHis.forEach((msg, i) => {
    const p = document.createElement("p");
    p.textContent = msg;
    container.appendChild(p);
  });
}
