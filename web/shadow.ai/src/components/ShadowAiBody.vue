<template>
    <div class="body">
        <ShadowAiSideMenu/>
        <div id="workspace" ref="workspace">
            <div id="before">
                before
                <img src="#">
            </div>
            <div id="after">
                after
                <img src="#">
            </div>
            <div id="gal_controller">
                <button id="prev_img"><svg width="50" height="50"><polygon points="0,25 50,0 50,50"/></svg></button>
                <input type="checkbox" id="select">
                <button id="next_img"><svg width="50" height="50"><polygon points="50,25 0,0 0,50"/></svg></button>
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
    padding-top:20px;
    transition: margin-left .3s;
    text-align:center;
}

#before {
    position: relative;
    background-color:beige;
    float:left;
    width:40%;
    height:400px;
    margin:0 10px 10px 50px;
    border: solid 1px;
}
#after {
    position:relative;
    float:right;
    background-color:skyblue;
    width:40%;
    height:400px;
    margin: 0 50px 10px 10px;
    border: solid 1px;
}
#gal_controller{
    position: relative;
    display:inline-block;
    top: 75%;
    width:30%;
    height:10%;
    margin:30px;
}
#gal_controller>button {
    margin-left:20px;
    margin-right:20px;
    height:100%;
    width:100px;
    border:None;
    background-color:#f0f0f0;
}
#prev_img{
    float:left;
}
#select{
    position:absolute;
    left:45%;
    top:30%;
    width:10%;
    height:40%;
    
}
#next_img{
    float:right;
}

#tools {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 300px;
    height:inherit;
    z-index: 1; /* Stay on top */
    left: -275px;
    background-color: #1f1f1f;
    overflow-x: hidden; /* Disable horizontal scroll */
    overflow-y: hidden;
    transition: 0.3s; /* 0.3 second transition effect to slide in the sidenav */
    color:white;
}

#tools:hover {
    left: 0;
}
#fix_tool_box {
    position:absolute;
    top:1%;
    right:7px;
    
}

#color {
    position:absolute;
    top:10%;
    width:77%;
    display:block;
    background-color:#f1e3e3;
    border:1px solid white;
    
}
#html5colorpicker{
    position:relative;
    display:block;
    width:97%;
    height:30px;
}
#color_value {
    position:relative;
    display:block;
    width:99%;
    color:black;
    text-align: center;
    
}

#filebox {
    position:absolute;
    top:30%;
    width:77%;
    display:block;
    border:solid 1px;
}
#filelist{
    position:relative;
    display:block;
    height:200px;
    border:solid;
}
#sel_files {
    position: relative;
    display:block;
}

#del {
    position: relative;
    display:block;
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