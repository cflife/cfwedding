// components/book/normal/book-normal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    album: Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:String,
    describe:String,
    img:String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(event){
      this.triggerEvent('albumtap', {
        aid:this.properties.album.id
      }, {})
    }
  }
})
