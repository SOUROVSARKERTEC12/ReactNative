import React, {Component} from 'react';
import {Button, Modal, Picker, ScrollView, StyleSheet, Switch, Text, View, Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {
    static navigationOptions = {
        title: 'Reserve Table'
    }

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',

        }
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
        })
    }

    handleReservation = () => {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? '+ this.state.smoking +'\nDate and Time:' + this.state.date,
            [
                {text: 'Cancel', onPress: () => { console.log('Cancel Pressed'); this.resetForm();}, style: 'cancel'},
                {text: 'OK', onPress: () => { this.presentLocalNotification(this.state.date) ; this.resetForm(); }},
            ],
            { cancelable: false }
        );
    }

    async obtainNotification() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date)  {
        await this.obtainNotification();
        await Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }

    render() {
        let todayDate = new Date().toISOString().split('T')[0];
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={1000} delay={500}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                        >
                            <Picker.Item label='1' value='1'/>
                            <Picker.Item label='2' value='2'/>
                            <Picker.Item label='3' value='3'/>
                            <Picker.Item label='4' value='4'/>
                            <Picker.Item label='5' value='5'/>
                            <Picker.Item label='6' value='6'/>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(val) => this.setState({smoking: val})}
                        >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format='DD-MM-YYYY'
                            mode='date'
                            placeholder='select date and time'
                            minDate={todayDate}
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                }
                            }}
                            onDateChange={(date) => this.setState({date: date})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about the reservation rules.'
                        />
                    </View>

                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation;