<template>
  <div class="container" style="width:99%;margin-top:-25px;">
     <!--工具栏-->
     <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
       <el-form :inline="true" :model="filters" :size="size">
         <el-form-item>
            <el-input v-model="filters.name" placeholder="名称"></el-input>
         </el-form-item>
         <el-form-item>
           <kt-button label="查询" perms="sys:dept:view"
          type="primary" @click="findTreeData(null)"/>
         </el-form-item>
         <el-form-item>
           <kt-button label="新增" perms="sys:dept:add" type="primary"
           @click="handleAdd"/>
         </el-form-item>
       </el-form>
     </div>
     <!--表格树内容栏--->
     <el-table :data="tableTreeDdata" stipe size="mini" style="width:100%;" v-loading="loading" element-loading-text="拼命加载中" >
       <el-table-column prop="id" header-align="center" align="center" width="80" label="ID">
       </el-table-column>
       <table-tree-column
         prop="name" header-align="center" treeKey="id" width="150" label="名称">
       </table-tree-column>
       <el-table-column
       prop="parentName" header-align="center" align="center" width="120" label="上级机构"></el-table-column>
       <el-table-column
       prop="orderNum" header-align="center" align="center" label="排序" ></el-table-column>
       <el-table-column
       prop="createBy" header-align="center" align="center" label="创建人"></el-table-column>
       <el-table-column
       prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
       <el-table-column
        fixed="right" header-align="center" align="center" width="150" label="操作">
         <template slot-scope="scope">
            <kt-button label="修改" perms="sys:dept:edit" @click="handleEdit(scope.row)"></kt-button>
            <kt-button label="删除" perms="sys:dept:delete" type="danger" @click="handleDelete(scope.row)"></kt-button>
          </template>
       </el-table-column>
     </el-table>
     <!--新增修改页面-->
     <el-dialog :title="!dataForm.id?'新增':'修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
       <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
        label-width="80px" :size="size" style="text-align:left;">
          <el-form-item label="名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="上级机构" prop="parentName">
             <popup-tree-input
               :data="popupTreeData" :props="popupTreeProps" :prop="dataForm.parentName==null?'根节点':dataForm.parentName"
               :nodeKey="''+dataForm.parentId" :currentChangeHandle="handleTreeSelectChange">
             </popup-tree-input>
          </el-form-item>
          <el-form-item v-if="dataForm.type !==2" label="排序编号" prop="orderNum">
            <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序编号"></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="size"  @click="dialogVisible = false">取消</el-button>
          <el-button :size="size"  type="primary" @click="submitForm()">确定</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import PopupTreeInput from '@/components/PopupTreeInput'
import KtButton from '@/views/Core/KtButton'
export default {
   name:"user",
   components:{
     TableTreeColumn,
     KtButton,
     PopupTreeInput
   },
   data(){
     return {
       size:'small',
       loading:false,
       filters:{
         name:''
       },
       tableTreeDdata:[],
       popupTreeData:[],
       dialogVisible:false,
       dataForm: {
         id:0,
         name:'',
         parentId:0,
         parentName:'',
         orderNum:0
       },
       dataRule: {
         name:[
           {required:true,message:'机构名称不能为空',trigger:'blur'}
         ],
         parentName: [
           {required:true,message:'上级机构不能为空',trigger:'change'}
         ]
       },
       popupTreeProps: {
          label:'name',
          children:'children'
       }
     }
   },
   methods:{
     findTreeData: function(){
        this.loading = true
        this.$api.dept.findDeptTree().then((res) => {
          this.tableTreeDdata = res.data.content
          this.popupTreeData = this.getParentMenuTree(res.data)
          this.loading = false
        })
     },
     getParentMenuTree: function (tableTreeDdata) {
       let parent = {
         parentId:-1,
         name: '根节点',
         children:tableTreeDdata
       }
       return [parent]
     },
     handleAdd: function() {
       this.dialogVisible = true
       this.dataForm = {
         id:0,
         name:'',
         parentId:0,
         parentName:'',
         orderNum:0
       }
     },
     handleEdit: function(row) {
       this.dialogVisible = true
       Object.assign(this.dataForm,row);
     },
     handleDelete: function(row) {
       this.$confirm('确认删除选中记录吗？','提示',{
         type:'warning'
       }).then(() => {
         let params = this.getDeleteIds([],row)
         this.$api.dept.batchDelete(params).then(res => {
           this.findTreeData()
           this.$message({message:'删除成功',type:'success'})
         })
       })
     },
     getDeleteIds:function(ids,row) {
       ids.push({id:row.id})
       if(row.children != null) {
         for(let i=0,len=row.children.length;i<len;i++) {
           this.getDeleteIDs(ids,row.children[i])
         }
       }
       return ids
     },
     handleTreeSelectChange: function(data,node) {
       this.dataForm.parentId = data.id
       this.dataForm.parentName = data.name
     },
     submitForm:function(){
       this.$refs['dataForm'].validate((valid) => {
         if(valid) {
           this.$confirm('确认提交吗?','提示',{}).then(() => {
             this.loading=true
             let params = Object.assign({},this.dataForm)
             this.$api.dept.save(params).then((res) => {
               if(res.code==200) {
                 this.$message({message:'操作成功',type:'success'})
               }else {
                 this.$message({message:'操作失败'+res.msg,type:'error'})
               }
               this.loading = false
               this.$refs['dataForm'].resetFields()
               this.dialogVisible = false
               this.findTreeData()
             })
           })
         }
       })
     }
   },
   mounted(){
     this.findTreeData()
   }
}
</script>

<style scoped>

</style>
