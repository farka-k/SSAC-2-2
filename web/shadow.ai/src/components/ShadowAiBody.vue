<template>
    <div class="body">
        <ShadowAiSideMenu/>
        <div id="workspace" ref="workspace">
            <div id="req-img">
                <div v-bind:style="{position:'relative',top:'50%'}">+</div>
            </div>
            <div id="before" class="img">
                before
                <img src="#">
            </div>
            <div id="after" class="img">
                after
                <img src="#">
            </div>
            <div id="gal-controller">
                <button id="prev-img"><svg width="50" height="50"><polygon points="0,25 50,0 50,50"/></svg></button>
                <input type="checkbox" id="select">
                <button id="next-img"><svg width="50" height="50"><polygon points="50,25 0,0 0,50"/></svg></button>
            </div>
        </div>
        
    </div>
</template>

<script>
import ShadowAiSideMenu from './ShadowAiSideMenu.vue'
export default ({
    name:'ShadowAiBody',
    components:{
        ShadowAiSideMenu
    }
})
</script>

<style scoped>
.body {
    height:600px;
    display: flex;
    justify-content: center;
    background-color:#eeeeee;
}

#workspace {
    position: absolute;
    display:inline-block;
    width:80%;
    margin:20px;
    padding-top:0px;
    transition: margin-left .3s;
    text-align:center;
    border:1px solid;
}

#req-img{
    position:absolute;
    display:block;
    border:1px solid;
    width:100%;
    height:550px;
}
.img{
    position:relative;
    background-color:beige;
    width:40%;
    height:400px;
    border:solid 1px;
    display:none;
}
#before {
    float:left;
    margin:0 10px 10px 50px;
}
#after {
    float:right;
    margin: 0 50px 10px 10px;
}
#gal-controller{
    position: relative;
    display:inline-block;
    top: 75%;
    width:30%;
    height:10%;
    margin:30px;
    display:none;
}
#gal-controller>button {
    margin-left:20px;
    margin-right:20px;
    height:100%;
    width:100px;
    border:None;
    background-color:#f0f0f0;
}
#prev-img{
    float:left;
}
#select{
    position:absolute;
    left:45%;
    top:30%;
    width:10%;
    height:40%;
    
}
#next-img{
    float:right;
}

#conv {
    position: absolute;
    display:block;
    top:80%;
    width:77%;
    height:35px;
}

#save {
    position: absolute;
    display:block;
    top:90%;
    width:77%;
    height:35px;
}
</style>