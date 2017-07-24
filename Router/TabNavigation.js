/* @flow */

/*
  title 公用TabNavigation
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Platform
} from 'react-native';

import TabBar from '../View/TabBar';
import {intercept} from 'mobx';
import RouterClass from '../Router/RouterClass';
import CacheView from '../Router/CacheView';

export default TabNavigator = (
  RouterConfig,
  TabNavigatorConfig
) =>{
  const {width,height} = Dimensions.get('window')

  class TabNavigator extends PureComponent {
    constructor(props){
    	super(props);
      let {initialRouteName} = TabNavigatorConfig
      // 设置初始化路由
      this.initRoutePos = initialRouteName?Object.keys(RouterConfig).indexOf(initialRouteName):0

      this.routeKeyList = Object.keys(RouterConfig)

      // 初始化路由名字
      initialRouteName
      ?this.initRouteList(initialRouteName)
      :this.initRouteList(this.routeKeyList[0])

    	this.state = {
        position:new Animated.Value(this.initRoutePos)
      };

      intercept(RouterClass,'selectRouterName',change=>{
        console.log('变化路由',RouterClass.routerList);
        // console.warn('路由变化',change.newValue);
        let {newValue} = change
        let pos = this.routeKeyList.indexOf(newValue)
        let animationEnabled = typeof TabNavigatorConfig.animationEnabled!='undefined'?TabNavigatorConfig.animationEnabled:true
        if (pos!= -1) {
          if (!animationEnabled) {
            this.state.position.setValue(pos)
          }else {
            Animated.timing(this.state.position,{
              toValue:pos,
              duration:300,
              useNativeDriver:true
            }).start()
          }
        }
        return change
      })
    }

    // 初始化路由列表
    initRouteList = (routeName) =>{
      RouterClass.initRouteList(routeName)
    }

    // 获取路由配置信息
    static getRouterConfig (){
      return '测试数据'
    }

    // 渲染左侧TabBar
    _renderLeftTabBar = () =>{
      return (
        <View style={[styles.container,{flexDirection:'row'}]}>
          <View style={{height:'100%',width:49}}>
            <TabBar
              RouterConfig={RouterConfig}
              TabNavigatorConfig={TabNavigatorConfig}
            />
          </View>
          <View style={{width:width-49,height:'100%',overflow:'hidden',backgroundColor:'transparent'}}>
            {
              Object.keys(RouterConfig).map((el,i)=>{
                let {screen} = RouterConfig[el]
                console.log('pos',this.initRoutePos,i);
                return (
                    <Animated.View
                      key={'TabNavigator' + i}
                      style={{position:'absolute',left:0,top:0,bottom:0,right:0,
                      transform:[{
                        translateX:this.state.position.interpolate({
                          inputRange:[i,i+1],
                          outputRange:[0,-width+49]
                        })
                      }]}}>
                      {this.initRoutePos == i
                        ?  <CacheView component={screen} initState={true} routeName={el}/>
                        :  <CacheView component={screen} initState={false} routeName={el}/>
                      }
                    </Animated.View>
                )
              })
            }
          </View>
        </View>
      )
    }

    // 渲染右侧TabBar
    _renderRightTabBar = () =>{
      return (
        <View style={[styles.container,{flexDirection:'row'}]}>
          <View style={{width:width-49,height:'100%',overflow:'hidden',backgroundColor:'transparent'}}>
            {
              Object.keys(RouterConfig).map((el,i)=>{
                let {screen} = RouterConfig[el]
                console.log('pos',this.initRoutePos,i);
                return (
                    <Animated.View
                      key={'TabNavigator' + i}
                      style={{position:'absolute',left:0,top:0,bottom:0,right:0,
                      transform:[{
                        translateX:this.state.position.interpolate({
                          inputRange:[i,i+1],
                          outputRange:[0,-width+49]
                        })
                      }]}}>
                      {this.initRoutePos == i
                        ?  <CacheView component={screen} initState={true} routeName={el}/>
                        :  <CacheView component={screen} initState={false} routeName={el}/>
                      }
                    </Animated.View>
                )
              })
            }
          </View>
          <View style={{height:'100%',width:49}}>
            <TabBar
              RouterConfig={RouterConfig}
              TabNavigatorConfig={TabNavigatorConfig}
            />
          </View>
        </View>
      )
    }

    // 渲染顶部TabBar
    _renderTopTabBar = () =>{
        return (
          <View style={[styles.container]}>
            <View style={[styles.tabBar,{height:49,width:'100%',flexDirection:'row',}]}>
              <TabBar
                RouterConfig={RouterConfig}
                TabNavigatorConfig={TabNavigatorConfig}
              />
            </View>
            <View style={{height:height-49,width:'100%',overflow:'hidden',backgroundColor:'transparent'}}>
              {
                Object.keys(RouterConfig).map((el,i)=>{
                  let {screen} = RouterConfig[el]
                  console.log('pos',this.initRoutePos,i);
                  return (
                      <Animated.View
                        key={'TabNavigator' + i}
                        style={{position:'absolute',left:0,top:0,bottom:0,right:0,
                        transform:[{
                          translateX:this.state.position.interpolate({
                            inputRange:[i,i+1],
                            outputRange:[0,-width]
                          })
                        }]}}>
                        {this.initRoutePos == i
                          ?  <CacheView component={screen} initState={true} routeName={el}/>
                          :  <CacheView component={screen} initState={false} routeName={el}/>
                        }
                      </Animated.View>
                  )
                })
              }
            </View>
          </View>
        )
    }

    // 渲染底部TabBar
    _renderBottomTabBar = () =>{
      let offsetY = Platform.OS == 'ios'?69:69
      return (
        <View style={[styles.container]}>
          <View style={{width:width,height:height-offsetY,overflow:'hidden',backgroundColor:'transparent'}}>
            {
              Object.keys(RouterConfig).map((el,i)=>{
                let {screen} = RouterConfig[el]
                console.log('pos',this.initRoutePos,i);
                return (
                    <Animated.View
                      key={'TabNavigator' + i}
                      style={{position:'absolute',left:0,top:0,bottom:0,right:0,
                      transform:[{
                        translateX:this.state.position.interpolate({
                          inputRange:[i,i+1],
                          outputRange:[0,-width]
                        })
                      }]}}>
                      {this.initRoutePos == i
                        ?  <CacheView component={screen} initState={true} routeName={el}/>
                        :  <CacheView component={screen} initState={false} routeName={el}/>
                      }
                    </Animated.View>
                )
              })
            }
          </View>
          <View style={[styles.tabBar,{height:49,width:'100%',flexDirection:'row'}]}>
            <TabBar
              RouterConfig={RouterConfig}
              TabNavigatorConfig={TabNavigatorConfig}
            />
          </View>
        </View>
      )
    }

    render() {

      let tabBarPosition = TabNavigatorConfig.tabBarPosition?TabNavigatorConfig.tabBarPosition:'left'
      switch (tabBarPosition) {
        case 'left':
          return this._renderLeftTabBar()
        case 'right':
          return this._renderRightTabBar()
        case 'top':
          return this._renderTopTabBar()
        case 'bottom':
          return this._renderBottomTabBar()
        default:
          return this._renderLeftTabBar()
      }
    }
  }

  return TabNavigator

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:Platform.OS=='ios'?20:0
  },
  tabBar:{
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'rgb(147,147,147)'
  }
});
