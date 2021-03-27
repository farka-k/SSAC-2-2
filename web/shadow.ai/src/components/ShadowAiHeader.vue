<template>
    <div class="header">
        <nav class="navbar">
            <img src="../assets/logo007.png" id="logo" alt="Shadow.Ai" width=140px height=60px v-on:click="reload">
            <div id="nav-items">
                <ul>
                    <li><a href="" v-on:click="showUsage">사용 방법</a></li>
                    <li><a href="#">item2</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default({
    methods:{
        reload:function(){
            location.reload();
        },
        showUsage:function(){
            alert("test")
        }
    }
})
</script>

<style scoped>
.header {
    background-color: #ffffff;
    border-bottom:1px solid;
}

.navbar {
    display:flex;
    align-items:center;
}
#logo{
    margin-left:30px;
    cursor:pointer;
    display:inline;
}
#nav-items{
    font-size:24px;
    width:100%;
}
ul {
    list-style-type: none;
}
li {
    display:inline-block;
}
a{
    display:block;
    padding:8px;
    text-align:center;
    text-decoration: none;
}
</style>