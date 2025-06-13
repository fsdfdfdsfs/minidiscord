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

// Send a message to Firestore
function addmessagestoscrn() {
  const message = input.value.trim();
  if (!message) {
    alert("Please type a message.");
    return;
  }

  db.collection("messages").add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    input.value = "";
  })
  .catch(error => {
    console.error("Error adding message:", error);
  });
}

// Fetch all messages from Firestore, ordered by timestamp ascending
function fetchMessages() {
  db.collection("messages")
    .orderBy("timestamp", "asc")
    .get()
    .then(snapshot => {
      messageList.innerHTML = "";  // Clear existing messages
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = data.text || "(no text)";
        messageList.appendChild(div);
      });
      messageList.scrollTop = messageList.scrollHeight; // Scroll to bottom
    })
    .catch(error => {
      console.error("Error fetching messages:", error);
    });
}

// Poll Firestore every 1 second for all messages
setInterval(fetchMessages, 1000);

// Also fetch once immediately on load
fetchMessages();
