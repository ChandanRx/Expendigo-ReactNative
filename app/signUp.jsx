import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Fontisto, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

const SignUp = () => {
    const router = useRouter();
    const {register} = useAuth()
    const [LoadingState, setLoadingState] = useState(false)

    const emailRef = useRef("")
    const passwordRef = useRef("")
    const usernameRef = useRef("")
    const countryRef = useRef("")


    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !countryRef.current) {
            Alert.alert('Sign Up', "Please fill the all fields")
            return;
        }
    setLoadingState(true)

    let response = await register(emailRef.current , passwordRef.current,usernameRef.current, countryRef.current)
    setLoadingState(false)

    if(!response.success){
        Alert.alert('Sign Up',response.msg)
    }

    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className='flex-1 gap-12'>
                <View className='items-center'>
                    <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/signUp.png')} />
                </View>
                <View className='gap-10'>
                    <Text style={{ fontSize: hp(5) }} className='font-bold tracking-wider text-center text-indigo-950'>Sign Up</Text>

                    {/*Inputs*/}

                    <View className='gap-4'>
                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-full'>
                            <Feather name='user' size={hp(2.7)} color={'gray'} />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-full'>
                            <Octicons name='mail' size={hp(2.7)} color={'gray'} />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Email Address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-full'>
                            <Octicons name='lock' size={hp(2.7)} color={'gray'} />
                            <TextInput
                                onChangeText={value => passwordRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Password'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                            />
                        </View>


                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-full'>
                            <Fontisto name='world-o' size={hp(2.7)} color={'gray'} />
                            <TextInput
                                onChangeText={value => countryRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Country Name'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/*submitt button*/}

                        <View>
                            {
                                LoadingState ? (
                                    <View className='flex-row justify-center'>
                                        <Loading size={hp(8)} />
                                    </View>
                                ) : (

                                    <View style={{ height: hp(6.5) }} className='bg-indigo-950 rounded-full justify-center items-center'>
                                        <TouchableOpacity onPress={handleRegister}>
                                            <Text style={{ fontSize: hp(2.7) }} className='text-white font-bold tracking-wider'>Sign Up  </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>

                        {/*Sign up text*/}

                        <View className='flex-row justify-center'>

                            <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Already Have an account ? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={{ fontSize: hp(1.8) }} className='font-bold text-indigo-950'>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

//271E4D

export default SignUp