import React, { Component } from 'react';
import moment from 'moment';
import { Card,Form,Input,InputNumber,Button,Radio,
    Select,Switch,DatePicker,TimePicker,Upload,message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const { Option } = Select;  //const Option=Select.Option
const TextArea=Input.TextArea;   //const { TextArea } = Input;
export default class register extends Component {
    state={}

    handleSubmit=()=>{
        let allInfo=this.refs.myForm.getFieldsValue();
        console.log(allInfo);
        this.refs.myForm.validateFields()
        .then(values=>{
            message.success(`${allInfo.userName}，恭喜你，当前密码为${allInfo.userPwd}`);
        })
    }

    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    //upload
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          console.log(3)
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    render() {
        const formItemLayout={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject={minRows:2,maxRows:6}
        const { imageUrl, loading } = this.state;
        return (
            <div>
                <Card title="注册表单">
                    <Form 
                        ref="myForm"
                        layout='horizontal'
                        initialValues={{
                            "sex":"1",
                            "age":"18",
                            "state":"5",
                            "interest":["1","2"],
                            "isMarried":true,
                            "birthday":moment('2018-10-01'),
                            "address":"河北省秦皇岛市海港区",
                        }}
                        >
                        {/* 用户名 */}
                        <FormItem
                            {...formItemLayout}
                            label='用户名'
                            name="userName" 
                            rules={[
                                {
                                    required:true,
                                    message:'用户名不能为空'
                                }
                            ]}
                        >
                            <Input placeholder='请输入用户名' />
                        </FormItem>

                        {/* 密码 */}
                        <FormItem
                            {...formItemLayout}
                            label='密码'
                            name="userPwd" 
                        >
                            <Input type="password" placeholder='请输入密码' />
                        </FormItem>

                        {/* 性别 */}
                        <FormItem
                            {...formItemLayout}
                            label='性别'
                            name="sex" 
                        >
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        
                        {/* 年龄 */}
                        <FormItem
                            {...formItemLayout}
                            label='年龄'
                            name="age" 
                        >
                            <InputNumber />
                        </FormItem>

                        {/* 下拉列表-单选 */}
                        <FormItem
                            {...formItemLayout}
                            label='当前状态'
                            name="state" 
                        >
                            <Select>
                                <Option value="1">啊啊5</Option>
                                <Option value="2">加油6</Option>
                                <Option value="3">继续努力p7</Option>
                                <Option value="4">小8</Option>
                                <Option value="5">阿里p9</Option>
                            </Select>
                        </FormItem>

                        {/* 下拉列表-多选 */}
                        <FormItem
                            {...formItemLayout}
                            label='爱好'
                            name="interest" 
                        >
                            <Select mode="multiple">
                                <Option value="1">篮球</Option>
                                <Option value="2">滑冰</Option>
                                <Option value="3">羽毛球</Option>
                                <Option value="4">瑜伽</Option>
                                <Option value="5">乒乓球</Option>
                                <Option value="6">桌球</Option>
                                <Option value="7">爬山</Option>
                                <Option value="8">滑雪</Option>
                                <Option value="9">冲浪</Option>
                            </Select>
                        </FormItem>

                        {/* 开关 */}
                        <FormItem
                            {...formItemLayout}
                            label='是否已婚'
                            name="isMarried"
                            valuePropName="checked"
                        >
                            <Switch />
                        </FormItem>

                        {/* 日期框架 */}
                        <FormItem
                            {...formItemLayout}
                            label='生日'
                            name="birthday"
                        >
                            <DatePicker />
                        </FormItem>

                        {/* 日期框架 */}
                        <FormItem
                            {...formItemLayout}
                            label='联系地址'
                            name="address"
                        >
                            <TextArea
                                autoSize={rowObject}
                            />
                        </FormItem>

                        {/* 时间框架 */}
                        <FormItem
                            {...formItemLayout}
                            label='早起时间'
                            name="time"
                        >
                            <TimePicker />
                        </FormItem>

                        {/* 上传 */}
                        <FormItem
                            {...formItemLayout}
                            label='头像'
                            name="userImg"
                        >
                            <Upload
                                listType="picture-card"
                                // showUploadList={false}
                                name="avatar"
                                className="avatar-uploader"
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={this.handleChange}
                            >
                                {/* {this.state.userImg?<img src={this.state.userImg} />:<PlusOutlined />} */}
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
                            </Upload>
                        </FormItem>

                        {/* 多选框 */}
                        <FormItem
                            {...offsetLayout}
                            name="reading"
                        >
                            <Checkbox>我已阅读过<a href="#">单车协议</a></Checkbox>
                        </FormItem>

                        {/* 按钮 */}
                        <FormItem
                            {...offsetLayout}
                            name="reg"
                        >
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
