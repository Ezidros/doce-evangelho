import React from 'react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  orders: {
    id: string
    amount: number
    benefit: number
    revenue: number
    createdAt: string
    updatedAt: string
    cakeId: string
  }[]
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  orders,
}: PaginationProps) {
  const createPageLink = (page: number) => {
    return `${basePath}?page=${page}`
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-4">
        {currentPage > 1 && (
          <li>
            <Link href={createPageLink(currentPage - 1)}>
              <span className="px-4 py-2 bg-transparent border rounded">
                Anterior
              </span>
            </Link>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <>
              {orders.length > 0 && (
                <li key={page}>
                  <Link href={createPageLink(page)}>
                    <span
                      className={`px-4 py-2 rounded ${
                        page === currentPage
                          ? 'bg-violet-500 text-zinc-100'
                          : 'bg-transparent border rounded'
                      }`}
                    >
                      {page}
                    </span>
                  </Link>
                </li>
              )}
            </>
          ),
        )}
        {currentPage < totalPages && (
          <li>
            <Link href={createPageLink(currentPage + 1)}>
              <span className="px-4 py-2 bg-transparent border rounded">
                Próxima
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
