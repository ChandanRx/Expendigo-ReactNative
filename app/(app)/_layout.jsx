import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import AddTripHeader from '../../components/AddTripHeader';
import TripExpenseHeader from '../../components/TripExpenseHeader';
import AddExpenseHeader from '../../components/AddExpenseHeader';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='home'
        options={{
          header: ()=> <HomeHeader/>
        }}
      />
      <Stack.Screen
        name='addTrip'
        options={{
          header : ()=> <AddTripHeader/>
        }}
      />
      <Stack.Screen
        name='tripExpense'
        options={{
          header : ()=> <TripExpenseHeader/>
        }}
      />
      <Stack.Screen
        name='addExpense'
        options={{
          header : ()=> <AddExpenseHeader/>
        }}
      />
    </Stack>
  )
}

export default _layout;