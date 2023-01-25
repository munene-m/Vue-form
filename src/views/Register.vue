<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import router from '../router';

const email = ref("")
const password = ref("")
const username = ref("")
const confirmPassword = ref("")

const handleSubmit = () => {
    const auth = getAuth()
    const user = auth.currentUser
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            alert("Successfully registered");
            const user = auth.currentUser
            username.value === user.displayName
            console.log(data)
            setTimeout(() => {
                email.value = ""
                password.value = ""
                username.value = ""
                confirmPassword.value = ""
            }, 1000);
            router.push('/feed')
        }).catch((e) => {
            console.log(e.code)
            alert(e.message)
        })
        if(user !== null){
            username.value === user.displayName
            console.log(username.value)
        }
}
</script>

<template>
    <main>
        <form id="signupForm" @submit.prevent="handleSubmit">
            <h3>CREATE ACCOUNT</h3>
            <label for="firstName">Username:</label><br>
            <input type="text" v-model="username" id="firstName" name="firstName"><br>

            <label for="email">Email address:</label><br>
            <input type="email" v-model="email" id="email" name="email"><br>

            <label for="password">Password:</label><br>
            <input type="password" v-model="password" id="password" name="password"><br>
            <p id="password-error"></p>

            <label for="confirmPassword">Confirm password:</label><br>
            <input type="password" v-model="confirmPassword" id="confirmPassword" name="password"><br>
            <p id="confirm-password-error"></p>

            <button id="signupBtn" type="submit">Submit</button>
        </form>
    </main>
</template>

<style scoped>
main {
    box-sizing: border-box;
    display: flex;
    margin: 0 !important;
    padding: 0;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

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

#confirm-password-error {
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