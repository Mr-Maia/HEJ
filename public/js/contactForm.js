import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyChnPne8fFhTJLkMuSFpTWr3YdItdXuuh4",
    authDomain: "hej-c3d6f.firebaseapp.com",
    databaseURL: "https://hej-c3d6f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hej-c3d6f",
    storageBucket: "hej-c3d6f.appspot.com",
    messagingSenderId: "211987513577",
    appId: "1:211987513577:web:fe278322f5c4fab21bb078",
    measurementId: "G-Z11CXTF55R"
};

initializeApp(firebaseConfig);

function uploadData() {
    const database = getDatabase();
    const countRef = ref(database, 'Contacts/count');

    let number;
    get(countRef).then((snapshot) => {
        number = snapshot.exists() ? snapshot.val() : 0;
    }).catch((error) => {
        console.error('Error getting data:', error);
    });

    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactSubject = document.getElementById('contactSubject').value;
    const contactMessage = document.getElementById('contactMessage').value;

    const data = {
        Name: contactName,
        Email: contactEmail,
        Subject: contactSubject,
        Message: contactMessage
    };

    set(ref(getDatabase(), `Contacts/${number}`), data);
    set(ref(getDatabase(), 'Contacts/count'), number + 1);

    document.getElementById("response").innerHTML = "Data Saved Successfully";

    setTimeout(() => {
        document.getElementById("response").innerHTML = "";
        document.getElementById('contactForm').reset();
    }, 1500);
}

document.getElementById('submitButton').addEventListener('click', uploadData);
