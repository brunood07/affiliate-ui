import { Affiliate } from "@/app/affiliates/page";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";

interface AffiliatesListProps {
  list: Affiliate[]
}

export default function AffiliatesList(data: AffiliatesListProps) {
  const { list } = data;
  return (
    <Table className="max-w-[1080px] m-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Nome Completo</TableHead>
          <TableHead className="w-[200px]">Telefone</TableHead>
          <TableHead className="w-[200px]">Email</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((affiliate) => {
          return (
            <TableRow key={affiliate._id.value}>
              <TableCell className="font-medium">{affiliate.props.firstName} {affiliate.props.lastName}</TableCell>
              <TableCell>{affiliate.props.phoneNumber}</TableCell>
              <TableCell>{affiliate.props.email}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>)
          }
        )}
      </TableBody>
    </Table>
  )
}