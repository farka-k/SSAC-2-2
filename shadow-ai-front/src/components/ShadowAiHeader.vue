<template>
    <v-app-bar app
        height=80
    >
        <v-img
            src="../assets/main_logo2.png"
            :style="{cursor:'pointer'}"
            max-width=180
            max-height=80
            height=100%
            alt=Shadow.Ai
            @click="reload"
        ></v-img>
        <v-btn text height=100% @click="$store.commit('showOverlay')">사용 방법</v-btn>
        <v-col class="text-right">
            <v-btn-toggle
                rounded
                mandatory
                v-model="themeToggle" 
            >
                <v-btn>
                    <v-icon>mdi-weather-sunny</v-icon>
                </v-btn>
                <v-btn>
                    <v-icon>mdi-weather-night</v-icon>
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-app-bar>
</template>
<script>
export default({
    computed:{
        themeToggle:{
            get(){
                if (this.$store.state.isDarkTheme)
                    return 1;
                else
                    return 0;
            },
            set(value){
                this.$store.commit('changeTheme',value);
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
        }
    },
    methods:{
        reload:function(){
            location.reload();
        },
        showUsage:function(){
            this.$store.state.showOverlay=!this.$store.state.showOverlay;
        },
    }
})
</script>