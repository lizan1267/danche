import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { switchMenu } from '../../redux/action';
import { connect } from 'react-redux';
import MenuConfig from '../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;
class NavLeft extends Component {

    state={
        currentKey:""
    }

    //菜单的单击事件
    handleClick=({item})=>{
       console.log(item);
        const { dispatch } =this.props;
        dispatch(switchMenu(item.props.title));
        
        // console.log("item");
        // console.log(item.props);

        this.setState({
            currentKey:item.key
        })
        
    }

    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        let currentKey=window.location.hash.replace(/#|\?.*$/g,"");
        this.setState({
            currentKey,
            menuTreeNode
        });
    }
    //菜单渲染————递归遍历
    renderMenu=(data)=>{
        return data.map(item=>{
            if(item.children){
                // console.log("item");
                // console.log(item);
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                        <NavLink to={item.key}>{item.title}</NavLink> 
                    </Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo.svg" alt="" />
                    <h1>DC MS</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey} 
                    theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft);
