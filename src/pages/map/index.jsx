import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';

export default class BikeMap extends Component {

    state={}

    map="";

    formList=[
        {
            type:"城市"
        },{
            type:"时间查询",
            field:"time_query"
        },{
            type:"SELECT",
            label:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"0",
            list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"行程结束"}]
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    requestList=()=>{
        axios.ajax({
            url:"/map/bike_list",
            data:{
                params:this.params
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //查询表单
    handleFilterSubmit=(filterParams)=>{
        this.params=filterParams;
        this.requestList();
    }
    //渲染地图数据
    renderMap=(res)=>{
        let list=res.result.route_list;
        this.map=new window.BMapGL.Map("container");
        //获得起点和终点
        let gps1=list[0].split(",");
        let startPoint=new window.BMapGL.Point(gps1[0],gps1[1]);
        let gps2=list[list.length-1].split(",");
        let endPoint=new window.BMapGL.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        let startPointIcon=new window.BMapGL.Icon("/assets/start_point.png",new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        let bikeMarkerStart=new window.BMapGL.Marker(startPoint,{icon:startPointIcon});
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon=new window.BMapGL.Icon("/assets/end_point.png",new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        let bikeMarkerEnd=new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆形式路线
        let routeList=[];
        list.forEach((item)=>{
            let p=item.split(",");
            routeList.push(new window.BMapGL.Point(p[0],p[1]))
        })

        let polyLine=new window.BMapGL.Polyline(routeList,{
            strokeColor:"#ef4136",
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList=[];
        let serviceList=res.result.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMapGL.Point(item.lon,item.lat))
        })
        let polyServiceLine=new window.BMapGL.Polyline(servicePointList,{
            strokeColor:"#ef4136",
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyServiceLine);

        //添加地图中的自行车标
        let bikeList=res.result.bike_list;
        let bikeIcon=new window.BMapGL.Icon("/assets/bike.jpg",new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        bikeList.forEach(item=>{
            let p=item.split(",");
            let point=new window.BMapGL.Point(p[0],p[1]);
            let bikeMarker=new window.BMapGL.Marker(point,{icon:bikeIcon});
            this.map.addOverlay(bikeMarker);
        })

    }


    render() {
        return (
            <div>
                {/* 第一部分：查询部分 */}
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>

                {/* 第二部分：地图 */}
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}
