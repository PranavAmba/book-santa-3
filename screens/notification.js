import *as React from 'react'
import {Text, View} from 'react-native'
import AppHeader from '../Components/header'
import db from '../config.js'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import { Icon, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'

export default class Notification extends React.Component{
    constructor(){
        super()
        this.state={
            allNotifications:[],
            targetedId:firebase.auth().currentUser.email
        }
    }

    render(){
        return(
        <View style={{flex:1}}>
            <AppHeader title='Notifications' navigation={this.props.navigation}></AppHeader>
            <View>
                {
                 this.state.allDonations.length==0
                ?(<View>
                <Text>List of all book donations</Text>
                </View>)                  
                :(
                     <FlatList
                          data={this.state.allNotifications}
                          renderItem={({item,i})=>{
                    <ListItem
                    key={i}
                    title={item.bookName}
                    subtitle={'message : '+item.status+'\n status : '+item.requestStatus}
                    leftElement={<Icon name='book' type='font-awsome' color='#696969' ></Icon>}
                    titleStyle={{color:'black',fontWeight:'bold'}}
                    rightElement={
                        <TouchableOpacity onPress={()=>{
                            this.sendBook(item)
                        }}>
                            <Text>{item.requestStatus==='donor interested'
                            ?'send book'
                            :'book sent'
                            }</Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                    ></ListItem>
                }}
                keyExtractor={(item,index)=>index.toString()}
                ></FlatList>
                    )
                }
                
            </View>
        </View>
        )
    }
    componentDidMount(){
        this.getAllNotifications()
    }
    getAllNotifications=()=>{
        db
        .collection('Notifications')
        .where('targetedUserId','==',this.state.targetedId)
        .onSnapshot((snapshot)=>{
            var temp=[]
            snapshot.docs.map((doc)=>{
                temp.push(doc.data())
            })
            this.setState({
                allNotifications:temp
            })
        })          
    }
}