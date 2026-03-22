<script setup lang="js">

</script>

<template>
    <div class='profile'>
        <div class="profile_img"></div>
        <div>
            <h2>Dev-Joon</h2>
            <p>성장하는 개발자 <br> Joon 입니다.</p>
        </div>
    </div>
</template>

<style scoped>
 .profile {
    width: 200px;
    height: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid #1B1B1B;
    gap: 25px;
 }

 .profile_img {
    height: 100px;
    width: 100px;
    background-image: url('../assets/images/profile.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border: 1px solid #1B1B1B;
    border-radius: 100%;
 }
</style>