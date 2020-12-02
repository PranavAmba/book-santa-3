import * as React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity, Alert , KeyboardAvoidingView} from 'react-native'
//import { FlatList, ScrollView } from 'react-native-gesture-handler'
import db from '../config.js'
import firebase from 'firebase'
import AppHeader from '../Components/header.js'

export default class Request extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            title:'',
            reason:''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <AppHeader title='Request' navigation={this.props.navigation}></AppHeader>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                    <TextInput placeholder='Title of book' style={styles.formTextInput} onChangeText={(info)=>{this.setState({
                        title:info
                    })}}></TextInput>
                    <TextInput placeholder='Why do you need this book?' style={styles.formTextInput} onChangeText={(info)=>{this.setState({
                        reason:info
                    })}}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={this.submitRequest}>
                       <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
            
        )
    }
    createUniqueId=()=>{
       return Math.random().toString(36).substring(7)
    }

     submitRequest=async()=>{
         db
        .collection('Request')
        .add({
            'userId':this.state.userId,
            'title':this.state.title,
            'reason':this.state.reason,
            'requestId':this.createUniqueId()
        })
        Alert.alert('done')
     }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    keyBoardStyle : { 
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
    }, 
    button:{ 
        width:"75%", 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:10, 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8, }, 
        shadowOpacity: 0.44, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop:20 
    }, 


})