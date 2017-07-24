import {observable,action} from 'mobx';

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

class Router {
  @observable routerList = []
  @observable selectRouterName = ''
  // 路由跳转
  @action
  navigate = (routeName) =>{
    if (typeof routeName == 'object') {
      let tempList = [].concat(routeName)
      var thz = this
      for (var i = 0; i < routeName.length; i++) {
        console.log('i',i);
        (function(a) {
              console.log('输出',a);
              setTimeout(function() {
                  console.log('输出时间',Date.now()-time);
                  if (routeName[a] != thz.selectRouterName) {
                    thz.routerList.push(routeName[a])
                    thz.selectRouterName = routeName[a]
                  }
               },a*1000)
           })(i)
      }

    }else {
        this.routerList.push(routeName)
        this.selectRouterName = routeName
    }
  }

  @action
  goBackFromIndex = (index:Number) =>{
      if (index >0 && index < this.routerList.length) {
        this.selectRouterName = this.routerList[index]
        this.routerList = this.routerList.slice(0,index)
      }
      console.log('routerList',this.routerList,this.selectRouterName);
      if (index< 0 && this.routerList.length >0 && this.routerList.length + index >=0) {
        this.selectRouterName = this.routerList[this.routerList.length + index ]
        this.routerList = this.routerList.slice(0,this.routerList.length + index)
      }
  }

  @action
  goBackFromRouteName = (routeName:String) =>{
    let pos = this.routerList.indexOf(routeName)
    pos?this.routerList = this.routerList.slice(0,pos):null
  }

  goBack = () =>{
    console.warn('back输出');
    this.goBackFromIndex(-1)
  }

  @action
  initRouteList = (routeName) =>{
    if (this.selectRouterName == '') {
      this.selectRouterName = routeName
      this.routerList.push(routeName)
    }
  }
}
export default new Router
