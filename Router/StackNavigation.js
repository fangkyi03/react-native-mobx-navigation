/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PlatForm,
  Animated,
  Dimensions,
  Platform
} from 'react-native';

import Router from './RouterClass';
import CacheView from './CacheView';

import {intercept} from 'mobx';

export default StackNavigation = (
  RouterConfig,
  StackNavigatiorConfig
) =>{
  const {width,height} = Dimensions.get('window')

  class StackNavigation extends PureComponent {
    constructor(props){
    	super(props);
      let {initialRouteName} = StackNavigatiorConfig

      this.initRoutePos = initialRouteName?Object.keys(RouterConfig).indexOf(initialRouteName):0
      console.log('init',this.initRoutePos);
      this.routeKeyList = Object.keys(RouterConfig)

      initialRouteName
      ?this.initRouteList(initialRouteName)
      :this.initRouteList(this.routeKeyList[0])

    	this.state = {
        position:new Animated.Value(this.initRoutePos)
      };

      if (typeof RouterConfig[this.routeKeyList[0]].screen.getRouterConfig != 'undefined') {
        console.log('测试数据',RouterConfig[this.routeKeyList[0]].screen.getRouterConfig());
      }


      intercept(Router,'selectRouterName',change=>{
        console.log('变化路由',Router.routerList);
        let {newValue} = change
        let pos = this.routeKeyList.indexOf(newValue)
        if (pos!= -1) {
          Animated.timing(this.state.position,{
            toValue:pos,
            duration:300,
            useNativeDriver:true
          }).start()
        }
        return change
      })
    }

    // 初始化路由表
    initRouteList = (routeName) =>{
      Router.initRouteList(routeName)
    }

    static getRouterConfig(){
      return '测试数据'
    }

    render() {
      return (
        <View style={styles.container}>
        {
          Object.keys(RouterConfig).map((el,i)=>{
            let {screen} = RouterConfig[el]
            console.log('pos',this.initRoutePos,i);
            return (
                <Animated.View
                  key={'StackNavigation' + i}
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
      );
    }
  }

  return StackNavigation

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Platform.OS=='ios'?20:0,
    overflow:'hidden'
  },
});
