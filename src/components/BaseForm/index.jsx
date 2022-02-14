import React, { Component } from 'react';
import { Input,Select,Form,Button,Checkbox,DatePicker } from 'antd';
import utils from '../../utils/utils';

const FormItem=Form.Item;
export default class FilterForm extends Component {

    //单击查询按钮
    handleFilterSubmit=()=>{
        let fieldsValue=this.refs.myForm.getFieldsValue();
        console.log(fieldsValue);
        this.props.filterSubmit(fieldsValue);
    }

    //重置
    reset=()=>{
        this.refs.myForm.resetFields();
    }
    //表单控件
    initFormList=()=>{
        // console.log(this.props.formList);
        const formList=this.props.formList;
        const formItemList=[];
        if(formList && formList.length>0){
            formList.forEach((item)=>{
                let label=item.label;
                let field=item.field;
                let initialValue=item.initialValue || '';
                let placeholder=item.placeholder;
                let width=item.width;

                if(item.type==="时间查询"){
                    //两个时间控件 ..~..
                    const begin_time=
                    <FormItem label="订单时间" name="begin_time" key={field}>
                        <DatePicker placeholder={placeholder}
                            showTime={true} format="YYYY-MM-DD"
                        />
                    </FormItem>
                    formItemList.push(begin_time);

                    const end_time=
                    <FormItem label="~" colon={false} name="end_time" key={field+"2"} >
                        <DatePicker placeholder={placeholder}
                            showTime={true} format="YYYY-MM-DD"
                        />
                    </FormItem>
                    formItemList.push(end_time);
                }else if(item.type==="DATE"){
                    //单独一个时间控件
                    const Date=
                    <FormItem label={label} name={field} key={field}>
                        <DatePicker placeholder={placeholder}
                            showTime={true} format="YYYY-MM-DD"
                        />
                    </FormItem>
                    formItemList.push(Date);
                }

                if(item.type==="INPUT"){
                    const INPUT=
                    <FormItem label={label} key={field} name={[field]} initialValue={initialValue}>
                        <Input type="text" placeholder={placeholder} style={{width:width}} />
                    </FormItem>
                    formItemList.push(INPUT);
                }
                else if(item.type==="SELECT"){
                    const SELECT=
                    <FormItem label={label} key={field} name={[field]} initialValue={initialValue}>
                        <Select style={{width:width}} placeholder={placeholder}>
                            {utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>
                    formItemList.push(SELECT);
                }
                else if(item.type==="CHECKBOX"){
                    const CHECKBOX=
                    <FormItem label={label} key={field} name={[field]} 
                        initialValue={initialValue} valuePropName="checked"//必须是true或false
                    >
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <div>
                <Form layout='inline' ref="myForm" >
                    {this.initFormList()}
                    <FormItem>
                        <Button type="primary" style={{margin:"0 20px"}} onClick={this.handleFilterSubmit}>查询</Button>
                        <Button onClick={this.reset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
