import React, { Component } from 'react';
import { Card,Carousel } from 'antd';
import './ui.less';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const contentStyle1 = {
    width:'100%',
    height: '240px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default class carousel extends Component {
    
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div><h3 style={contentStyle}>Ant Motion Banner - React</h3></div>
                        <div><h3 style={contentStyle}>Ant Motion Banner - Vue</h3></div>
                        <div><h3 style={contentStyle}>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div> <img src="/carousel-img/carousel-1.jpg" style={contentStyle1} alt="" /> </div>
                        <div> <img src="/carousel-img/carousel-2.jpg" style={contentStyle1} alt="" /> </div>
                        <div> <img src="/carousel-img/carousel-3.jpg" style={contentStyle1} alt="" /> </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
