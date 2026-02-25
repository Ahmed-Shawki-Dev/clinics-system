'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

export interface GenericPaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function GenericPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: GenericPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className='mt-6 mb-2 justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPreviousPage ? createPageURL(currentPage - 1) : '#'}
            className={!hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
            title='السابق'
          />
        </PaginationItem>

        <PaginationItem>
          <span className='text-sm font-medium text-muted-foreground px-4'>
            صفحة {currentPage} من {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? createPageURL(currentPage + 1) : '#'}
            className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
            title='التالي'
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
