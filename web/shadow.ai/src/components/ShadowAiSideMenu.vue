<template>
    <v-navigation-drawer
        width=20%
        floating
        id="sidemenu"
        >
        <v-toolbar dense>

        </v-toolbar>
        <v-spacer v-bind:style="{height:'20px'}"></v-spacer>
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
                                accept="image/*"
                                v-model="fileObj"
                                ref="ifd"
                                
                                label="Select Image"
                            >
                            </v-file-input>
                        </v-card-actions>
                            <v-card-text>{{ this.$store.state.fileObjList }}</v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-subtitle>
                            Shadow Color
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-color-picker
                                width="inherit"
                                canvas-height="100"
                                elevation="15"
                                :value="defaultColorHexACode"
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
                                        v-model="select_format"
                                        :items="formats"
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
                                        v-model="select_size"
                                        :items="sizes"
                                        item-text="sizeopt"
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
                                    ></v-text-field>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-subheader>height</v-subheader>
                                </v-col>
                                <v-col v-show="isCustomSize">
                                    <v-text-field
                                        dense
                                        suffix="px"
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
                                    <v-btn block>Convert</v-btn>
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
            defaultColorHexACode:'#FFAC73FF',
            select_format:{format:'png',ext:'.png'},
            formats:[
                {format:'png',ext:'.png'},
                {format:'jpg',ext:'.jpg'},
                {format:'bmp',ext:'.bmp'}
            ],
            select_size:{sizeopt:'same as input', value:0},
            sizes:[
                {sizeopt:'same as input', value:0},
                {sizeopt:'custom', value:1}
            ],
            
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
            return this.select_size==1;
        },

    },
    methods:{
        
    },
})
</script>
<style>
#sidemenu{
    display:inline-block;
    height:100%;
}
</style>