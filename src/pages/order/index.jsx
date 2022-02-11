import React, { Component } from 'react';
import { Card,Button,Table,Form,Select,Modal, message, DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';

const FormItem=Form.Item;
const { Option }=Select;
export default class Order extends Component {

    state={
        orderInfo:{},
        orderConfirmVisible:false
    }
    params={
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    requestList=()=>{
        let _this=this;
        axios.ajax({
            url:"/order/list",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            let list=res.result.item_list.map((item,index)=>{
                item.key=index;
                return item;
            });
            this.setState({
                list,
                pagination:Utils.pagination(res,current=>{
                    _this.params.page=current;
                    _this.requestList();
                })
            })
        })
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
    //单击行
    onRowClick=(record,index)=>{
        let selectKey=[index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
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

        const { selectedRowKeys }=this.state;
        const rowSelection={   //单选
            type:"radio",
            selectedRowKeys
        }

        return (
            <div>
                {/* 第一部分：查询 */}
                <Card>
                    <FilterForm />
                </Card>

                {/* 第二部分：表格部分 */}
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick:()=>{
                                this.onRowClick(record,index)
                              }
                            };
                        }}
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

// 查询部分的表单
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

                {/* 订单时间 */}
                <FormItem
                    name="start_time"
                >
                    <DatePicker placeholder="选择开始时间"
                        showTime format="YYYY-MM-DD HH:mm:ss"
                    />
                </FormItem>
                <FormItem
                    label="~"
                    colon={false}
                    name="end_time"
                >
                    <DatePicker placeholder="选择结束时间"
                        showTime format="YYYY-MM-DD HH:mm:ss"
                    />
                </FormItem>

                {/* 订单状态 */}
                <FormItem 
                    label="订单状态"
                    name="auth_status"
                >
                    <Select style={{width:100}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">进行中</Option>
                        <Option value="2">结束行程</Option>
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
