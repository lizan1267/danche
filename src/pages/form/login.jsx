import React, { Component } from 'react';
import { Card,Form,Input,Button,message,Checkbox } from "antd";
import { UserOutlined,LockOutlined } from '@ant-design/icons';

const FormItem=Form.Item;
export default class FormLogin extends Component {
    //单击登录时的验证事件
    handleSubmit=()=>{
        let userInfo=this.refs.myForm.getFieldsValue();
        console.log(userInfo);
        this.refs.myForm.validateFields()
        .then(values=>{
            message.success(`${userInfo.userName}，恭喜你，当前密码为${userInfo.userPwd}`);
        })
        .catch(err=>{

        })
    }
    render() {
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码' />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                    <Form
                        ref="myForm" 
                        style={{width:300}} 
                        // initialValues={{remember:true}} 
                    >
                        <FormItem
                            name="userName" 
                            rules={[
                                {
                                    required:true,
                                    message:'用户名不能为空'
                                },{
                                    min:5,
                                    max:10,
                                    message:'长度不在范围内'
                                },{
                                    pattern:new RegExp('^[a-z0-9]+$','i'),
                                    message:'用户名必须为字母或者数字'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />}  placeholder='请输入用户名' />
                        </FormItem>

                        <FormItem name="userPwd">
                            <Input prefix={<LockOutlined />} placeholder='请输入密码' />
                        </FormItem>

                        <FormItem name="remember" valuePropName="checked" initialValue="true">
                            <Checkbox>记住密码</Checkbox>
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
