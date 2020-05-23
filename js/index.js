/*
*开发者：汪春旺
* 日期：2020-05-20
* 原测试地址 http://autumnfish.cn/yuemusic//index.html
*
* 1.歌曲搜索接口：https://autumnfish.cn/search?keywords=
* 查询参数：keywords
*
* 2.歌曲播放资源接口：https://autumnfish.cn/song/url?id=
* 查询参数：id
*
*3.歌曲详情接口(封面等信息)：https://autumnfish.cn/song/detail?ids=
* 查询参数：ids
*
* 4.歌曲评论接口：https://autumnfish.cn/comment/hot?type=0&id=
* 查询参数：id
*
* 5.mv播放接口：https://autumnfish.cn/mv/url?id=
*  查询参数：id
* */

let app = new Vue({
    el:'#player',
    data:{
        keywords:'',    //输入查询关键字
        musicList:[],   //保存歌曲列表
        curindex:'',    //歌曲列表索引值
        musicUrl:'',    //音乐资源
        picUrl:'',      //音乐背景图
        hotComments:[], //热门评论
        isPlay:false,   //动画播放状态
        info:{          //保存音乐额外信息
            musicName:'',
            Songer:'',
        },
        isMVShow:false, //MV视频窗口是否显示
        MVUrl:'',       //MV播放地址
    },
    methods:{
        //歌曲搜索
        searchMusic:function () {
            let self = this;
            axios.get('https://autumnfish.cn/search?keywords='+this.keywords)
                .then(function (res)  {
                    // console.log(res.data.result.songs);
                    self.musicList=res.data.result.songs;
                }, function (err) {

                });
        },

        //歌曲点击播放
        playMusic:function (id, musicName, Songer, index) {
            let self = this;
            self.info.musicName=musicName;
            self.info.Songer=Songer;
            self.curindex=index;
            // console.log(document.querySelector('.song_list li span').className);
            // console.log(index+' '+self.curindex);

            //播放地址
            axios.get('https://autumnfish.cn/song/url?id='+id)
                .then(function (res) {
                    // console.log(res);
                    self.musicUrl=res.data.data[0].url;
                }, function (err) {

                });

            //图片地址
            axios.get('https://autumnfish.cn/song/detail?ids='+id)
                .then(function (res) {
                    // console.log(res.data.songs[0].al.picUrl);
                    self.picUrl=res.data.songs[0].al.picUrl;
                }, function (err) {

                });

            //获取评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+id)
                .then(function (res) {
                    // console.log(res.data.hotComments);
                    self.hotComments=res.data.hotComments;
                }, function (err) {

                });

        },

        //动画播放控制
        play:function () {
            this.isPlay=true;
            // console.log(this.isPlay);
        },
        pause:function () {
            this.isPlay=false;
            // console.log(this.isPlay);
        },

        //播放MV
        playMV:function (mvid) {
            let self=this;
            document.querySelector('.audio_con audio').pause();
            axios.get('https://autumnfish.cn/mv/url?id='+mvid)
                .then(function (res) {
                    // console.log(res);
                    self.isMVShow=true;
                    self.MVUrl=res.data.data.url;
                }, function (err) {

                })
        },

        //关闭MV
        closeMV:function () {
            this.isMVShow=false;
            document.querySelector('.video_con video').pause();
        }

    }


});


//搜索输入框获得焦点
onload = function () {
    document.querySelector(".search_bar input").focus();

};




