<template>
  <div>
    <!--表格栏-->
    <el-table :data="data.content" stripe highlight-current-row @selection-change="selectionChange"
    :v-loading="loading" element-loading-text="拼命加载中" :max-height="maxHeight" :size="size" :align="align" style="width:100%">
      <el-table-column type="selection" width="40" v-if="showOperation">
      </el-table-column>
      <el-table-column v-for="column in columns" header-align="center" align="center"
      :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
      :fixed="column.fixed" :key="column.prop" :type="column.type"
      :sortable="column.sortable==null?true:column.sortable"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right" v-if="showOperation" header-align="center" align="center">
          <template slot-scope="scope">
            <kt-button label="编辑" :perms="permsEdit" :size="size" @click="handleEdit(scope.$index,scope.row)"></kt-button>
            <kt-button label="删除" :perms="permsDelete" :size="size" type="danger" @click="handleDelete(scope.$index,scope.row)" ></kt-button>
          </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px">
      <kt-button label="批量删除" :perms="permsDelete" :size="size" type="danger" @click="handleBatchDelete()"
      :disabled="this.selections.length===0" style="float:left;" v-if="showOperation">
      </kt-button>
      <el-pagination layout="total,prev,pager,next,jumper" @current-change="refreshPageRequest"
      :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="data.totalSize" style="float:right"></el-pagination>
    </div>
  </div>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
export default {
  name:'KtTable',
  components:{
    KtButton
  },
  props:{
    data:Object,//表格分页数据
    columns:Array,
    permsEdit:String,
    permsDelete:String,
    maxHeight:{//表格最大高度
      type:Number,
      default:400
    },
    showOperation:{//是否显示操作组件
      type:Boolean,
      default:true
    },
    size:{//尺寸样式
      type:String,
      default:'mini'
    },
    align:{//文本对齐方式
       type:String,
       default:'left'
    }
  },
  data() {
    return {
      loading:false,//加载标志
      selections:[],//列表选中列
      //分页信息
      pageRequest:{
        pageNum:1,
        pageSize:8
      }
    }
  },
  methods: {
    //分页查询
    findPage: function() {
      this.loading = true
      let callback = res => {
        this.loading = false
      }
      this.$emit('findPage',{pageRequest:this.pageRequest,callback:callback})
    },
    //选择切换
    selectionChange: function(selections) {
      this.selections = selections
    },
    //换页刷新
    refreshPageRequest:function(pageNum){
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    //编辑
    handleEdit: function(index,row) {
      this.$emit('handleEdit',{index:index,row:row})
    },
    //删除
    handleDelete: function(index,row) {
      this.delete(row.id)
    },
    //批量删除
    handleBatchDelete:function() {
      let ids = this.selections.map(item => item.id).toString()
      this.delete(ids)
    },
    //删除操作
    delete:function(ids) {
       this.$confirm('确认删除选中记录吗？','提示', {
          type:'warning'
       }).then(()=> {
         let params=[]
         let idArray = (ids+"").split(",")
         for(var i=0;i<idArray.length;i++){
           params.push({'id':idArray[i]})
         }
         this.loading = true
         let callback = res => {
            if(res.code==200){
              this.$message({message:'删除成功',type:'success'})
              this.findPage()
            }else {
              this.$message({message:'操作失败，'+res.msg,type:'error'})
            }
            this.loading = false
         }
         this.$emit('handleDelete', {params:params, callback:callback})
       }).catch(() => {

           })
    },
  },
   mounted() {
      console.log("true")
      this.refreshPageRequest(1)
    }
}
</script>

<style lang="scss">

</style>
