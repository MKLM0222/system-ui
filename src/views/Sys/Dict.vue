<template>
  <div class="container" style="width:99%;margin-top:-25px">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
       <el-form :inline="true" :model="filters" :size="size">
         <el-form-item>
           <el-input v-model="filters.name" placeholder="名称"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" v-on:click="findPage(null)">查询</el-button>
         </el-form-item>
         <el-form-item>
           <kt-button label="新增" perms="sys:dict:add" type="primary" @click="handleAdd"></kt-button>
         </el-form-item>
       </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete" :data="pageResult" :columns="columns"
    @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" :visible.sync="editDialogVisible" :close-on-click-modal="false">
       <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
         <el-form-item label="ID" prop="id">
           <el-input v-model="dataForm.id" :disabled="true" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="名称" prop="label">
           <el-input v-model="dataForm.label" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="值" prop="value">
           <el-input v-model="dataForm.value" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="类型" prop="type">
           <el-input v-model="dataForm.type" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="排序" prop="sort">
           <el-input v-model="dataForm.sort" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="描述" prop="description">
           <el-input v-model="dataForm.description" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remarks">
           <el-input v-model="dataForm.remarks" auto-complete="off"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
           <el-button :size="size" @click.native="editDialogVisible = false">取消</el-button>
           <el-button :size="size" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
       </div>
    </el-dialog>
  </div>
</template>

<script>
import KtTable from '../Core/KtTable'
import KtButton from '../Core/KtButton'
export default {
  name:'dict',
  components:{
      KtTable,
      KtButton
  },
  data(){
    return {
       size:'small',
       filters:{
         label:''
       },
       columns:[
         {prop:"id",label:"ID",minWidth:50},
         {prop:"label",label:'名称',minWidth:100},
         {prop:"value",label:"值",minWidth:100},
         {prop:"type",label:"类型",minWidth:80},
         {prop:"sort",label:"排序",minWidth:80},
         {prop:"description", label:"描述", minWidth:120},
         {prop:"remarks", label:"备注", minWidth:120},
         {prop:"createBy", label:"创建人", minWidth:100},
         {prop:"createTime", label:"创建时间", minWidth:190}
       ],
       pageRequest:{pageNum:1,pageSize:8},
       pageResult: {},

       operation:false,
       editDialogVisible:false,//新增编辑界面是否显示
       editLoading: false,
       dataFormRules:{
         label:[
           {required:true,message:'请输入名称',trigger:'blur'}
         ]
       },
       //新增编辑界面数据
       dataForm: {
         id:0,
         label:'',
         value:'',
         type:'',
         sort:0,
         description:'',
         remarks:''
       }
    }
  },
  methods: {
     //获取分页数据
     findPage:function(data) {
        if(data!=null){
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {label: {name:'label',value:this.filters.label}}
        this.$api.dict.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
        }).then(data.callback)
     },
     //批量删除
     handleDelete: function(data) {
        this.$api.dict.batchDelete(data.params).then(data.callback)
     },
     //显示新增界面
     handleAdd:function() {
        this.editDialogVisible = true
        this.operation = true
        this.dataForm = {
            id:0,
            label:'',
            value:'',
            type:'',
            sort:0,
            description:'',
            remarks:''
       }
     },
     //显示编辑界面
     handleEdit: function(params) {
        this.editDialogVisible = true
        this.operation = false
        this.dataForm = Object.assign({},params.row)
     },
     //编辑
     editSubmit:function() {
       this.$refs.dataForm.validate((valid) => {
          if(valid){
            this.$confirm('确认提交吗?','提示',{}).then(() => {
               this.editLoading = true
               let params = Object.assign({},this.dataForm)
               this.$api.dict.save(params).then((res) => {
                   this.editLoading = false
                   this.$message({message:'提交成功',type:'success'})
                   this.$refs['dataForm'].resetFields()
                   this.editDialogVisible = false
                   this.findPage(null)
               })
            })
          }
       })
     }
  },
  mounted() {

  }
}
</script>
