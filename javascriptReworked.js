const firebaseConfig = {
  apiKey: "AIzaSyBNg0E4b1MAKeza_HiFwH7EHxqes57g5mw",
  authDomain: "mini-1867a.firebaseapp.com",
  projectId: "mini-1867a",
  storageBucket: "mini-1867a.firebasestorage.app",
  messagingSenderId: "996393456029",
  appId: "1:996393456029:web:614d11d69e411b7adb1f74",
  measurementId: "G-HCTZRSPDC5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const messageList = document.getElementById("messageList");
const input = document.getElementById("TypedMessage");
let userIP = "unknown";

// Get user public IP via free API once at start
async function fetchUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    userIP = data.ip || "unknown";
    console.log("User IP detected:", userIP);
  } catch (error) {
    console.warn("Failed to get IP:", error);
  }
}

// Add message with IP to Firestore
function addmessagestoscrn() {
  const message = input.value.trim();
  if (!message) {
    alert("Please type a message.");
    return;
  }

  db.collection("messages").add({
    text: message,
    ip: userIP,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    input.value = "";
  })
  .catch(error => {
    console.error("Error adding message:", error);
  });
}

// Fetch all messages every second and display
function fetchMessages() {
  db.collection("messages")
    .orderBy("timestamp", "asc")
    .get()
    .then(snapshot => {
      messageList.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "message";

        const textSpan = document.createElement("span");
        textSpan.textContent = data.text || "(no text)";
        div.appendChild(textSpan);

        if (data.ip) {
          const ipSpan = document.createElement("span");
          ipSpan.className = "ip";
          ipSpan.textContent = `IP: ${data.ip}`;
          div.appendChild(ipSpan);
        }

        messageList.appendChild(div);
      });

      // Scroll chat to bottom so latest messages show
      messageList.scrollTop = messageList.scrollHeight;
    })
    .catch(error => {
      console.error("Error fetching messages:", error);
    });
}

// Start polling every 1 second
setInterval(fetchMessages, 1000);

// Fetch once on page load
fetchUserIP().then(fetchMessages);
