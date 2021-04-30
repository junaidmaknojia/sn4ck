import React, { useState, useEffect } from "react";
import EmojiModal from "../EmojiModal";
import styles from './MessageDisplay.module.css';

const MessageDisplay = ({message}) => {
    const date = new Date(message.created_at)
    const [ show, setShow ] = useState(false);

    const showModal = () => {
        setShow(true);
      }

    // <span>{newEmoji?newEmoji.emoji:''}</span>

    return (
        <div className={styles.message_wrapper}>
            <div className={styles.menuWrapper} >
                <button className={"emoji"} onClick={showModal}>emoji</button>
            </div>
            <EmojiModal show={show} setShow={setShow} message={message}/>
            <div className={styles.message_container}>
                <div className={styles.author_image}>
                    {message.user && <img className={styles.author_avatar} src={message.user.picture_url} />}
                </div>
                <div className={styles.text_container}>
                    <span className={styles.author_name}>
                        {message.user.username}
                    </span>
                    <span className={styles.message_timestamp}>
                        {date.getTime()}
                    </span>
                    <div className={styles.message_body}>
                        <pre className={styles.message_body__text}><p>{message.body}</p></pre>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
