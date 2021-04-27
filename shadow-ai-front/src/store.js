import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(Vuex);

export const store= new Vuex.Store({
    state:{
        showOverlay: false,
        isDarkTheme: false,
        isFileLoaded: false,
        isExecuted: false,
        fileObjList:[],
        fileUrlList:[],
        currentIndex:0,
        defaultColorHexCode:'#FFAC73',
        currentColorHexCode:'#FFAC73',
        select_format:'.png',
        formats:[
            {format:'png',ext:'.png'},
            {format:'jpg',ext:'.jpg'},
            {format:'bmp',ext:'.bmp'}
        ],
        select_sizeopt:0,
        sizeopt:[
            {label:'same as input', value:0},
            {label:'custom', value:1}
        ],
        size:{custom_width:256, custom_height:256},
        base64ImgSrc:[],
        originDataType:[],
        convImageSrc:[],
        convImageUrl:[],
        UploadRequest:null,
        ConvertRequest:null,
        batchid:null,
        dataURLs:[]
    },
    getters:{
        getFileObjList:function(state){
            return state.fileObjList;
        },
        getFileUrlList:function(state){
            return state.fileUrlList;
        },
        getObjCount:function(state){
            return state.fileUrlList.length;
        },
        getCurrentItemIndex:function(state){
            return state.currentIndex;
        },
        getDefaultColorHex:function(state){
            return state.defaultColorHexCode;
        },
        getCurrentColorHex:function(state){
            return state.currentColorHexCode;
        },
        getSelectedFormat:function(state){
            return state.select_format;
        },
        getSelectedSizeopt:function(state){
            return state.select_sizeopt;
        },
        getCustomSize:function(state){
            return state.size;
        },
        getOriginalBase64:function(state){
            return state.base64ImgSrc;
        },
        getConvImageBase64:function(state){
            return state.convImageSrc;
        },
        getLastRequst:function(state){
            return state.request;
        },
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
        setBase64Src(state,payload){
            state.base64ImgSrc=payload;
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
            if (state.fileUrlList.length){
                state.fileUrlList.forEach(u=>{
                    window.URL.revokeObjectURL(u);
                })
            }
            state.currentIndex=0;
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
            window.URL.revokeObjectURL(state.fileUrlList[state.currentIndex]);
            state.fileObjList.splice(state.currentIndex,1);
            state.fileUrlList.splice(state.currentIndex,1);
            if (state.currentIndex >= state.fileObjList.length)
                state.currentIndex--;
            if (state.fileObjList.length == 0) {
                state.isFileLoaded=false;
                this.$refs.ifd.value=[];
            }
        },
        clearFile(state){
            state.fileUrlList.forEach(u=>{
                window.URL.revokeObjectURL(u);
            })
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
            state.currentColorHexCode=payload;
        },
        updateFormat(state,payload){
            //payload:format item
            state.select_format=payload;
        },
        updateSizeOption(state,payload){
            //payload:sizeoption item
            state.select_sizeopt=payload;
        },
        updateCustomWidth(state,payload){
            //payload:width value
            state.size.custom_width=payload;
        },
        updateCustomHeight(state,payload){
            //payload:height value
            state.size.custom_height=payload;
        },
        showOverlay(state){
            state.showOverlay=!state.showOverlay;
        },
        resetValues(state){
            state.select_format={format:'png',ext:'.png'},
            state.select_size={sizeopt:'same as input', value:0}
            state.custom_width=256;
            state.custom_height=256;
            state.originDataType=[];
            state.base64ImgSrc=[];
            state.convImageSrc=[];
            state.convImageUrl=[];
            state.isExecuted=false;

        },
        beforeUpload(state,payload){
            state.dataURLs= payload
            payload.forEach(url=>{
                let urltext=url.split(',');
                state.originDataType.push(urltext[0]);
                state.base64ImgSrc.push(urltext[1]);
            });
            const request={
                img:state.base64ImgSrc,
                type:state.originDataType
            }
            state.UploadRequest=request;
        },
        makeConvertRequest(state,payload){
            state.batchid=payload;
            var request={
                shadow: state.currentColorHexCode,
                sizeoption: state.select_sizeopt,
                ext:state. select_format
            }
            if (state.select_sizeopt){
                request.req_height=state.size.custom_height;
                request.req_width=state.size.custom_width;
            }
            
            state.ConvertRequest=request;
        },
        updateConvertedFile(state,payload){
            state.isExecuted=true;
            state.convImageSrc=payload;
            let header="data:image/"+state.select_format.substr(1,3)+";base64,"
            state.convImageUrl=state.convImageSrc.map(src=>{
                return header+src;
            });
        }

    },
    actions:{
        async convertImage(context){
            await Promise.all(context.state.fileObjList.map(file=>{
                return (new Promise((resolve,reject)=>{
                    let reader=new FileReader();
                    reader.onload=ev=>{
                        resolve(ev.target.result);
                    }
                    reader.onerror=()=>{
                        reject()
                    };
                    reader.readAsDataURL(file);
                }))
            }))
            .then(images=>{
                context.commit('beforeUpload',images);
            }, error=>{
                console.error(error);
            });

            const request=await axios.post('http://localhost:8080/api/images',context.state.UploadRequest)
            .then(response=>{
                if (response.status===201){
                    context.state.batchid=response.data.id;
                    let request={
                        shadow: context.state.currentColorHexCode,
                        sizeoption: context.state.select_sizeopt,
                        ext:context.state.select_format
                    }
                    if (context.state.select_sizeopt){
                        request.req_height=context.state.size.custom_height;
                        request.req_width=context.state.size.custom_width;
                    }
                    console.log(request);
                    return request;
                }
            })
              
            await axios.post('http://localhost:8080/api/orders/'+context.state.batchid+'/conv', request)
            .then(response=>{
                if (response.status===200){
                    context.commit('updateConvertedFile',response.data.result);
                }
            });
        },
    }
})