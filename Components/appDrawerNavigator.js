import *as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { TabNavigator } from './tabNavigator';
import CustomSideBarMenu from './CSBM.js'
import Settings from '../screens/settings.js'
import MyDonations from '../screens/myDonations';

export const DrawerNavigator=createDrawerNavigator({
    Home:{screen:TabNavigator},
    Settings:{screen:Settings},
    MyDonations:{screen:MyDonations}
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})