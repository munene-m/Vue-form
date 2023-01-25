<template>
  <div class="login">
    <form id="signupForm" @submit.prevent="login">
      <h3>Log in to your account</h3>
      <label for="email">Email address:</label><br>
      <input type="email" v-model="email" id="email" name="email"><br>

      <label for="password">Password:</label><br>
      <input type="password" v-model="password" id="password" name="password"><br>
      <p v-if="errorMsg">{{ errorMsg }}</p>

      <button id="signupBtn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter()

const email = ref("")
const password = ref("")
const errorMsg = ref()

const login = () => {
  const auth = getAuth()
  
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    alert("Logged in successfully")
    console.log(data)
    console.log(auth.currentUser)
    router.push("/feed")
  }).catch((err) => {
    console.log(err.code);
    if(err.code === "auth/invalid-email"){
      errorMsg.value = "Invalid email address"
    } else if (err.code === "auth/user-not-found"){
      errorMsg.value = "No account with that email address was found"
    } else if(err.code === "auth/wrong-password"){
      errorMsg.value = "The password you entered was incorrect"
    } else{
      errorMsg.value = "Incorrect email or password"
    }

    alert(err.message)
  })
}

</script>

<style scoped>
#signupForm {
  width: 300px;
  margin: 40px auto;
  padding: 14px 28px;
  text-align: left;
  border: 1px solid #919191;
  border-radius: 8px;
  background: #fff;
}

form>h3 {
  text-align: center;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

label {
  display: block;
  font-size: 16px;
}

input[type="text"],
input[type="date"],
input[type="password"],
input[type="email"] {
  width: 100%;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-bottom: 2px solid #919191;
  line-height: 1.5em;
}

#password-error {
  color: red;
  font-size: 13px;
}

button[type="submit"] {
  width: 100%;
  background-color: #4c9daf;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: .3s ease-in-out;
  font-size: 17px;
}

button[type="submit"]:hover {
  background-color: #009cde;
  transform: scale(0.98);
}

@media screen and (max-width:768px) {
  #signupForm {
    width: 100%;
    margin: 0 auto;
    border: none;
    min-height: 100vh;
  }
}

@media (min-width:768px) and (max-width:1024px) {
  #signupForm {
    width: 60%;
  }
}

@media (min-width:1025px) and (max-width:1280px) {
  #signupForm {
    width: 50%;
  }
}
</style>
