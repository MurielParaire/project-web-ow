<template>
    <!-- Navigation Bar -->
<router-view></router-view>
<nav class="navbar  navbar-fixed-top">
  <div class="navbar-header">

    <p class="navbar-oversim">OverSim2</p>
  </div>
  <div class="collapse navbar-collapse" id="resNav">
    <ul class="nav navbar-nav navbar-right">
      <li><router-link :to="{ name: 'overSim_home' }" class="router-link">Home</router-link></li>
      <li><router-link :to="{ name: 'Characters' }" class="router-link">Characters</router-link></li>
      <li><router-link :to="{ name: 'Match' }" class="router-link">Match</router-link></li>
      <li><a href="#">Sign in</a></li>
    </ul>
  </div>
</nav>  
<!-- End of Navigation Bar -->
</template>

<style>
/* Navigation Bar */
.navbar{
  padding: 15px 10px 15px 0px;
  background-color: #1c8bc6;
}
.navbar-oversim{
  font-size: 30px;
  color: white !important;
  font-family: "Mogra";
  text-decoration: none;
}
.navbar .navbar-nav li a{
  font-size: 16px;
  color: white;
}

nav > li > a:hover, .nav > li > a:focus {
  background-color: #1c8bc6 !important;
  text-decoration: underline !important;
}

</style>