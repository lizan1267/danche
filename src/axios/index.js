import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils/utils';
export default class Axios{ 
    //请求列表
    static requestList(_this,url,params,isMock){
        var data={
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then(data=>{
            if(data && data.result){
                // console.log("data",data)
                let list=data.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,current=>{
                        _this.params.page=current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static jsonp(options){
        new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function (err,response){
                if(response.status==="success"){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading=document.getElementById("ajaxLoading");
            loading.style.display="block";
        }
        let baseApi="";
        //判断是否使用mock数据
        if(options.isMock){
            baseApi="https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi";
        }else{
            baseApi="https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi";
        } 
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            })
            .then(response=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading=document.getElementById("ajaxLoading");
                    loading.style.display="none";
                }
                if(response.status===200){
                    let res=response.data;
                    // console.log(res)
                    if(res.code==="0"){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}
