import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Category } from '@/types';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await api.get<Category[]>('/categories/transactions/categories');
            return data;
        },
    });
};
