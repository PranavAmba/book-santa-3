import *as React from 'react'
import {Text, View} from 'react-native'
import AppHeader from '../Components/header'
import db from '../config.js'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import { Icon, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

export default class MyDonations extends React.Component{
    constructor(){
        super()
        this.state={
            allDonations:[],
            userId:firebase.auth().currentUser.email
        }
    }
    render(){
        return(
        <View style={{flex:1}}>
            <AppHeader title='My Donations' navigation={this.props.navigation}></AppHeader>
            {console.log(this.state.allDonations,'1122020')}
            <View style={styles.subContainer}>
                {
                    this.state.allDonations.length==0
                    ?(<View style={styles.subContainer}>
                        <Text>List of all book donations</Text>
                    </View>)
                    :(
                        <FlatList
                          data={this.state.allDonations}
                          renderItem={({item,i})=>{
                    <ListItem
                    key={i}
                    title={item.bookName}
                    subtitle={'Requested by : '+item.requestedBy+'\n status : '+item.requestStatus}
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
        this.getAllDonations()
    }

    getAllDonations=()=>{
        db
        .collection('MyDonation')
        .where('donorId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var temp = []
            snapshot.docs.map((doc)=>{
                var donation=doc.data()
                donation['docId']=doc.id
                temp.push(donation)
            })
            this.setState({
                allDonations:temp
            })
            console.log(this.state.allDonations,'AIR INDIA')
        })
    }
    sendBook=(bookDetails)=>{
        db
        .collection('MyDonation')
        .doc()
    }
}
const styles = StyleSheet.create({ 
    subContainer:{ 
        flex:1, 
        fontSize: 20, 
        justifyContent:'center', 
        alignItems:'center' 
    }, 
    button:{ 
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8 } 
    } 
    })
