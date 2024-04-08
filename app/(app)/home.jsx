import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RandomImage from '../../assets/images/randomImages'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyList from '../../components/EmptyList';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/authContext';
import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { tripsRef } from '../../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {

  const router = useRouter()
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const isFocused = useIsFocused()

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user?.uid));

    const querySnapshot = await getDocs(q)
    const data = []
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    setTrips(data)
  }

  useEffect(() => {
    if (isFocused)
      fetchTrips();
  }, [isFocused])

  return (
    <View>
      <View className='flex-row justify-center items-center bg-blue-950 mx-4 rounded-xl mt-3 border border-blue-300'>
        <Image source={require('../../assets/images/home.png')} className='h-60 w-60' />
      </View>
      <View className='px-4 mt-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-indigo-950 font-bold text-xl'>Recent Trips</Text>
          <View className='bg-indigo-200 p-2 rounded-full border border-neutral-900'>
            <TouchableOpacity onPress={() => router.push('addTrip')}>
              <Text className='text-black font-medium'>Add Trips</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: hp(58) }}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"you haven't recorded any trip yet"} />}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            className='mx-1'
            keyExtractor={(trips) => trips.id}
            renderItem={({ item }) => {
              return (
                <View className='bg-gray-400 p-8 rounded-2xl mt-3 border border-gray-500 shadow-sm'>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/tripExpense', params: item })}>
                    <View>
                      <Image source={RandomImage()} className='h-36 w-36 mb-2' />
                      <Text className='text-indigo-950 font-bold text-center'>{item.city}</Text>
                      <Text className='text-indigo-950 text-xs text-center'>{item.state}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default Home;