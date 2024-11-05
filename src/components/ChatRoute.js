import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ref, child, get, getDatabase } from "firebase/database";
import { useParams } from 'react-router-dom'

const ChatRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { chatId } = useParams();

    useEffect(() => {
        
        if (currentUser) {
            const chatRef = ref(getDatabase());
            get(child(chatRef, 'chat/'+chatId)).then((snapshot) => {
                let authorized = false;
                const data = snapshot.val();
                if(data.allowedUsers.includes(currentUser.uid)){
                    authorized = true;
                }

                setIsAuthorized(authorized);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
<<<<<<< HEAD
        } else {
            setIsLoading(false);
        }
=======

            get(child(chatRef, 'groupChat/'+chatId)).then((snapshot) => {
                let authorized = false;
                const data = snapshot.val();
                if(data.allowedUsers.includes(currentUser.uid)){
                    authorized = true;
                }

                setIsAuthorized(authorized);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }

        
>>>>>>> 58f1642 (group chat path added)
    }, [currentUser]);

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }


    if (!isAuthorized) {
        return <Navigate replace to="/home" />;
    }

<<<<<<< HEAD
    return children; // Render children if authorized
=======
    return children;
>>>>>>> 58f1642 (group chat path added)
};

export default ChatRoute;
