/* @flow */
/*
  title 公用TabBar
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import RouterClass from '../Router/RouterClass';
import {intercept} from 'mobx';

export default class TabBar extends Component {

  constructor(props){
  	super(props);
    this.routeKeyList = Object.keys(this.props.RouterConfig)

    let initPos = this.props.TabNavigatorConfig.initialRouteName?this.routeKeyList.indexOf(this.props.TabNavigatorConfig.initialRouteName):0

    this.state = {
      tabBarFocus:initPos
    };

    intercept(RouterClass,'selectRouterName',change=>{
      let pos = this.routeKeyList.indexOf(change.newValue)
      if (pos != -1) {
        this.setState({tabBarFocus:pos})
      }
      return change
    })
  }

  // tabBar被按下
  _onTabBarDown = (index) =>{
    this.setState({tabBarFocus:index})
    RouterClass.navigate(this.routeKeyList[index])
  }

  render() {
    let {RouterConfig,TabNavigatorConfig} = this.props
    let mflexDirection = TabNavigatorConfig.tabBarPosition =='left'||TabNavigatorConfig.tabBarPosition=='right'?'column':'row'
    return (
      <View style={[styles.container,{flexDirection:mflexDirection}]}>
        {Object.keys(RouterConfig).map((el,i)=>{
          return (
            <TouchableOpacity
              key={'TabBar' +  i}
              onPress={()=>this._onTabBarDown(i)}
              style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={this.state.tabBarFocus==i?styles.isFocus:styles.isNotFocus}>{el}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',alignItems:'center'
  },
  isFocus:{
    color:'red'
  },
  isNotFocus:{
    color:'black'
  }
});
