import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AccountType } from '@/types';

export const useAccountType = (user_id: number) => {
    return useQuery({
        queryKey: ['accountType', user_id],
        queryFn: async () => {
            const { data } = await api.get<AccountType[]>(`/bookings/account-type/user/${user_id}`);
            return data;
        },
        enabled: !!user_id,
    });
};
