import React, { Component } from 'react';
import { Card,Button,Modal } from 'antd';
import { Editor } from "react-draft-wysiwyg";
import draftjs from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichText extends Component {

    state={
        showRichText:false,
        editorState:""
    }

    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState
        })
    }

    onEditChange=(contentState)=>{
        this.setState({
            contentState
        })
    }

    //清空内容
    handleClearContent=()=>{
        this.setState({
            editorState:""
        })
    }

    //获取HTML文本
    handleGetText=()=>{
        this.setState({
            showRichText:true
        })
    }

    render() {
        const {editorState}=this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent} style={{marginRight:10}}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        // toolbarClassName="toolbarClassName"
                        // wrapperClassName="wrapperClassName"
                        // editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onEditChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
