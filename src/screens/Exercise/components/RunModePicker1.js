import React, { useState, useEffect } from 'react';
import { Text,Image,View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import * as Location from 'expo-location';
// import PlaylistSelectionBasic from '../PlaylistSelectionBasic';
// import SelectLoading from './SelectLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the Basic run on Run Tab on the Exercise page.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const RunModePicker = () => {

    const [selectToggle, setSelectToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(0);

    /**
     * This is a method to check the status of device's location service.
     */
    const seviceCheck = async() => {
        const check = await Location.hasServicesEnabledAsync()
        // console.log(check)
        if (check) {
            setStatus(1);
        } else {
            try {
                const pos = await Location.getCurrentPositionAsync();
                if (pos) {
                    setStatus(1);
                }
            } catch(error) {
                console.log(error);
                Alert.alert(
                    "GPS Location Service",
                    "Run function requires GPS Location Service enabled. Please enable GPS Location Service and try again.",
                    [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
                )
                setStatus(0);
            }
        }
    }

    /**
     * This is a render effect based on "status" state.
     */
    useEffect(() => {
        if (status === 1) {
            console.log("GPS Enabled")
            setSelectToggle(true);
        }
        if (status === 6) {
            console.log("Checking GPS Service")
            seviceCheck();
        }
    },[status])

    return (
        <View style={styles.componentContainer}>
            {/* <Text>Centered View</Text> */}
            <View style={styles.innercomponentContainer}>
                {/* Text */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Basic Run</Text>
                    
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>Go for a Run & Choose your own music.</Text>
                </View>
            </View>
            

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={() => {}}>
                <View>
                    <Image 
                        source={require('../../../assets/icons/ExercisePlay.png')}
                        resizeMode= 'contain'
                        style={styles.startIcon}
                    />
                    {/* <Text>Centered View</Text> */}
                </View>
            </TouchableOpacity>

            {/* Playlist Selection Popup */}
            {/* <PlaylistSelectionBasic
                selectToggle={selectToggle}
                setSelectToggle={setSelectToggle}
                mode={"Basic"}
                setIsLoading={setIsLoading}
            /> */}

            {/* Loading Modal */}
            {/* <SelectLoading
                isLoading={isLoading}
            />   */}
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        position: 'absolute', 
        top: height * 0.4, 
        left: width * 0.025 ,
        justifyContent: 'space-between', 
        flexDirection:'row',
        backgroundColor: '#4F535C', 
        width: width * 0.95,
        height: height * 0.2, 
        borderRadius:10,
        borderWidth: 0,
    }, 
    innercomponentContainer:{
        justifyContent: 'center', 
        backgroundColor: '#4F535C', 
        alignSelf:'flex-start',
        
        width: width * 0.65,
        height: height * 0.18, 
        borderWidth: 5,
        borderColor:'red',
    }, 
    titleContainer:{
        width: width * 0.65,
        height: height * 0.08,
        justifyContent:'center',
        alignSelf:'flex-start',
        paddingLeft: width * 0.7 * 0.1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#BABBBF',
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    descriptionContainer:{
        width: width * 0.63,
        height: height * 0.08,
        alignSelf:'flex-start',
        paddingLeft: width * 0.7 * 0.05,
        paddingTop: height * 0.08 * 0.1,
        // backgroundColor: 'purple',
    },
    descriptionText:{
        fontSize: 12,
        color: '#BABBBF',
    },
    startButton:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        alignSelf:'flex-end',
        // position: 'absolute',
        // right: ((width * 0.95) - (width * 0.65) - (height * 0.1)) * 0.5,
        // top:500,
        // right: 0,
        // top:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BABBBF',
        borderWidth: 5,
    },
    startIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        transform: [{translateX: width * 0.01}],
        tintColor: '#4F535C',
    },
})

export default RunModePicker;
