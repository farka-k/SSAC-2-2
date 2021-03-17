<template>
    <div class="header">
        <img src="../assets/green_circle.png" id="logo" alt="Shadow.Ai" width=120px height=50px v-on:click="reload">
    </div>
</template>
<script>
export default({
    methods:{
        reload:function(){
            location.reload();
        }
    }
})
</script>

<style>
.header {
    background-color: #ffffff;
    height:60px;
    border-bottom:1px solid;
}
#logo{
    position:relative;
    left:4%;
    cursor:pointer;
}
</style>