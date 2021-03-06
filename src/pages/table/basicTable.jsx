import React, { Component } from 'react';
import axios from '../../axios';
import { Card,Table,Modal, Button,message } from 'antd';
import utils from '../../utils/utils';

export default class BasicTable extends Component {

    state={
        dataSource2:[]
    }

    params={
        page:1
    }

    componentDidMount(){
        const dataSource=[
            {
                id:"0",
                userName:"Jack",
                sex:"1",
                state:"1",
                interest:"1",
                birthday:"2000-01-01",
                address:"北京市海淀区奥林匹克公园",
                time:"09:00"
            },{
                id:"1",
                userName:"Tom",
                sex:"1",
                state:"1",
                interest:"2",
                birthday:"2010-10-01",
                address:"北京市海淀区人民公园",
                time:"08:00"
            },{
                id:"2",
                userName:"Susan",
                sex:"2",
                state:"2",
                interest:"1",
                birthday:"2009-05-20",
                address:"北京市海淀区第一小学",
                time:"07:00"
            }
        ]
        dataSource.map((item,index)=>{
            item.key=index;
        })
        this.setState({
            dataSource
        })
        this.request();
    }

    //动态获取mock数据
    request=()=>{
        let _this=this;
        axios.ajax({
            url:"/table/list",
            data:{
                params:{
                    page:this.params.page
                }
            }
        })
        .then(res=>{
            if(res.code==="0"){
                res.result.list.map((item,index)=>{
                    item.key=index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:utils.pagination(res,current=>{
                        _this.params.page=current;
                        this.request()
                    })
                })
            }
        })
    }
    //单击行
    onRowClick=(record,index)=>{
        let selectKey=[index];
        // Modal.info({
        //     title:"信息",
        //     title:`用户名:${record.userName}，用户爱好:${record.interest}`
        // })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //多选执行删除
    handleDelete=()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map(item=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些数据吗？ ${ids.join(',')}`,
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }

    render() {
        const columns=[
            {
                title:"id",
                dataIndex:"id"
            },{
                title:"用户名",
                dataIndex:"userName"
            },{
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex===1?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                render(state){
                    let config={
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"百度FE",
                        "5":"创业者"
                    }
                    return config[state];
                }
            },{
                title:"爱好",
                dataIndex:"interest",
                render(interest){  //这个参数可以随便写，不一定非得和上边一样
                    let config={
                        "1":"游泳",
                        "2":"篮球",
                        "3":"足球",
                        "4":"跑步",
                        "5":"爬山",
                        "6":"骑行",
                        "7":"桌球",
                        "8":"麦霸",
                        "9":"滑冰"
                    }
                    return config[interest];
                }
            },{
                title:"生日",
                dataIndex:"birthday"
            },{
                title:"地址",
                dataIndex:"address"
            },{
                title:"早起时间",
                dataIndex:"time"
            },
        ]
        
        const { selectedRowKeys }=this.state;
        const rowSelection={   //单选
            type:"radio",
            selectedRowKeys
        }
        const rowCheckSelection={  //多选
            type:"checkbox",
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格" style={{margin:"10px 0"}}>
                    <Table 
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                <Card title="动态数据渲染表格-Mock">
                    <Table 
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2} 
                    />
                </Card>

                <Card title="Mock-单选">
                    <Table 
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick:()=>{
                                this.onRowClick(record,index)
                              }
                            };
                          }}
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2} 
                    />
                </Card>

                <Card title="Mock-多选">
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        bordered
                        rowSelection={rowCheckSelection}
                        onRow={(record,index) => {
                            return {
                              onClick:()=>{
                                this.onRowClick(record,index)
                              }
                            };
                        }}
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2} 
                    />
                </Card>

                <Card title="Mock-分页">
                    <Table 
                        bordered
                        pagination={this.state.pagination}
                        columns={columns}
                        dataSource={this.state.dataSource2} 
                    />
                </Card>

            </div>
        )
    }
}
