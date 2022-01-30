import React, { Component } from 'react';
import { Card,Button,Modal } from 'antd';
import './ui.less';

export default class Modals extends Component {
    state={
        showModal1:false,  //open的弹窗默认不显示
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }
    // 控制基础模态框
    handleOpen=(type)=>{
        this.setState({
            [type]:true
        })
    }
    // 控制信息确认框
    handleConfirm=(type)=>{
        Modal[type]({
            title:"确认？",
            content:"你确定你学会React了吗？",
            onOk(){
                console.log("ok")
            },
            onCancel(){
                console.log("cancel")
            }
        })
    }
    render() {
        return (
            <div>
                {/* 按钮 */}
                <Card title="基础模态框" className='card-wrap'>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className='card-wrap'>
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                {/* 基础模态框-open */}
                <Modal title="React" visible={this.state.showModal1} 
                 onCancel={()=>this.setState({showModal1:false})}>
                    <p>欢迎到React高级课程</p>
                </Modal>

                {/* 基础模态框-自定义页脚 */}
                <Modal title="React" visible={this.state.showModal2}
                 onText="好的" cancelText="算了" 
                 onCancel={()=>this.setState({showModal2:false})}>
                    <p>欢迎到React高级课程</p>
                </Modal>

                {/* 基础模态框-顶部20px弹框 */}
                <Modal title="React" visible={this.state.showModal3}
                 style={{top:20}}
                 onCancel={()=>this.setState({showModal3:false})}>
                    <p>欢迎到React高级课程</p>
                </Modal>

                {/* 基础模态框-水平垂直居中 */}
                <Modal title="React" visible={this.state.showModal4}
                 wrapClassName='vertical-center-modal'
                 onCancel={()=>this.setState({showModal4:false})}>
                    <p>欢迎到React高级课程</p>
                </Modal>
            </div>
        )
    }
}
