import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from '../echartTheme';
// import echarts from 'echarts';
//按需加载
// import echarts from 'echarts/lib/echarts';
// //导入柱形图
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

    // componentWillMount(){
    //     echarts.registerTheme("Imooc",echartTheme);
    // }

    getOption=()=>{
        let option={
            //标题
            title:{
                text:"用户骑行订单"
            },
            //展示出来哪个数据
            tooltip:{
                trigger:"axis"
            },
            //x轴
            xAxis:{
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            //y轴
            yAxis:{
                type:"value"
            },
            //数据量
            series:[
                {
                    name:"订单量",
                    type:"bar",
                    data:[1000,2000,1500,3000,2000,1200,800]
                }
            ]

        }
        return option;
    }

    getOption2=()=>{
        let option={
            //标题
            title:{
                text:"用户骑行订单"
            },
            //副标题————起到一个过滤的功能
            legend:{
                data:["OFO","摩拜","小蓝"]
            },
            //展示出来哪个数据
            tooltip:{
                trigger:"axis"
            },
            //x轴
            xAxis:{
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            //y轴
            yAxis:{
                type:"value"
            },
            //数据源
            series:[
                {
                    name:"OFO",
                    type:"bar",
                    data:[2000,3000,5500,7000,8000,12000,20000]
                },{
                    name:"摩拜",
                    type:"bar",
                    data:[1500,3000,4500,6000,8000,10000,15000]
                },{
                    name:"小蓝",
                    type:"bar",
                    data:[1000,2000,2500,4000,6000,7200,8000]
                }
            ]

        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts 
                        option={this.getOption()} 
                        // theme="Imooc" 
                        style={{height:500}} 
                    />
                </Card>

                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption2()} 
                        // theme="Imooc" 
                        style={{height:500}}
                    />
                </Card>
            </div>
        )
    }
}
