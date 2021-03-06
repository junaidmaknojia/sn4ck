import React, {useEffect, useState} from "react";
import GlobalChat from '../GlobalChat';
import ChatHeader from '../ChatHeader';
import {getMessages} from '../../services/messages.js'
import {useSelector} from 'react-redux'
import { displayWrapper } from './ChannelDisplay.module.css'

const ChannelDisplay = () => {
    const currentChannel = useSelector(state => state.channels.current)
    const [ pastMessages, setPastMessages ] = useState(null);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            const result = await getMessages(currentChannel.id)
            if(result) setPastMessages(result);
            setLoaded(true);
            }
        )();
    }, [currentChannel])

    return (
        <div className={displayWrapper}>
            {loaded && <ChatHeader />}
            {!loaded && (<h1>Loading...</h1>)}
            {loaded && pastMessages && (<GlobalChat pastMessages={pastMessages.message} />)}
        </div>
    )
}

export default ChannelDisplay;
