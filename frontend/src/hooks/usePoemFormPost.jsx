import { useState } from 'react';
import { usePoemContext } from './usePoemContext';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/url';
export const usePoemFormPost = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = usePoemContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const submitPoem = async (title, poetry, isVisible, isUpdated, updatedPoemId, type) => {
       
        setIsLoading(true);
        setError(null);

        if (!user) {
            setError('You must be logged in');
            setIsLoading(false);
            return;
        }

        const url = isUpdated ? `${BASE_URL}/poetry/update/${updatedPoemId}` :  `${BASE_URL}/poetry/post`;
        const method = isUpdated ? 'PUT' : 'POST';


        const response = await fetch(url, {
            method,
            body: JSON.stringify({ title, poetry, isVisible, type }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            dispatch({ type: 'CREATE_POEM', payload: json });
            setIsLoading(false);
            <Link to="/myPoetries">MÜTEFERRİÇ</Link>
            window.location.reload(); 
        }

    };

    return { submitPoem, isLoading, error };
};
