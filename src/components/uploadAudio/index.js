
export default {
  name: 'ComponentsUploadAudio',
  data(){
     return {
          uploadAudio:false,
          source:'local',
          linkForm:{
            url:'',
            name:''
          },
          linkFormRule:{
              url: [
                        { required: true, message: 'url地址不能为空', trigger: 'blur' },
                        { type: 'url', message: 'url地址格式不正确', trigger: 'blur'}
                    ],
              name: [
                        { required: true, message: '音频名称不能为空', trigger: 'blur' }
                    ]
          },
          percentage:0,
          ishideone:false,
          uploadtip:'',
          isuploading:false,
          isfail:false,
          isfinishupload:false,
          audioname:'',
          audioUrl:'',
          canceluploadFlag:false
         
    }
  },
  computed:{
      
  },
  props:{
      onSuccess: Function,
      action: {
        default: 'http://mp.dev.hubpd.com/media/ueditor?action=uploadfile'
      }, 
  },
  watch:{
    uploadAudio(val){
        if(!val){
            this.reset();
        }
    }
  },
  methods: {
      showModal(){
        this.uploadAudio=true;   
      },
      submitLinkAudio (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.insertAudioEditor(this.linkForm);
                    } else {
                        this.$Notice.error({
                            title: '表单验证失败!',
                            desc: false
                        });
                    }
                })
            },
    handleBeforeUpload(){
        this.ishideone=true;
        this.isuploading=true;
        this.isfail=false;
        this.isfinishupload=false;
        this.canceluploadFlag=false;
        this.uploadtip="等待上传...";
    },
    uploadingAudio(event, file, fileList){
        if(event.percent > 0 && !this.canceluploadFlag){
            this.uploadtip="上传中...";
            this.audioname=file.name;
            this.percentage=parseInt(event.percent);
        }     
    },
    handleSuccess (res, file) {
        this.uploadtip="上传成功";
        this.isuploading=false;
        this.isfail=false;
        this.isfinishupload=true;
        this.audioUrl="http://mp.dev.hubpd.com/media"+res.url;  

    },
    insertAudioEditor(data){
        if(!data){
            data={name:this.audioname,url:this.audioUrl};
        }   
        this.$emit('onSuccess',data);
        this.uploadAudio=false;
    },
    handleError(res, file){
        this.uploadtip="上传失败";
        this.percentage=0;
        this.isuploading=false;
        this.isfail=true;
        this.isfinishupload=false;
        this.$Notice.warning({
            title: '上传音频失败',
            desc: '文件 ' + file.name + '上传失败，请重试'
        });
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 mp3格式的音频。'
        });
    }, 
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 30M。'
        });
    },
    reset(){
        //重置
         this.source='local';
         this.linkForm.url='';
         this.linkForm.name='';
         this.percentage=0;
         this.ishideone=false;
         this.uploadtip='';
         this.isuploading=false;
         this.isfail=false;
         this.isfinishupload=false;
         this.audioname='';
    },
    cancelUpload(){
         this.percentage=0;
         this.ishideone=false;
         this.uploadtip='';
         this.isuploading=false;
         this.isfail=false;
         this.isfinishupload=false;
         this.audioname='';
         this.canceluploadFlag=true;
    }                 
  },
  created() {
        
       
  },
  mounted() {
      
    
  },
  destroy(){
     
  }

}