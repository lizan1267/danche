import React, { Component } from 'react';
import { Card,Button,Form,Modal, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

const FormItem=Form.Item;
export default class Order extends Component {

    state={
        orderInfo:{},
        orderConfirmVisible:false
    }
    params={
        page:1
    }

    formList=[
        {
            type:"SELECT",
            label:"城市",
            field:"city",
            placeholder:"全部",
            initialValue:"0",
            width:80,
            list:[{id:"0",name:"全部"},{id:"1",name:"北京"},{id:"2",name:"天津"},{id:"3",name:"上海"}]
        },{
            type:"时间查询",
            field:"time_query",
            initialValue:"",
        },{
            type:"SELECT",
            label:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"0",
            width:100,
            list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"结束行程"}]
        }
    ]

    componentDidMount(){
        this.requestList();
    }
    //BaseForm
    handleFilter=(params)=>{
        this.params=params;
        this.requestList();
    }

    requestList=()=>{
        let _this=this;
        axios.requestList(this,"/order/list",this.params,true);
    }

    //单击结束订单按钮
    handleConfirm=()=>{
        //只有选择具体某一条订单，才能点开结束订单
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"信息",
                content:"请选择一条订单进行结束"
            })
            return;
        }
        axios.ajax({
            url:"/order/ebike_info",
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible:true
                })
            }
        })
    }
    //结束订单的onOk
    handleFinishOrder=()=>{
        let item=this.state.selectedItem;
        axios.ajax({
            url:"/order/finish_order",
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then(res=>{
            if(res.code==="0"){
                message.success("订单结束成功");
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible:false,
                    selectedRowKeys:[],  //自己加的--ok之后取消已经选择的单选按钮
                    selectedRows:null,  //自己加的--ok之后取消已经选择的单选按钮
                });
                this.requestList();
            }
        })
    }
    
    //单击订单详情页面
    openOrderDetail=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"信息",
                content:"请先选择一条订单"
            })
            return;
        }
        console.log("item.id"+item.id);
        window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }

    render() {

        //表头
        const columns=[
            {
                title:"订单编号",
                dataIndex:"order_sn"
            },{
                title:"车辆编号",
                dataIndex:"bike_sn"
            },{
                title:"用户名",
                dataIndex:"user_name"
            },{
                title:"手机号",
                dataIndex:"mobile"
            },{
                title:"里程",
                dataIndex:"distance",
                render(distance){
                    return distance/1000+"km";
                }
            },{
                title:"行驶时长",
                dataIndex:"total_time"
            },{
                title:"状态",
                dataIndex:"status"
            },{
                title:"开始时间",
                dataIndex:"start_time"
            },{
                title:"结束时间",
                dataIndex:"end_time"
            },{
                title:"订单金额",
                dataIndex:"total_fee"
            },{
                title:"实付金额",
                dataIndex:"user_pay"
            }
        ]

        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapper:{
                span:19
            }
        }

        

        return (
            <div>
                {/* 第一部分：查询 */}
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>

                {/* 第二部分：表格部分 */}
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                        rowSelection="checkbox"
                        // rowSelection
                    />
                </div>

                {/* 结束订单的弹框 */}
                <Modal 
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisible:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery+"%"}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}