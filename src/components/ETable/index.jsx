import React, { Component } from 'react';
import { Table } from 'antd';

export default class ETable extends Component {

    onRowClick=(record,index)=>{
        let rowSelection=this.props.rowSelection;
        if(rowSelection==="checkbox"){
            //多选
            let selectedRowKeys=this.props.selectedRowKeys;
            let selectedItem=this.props.selectedItem;
            let selectedIds=this.props.selectedIds;
            if(selectedIds){
                const i=selectedIds.indexOf(record.id);
                // console.log("i",i)
                if(i===-1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                    // console.log(selectedIds,selectedRowKeys,selectedItem)
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            }else{
                selectedIds=[record.id];
                selectedRowKeys=[index];
                selectedItem=[record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds);
        }else{
            //单选
            let selectedRowKeys=[index];
            let selectedItem=record;
            this.props.updateSelectedItem(selectedRowKeys,selectedItem);
        }
    }

    tableInit=()=>{
        //类型：单选框、复选框、或没有
        let row_selection=this.props.rowSelection;
        let selectedRowKeys=this.props.selectedRowKeys;
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        if(row_selection===false || row_selection===null){
            row_selection=false;
        }else if(row_selection==="checkbox"){
            rowSelection.type="checkbox";
        }else{
            rowSelection.type="radio";
        }

        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null}
            onRow={(record,index) => {
                return {
                  onClick:()=>{
                      if(!row_selection){
                          return;
                      }
                    this.onRowClick(record,index)
                  }
                };
            }}
        />
    }
    
    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}
