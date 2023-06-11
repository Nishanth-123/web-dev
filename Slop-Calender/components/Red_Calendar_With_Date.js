import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Red_Calendar_With_Date() {

    useEffect(()=>{
        const date=new Date();
        const year=date.getFullYear();
        const month=date.getMonth()+1;
        const day=date.getDate();
        
        const dateString=year+"-"+month+"-"+day;
        setCurrentDate(dateString);
    },[])
    const [currentDate, setCurrentDate]=useState('');

    function handleDayPress(day) {
        setCurrentDate(day.dateString);
    }

    return (
        <View
            style={styles.container}>
            <Calendar
                style={styles.calender} 
                current={currentDate}
                onDayPress={day => {
                    handleDayPress(day);
                }}/>
            <Text
                style={styles.date}>
                {currentDate}
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calender: {
        backgroundColor:'red',
        padding:10,
        width:300,
        height:350

    },
    date: {
        fontSize:18,
        fontWeight:'bold',
        margin:20
    }
});