
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD3h2ADXkWCDLxOlid4yy113f7Z_N2TLLM",
  authDomain: "freelancer-dashboard-da31b.firebaseapp.com",
  projectId: "freelancer-dashboard-da31b",
  storageBucket: "freelancer-dashboard-da31b.firebasestorage.app",
  messagingSenderId: "706900518967",
  appId: "1:706900518967:web:f2f98f3e3c54f0de5ab7b2"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const usersQuery = await getDocs(collection(db, "users"))
export const user = usersQuery.docs.map((doc) => {
  const users = doc.data()
  return users.userName
});

export async function fetchAllGigs() {
  const gigsQuery = await getDocs(collection(db, "gigs"))
  return gigsQuery.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
}

export async function fetchAllClients() {
  const clientsQuery = await getDocs(collection(db, "clients"))
  return clientsQuery.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
}

export async function fetchUserGigs() {
  const gigsQuery = await getDocs(collection(db, "gigs"))
  return gigsQuery.docs
    .filter( (doc) => doc.data().completedBy === user[0])
    .map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
}

export async function fetchUserClients() {
  const userGigs = await fetchUserGigs()
  const clientsQuery = await getDocs(collection(db, "clients"))
  const filteredClients = []

  for (const doc of clientsQuery.docs) {
    const client = doc.data()
    if (userGigs.some(gig => client.clientId === gig.ownedBy)) {
      filteredClients.push({
        ...client,
        id: doc.id
      })
    }
  }

  return filteredClients
}

const gigsQuery = await getDocs(collection(db, "gigs"));
export const gigs = gigsQuery.docs.map((doc) => {
  const gigs = doc.data()
  return {
    ...gigs,
    id: doc.id
  }
});

const clientsQuery = await getDocs(collection(db, "clients"));
export const clients = clientsQuery.docs.map((doc) => {
  const clients = doc.data()
  return {
    ...clients,
    id: doc.id
  }
});

export function determineLogState (setLoggedIn, setUserInfo, darkMode) {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          setLoggedIn(true)
          showProfilePicture(user, setUserInfo, darkMode)
      } else {
          setLoggedIn(false)
      }
    });
}

export function authCreateAccountWithEmail(email, password, setLoggedIn, setReqStatus, setError) {
  setReqStatus("submitting")
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setLoggedIn(true)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setReqStatus("idle")
      email = ""
      password = ""
    })
}

export function authSignInWithEmail(email, password, setLoggedIn, setReqStatus, setError) {
  setReqStatus("submitting")
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setLoggedIn(true)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setReqStatus("idle")
      email = ""
      password = ""
    })
}

export function authSignOut(setLoggedIn) {
  signOut(auth).then(() => {
    setLoggedIn(false)
  }).catch((error) => {
    console.error(error.message)
  })
}

export function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
    }).catch((error) => {
      console.error(error.message)
    })
}

function showProfilePicture(user, setUserInfo, darkMode) {
  const photoURL = user.photoURL
  const displayName = user.displayName?.split(" ")[0] || "Guest"
  const email = user.email

  setUserInfo({
    userImg: photoURL || (darkMode ? "/src/assets/user-dark.png" : "/src/assets/user.png"),
    userName: displayName,
    userEmail: email
  })
}