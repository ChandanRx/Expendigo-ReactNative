import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../../firebaseConfig';
import { useAuth } from '../../context/authContext';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import Loading from '../../components/Loading';

const AddTrip = () => {
    const router = useRouter();
    const [LoadingState, setLoadingState] = useState(false)
    const cityRef = useRef("")
    const stateRef = useRef("")
    const { user } = useAuth()

    const handleSubmitt = async () => {
        if (!cityRef.current || !stateRef.current) {
            Alert.alert('Add Trip', 'Please fill the all fields')
            return;
        }

        setLoadingState(true)
        let doc = await addDoc(tripsRef, {
            city: cityRef.current,
            state: stateRef.current,
            userId: user?.uid
        });
        setLoadingState(false);
        if (doc && doc.id) {
            router.push('home')
        }
    }

    return (
        <CustomKeyboardView>
            <View style={{ marginTop: hp(5) }}>
                <View className='flex justify-between h-full'>
                    <View>
                        <View className='flex-row justify-center my-3 mt-5'>
                            <Image source={require('../../assets/images/1.png')} className='h-72 w-72' />
                        </View>
                        <View className='space-y-2 mx-4'>
                            <Text className='text-indigo-950 text-lg font-bold'>Which City ?</Text>
                            <TextInput
                                onChangeText={value => cityRef.current = value}
                                className='p-4 bg-white rounded-full mb-3'
                                placeholder='Type city name...'
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(2) }}
                            />
                            <Text className='text-indigo-950 text-lg font-bold'>Which State ?</Text>
                            <TextInput
                                onChangeText={value => stateRef.current = value}
                                className='p-4 bg-white rounded-full mb-3'
                                placeholder='Type state name...'
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(2) }}
                            />
                        </View>
                    </View>
                    <View className='bg-indigo-950 my-6 rounded-full p-3 shadow-sm mx-4 mb-8'>
                        {
                            LoadingState ? (
                                <View className='flex-row justify-center'>
                                        <Loading size={hp(4.5)} />
                                    </View>
                                ) : (
                                <TouchableOpacity onPress={handleSubmitt}>
                                    <Text className='text-center text-white text-lg font-bold'>Add Trip</Text>
                                </TouchableOpacity>

                            )
                        }

                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

export default AddTrip