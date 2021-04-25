<template>
    <v-main app>
        <ShadowAiSideMenu ref="sidemenu"></ShadowAiSideMenu>
        <UsageOverlay />
        <!--GalleryBefore v-show=false></!--GalleryBefore>
        <GalleryAfter-- v-show=false></GalleryAfter-->
        <v-card
            id="canvas"
            class="text-center"
            width=80%
            height=100%
        >
            <v-card @drop.prevent="drop" @dragover.prevent @dragleave.prevent
                id="dropzone"
                :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
                height=90%
                ripple
                v-show="!$store.state.isExecuted"
            >
                <v-container fill-height v-show="!$store.state.isFileLoaded">
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-btn @click="fileopen">이미지 업로드</v-btn>
                            <v-card-text class="blue--text font-weight-bold">또는 파일 놓기</v-card-text>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container v-show="$store.state.isFileLoaded">
                    <v-carousel
                        v-model="currentIndex"
                        height=768px
                    >
                        <v-carousel-item
                            v-for="(item,i) in $store.state.fileUrlList"
                            :key="i"
                            :src="item"
                        ></v-carousel-item>
                    </v-carousel>
                    <v-btn @click="fileopen">파일 변경</v-btn>
                    <v-btn @click="filedelete">파일 삭제</v-btn>
                </v-container>
            </v-card>

            <v-card
                v-show="$store.state.isExecuted"
            >
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-carousel
                                height=400px
                                v-model="doubleCarousel"
                            >
                                <template v-slot:next>
                                    <v-btn v-show=false></v-btn>
                                </template>
                                <v-carousel-item
                                    v-for="(item,i) in $store.state.fileUrlList"
                                    :key="i"
                                    :src="item"
                                ></v-carousel-item>
                            </v-carousel>
                        </v-col>
                        <v-col cols="6">
                            <v-carousel
                                height=400px
                                v-model="doubleCarousel"
                            >
                                <template v-slot:prev>
                                    <v-btn v-show=false></v-btn>
                                </template>
                                <v-carousel-item
                                    v-for="(item,i) in $store.state.convImageSrc"
                                    :key="i"
                                    :src="item"
                                ></v-carousel-item>
                            </v-carousel>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn @click="saveZip">파일 저장</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-card>   
    </v-main>
</template>

<script>
import ShadowAiSideMenu from './ShadowAiSideMenu.vue'
import UsageOverlay from './UsageOverlay.vue'
import JsZip from 'jszip'
export default ({
    name:'ShadowAiBody',
    components:{
        ShadowAiSideMenu,
        UsageOverlay,
    },
    data(){
        return {
            doubleCarousel:0
        }
    },
    computed:{
        currentIndex:{
            get(){
                return this.$store.getters.getcurrentItemIndex;
            },
            set(value){
                this.$store.commit('setCurrentItemIndex',value);
            }
        }
    },
    methods:{
        drop(e){
            let droppedFiles=e.dataTransfer.files;
            if(!droppedFiles) return;
            
            this.$store.commit('dropFile',droppedFiles);
        },
        fileopen:function(){
            this.$refs.sidemenu.$refs.ifd.$refs.input.click();
        },
        filedelete:function(){
            this.$store.commit('deleteFile');
        },
        saveZip:function(){
            var zip=new JsZip();
            
            const len=this.$store.getters.getObjCount;
            const format=this.$store.getters.getSelectedFormat;
            const base64s=this.$store.getters.getOriginalBase64;
            [...Array(len).keys()].forEach(n=>{
                let filename='image'+n.toString()+format;
                console.log(filename);
                zip.file(filename,base64s[n],{'base64':true});
                
            })
            console.log(zip);
            zip.generateAsync({type:"base64"})
            .then(
                function(zipContents){
                    var zipname='images.zip';
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:application/zip;base64,' + zipContents );
                    element.setAttribute('download', zipname );
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                }
            );
        }
    }
})
</script>

<style scoped>
#canvas {
    position:absolute;
    display:inline-block;
}
#dropzone{
    margin:10px;
    padding:10px;
}
</style>