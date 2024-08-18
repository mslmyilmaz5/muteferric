import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import BASE_URL from '../utils/url';
export const useAuthUpdate = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const updateAboutOne = async(text) => {
        setIsLoading(true)
        setError(null); 
        if (!user) {
            setError('You must be logged in');
            setIsLoading(false);
            return;
        }
        
        const response = await fetch(`${BASE_URL}/user/update/aboutOne/${user.tokenUser.userId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({text}),
            credentials: 'include'
        });
        
        const json = await response.json();
        
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setIsLoading(false);
        }
    }



    const updateAboutTwo = async(text) => {
        setIsLoading(true)
        setError(null); 
        if (!user) {
            setError('You must be logged in');
            setIsLoading(false);
            return;
        }
        
        const response = await fetch(`${BASE_URL}/user/update/aboutTwo/${user.tokenUser.userId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({text}),
            credentials: 'include'
        });
        
        const json = await response.json();
     
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setIsLoading(false);
        }
    }


    return {updateAboutOne, updateAboutTwo, isLoading, error}
}