<template>
    <div class="body">
        <ShadowAiSideMenu/>
        <div id="workspace" ref="workspace">
            <div id="req-img">
                <div v-bind:style="{position:'relative',top:'50%',border:'none'}" v-on:click="open">
                    <button class="btn-upload">이미지 업로드</button>
                </div>
                <div v-bind:style="{position:'relative',top:'50%',margin:'8px 0px 24px'}">
                    또는 파일 놓기
                </div>
            </div>
            <div class="img-slide-container">
                <div class="uploaded-image">
                    <img src="../assets/46.png">
                </div>
                <div class="uploaded-image">
                    <img src="../assets/209.png">
                </div>
                <div class="uploaded-image">
                    <img src="../assets/270.png">
                </div>
                <div class="uploaded-image">
                    <img src="../assets/398.png">
                </div>
                <!--Next and Prev buttons-->
                <a class="prev" v-on:click=moveSlides(-1)>&#10094;</a>
                <a class="next" v-on:click=moveSlides(1)>&#10095;</a>
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
    },
    methods:{
        moveSlides:function(n){
            n;
        }
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
.img-slide-container{
    position:relative;
    margin:auto;
}
.uploaded-image{
    display:none;
}
.prev, .next{
    cursor:pointer;
    position:absolute;
    top:50%;
    width:auto;
    margin-top:-22px;
    padding:16px;
    color:black;
    font-weight:bold;
    font-size:18px;
    transition:.6s ease;
    border-radius:0 3px 3px 0;
    user-select:none;
}
.next{
    right:0;
    border-radius:3px 0 0 3px;
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

.btn-upload{
    display:inline-block;
    cursor:pointer;
    width:225px;
    padding:.5rem 1rem;
    line-height:1.5;
    font-weight:700;
    font-size:1.25rem;
    color:white;
    background-color:#2699fb;
    border-color:#2699fb;
    border-radius:.3125rem;
    border:1px solid;
    text-align:center;
    vertical-align: middle;

}
</style>