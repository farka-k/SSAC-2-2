<template>
    <v-main app>
        <ShadowAiSideMenu/>
        <v-card
            id="canvas"
            class="text-center"
            width=80%
            height=100%
        >
            <v-card
                id="dropzone"
                color="light-blue lighten-4"
                height=90%
                ripple
            >
                <v-container fill-height>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-btn>이미지 업로드</v-btn>
                            <v-card-text>혹은 파일 놓기</v-card-text>
                        </v-col>
                    </v-row>
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
    methods:{

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