import { View, Text, Platform, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image'
import { useAuth } from '../context/authContext'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ios = Platform.OS == 'ios'
const AddTripHeader = () => {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className='justify-between px-5 bg-indigo-950 pb-6 rounded-b-2xl shadow'>
            <View className='flex justify-between relative'>
                <View className='absolute top-0 left-0'>
                    <TouchableOpacity onPress={()=>router.back()}>
                        <Ionicons name='chevron-back-circle-outline' color={'gray'} size={hp(5.8)} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: hp(3) }} className='font-semibold text-white text-center'>Add Trip</Text>

            </View>
        </View>
    )
}

export default AddTripHeader;