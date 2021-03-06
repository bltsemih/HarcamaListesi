import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
    Platform,
    FlatList,
    Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { addItem, getItemDetail, updateItem } from '../API/Firebase';
import { useLocalization, Texts } from '../../../Localization';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

//Assets
import { Fonts, Svgs } from '../../../Constants';
import styles from '../Styles/AddEditScreenStyles';


export const Categories = [
    {
        id: 1,
        categoryName: 'MARKET',
        image: require('../../../Assets/Images//CategoriesIcons/market.png')
    },
    {
        id: 2,
        categoryName: 'GİYİM',
        image: require('../../../Assets/Images//CategoriesIcons/giyim.png')
    },
    {
        id: 3,
        categoryName: 'FATURALAR',
        image: require('../../../Assets/Images//CategoriesIcons/bill.png')

    },
    {
        id: 4,
        categoryName: 'MEKAN',
        image: require('../../../Assets/Images//CategoriesIcons/mekan.png')
    },
    {
        id: 5,
        categoryName: 'EĞLENCE',
        image: require('../../../Assets/Images//CategoriesIcons/fun.png')
    },
    {
        id: 6,
        categoryName: 'TEKNOLOJİ',
        image: require('../../../Assets/Images//CategoriesIcons/tech.png')
    },
    {
        id: 7,
        categoryName: 'KOZMETİK',
        image: require('../../../Assets/Images//CategoriesIcons/care.png')
    },
    {
        id: 8,
        categoryName: 'SPOR',
        image: require('../../../Assets/Images//CategoriesIcons/spor.png')
    },
    {
        id: 9,
        categoryName: 'HEDİYE',
        image: require('../../../Assets/Images//CategoriesIcons/gift.png')
    },
];


const AddEditScreen = props => {

    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [itemDetail, setItemDetail] = useState('');
    const [categoryID, setCategoryID] = useState(0);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [expenseDate, setExpenseDate] = useState('');
    const [itemIsBought, setItemIsBought] = useState(false);
    const [isSelectedCategoryID, setIsSelectedCategoryID] = useState(!false);

    const loc = useLocalization();



    // Edit ekranı için gelen item'in id'si (eğer bir şey gönderilmemişse params: undefined oluyor)
    const itemKey = props.route.params?.itemKey;

    // Ekran ilk açıldığında title'ı belirlensin
    useEffect(() => {
        props.navigation.setOptions({
            title: itemKey ? 'DÜZENLE' : 'YENİ EKLE'
        })
    }, []);

    // Ekrana gelen bir itemKey varsa, item'in detayları çekilsim
    useEffect(() => {
        if (itemKey) {
            getItemDetail(itemKey, item => {
                // Gelen item'in özelliklerini state'e atalım
                setItemName(item.title);
                setItemCost(item.cost);
                setItemDetail(item.detail);
                setExpenseDate(item.expenseDate);
                setCategoryID(item.categoryID);
                setItemIsBought(item.isBought);
            });
        }
    }, []);


    const _onPress_AddEdit = () => {
        // State'teki değerlerden yeni bir item nesnesi oluşturalım
        const item = {
            key: itemKey,
            title: itemName,
            cost: itemCost,
            detail: itemDetail,
            categoryID: categoryID,
            date: date,
            expenseDate: expenseDate,
            isBought: itemIsBought,
        }

        const onComplete = () => {
            props.navigation.goBack();
        }
        if (itemKey) {
            // itemKey varsa güncellemedir
            updateItem(item, onComplete);
        }
        else {
            // Yoksa yeni ekliyoruzdur
            addItem(item, onComplete);
        }
    }

    const onChangeDate = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            setShow(false);
            setDate(currentDate);
            setExpenseDate(moment(currentDate).format('DD-MM-YYYY'));
        }

        else {
            const currentDate = selectedDate;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
            setExpenseDate(moment(currentDate).format('DD-MM-YYYY'));
        }
    };

    const showModeDate = () => {
        setShow(true);
        setMode('date');
    }

    const _onPress_CloseModal = () => {
        props.navigation.navigate('home-screen')
    }

    const _onPress_Category = (id) => {
        setCategoryID(id);
        setIsSelectedCategoryID(!false) ? {opacity: 1} : null; 

    }



    return (
        <View style={styles.maincontainer}>
            <KeyboardAvoidingView style = {{flex:1}}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content" />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    colors={["#FFFFFF", "#FFE1E1"]}
                    style={styles.maincontainer}>


                    <TouchableOpacity style={styles.exitButtonContainer} onPress={_onPress_CloseModal}>
                        <Svgs.CloseModalIcon width="40%" height="40%"></Svgs.CloseModalIcon>
                    </TouchableOpacity>


                    <View style={styles.categoriesButtonContainer}>
                        <FlatList
                            data={Categories}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => _onPress_Category(item.id)}
                                    style={styles.categoryTouchable}>
                                    <Image source={item.image}
                                    ></Image>
                                    <Text style={{ paddingTop: 10, color: 'grey', fontSize: Fonts.Sizes.twelve }}>{item.categoryName}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                        />

                    </View>


                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.verticalTitle}>{loc.t(Texts.verticalTitle)}</Text>
                        </View>
                        <View style={styles.rightContainer}>


                            <View style={styles.titleContainer}>
                                <Text style={styles.costTitle}>{loc.t(Texts.expenseAmount)}</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputCostContainer}>
                                    <Text style={styles.tlIcon}>{loc.t(Texts.currency)}</Text>
                                    <TextInput style={styles.inputCost}
                                        placeholderStyle={styles.inputCost}
                                        value={itemCost}
                                        onChangeText={setItemCost}
                                        placeholder='0'
                                        placeholderTextColor="#BC0336"
                                        keyboardType="number-pad" />
                                </View>

                                <View style={styles.inputInfoContainer}>

                                    <TextInput
                                        value={itemName}
                                        onChangeText={setItemName}
                                        style={styles.input}
                                        placeholder={loc.t(Texts.itemName)}
                                        placeholderTextColor="rgba(0,0,0,0.3)" />



                                    <TouchableOpacity onPress={showModeDate}>

                                        <TextInput
                                            value={expenseDate}
                                            onChangeText={setExpenseDate}
                                            style={styles.input}
                                            placeholder={loc.t(Texts.date)}
                                            placeholderTextColor="rgba(0,0,0,0.3)"
                                            editable={false}

                                        />

                                        {show === true && (
                                            <DateTimePicker
                                                testID='datePicker'
                                                value={date}
                                                mode={mode}
                                                display="default"
                                                onChange={onChangeDate}
                                            />
                                        )}


                                    </TouchableOpacity>

                                    <TextInput
                                        value={itemDetail}
                                        onChangeText={setItemDetail}
                                        style={styles.input}
                                        placeholder={loc.t(Texts.description)}
                                        placeholderTextColor="rgba(0,0,0,0.3)" />

                                </View>

                            </View>
                            <View style={styles.addButtonContainer}>
                                <TouchableOpacity onPress={_onPress_AddEdit}>
                                    <Svgs.AddButton></Svgs.AddButton>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddEditScreen;
