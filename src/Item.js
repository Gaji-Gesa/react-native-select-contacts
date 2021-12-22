import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {View, Text, FlatList, Pressable, ActivityIndicator, TextInput} from 'react-native'
import CheckBox from '@react-native-community/checkbox';



const RenderItem =({item, stylePhone, styleName, showCheckBox, onLongPress, selectContact, onSimplePress, maxReached, max, isAlreadySelected = false})=>{
    const [toggleCheckBox, setToggleCheckBox] = useState(isAlreadySelected)
  
    useEffect(()=>{
      if(!showCheckBox){
        toggleCheckBox &&  setToggleCheckBox(false)
      }
    },[showCheckBox])
  
    const longPress =()=>{
      onLongPress()
      setToggleCheckBox(!toggleCheckBox)
      selectContact({
        name:item?.displayName ?? '',
        phoneNumber:item.phoneNumbers[0]?.number ?? ''
  
      })
    }

    const onPress =()=>{
      if(!(maxReached+1>max && !toggleCheckBox)){
        setToggleCheckBox(!toggleCheckBox)
        if(showCheckBox){
          selectContact({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.number ?? ''
      
          })
        }else{
          onSimplePress({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.number ?? ''
      
          })
        }
      }
  
    }
   
    return(
      <Pressable
      onPress={onPress}
      disabled={item.phoneNumbers[0]?.digits?.length===0}
      onLongPress={longPress}
      style={{flexDirection:'row', alignItems:'center', padding:10}}
      android_ripple={{color:'grey'}}
      >
        {showCheckBox && <CheckBox
   
    value={toggleCheckBox}
    tintColor='#0053DC'
    onFillColor='#0053DC'
    style={{marginEnd:10}}
    onValueChange={(newValue) =>{
      if(!(maxReached+1>max)){
        setToggleCheckBox(newValue)
        selectContact({
          name:item?.displayName ?? '',
          phoneNumber:item.phoneNumbers[0]?.number ?? ''
    
        })
      }else{
        if(toggleCheckBox){
          setToggleCheckBox(newValue)
          selectContact({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.number ?? ''
      
          })
        }
      }
    }}
  />}
        <View style={{height:40, width:40, marginEnd:10, backgroundColor:'#0053DC', justifyContent:'center', alignItems:'center', borderRadius:40/2 }}>
        <Text style={{color:'white', ...styleName}}>{item?.displayName?.substr(0, 1)}</Text>
        </View>
  
        <View>
        <Text style={styleName}>{item.displayName}</Text>
        <Text style={stylePhone}>{item.phoneNumbers[0]?.number ?? ''}</Text>
        </View>
       
      </Pressable>
    )
  }

  export default RenderItem
