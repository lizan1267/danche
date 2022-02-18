import React, { Component } from 'react';
import { Card,Button,Modal,Form,Select,Input,Tree,Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
import axios from '../../axios';
import menuConfig from '../../config/menuConfig';

const FormItem=Form.Item;
const Option=Select.Option;
const TreeNode=Tree.TreeNode;

export default class PermissionUser extends Component {

    state={
        isRoleVisible:false
    }

    componentDidMount(){
        axios.requestList(this,"/role/list");
    }

    //点击创建角色按钮
    handleRole=()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    //创建角色的onOk按钮————角色提交
    handleRoleSubmit=()=>{
        let data=this.roleForm.roleForm.getFieldsValue();
        axios.ajax({
            url:"/role/create",
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({
                    isRoleVisible:false
                })
                this.roleForm.roleForm.resetFields();  //清空内容
                axios.requestList(this,"/role/list");
            }
        })
    }

    //设置权限
    handlePermission=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                content:"请选择一个角色"
            })
            return;
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }

    //设置权限的提交按钮
    handlePermEditSubmit=()=>{
        let data=this.permForm.permForm.getFieldsValue();
        data.role_id=this.state.selectedItem.id;
        data.menus=this.state.menuInfo;
        axios.ajax({
            url:"/permission/edit",
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isPermVisible:false
                })
                axios.requestList(this,"/role/list");
            }
        })
    }

    //点击用户授权按钮
    handleUserAuth=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                content:"请选择一个角色"
            })
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id);
    }

    //用户授权里用来获取用户列表
    getRoleUserList=(id)=>{
        axios.ajax({
            url:"/role/user_list",
            data:{
                params:{
                    id
                }
            }
        }).then(res=>{
            if(res){
                this.getAuthUserList(res.result);
            }
        })
    }

    //筛选目标用户
    getAuthUserList=(dataSource)=>{
        const mockData=[]; //左边：数据源
        const targetKeys=[]; //右边：目标用户
        if(dataSource && dataSource.length>0){
            for(let i=0;i<dataSource.length;i++){
                const data={
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                }
                if(data.status===1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }

    //用户授权提交
    handleUserSubmit=()=>{
        let data={};
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;
        axios.ajax({
            url:"/role/user_role_edit",
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                axios.requestList(this,"/role/list")
            }
        })
    }

    render() {
        //表头
        const columns=[
            {
                title:"角色ID",
                dataIndex:"id"
            },{
                title:"角色名称",
                dataIndex:"role_name"
            },{
                title:"创建时间",
                dataIndex:"create_time",
                render:Utils.formateDate
            },{
                title:"使用状态",
                dataIndex:"status",
                render(status){
                    return status===1?"启用":"停用";
                }
            },{
                title:"授权时间",
                dataIndex:"authorize_time",
                render:Utils.formateDate
            },{
                title:"授权人",
                dataIndex:"authorize_user_time"
            }
        ]
        
        return (
            <div>
                {/* 功能区部分 */}
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{marginLeft:10,marginRight:10}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>

                {/* 表格部分 */}
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}  //能点行
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>

                {/* 创建角色 */}
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.roleForm.resetFields();  //清空内容
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm ref={c=>this.roleForm=c} />
                </Modal>

                {/* 设置权限 */}
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                >
                    <PermEditForm 
                        ref={c=>this.permForm=c}
                        detailInfo={this.state.detailInfo} 
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }} 
                    />
                </Modal>

                {/* 用户授权 */}
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <RoleAuthForm 
                        ref={c=>this.userAuthForm=c}
                        detailInfo={this.state.detailInfo} 
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}


//创建角色弹框中的表格
class RoleForm extends Component {

    render() {

        //布局    <=24
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }

        return (
            <Form 
                layout="horizontal" 
                ref={c=>this.roleForm=c} 
            >
                <FormItem label="角色名称" {...formItemLayout} name="role_name">
                    <Input type="text" placeholder="请输入角色名称" />
                </FormItem>

                <FormItem label="状态" {...formItemLayout} name="status" >
                    <Select style={{width:150}}>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </FormItem>

            </Form>
        )
    }
}

//设置权限弹框中的表格
class PermEditForm extends Component{

    //遍历
    renderTreeNodes=(data)=>{
        return data.map(item=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return <TreeNode {...item} />
            }
        })
    }

    onCheck=(checkedKeys)=>{
        console.log("checkedKeys"+checkedKeys)
        this.props.patchMenuInfo(checkedKeys);
    }


    render(){

        //布局    <=24
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }

        const detail_info=this.props.detailInfo;
        const menuInfo=this.props.menuInfo;

        return (
            <Form layout="horizontal" initialValues={{status:1}} ref={c=>this.permForm=c}>
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="status" >
                    <Select style={{width:150}}>
                        <Option value={1}>启用</Option>
                        <Option value={0}>停用</Option>
                    </Select>
                </FormItem>
                
                {/* 设置权限的树形控件 */}
                <Tree
                    checkable  //是否有勾选框
                    defaultExpandAll  //默认展开
                    onCheck={(checkedKeys)=>{  //点击复选框触发
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all"> 
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

//用户授权弹框中的表格
class RoleAuthForm extends Component{


    onCheck=(checkedKeys)=>{
        console.log("checkedKeys"+checkedKeys)
        this.props.patchMenuInfo(checkedKeys);
    }

    filterOption = (inputValue, option) => 
        option.title.indexOf(inputValue) > -1;

    
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys);
    }

    render(){

        //布局    <=24
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }

        const detail_info=this.props.detailInfo;

        return (
            <Form layout="horizontal" initialValues={{status:1}} ref={c=>this.permForm=c}>
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>

                <FormItem label="选择用户" {...formItemLayout}>
                    {/* 左边是数据源，右边是目标用户 */}
                    <Transfer
                        listStyle={{width:200,height:400}}
                        dataSource={this.props.mockData}
                        titles={["待选用户","已选用户"]}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item=>item.title}
                    />     
                </FormItem>

            </Form>
        )
    }
}
