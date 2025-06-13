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

const messageList = document.getElementById("messageList");
const input = document.getElementById("TypedMessage");

function addmessagestoscrn() {
  const message = input.value.trim();
  if (!message) {
    alert("Please type a message before submitting.");
    return;
  }

  db.collection("messages").add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    input.value = ""; // clear input after sending
  })
  .catch((error) => {
    console.error("Error adding message:", error);
  });
}

// Real-time listener for messages collection, ordered by timestamp
db.collection("messages")
  .orderBy("timestamp", "asc")
  .onSnapshot((snapshot) => {
    messageList.innerHTML = ""; // Clear current messages

    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const p = document.createElement("p");
      p.textContent = messageData.text || "(no text)";
      messageList.appendChild(p);
    });

    // Scroll to bottom so newest messages are visible (optional)
    messageList.scrollTop = messageList.scrollHeight;
  });
