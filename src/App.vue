<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";

const router = useRouter()

const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})
const handleSignOut = () =>{
  signOut(auth).then(() => {
    router.push("/")
  })
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Register</RouterLink>
      <RouterLink to="/login">Log in</RouterLink>
      <RouterLink to="/feed">Feed page</RouterLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
* {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  background-color: black;
  margin: 0;
  padding: 10px;
}

nav > a {
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in;
}

nav > a:hover {
  color: rgb(2, 147, 209);
}

nav > button {
  border: none;
  background-color: rgb(207, 9, 9);
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

@media screen and (max-width:768px) {
  nav {
    gap: 2rem;
    width: 100%;
  }
}
</style>
