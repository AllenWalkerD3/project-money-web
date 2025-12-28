import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Transaction, CreateTransactionDTO } from '@/types';

export const useTransactions = (bookId: number) => {
    return useQuery({
        queryKey: ['transactions', bookId],
        queryFn: async () => {
            const { data } = await api.get<Transaction[]>(`/transactions/transactions/book/${bookId}`);
            return data;
        },
        enabled: !!bookId,
    });
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (transaction: CreateTransactionDTO) => {
            const { data } = await api.post('/transactions/transactions', transaction);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['transactions', variables.book_id] });
        },
    });
};
