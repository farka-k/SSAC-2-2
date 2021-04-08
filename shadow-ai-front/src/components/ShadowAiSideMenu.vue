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
                                accept="image/*"
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
                        <v-card-actions>
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
                                        v-model="size"
                                        :items="$store.state.sizes"
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
            return this.$store.getters.getSelectedSize==1;
        },
        color:{
            get(){
                return this.$store.getters.getCurrentColorHexA;
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
        size:{
            get(){
                return this.$store.getters.getSelectedSize;
            },
            set(value){
                this.$store.commit('updateSize',value);
            }
        }
    },
    methods:{
        refresh:function(){
            this.$store.commit('clearFile');
            this.$refs.ifd.value=[];
            this.$store.commit('updateColor',this.$store.getters.getDefaultColorHexA);
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