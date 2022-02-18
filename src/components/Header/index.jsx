import { Col, Row } from 'antd';
import React, { Component } from 'react';
import './index.less';
import Util from '../../utils/utils';
import { connect } from 'react-redux';
import axios from 'axios'; //引入第三方包的

class Header extends Component {
    state={}
    componentWillMount(){
        //用户信息
        this.setState({
            userName:'段嘉许'
        });
        //时间
        setInterval(()=>{
            let sysTime=Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            });
        },1000)
        //调用天气
        this.getWeatherAPIDate();
    }

    //获取天气
    getWeatherAPIDate(){
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101090201&key=ab5bcf08250f47ab8a4fd1745cd58f66")
        .then((res)=>{
            // console.log(res)
            let data=res.data;
            data=data.now.text;
            if(res.data.code==="200"){
                this.setState({weather:data})
            }
        })
    }

    render() {
        const menuType=this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?
                        <Col span="6" className='logo'>
                            <img src="/assets/logo-ant.svg" alt="" />
                            <span>IMooc 通用管理系统</span>
                        </Col>:""
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                {
                    menuType?"":
                    <Row className='breadcrumb'>
                        <Col span="4" className='breadcrumb-title'>
                            {this.props.menuName}
                        </Col>
                        <Col span="20" className='weather'>
                            <span className='date'>{this.state.sysTime}</span>
                            <span className='weather-detail'>{this.state.weather}</span>
                        </Col>
                    </Row>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuName: state.menuName
    }
}

export default connect(mapStateToProps)(Header);
