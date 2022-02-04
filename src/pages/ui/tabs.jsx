import React, { Component } from 'react';
import { Card,Tabs,message } from 'antd';
import { PlusOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import './ui.less';

const { TabPane } = Tabs;
export default class tabs extends Component {

    //切换页签时显示的message
    callback=(key)=>{
        message.info("hi,你选择了页签："+key)
    }
    componentWillMount(){
        const panes=[
            {
                title:'Tab1',
                content:'Tab1',
                key:'1'
            },
            {
                title:'Tab2',
                content:'Tab2',
                key:'2'
            },
            {
                title:'Tab3',
                content:'Tab3',
                key:'3'
            },
        ]
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }
    //切换面板的回调
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }
    //新增和删除
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    newTabIndex = 0;
    //新增
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({
          panes: newPanes,
          activeKey,
        });
      };
    //删除
    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }
        this.setState({
          panes: newPanes,
          activeKey: newActiveKey,
        });
    };
    

    render() {
        return (
            <div>
                <Card title="Tab页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习react课程</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>学习react课程</TabPane>
                        <TabPane tab="Tab 3" key="3">react是一个非常受欢迎的MVC框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">欢迎学习react课程</TabPane>
                        <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">学习react课程</TabPane>
                        <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">react是一个非常受欢迎的MVC框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="新增/删除页签" className='card-wrap'>
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                        type="editable-card"
                    >
                       {
                           this.state.panes.map(panel=>{
                               return <TabPane tab={panel.title} key={panel.key} />
                           })
                       }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
