<template>
  <div class="container" style="width:99%;margin-top:-25px">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
         <el-form-item>
           <el-input v-model="filters.name" placeholder="用户名"></el-input>
         </el-form-item>
         <el-form-item>
           <el-input type="primary" v-on:click="findPage(null)">查询</el-input>
         </el-form-item>
         <el-form-item>
           <kt-button label="新增" perms="sys:dept:add" type="primary" @click="handleAdd"></kt-button>
         </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table permsEdit="sys:dept:edit" permsDelete="sys:dept:delete"
    :data="pageResult" :columns="columns" @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible"
    :close-on-click-modal="false">
       <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
         <el-form-item label="ID" prop="id">
           <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="角色名" prop="name">
            <el-input v-model="dataForm.name" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" auto-complete="off" type="textarea"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
           <el-button :size="size" @click.native="editDialogVisible=false">取消</el-button>
           <el-button :size="size" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
       </div>
    </el-dialog>
    </div>
</template>

<script>
import KtTable from '@/views/Core/KtTable'
import KtButton from '@/views/Core/KtButton'
export default {
    name:"role",
    components:{
        KtTable,
        KtButton
    },
    data(){
      return {
        filters:{
           name:""
        },
        size:"small",
        pageResult:{},
        columns:[
        {prop:"id", label:"ID", minWidth:50},
				{prop:"name", label:"角色名", minWidth:120},
				{prop:"remark", label:"备注", minWidth:120},
				{prop:"createBy", label:"创建人", minWidth:120},
				{prop:"createTime", label:"创建时间", minWidth:190}
        ],
        operation:false,
        editDialogVisible:false,//新增编辑界面是否显示
        dataForm:{
           id:0,
           name:'',
           remark:''
        },
        dataFormRules: {
           name:[
             {required:true,message:'请输入角色名',trigger:'blur'}
           ]
        },
        editLoading:false
      }
    },
    methods: {
        //获取分页数据
        findPage: function(data) {
            if(data!=null){
              this.pageRequest = data.pageRequest
            }
            this.pageRequest.columnFilters = { name:{name:'name',value:this.filters.name}}
            this.$api.role.findPage(this.pageRequest).then((res) => {
                this.pageResult = res.data
            }).then(data.callback)
        },
        //批量删除
        handleDelete:function(data) {
           this.$api.role.batchDelete(data.params).then(data.callback)
        },
        //显示新增界面
        handleAdd: function() {
            this.editDialogVisible = true
            this.operation = true
            this.dataForm = {
                 id:0,
                 name:'',
                 remark:''
            }
        },
        //显示编辑界面
        handleEdit: function(params){
           this.editDialogVisible = true
           this.operation = false
           this.dataForm = Object.assign({},params.row)
        },
        //编辑
        editSubmit: function() {
            this.$refs.dataForm.validate((valid) => {
                if(valid) {
                  this.$confirm('确认提交吗?','提示',{}).then(() => {
                       this.editLoading = true
                       let params = Object.assign({},this.dataForm)
                       this.$api.role.save(params).then((res) => {
                           this.editLoading = false
                           this.$message({message:'提交成功',type:'success'})
                           this.$refs['dataForm'].resetFileds()
                           this.editDialogVisible = false
                           this.findPage(null)
                       })
                  })
                }
            })
        },
        mounted(){

        }
    }
}
</script>
