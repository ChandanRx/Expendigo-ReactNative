import { View, Text, Platform, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Image} from 'expo-image'
import {useAuth} from '../context/authContext'

const ios = Platform.OS == 'ios'
const HomeHeader = () => {
    const {logout} = useAuth()

    const handleLogout = async() =>{
           await logout()
    }

    const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop : ios ? top :top+10}} className='flex-row justify-between px-5 bg-indigo-950 pb-6 rounded-b-2xl shadow'>
      <View>
        <Text style={{fontSize:hp(3)}} className='font-semibold text-white'>Expendigo</Text>
      </View>
      <View className='bg-indigo-200 p-2 rounded-full border border-indigo-300'>
      <TouchableOpacity onPress={handleLogout}>
      <Text className='text-black font-medium'>Log Out</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader;