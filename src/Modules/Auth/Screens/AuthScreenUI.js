import React, { useState } from 'react';

import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Platform,
    StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import AuthInput from '../Components/AuthInput';
import AuthButton from '../Components/AuthButton';

import getStyles from '../Styles/AuthScreenStyles';
import { useThemedStyles, colorNames, useThemedColors } from '../../Theming';
import { Texts, useLocalization, useLocale } from '../../Localization';
import { customUppercase } from '../../Localization/Utils/LocalUpperCase'

const AuthScreenUI = props => {

    const [isLogin, setIsLogin] = useState(true);
    const styles = useThemedStyles(getStyles);
    const Colors = useThemedColors(getStyles);
    const loc = useLocalization();

    const locale = useLocale();
    //custom uppercase to fix i to İ in turkish
    const loginUppercase = customUppercase(loc.t(Texts.login), locale);
    const signupUppercase = customUppercase(loc.t(Texts.signUp), locale);


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={0}>
                <StatusBar
                    backgroundColor={Colors[colorNames.auth.status]}
                    barStyle="dark-content" />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={Colors[colorNames.auth.background]}
                    style={{ flex: 1 }}>
                    <View style={styles.container} >

                        <View style={styles.appLogoContainer}>
                            <Image source={Colors[colorNames.image.appLogoLarge]} style={styles.imageLogo} />
                        </View>

                     
                       <View style={styles.authContainer}>
                       <TouchableOpacity
                            style={{flex:1}}
                            activeOpacity={1}
                            onPress={Keyboard.dismiss}

                        >

                            <View style={styles.inputsContainer}>
                                {
                                    isLogin ?
                                        null
                                        :
                                        <View style={styles.inputContainer}>
                                            <AuthInput
                                                value={props.nameValue}
                                                onChangeText={props.onChangeText_Name}
                                                autoCapitalize={'words'}
                                                placeholder={loc.t(Texts.username)} />
                                        </View>
                                }
                                <View style={styles.inputContainer}>
                                    <AuthInput
                                        value={props.emailValue}
                                        onChangeText={props.onChangeText_Email}
                                        autoCapitalize={'none'}
                                        placeholder={loc.t(Texts.email)} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <AuthInput
                                        value={props.passwordValue}
                                        onChangeText={props.onChangeText_Password}
                                        autoCapitalize={'none'}
                                        placeholder={loc.t(Texts.password)}
                                        secureTextEntry={true} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <AuthInput
                                        value={props.passwordConfirmValue}
                                        onChangeText={props.onChangeText_PasswordConfirm}
                                        autoCapitalize={'none'}
                                        placeholder={loc.t(Texts.passwordConfirm)}
                                        secureTextEntry={true} />
                                </View>
                            </View>

                            <View style={styles.buttonsContainer}>
                                <AuthButton
                                    onPress={isLogin ? props.onPress_SignIn : props.onPress_SignUp}
                                    disabled={false}
                                    text={isLogin ? loginUppercase : signupUppercase} />
                                <TouchableOpacity style={styles.signupTouchable} onPress={() => setIsLogin(!isLogin)}>
                                    <Text style={styles.signupText}>
                                        {isLogin ? loc.t(Texts.signUp) : loc.t(Texts.login)}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                       </View>
                    

                        <View style={styles.footerContainer}>
                            <View style={styles.imageFooter}>
                                <Image source={Colors[colorNames.image.backgroundImage]} style={styles.image} />
                            </View>
                        </View>
                        
                        </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

};

export default AuthScreenUI;