import React, { Component } from 'react';
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;
export default class NavLeft extends Component {
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        this.setState({menuTreeNode});
    }
    //菜单渲染————递归遍历
    renderMenu=(data)=>{
        return data.map(item=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} >{item.title}</Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo.svg" alt="" />
                    <h1>DC MS</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
