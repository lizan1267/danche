import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from '../echartTheme';
// import echarts from 'echarts';
//按需加载
// import echarts from 'echarts/lib/echarts';
// //导入饼图
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

    // componentWillMount(){
    //     echarts.registerTheme("Imooc",echartTheme);
    // }


    getOption=()=>{
        let option={
            title:{
                text:"用户骑行订单",
                x:"center"
            },
            legend:{
                orient:"vertical",
                right:10,
                top:20,
                bottom:20,
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            tooltip:{
                trigger:"item",
                formatter:"{a}<br/>{b}:{c}({d}%)"
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },{
                            value:1000,
                            name:"周二"
                        },{
                            value:2000,
                            name:"周三"
                        },{
                            value:1500,
                            name:"周四"
                        },{
                            value:3000,
                            name:"周五"
                        },{
                            value:2000,
                            name:"周六"
                        },{
                            value:1200,
                            name:"周日"
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption2=()=>{
        let option={
            title:{
                text:"用户骑行订单",
                x:"center"
            },
            legend:{
                orient:"vertical",
                right:10,
                top:20,
                bottom:20,
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            tooltip:{
                trigger:"item",
                formatter:"{a}<br/>{b}:{c}({d}%)"
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    radius:["50%","80%"],
                    center:["50%","60%"],  //图在画面中的位置
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },{
                            value:1000,
                            name:"周二"
                        },{
                            value:2000,
                            name:"周三"
                        },{
                            value:1500,
                            name:"周四"
                        },{
                            value:3000,
                            name:"周五"
                        },{
                            value:2000,
                            name:"周六"
                        },{
                            value:1200,
                            name:"周日"
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption3=()=>{
        let option={
            title:{
                text:"用户骑行订单",
                x:"center"
            },
            legend:{
                orient:"vertical",
                right:10,
                top:20,
                bottom:20,
                data:["周一","周二","周三","周四","周五","周六","周日"]
            },
            tooltip:{
                trigger:"item",
                formatter:"{a}<br/>{b}:{c}({d}%)"
            },
            series:[
                {
                    name:"订单量",
                    type:"pie",
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },{
                            value:1000,
                            name:"周二"
                        },{
                            value:2000,
                            name:"周三"
                        },{
                            value:1500,
                            name:"周四"
                        },{
                            value:3000,
                            name:"周五"
                        },{
                            value:2000,
                            name:"周六"
                        },{
                            value:1200,
                            name:"周日"
                        }
                    ].sort((a,b)=>{
                        return a.value-b.value;
                    }),
                    roseType:"radius",   //通过半径大小来区分，数据越大半径越长
                    //动画效果
                    animationType: 'scale', 
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    

    render() {
        return (
            <div>
                <Card title="饼图之一">
                    <ReactEcharts 
                        option={this.getOption()} 
                        // theme="Imooc" 
                        style={{height:500}} 
                    />
                </Card>

                <Card title="饼图之二环形图" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption2()} 
                        // theme="Imooc" 
                        style={{height:500}} 
                    />
                </Card>

                <Card title="饼图之三南丁格尔图" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption3()} 
                        // theme="Imooc" 
                        style={{height:500}} 
                    />
                </Card>
            </div>
        )
    }
}
