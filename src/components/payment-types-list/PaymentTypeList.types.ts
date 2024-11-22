
interface PaymentTypeListData {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentTypeList[];
}

interface PaymentTypeList {
  _id: {
    value: string;
  };
  props: {
    active: boolean;
    name: string;
    quantity: string;
  }
}

export type { PaymentTypeListData, PaymentTypeList }