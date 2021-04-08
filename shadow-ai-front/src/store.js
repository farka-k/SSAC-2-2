import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store= new Vuex.Store({
    state:{
        isDarkTheme: false,
        isFileLoaded: false,
        fileObjList:[],
        fileUrlList:[],
        currentIndex:0,
        defaultColorHexACode:'#FFAC73FF',
        currentColorHexACode:'#FFAC73FF',
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
        ]
    },
    getters:{
        getFileObjList:function(state){
            return state.fileObjList;
        },
        getFileUrlList:function(state){
            return state.fileUrlList;
        },
        getCurrentItemIndex:function(state){
            return state.currentIndex;
        },
        getDefaultColorHexA:function(state){
            return state.defaultColorHexACode;
        },
        getCurrentColorHexA:function(state){
            return state.currentColorHexACode;
        },
        getSelectedFormat:function(state){
            return state.select_format;
        },
        getSelectedSize:function(state){
            return state.select_size;
        }
    },
    mutations:{
        changeTheme(state,payload){
            //payload: 1-true, 0-false
            if (payload==1){
                state.isDarkTheme=true;
            }
            else
                state.isDarkTheme=false;
        },
        updateFile(state,payload){
            //payload: file object array created by file input change event
            if (payload.length){
                state.isFileLoaded= true;
            }
            else{
                state.isFileLoaded= false;
            }
            state.fileObjList=payload;
            state.fileUrlList=state.fileObjList.map((v)=>{
                return URL.createObjectURL(v);
            });
        },
        dropFile(state,payload){
            //payload: file object array created by drop event
            if (payload.length){
                state.isFileLoaded= true;
            }
            ([...payload]).forEach(f=>{
                state.fileObjList.push(f);
                state.fileUrlList.push(URL.createObjectURL(f));
            });
        },
        deleteFile(state){
            state.fileObjList.splice(state.currentIndex,1);
            state.fileUrlList.splice(state.currentIndex,1);
            if (state.currentIndex >= state.fileObjList.length)
                state.currentIndex--;
            if (state.fileObjList.length == 0) state.isFileLoaded=false;
        },
        clearFile(state){
            state.fileObjList=[];
            state.fileUrlList=[];
            state.currentIndex=0;
            state.isFileLoaded=false;
        },
        setCurrentItemIndex(state,payload){
            //payload: current index of image showing on carousel
            if (payload<0 || 
                payload >= state.fileObjList.length
            ) {
                console.log("file index out of range");
                return;
            }
            state.currentIndex=payload;
        },
        updateColor(state,payload){
            //payload:color code
            state.currentColorHexACode=payload;
        },
        updateFormat(state,payload){
            //payload:format item
            state.select_format=payload;
        },
        updateSize(state,payload){
            //payload:size item
            state.select_size=payload;
        }
    },
    actions:{

    }
});