import React, { Component } from 'react';
import axios from 'axios';
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
        // let _this=this;
        axios.get('https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/table/list')
        .then(res=>{
            if(res.status===200 && res.data.code==="0"){
                console.log(1)
                this.setState({
                    dataSource2:res.data.result.list
                })
            }
            console.log(res)
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
                dataIndex:"sex"
            },{
                title:"状态",
                dataIndex:"state"
            },{
                title:"爱好",
                dataIndex:"interest"
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

                <Card title="动态数据渲染表格">
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
