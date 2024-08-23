
export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
       
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
};