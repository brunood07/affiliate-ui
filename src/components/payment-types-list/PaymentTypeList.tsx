
import { Checkbox } from "../ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { PaymentTypeList } from "./PaymentTypeList.types"

interface PaymentTypesListProps {
  list: PaymentTypeList[]
}

export default function PaymentTypesList(props: PaymentTypesListProps) {
  const { list } = props;
  return (
    <Table className="max-w-[1080px] m-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Nome</TableHead>
          <TableHead className="w-[200px]">Quantidade</TableHead>
          <TableHead className="w-[200px]">Ativo</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.map((paymentType: PaymentTypeList) => {
          return (
            <TableRow key={paymentType._id.value}>
              <TableCell className="font-medium">{paymentType.props.name}</TableCell>
              <TableCell>{paymentType.props.quantity}</TableCell>
              <TableCell><Checkbox checked={paymentType.props.active} onChange={() => null} className="w-4 h-4" /></TableCell>
              <TableCell></TableCell>
            </TableRow>)
          }
        )}
      </TableBody>
    </Table>
  )
}