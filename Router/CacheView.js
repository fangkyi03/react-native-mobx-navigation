/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {intercept} from 'mobx';
import Router from './RouterClass';

export default class CacheView extends PureComponent {

  constructor(props){
  	super(props);
  	this.state = {
      initView:this.props.initState
    };
    console.log('首次触发',this.state.initView,this.props.initState);
    intercept(Router,'selectRouterName',change=>{
      console.log('路由改变触发',this.props.routeName,this.state.initView);
      if (change.newValue == this.props.routeName && !this.state.initView) {
          console.log('初始化state',this.props.routeName,!this.state.initView);
          this.setState({initView:true})
          return null
      }
      console.log('初始化完毕',this.props.routeName,false);
      return change
    })
  }

  render() {
    const Component = this.props.component
    return (
      <View style={styles.container}>
        {this.state.initView
          ?<Component navigation={Router}/>
          :<View style={{height:'100%',width:'100%',backgroundColor:'white'}}></View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
