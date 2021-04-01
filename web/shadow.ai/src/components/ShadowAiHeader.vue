<template>
    <v-app-bar app light
        height=80
    >
        <v-img
            src="../assets/main_logo2.png"
            id="logo"
            max-width=180
            max-height=80
            height=100%
            alt=Shadow.Ai
            v-on:click="reload"
        ></v-img>
        <v-btn text height=100%>사용 방법</v-btn>
        <!--nav class="navbar">
            div id="nav-items">
                <ul>
                    <li><a href="" v-on:click="showUsage">사용 방법</a></li>
                    <li><a href="#">item2</a></li>
                </ul>
            </div>
        </nav-->
    </v-app-bar>
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
.navbar {
    display:flex;
    align-items:center;
}
#logo{
    cursor:pointer;
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