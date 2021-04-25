<template>
    <v-navigation-drawer
        width=20%
        floating
        id="sidemenu"
        >
        <v-toolbar dense flat>
            <v-spacer></v-spacer>
            <v-btn
                icon
                depressed
                @click="refresh"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-subtitle>
                            Select Image
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-file-input
                                dense
                                multiple
                                chips
                                counter
                                show-size
                                accept="image/png, image/jpeg, image/bmp"
                                v-model="fileObj"
                                ref="ifd"
                                
                                label="Select Image"
                            >
                            </v-file-input>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-subtitle>
                            Shadow Color
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions class="d-flex justify-center">
                            <v-color-picker
                                canvas-height="100"
                                dot-size="18"
                                elevation="15"
                                v-model="color"
                            ></v-color-picker>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-subtitle>
                            Output Option
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-row no-gutters align="center">
                                <v-col cols="4">
                                    <v-subheader>format</v-subheader>
                                </v-col>
                                <v-col cols="8">
                                    <v-select
                                        dense
                                        v-model="format"
                                        :items="$store.state.formats"
                                        item-text="format"
                                        item-value="ext"
                                    ></v-select>
                                </v-col>
                                <v-col cos="4">
                                    <v-subheader>size</v-subheader>
                                </v-col>
                                <v-col cols="8">
                                    <v-select
                                        dense
                                        v-model="sizeopt"
                                        :items="$store.state.sizeopt"
                                        item-text="label"
                                        item-value="value"
                                    ></v-select>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-subheader>width</v-subheader>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-text-field
                                        dense
                                        suffix="px"
                                        ref="custom_width"
                                        type="number"
                                        v-model="width"
                                        
                                    ></v-text-field>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-subheader>height</v-subheader>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-text-field
                                        dense
                                        suffix="px"
                                        ref="custom_width"
                                        type="number"
                                        v-model="height"
                                        
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-actions>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-btn block @click="convertImage">Convert</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn block>Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-navigation-drawer>
</template>
<script>
export default({
    name:'ShadowAiSideMenu',
    data(){
        return{
            size_validation:"if(Number(this.value) > Number(this.maxsize)) this.value=this.maxsize",
            maxsize:1024,
            minsize:1
        }
    },
    computed:{
        fileObj:{
            get(){
                return this.$store.getters.getFileObjectList;
            },
            set(value){
                this.$store.commit('updateFile',value);
            }
        },
        isCustomSize:function(){
            return this.$store.getters.getSelectedSizeopt==1;
        },
        color:{
            get(){
                return this.$store.getters.getCurrentColorHex;
            },
            set(value){
                this.$store.commit('updateColor',value);
            }
        },
        format:{
            get(){
                return this.$store.getters.getSelectedFormat;
            },
            set(value){
                this.$store.commit('updateFormat',value);
            }
        },
        sizeopt:{
            get(){
                return this.$store.getters.getSelectedSizeopt;
            },
            set(value){
                this.$store.commit('updateSizeOption',value);
            }
        },
        width:{
            get(){
                return this.$store.getters.getCustomSize.custom_width
            },
            set(value){
                this.$store.commit('updateCustomWidth', parseInt(value));
            }
        },
        height:{
            get(){
                return this.$store.getters.getCustomSize.custom_height
            },
            set(value){
                this.$store.commit('updateCustomHeight', parseInt(value));
            }
        }
    },
    methods:{
        refresh:function(){
            this.$store.commit('clearFile');
            this.$refs.ifd.value=[];
            this.$store.commit('updateColor',this.$store.getters.getDefaultColorHex);
            this.$store.commit('resetValues');
        },
        convertImage:function(){
            this.$store.dispatch('convertImage');
        }
    },
})
</script>
<style>
#sidemenu{
    display:inline-block;
    height:100%;
}

.v-color-picker{
    width:100%;
}
</style>