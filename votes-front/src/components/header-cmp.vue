<template>
  <div class="header">
    <router-link class="link link-1" to="/">רשימת המדינות</router-link>
    <router-link class="link" to="/charts">גרפים מסכמים</router-link>
  </div>
</template>

<style scoped>
.header {
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fff;

  box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  display: flex;
  align-items: center;
  padding-inline-start: 50px;
}
.link{
    font-size: 18px;
}
.link-1{
    
    border-inline-end: 1px solid black;
    padding-inline-end: 10px;
    margin-inline-end: 10px;
}

</style>
