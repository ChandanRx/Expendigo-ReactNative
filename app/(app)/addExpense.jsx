import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Categories } from '../../constants/index.jsx'
import { addDoc } from 'firebase/firestore';
import { expensesRef } from '../../firebaseConfig.jsx';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomKeyboardView from '../../components/CustomKeyboardView.jsx';
import Loading from '../../components/Loading.jsx';

const AddExpense = () => {


  const data = useLocalSearchParams()
  const { id, city, state } = data

  console.log('data:', id);

  const titleRef = useRef('');
  const amountRef = useRef('')
  const [category, setCategory] = useState([])
  const [LoadingState, setLoadingState] = useState(false)
  const router = useRouter();


  const handleSubmitt = async () => {
    if (!titleRef.current || !amountRef.current || !category) {
      Alert.alert("Add Expense", "Please fill the all fields")
      return;
    }
    setLoadingState(true)
    let doc = await addDoc(expensesRef, {
      title: titleRef.current,
      amount: amountRef.current,
      category,
      tripId: id
    })
    setLoadingState(false)
    if (doc && doc.id) {
      router.back()
    }
  }

  return (

    <CustomKeyboardView style={{ marginTop: hp(5) }}>
      <View className='flex justify-between h-full'>
        <View>
          <View className='flex-row justify-center my-3 mt-5'>
            <Image source={require('../../assets/images/AddExp.png')} className='h-72 w-72' />
          </View>
          <View className='space-y-2 mx-4'>
            <Text className='text-indigo-950 text-lg font-bold'>For What ?</Text>
            <TextInput
              onChangeText={value => titleRef.current = value}
              className='p-4 bg-white rounded-full mb-3'
              placeholder='reason for spending money ?'
              placeholderTextColor={'gray'}
              style={{ fontSize: hp(2) }}
            />
            <Text className='text-indigo-950 text-lg font-bold'>How Much ?</Text>
            <TextInput
              onChangeText={value => amountRef.current = value}
              className='p-4 bg-white rounded-full mb-3'
              placeholder='How much amount do you spend ?'
              placeholderTextColor={'gray'}
              style={{ fontSize: hp(2) }}
            />
          </View>
          <View className='mx-4 space-x-2'>
            <Text className='text-lg font-bold text-indigo-950'>Category</Text>
            <View className='flex-row flex-wrap items-center'>
              {
                Categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) bgColor = 'bg-indigo-100'
                  return (
                    <View key={cat.value} className={`rounded-full ${bgColor} px-5 border border-gray-300 p-3 mb-2 mr-2`}>
                      <TouchableOpacity onPress={() => setCategory(cat.value)}>
                        <Text>{cat.title}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
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
                <Text className='text-center text-white text-lg font-bold'>Add Expense</Text>
              </TouchableOpacity>
            )
          }

        </View>
      </View>
    </CustomKeyboardView>
  )
}

export default AddExpense;