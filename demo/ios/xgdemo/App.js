import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';  
import XgPush from 'xg_rn_plugin';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    setBtnStyle: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
        padding: 10
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffffff'
    }
});

class Button extends React.Component {
    render() {
        return <TouchableHighlight
            onPress={this.props.onPress}
            underlayColor='#e4083f'
            activeOpacity={0.5}
        >
            <View
                style={styles.setBtnStyle}>
                <Text
                    style={styles.textStyle}>
                    {this.props.title}
                </Text>
            </View>
        </TouchableHighlight>
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if (Platform.OS === 'ios') {
          XgPush.setEnableDebug(true)
          XgPush.startXg("1600001061", "IMC341U0L072")
        } else {
          
        }

        //DeviceToken回调
        this.onRegisteredDeviceToken = result => {
            console.log("===onRegisteredDeviceToken====:" + JSON.stringify(result))
        };
        XgPush.addOnRegisteredDeviceTokenListener(this.onRegisteredDeviceToken);

        //注册成功回调
        this.onRegisteredDone = result => {
            console.log("===onRegisteredDone====:" + JSON.stringify(result))
        };
        XgPush.addOnRegisteredDoneListener(this.onRegisteredDone);

        //注销推送服务回调
        this.unRegistered = result => {
            console.log("===unRegistered====:" + JSON.stringify(result))
        };
        XgPush.addUnRegisteredListener(this.unRegistered);

        //收到通知消息回调
        this.onReceiveNotificationResponse = result => {
            console.log("===onReceiveNotificationResponse====:" + JSON.stringify(result))
        };
        XgPush.addOnReceiveNotificationResponseListener(this.onReceiveNotificationResponse);

        //收到透传、静默消息回调
        this.onReceiveMessage = result => {
            console.log("===onReceiveMessage====:" + JSON.stringify(result))
        };
        XgPush.addOnReceiveMessageListener(this.onReceiveMessage);

        //设置角标回调仅iOS
        this.xgPushDidSetBadge = result => {
            console.log("===xgPushDidSetBadge====:" + JSON.stringify(result))
        };
        XgPush.addXgPushDidSetBadgeListener(this.xgPushDidSetBadge);

        //绑定账号和标签回调
        this.xgPushDidBindWithIdentifier = result => {
            console.log("===xgPushDidBindWithIdentifier====:" + JSON.stringify(result))
        };
        XgPush.addXgPushDidBindWithIdentifierListener(this.xgPushDidBindWithIdentifier);

        //解绑账号和标签回调
        this.xgPushDidUnbindWithIdentifier = result => {
            console.log("===xgPushDidUnbindWithIdentifier====:" + JSON.stringify(result))
        };
        XgPush.addXgPushDidUnbindWithIdentifierListener(this.xgPushDidUnbindWithIdentifier);

        //更新账号和标签回调
        this.xgPushDidUpdatedBindedIdentifier = result => {
            console.log("===xgPushDidUpdatedBindedIdentifier====:" + JSON.stringify(result))
        };
        XgPush.addXgPushDidUpdatedBindedIdentifierListener(this.xgPushDidUpdatedBindedIdentifier);

        //清除所有账号和标签回调
        this.xgPushDidClearAllIdentifiers = result => {
            console.log("===xgPushDidClearAllIdentifiers====:" + JSON.stringify(result))
        };
        XgPush.addXgPushDidClearAllIdentifiersListener(this.xgPushDidClearAllIdentifiers);

        //通知点击回调
        this.xgPushClickAction = result => {
            console.log("===xgPushClickAction====:" + JSON.stringify(result))
        };
        XgPush.addXgPushClickActionListener(this.xgPushClickAction);
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="绑定一个账号"
                        onPress={() => XgPush.bindWithIdentifier("XG_RN", 1)
                        }/>

                <Button title="解绑一个账号"
                        onPress={() => XgPush.unbindWithIdentifier("XG_RN", 1)
                        }/>

                <Button title="更新账号"
                        onPress={() => XgPush.updateBindIdentifiers([{'account':'XG_RN', 'accountType':0}], 1)
                        }/>
                
                <Button title="注册推送服务"
                        onPress={() => XgPush.startXg("1600001061", "IMC341U0L072")
                        }/>
                
                <Button title="注消推送服务"
                        onPress={() => XgPush.stopXg()
                        }/>
                
                <Button title="设置角标"
                        onPress={() => XgPush.setBadge(1)
                        }/>
                

            </View>
        );
    }

}
