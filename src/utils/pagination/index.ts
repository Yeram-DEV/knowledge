export const getPaginationData = (totalBooks: number, currentPage: number, pageSize: number) => {
  const totalPages = Math.ceil(totalBooks / pageSize)
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize - 1
  return { totalPages, start, end }
}
