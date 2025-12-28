import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Book } from '@/types';

export const useBooks = () => {
    return useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const { data } = await api.get<Book[]>('/bookings/account-books');
            return data;
        },
    });
};

export const useCreateBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newBook: { book_name: string }) => {
            const { data } = await api.post('/bookings/account-books', newBook);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });
};
