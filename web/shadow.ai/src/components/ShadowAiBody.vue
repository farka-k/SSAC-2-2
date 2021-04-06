<template>
    <v-main app>
        <ShadowAiSideMenu ref="sidemenu"></ShadowAiSideMenu>
        <v-card
            id="canvas"
            class="text-center"
            width=80%
            height=100%
        >
            <v-card @drop.prevent="drop" @dragover.prevent @dragleave.prevent
                id="dropzone"
                color="light-blue lighten-4"
                height=90%
                ripple
            >
                <v-container fill-height v-show="!this.$store.state.isFileLoaded">
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-btn @click="fileopen">이미지 업로드</v-btn>
                            <v-card-text>또는 파일 놓기</v-card-text>
                            <v-card-text>{{ this.$store.state.fileObjList }}</v-card-text>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container v-show="this.$store.state.isFileLoaded">
                    <v-carousel v-model="currentIndex">
                        <v-carousel-item
                            v-for="(item,i) in this.$store.state.fileUrlList"
                            :key="i"
                            :src="item"
                        ></v-carousel-item>
                    </v-carousel>
                    <v-btn @click="fileopen">파일 변경</v-btn>
                    <v-btn @click="filedelete">파일 삭제</v-btn>
                </v-container>
            </v-card>

        </v-card>   
    </v-main>
</template>

<script>
import ShadowAiSideMenu from './ShadowAiSideMenu.vue'
export default ({
    name:'ShadowAiBody',
    components:{
        ShadowAiSideMenu
    },
    data(){
        return {
            
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