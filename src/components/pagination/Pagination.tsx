import { PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalOfPages: number;
  returnPage: () => void;
  nextPage: () => void;
}

export default function Pagination({ currentPage, nextPage, returnPage, totalOfPages }: PaginationProps) {
  return (
    <div>
      <PaginationContent>
        {currentPage > 1 && 
          <PaginationItem>
            <PaginationPrevious onClick={returnPage} />
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < totalOfPages && <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>}
      </PaginationContent>
    </div>
  )
}