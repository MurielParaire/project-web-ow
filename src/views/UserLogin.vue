<template>

    <section class='login'>
        <div class='head'>
            <h1>OverSim2</h1>
        </div>
        <p>Login form </p>
        <div class='form'>
            <form>
                <input type="text" placeholder='Username' class='text' required><br>
                <input type="password" placeholder='Password' class='password'><br>
                <a href="#" class='btn-login'>Sign in</a>
                <a href="#" class='btn-login'>Sign up</a>
                <a href="#" class='forgot'>Forgot?</a>
            </form>
        </div>
    </section>

</template>

<style scoop>
.login {
    margin-top: 10%;
    background-color: rgb(249, 158, 26, .5);
    margin: auto;
    box-shadow:
        0px 2px 10px rgba(0, 0, 0, 0.2),
        0px 10px 20px rgba(0, 0, 0, 0.3),
        0px 30px 60px 1px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 50px;
    width: 30%;
}

.login .head {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login p {
    text-align: center;
}

.login .form input[type=text].text {
    border: none;
    background: none;
    box-shadow: 0px 2px 0px 0px black;
    width: 100%;
    font-size: 1em;
    outline: none;
}

.login .form .text::placeholder {
    color: black;
}

.login .form input[type=password].password {
    border: none;
    background: none;
    box-shadow: 0px 2px 0px 0px black;
    width: 100%;
    color: black;
    font-size: 1em;
    outline: none;
    margin-bottom: 20px;
    margin-top: 20px;
}

.login .form .password::placeholder {
    color: black;
}

.login .form .btn-login {
    background: none;
    text-decoration: underline;
    color: black;
    border-radius: 3px;
    padding: 5px 2em;
    transition: 0.5s;
}

.login .form .btn-login:hover {
    color:#218ffe;
    transform: 0.5s;
    transition: 0.5s;
}

.login .forgot:hover {
    color:#218ffe;
    transform: 0.5s;
    transition: 0.5s;
}

.login .forgot {
    text-decoration: none;
    color: black;
    float: right;
}

</style>