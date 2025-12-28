export interface Book {
    id: number;
    book_name: string;
    user_id?: number;
    created_at?: string;
}

export interface Category {
    id: number;
    name: string;
    color: string;
    user_id?: number;
}

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    transaction_type: 'income' | 'expense';
    remark: string;
    category_id: number;
    account_id: number; // correlates to Book ID? Or account type? In mobile app logic seems account_id might be book_id or separate.
    // Looking at transaction_service.dart: getTransactions(int bookId) calls  /transactions/transactions/book/$bookId.
    // And transaction.dart has account_id and category_id.
    // Let's assume account_id might be the book_id for now, or unrelated.
    // But the getTransactions(bookId) returns list.
    user_id: number;
    datetime: string;
}

export interface CreateTransactionDTO {
    description: string;
    amount: number;
    transaction_type: 'income' | 'expense';
    remark: string;
    category_id: number;
    account_id: number;
    book_id: number; // API might require this if account_id isn't it.
}
