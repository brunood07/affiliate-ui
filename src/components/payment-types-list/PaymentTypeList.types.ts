
interface PaymentTypeListData {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentTypeList[];
}

interface PaymentTypeList {
  id: string;
  active: boolean;
  name: string;
  quantity: string;
}

export type { PaymentTypeListData, PaymentTypeList }