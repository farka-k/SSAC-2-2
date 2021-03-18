<template>
    <div class="header">
        <nav class="navbar">
            <img src="../assets/logo007.png" id="logo" alt="Shadow.Ai" width=120px height=50px v-on:click="reload">
            <div id="nav-items">item1</div>
        </nav>
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
    border-bottom:1px solid;
}

.navbar {
    display:flex;
    align-items:center;
    padding:10px;
}
#logo{
    position:relative;
    cursor:pointer;
    display:inline-block;
}
#nav-items{
    position:relative;
    display:inline-block;
    border:1px dotted;
    margin:0 10px;
    font-size:24px;
}
</style>