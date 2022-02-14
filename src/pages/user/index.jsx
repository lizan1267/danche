import React, { Component } from 'react';
import { Form,Input,Card,Button,Modal,Radio,Select,DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import '../../style/common.less';
import { PlusOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const TextArea=Input.TextArea;
const Option=Select.Option;
export default class User extends Component {

    params={
        page:1
    }

    state={
        isVisible:false
    }

    formList=[
        {
            type:"INPUT",
            label:"用户名",
            field:"user_name",
            placeholder:"请输入用户名称",
            width:150,
        },{
            type:"INPUT",
            label:"手机号",
            field:"user_mobile",
            placeholder:"请输入手机号",
            width:150,
        },{
            type:"DATE",
            label:"请选择入职日期",
            field:"user_date",
            placeholder:"请输入日期",
            width:80,
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter=(params)=>{
        this.params=params;
        this.requestList();
    }

    requestList=()=>{
        axios.requestList(this,"/user/list",this.params,true);
    }

    //四个按钮功能区操作
    handleOperate=(type)=>{
        let item=this.state.selectedItem;
        if(type==="create"){
            this.setState({
                type,
                isVisible:true,
                title:"创建员工"
            })
        }else if(type==="edit"){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:"编辑员工",
                userInfo:item
            })
        }else if(type==="detail"){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:"员工详情",
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            let _this=this;
            Modal.confirm({
                title:"确认删除",
                content:"是否要删除当前选中的员工",
                onOk(){
                    axios.ajax({
                        url:"/user/delete",
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code==="0"){
                            _this.setState({
                                isVisible:false
                            })
                        }
                        _this.requestList();
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit=()=>{
        let type=this.state.type;
        let data=this.userForm.userForm.getFieldsValue();
        // console.log(data);
        axios.ajax({
            url:type==="create"?"/user/add":"/user/edit",
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code==="0"){
                this.userForm.userForm.resetFields();
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }
    render() {

        //表头
        const columns=[
            {
                title:"id",
                dataIndex:"id"
            },{
                title:"用户名",
                dataIndex:"username"
            },{
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex===1?"男":"女";
                }
            },{
                title:"状态",
                dataIndex:"state",
                render(state){
                    return {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"百度FE",
                        "5":"创业者"
                    }[state]
                }
            },{
                title:"爱好",
                dataIndex:"interest",
                render(interest){  //这个参数可以随便写，不一定非得和上边一样
                    return {
                        "1":"篮球",
                        "2":"游泳",
                        "3":"爬山",
                        "4":"跑步",
                        "5":"足球",
                        "6":"骑行",
                        "7":"桌球",
                        "8":"麦霸",
                        "9":"滑冰"
                    }[interest]
                }
            },{
                title:"生日",
                dataIndex:"birthday"
            },{
                title:"联系地址",
                dataIndex:"address"
            },{
                title:"早起时间",
                dataIndex:"time"
            }
        ]

        let footer={};
        if(this.state.type==="detail"){
            footer={footer:null}
        }


        return (
            <div>
                {/* 第一部分：查询 */}
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>

                {/* 第二部分：表格 */}
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.handleOperate("create")}>创建员工</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={()=>this.handleOperate("edit")}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate("detail")}>员工详情</Button>
                    <Button type="primary" icon={<DeleteOutlined />}  onClick={()=>this.handleOperate("delete")}>删除员工</Button>
                    {/* <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button> */}
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                        rowSelection
                    />
                </div>

                {/* 创建员工的弹框 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.userForm.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} ref={c=>this.userForm=c} />
                </Modal>
            </div>
        )
    }
}

//创建员工
class UserForm extends Component {

    getState=(state)=>{
        return {
            "1":"咸鱼一条",
            "2":"风华浪子",
            "3":"北大才子",
            "4":"百度FE",
            "5":"创业者"
        }[state]
    }


    render() {
        let type=this.props.type;
        let userInfo=this.props.userInfo || {};

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
                ref={c=>this.userForm=c} 
                initialValues={{   //点击编辑的时候，选中的员工信息会列出来
                    user_name:userInfo.username,
                    sex:userInfo.sex,
                    state:userInfo.state,
                    birthday:moment(userInfo.birthday),
                    address:userInfo.address
                }}
            >
                <FormItem label="用户名" {...formItemLayout} name="user_name">
                    {type==="detail"?userInfo.username:
                        <Input type="text" placeholder="请输入用户名" />
                    }
                </FormItem>

                <FormItem label="性别" {...formItemLayout} name="sex">
                    {type==="detail"?
                        userInfo.sex===1?"男":"女":
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    }
                </FormItem>

                <FormItem label="状态" {...formItemLayout} name="state" >
                    {type==="detail"?this.getState(userInfo.state):
                        <Select style={{width:150}}>
                            <Option value={1}>咸鱼一条</Option>
                            <Option value={2}>风华浪子</Option>
                            <Option value={3}>北大才子</Option>
                            <Option value={4}>百度FE</Option>
                            <Option value={5}>创业者</Option>
                        </Select>
                    }
                </FormItem>

                <FormItem label="生日" {...formItemLayout} name="birthday">
                    {type==="detail"?userInfo.birthday:
                        <DatePicker />
                    }
                </FormItem>

                <FormItem label="联系地址" {...formItemLayout} name="address">
                    {type==="detail"?userInfo.address:
                        <TextArea rows={3} placeholder="请输入联系地址" />
                    }
                    
                </FormItem>
            </Form>
        )
    }
}

