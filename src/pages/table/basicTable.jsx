import React, { Component } from 'react';
import axios from '../../axios';
import { Card,Table } from 'antd';

export default class BasicTable extends Component {

    state={
        dataSource2:[]
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
        this.setState({
            dataSource
        })
        this.request();
    }

    request=()=>{
        axios.ajax({
            url:"/table/list",
            data:{
                params:{
                    page:1
                }
            }
        })
        .then(res=>{
            if(res.code==="0"){
                this.setState({
                    dataSource2:res.result.list
                })
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

            </div>
        )
    }
}
