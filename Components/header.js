import *as React from 'react'
import { StyleSheet } from 'react-native'
import {Header,Icon} from 'react-native-elements'


 const AppHeader =props=>{
    return(
    <Header
    leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => props.navigation.toggleDrawer()}/>}
    centerComponent={{text:props.title,style:{
        justifyContent:'center',
        alignItems:'center'
    }}}
    ></Header>
    )
}
export default AppHeader

const styles=StyleSheet.create({
    headerView:{
        justifyContent:'center',
        alignItems:'center'
    }
})