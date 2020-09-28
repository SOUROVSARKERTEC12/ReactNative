import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from "./DishdetailComponent";
import {View, Platform, Image, StyleSheet, ScrollView,Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,SafeAreaView} from "react-navigation";
import Home from "./HomeComponent";
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {Icon} from "react-native-elements";
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from "./ReservationComponent";
import Favorites from './FavoriteComponent';
import Login from "./LoginComponent";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name="menu" size={24}
                                  color= 'white'
                                  onPress={ () => navigation.toggleDrawer() } />
            })},
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA1"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'white'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'white'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'white'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              iconStyle={{ color: 'white' }}
                              onPress={ () => navigation.navigate('DrawerToggle') } />
        })
    }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
})

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              iconStyle={{ color: 'white' }}
                              onPress={ () => navigation.navigate('DrawerToggle') } />
        })
    }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
})

const LoginNavigator = createStackNavigator({
    Login: { screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              iconStyle={{ color: 'white' }}
                              onPress={ () => navigation.navigate('DrawerToggle') } />
        })
    }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login:
        { screen: LoginNavigator,
            navigationOptions: {
                title: 'Login',
                drawerLabel: 'Login',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ),
            }
        },
    Home:
        { screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon:({tintColor}) =>(
                    <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
                )
            }
        },
    Menu:
        { screen:MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu',drawerIcon:({tintColor}) =>(
                    <Icon name='list' type='font-awesome' size={24} color={tintColor}/>
                )
            },
        },
    Contact:
        { screen:ContactNavigator,
            navigationOptions: {
                title: 'Contact',
                drawerLabel: 'Contact Us',
                drawerIcon:({tintColor}) =>(
                    <Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>
                )
            },
        },
    About:
        { screen:AboutNavigator,
            navigationOptions: {
                title: 'About',
                drawerLabel: 'About Us',
                drawerIcon:({tintColor}) =>(
                    <Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>
                )
            },
        },
    Reservation:
        { screen: ReservationNavigator,
            navigationOptions: {
                title: 'Reserve Table',
                drawerLabel: 'Reserve Table',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ),
            }
        },
    Favorites:
        { screen: FavoritesNavigator,
            navigationOptions: {
                title: 'My Favorites',
                drawerLabel: 'My Favorites',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ),
            }
        }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});


const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };

    }
    onDishSelect(dishId) {
        this.setState({selectedDish: dishId})
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
