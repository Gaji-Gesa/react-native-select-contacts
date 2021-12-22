import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {View, Text, FlatList, Pressable, ActivityIndicator, TextInput} from 'react-native'
import CheckBox from '@react-native-community/checkbox';

const getPhoneNumber = (phoneNumberr)=>{ 
  let phoneNumber = phoneNumberr
  if(phoneNumber?.length>0){
    if((phoneNumber?.substring(2,4) == '62') || (phoneNumber?.substring(2,4) == '65') || (phoneNumber?.substring(2,4) == '60') || (phoneNumber?.substring(2,4) == '91')){
      phoneNumber = phoneNumber?.slice(0,2) + phoneNumber?.slice(4)
    }else if(phoneNumber?.charAt(2) === '0'){
      phoneNumber = phoneNumber?.slice(0,2) + phoneNumber?.slice(3)
    }
  }

  return phoneNumber
}

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
        phoneNumber:item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits
  
      })
    }

    const onPress =()=>{
      if(!(maxReached+1>max && !toggleCheckBox)){
        setToggleCheckBox(!toggleCheckBox)
        if(showCheckBox){
          selectContact({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits
      
          })
        }else{
          onSimplePress({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits
      
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
          phoneNumber:item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits
    
        })
      }else{
        if(toggleCheckBox){
          setToggleCheckBox(newValue)
          selectContact({
            name:item?.displayName ?? '',
            phoneNumber:item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits
      
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
        <Text style={stylePhone}>{item.phoneNumbers[0]?.stringValue.length>0?item.phoneNumbers[0]?.stringValue:item.phoneNumbers[0]?.digits}</Text>
        </View>
       
      </Pressable>
    )
  }

  export default RenderItem