<template>
    <div class="body">
        <div id="tools" class="toolbox" v-on:mouseover="onHoverSideMenu" v-on:mouseleave="offHoverSideMenu">
            <div id="fix-tool-box" class="">
                <label><input type="checkbox" id="fix" v-on:click="holdSideMenu">fix  ▶</label>
            </div>
            <div id="color">
                <input type="color" id="html5colorpicker" v-on:change="getColorHexCode" value="#ffac73">
                <div id="color-value"> {{colorHexCode}} </div>
            </div>
            <div id="filebox">
                <div id="filelist">
                
                </div>
                <input type="file" id="sel-files" accept="image/*" multiple>
                <button id="del">delete</button>
            </div>
            <button id="conv">Convert</button>
            <button id="save">Save</button>
        </div>   
    </div>
</template>
<script>
export default({
    name:'ShadowAiSideMenu',
    data(){
        return{
            colorHexCode:'#ffac73'
        }
    },
    methods:{
        getColorHexCode: function(event){
            this.colorHexCode=event.target.value;
        },
        onHoverSideMenu: function(){
            this.$parent.$refs.workspace.style.marginLeft="300px";
        },
        offHoverSideMenu: function(){
            this.$parent.$refs.workspace.style.marginLeft="0px";
        },
        holdSideMenu: function(){
            this.toolbox.style.background="white";
        }
    }
})
</script>

<style>
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
#fix-tool-box {
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
#color-value {
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
    border:solid 1px;
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