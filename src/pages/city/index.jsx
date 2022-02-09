import React, { Component } from 'react';
import { Card,Button,Table,Form,Select } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';

const FormItem=Form.Item;
const { Option }=Select;

export default class City extends Component {

    state={}

    params={
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    //默认请求我们的接口数据
    requestList=()=>{
        let _this=this;
        axios.ajax({
            url:'/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            this.setState({
                list:res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                }),
                pagination:Utils.pagination(res,current=>{
                    _this.params.page=current;
                    _this.requestList();
                })
            })
        }) 
    }

    //开通城市按钮
    handleOpenCity=()=>{

    }

    render() {
        //表头
        const columns=[
            {
                title:"城市ID",
                dataIndex:"id"
            },{
                title:"城市名称",
                dataIndex:"name"
            },{
                title:"用车模式",
                dataIndex:"mode"
            },{
                title:"营运模式",
                dataIndex:"op_mode"
            },{
                title:"授权加盟商",
                dataIndex:"franchisee_name"
            },{
                title:"城市管理员",
                dataIndex:"city_admins",
                render(arr){
                    return arr.map(item=>{
                        return item.user_name;
                    }).join(',');
                }
            },{
                title:"城市开通时间",
                dataIndex:"open_time"
            },{
                title:"操作人",
                dataIndex:"sys_user_name"
            },
        ]

        return (
            <div>
                {/* 第一部分：查询区域 */}
                <Card>
                    <FilterForm />
                </Card>

                {/* 第二部分：表格部分 */}
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}


class FilterForm extends Component{
    render(){
        return (
            <Form layout='inline'>

                {/* 城市 */}
                <FormItem 
                    label="城市"
                    name="city_id"
                >
                    {/* 下拉框 */}
                    <Select style={{width:100}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">上海市</Option>
                    </Select>
                </FormItem>

                {/* 用车模式 */}
                <FormItem 
                    label="用车模式"
                    name="mode"
                >
                    <Select style={{width:150}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>

                {/* 营运模式 */}
                <FormItem 
                    label="营运模式"
                    name="op_mode"
                >
                    <Select style={{width:80}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>

                {/* 加盟商授权状态 */}
                <FormItem 
                    label="加盟商授权状态"
                    name="auth_status"
                >
                    <Select style={{width:100}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </FormItem>

                {/* 操作按钮 */}
                <FormItem>
                    <Button type="primary" style={{margin:"0 20px"}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
