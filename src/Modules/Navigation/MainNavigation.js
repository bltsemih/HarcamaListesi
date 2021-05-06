import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import { useSelector } from 'react-redux';
import { userSelector } from '../../Modules/Auth/Redux/UserRedux';
import { colorNames, ThemeModes, useTheme, useThemedColors } from '../Theming';
import CalendarScreen from '../Screens/Calendar/CalendarScreen';

const MainNavigation = (props) => {
    const loggedInUser = useSelector(userSelector);
    const theme = useTheme();
    const colors = useThemedColors();
    const barStyle = theme === ThemeModes.light ? 'light-content' : 'dark-content';
    return (
        <>
            <StatusBar barStyle={barStyle} backgroundColor={colors[colorNames.header.background]}/>
            <NavigationContainer>
            {
                    loggedInUser ?
                    <CalendarScreen />
                    :
                    <AuthNavigation/>
                }
            </NavigationContainer>
        </>
    );
};

export default MainNavigation;
