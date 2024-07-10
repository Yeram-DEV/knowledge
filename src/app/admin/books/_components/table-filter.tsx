'use client'

import { Select, SelectItem } from '@nextui-org/select'
import { Input } from '@nextui-org/input'
import { useUpdateRouterQuery } from '@/utils/queries'
import { Selection } from '@react-types/shared'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@nextui-org/link'

export const TableFilter = () => {
  const updateRouterQuery = useUpdateRouterQuery()
  const searchText = useSearchParams().get('st')
  const category = useSearchParams().get('category')

  const [searchValue, setSearchValue] = useState<string>(searchText ?? '')

  const handleSelectionChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0]
    updateRouterQuery({ category: selectedKey, page: 1 })
  }

  const handleSearch = () => {
    updateRouterQuery({ st: searchValue, page: 1 }) // search_text 파라미터로 검색값 업데이트
  }

  return (
    <div className="w-full flex items-center justify-between">
      <Button size="lg" color="success" variant="flat" as={Link} href={'/admin/books/registry'}>
        도서 등록
      </Button>
      <div className="w-full flex items-center justify-end gap-2">
        <Select
          label="카테고리"
          placeholder="카테고리 선택해주세요"
          color="primary"
          className="max-w-xs"
          selectedKeys={[category]}
          onSelectionChange={handleSelectionChange}
        >
          <SelectItem key="sl">자기계발</SelectItem>
          <SelectItem key="em">경제경영</SelectItem>
          <SelectItem key="hs">역사</SelectItem>
          <SelectItem key="at">예술</SelectItem>
          <SelectItem key="it">IT</SelectItem>
          <SelectItem key="es">에세이</SelectItem>
          <SelectItem key="nv">소설/시</SelectItem>
          <SelectItem key="sp">사회정치</SelectItem>
          <SelectItem key="ck">요리</SelectItem>
          <SelectItem key="hc">인문/교양</SelectItem>
          <SelectItem key="rl">종교</SelectItem>
          <SelectItem key="hh">건강/취미</SelectItem>
          <SelectItem key="nc">만화</SelectItem>
          <SelectItem key="fm">가정</SelectItem>
          <SelectItem key="lg">어학</SelectItem>
          <SelectItem key="ns">과학</SelectItem>
        </Select>
        <Input
          type="text"
          color="primary"
          className="max-w-xs"
          label="검색"
          placeholder="책 제목, 저자, 출판사를 검색하세요"
          onValueChange={setSearchValue}
          onClear={() => {
            setSearchValue('')
            handleSearch()
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
          value={searchValue}
        />
      </div>
    </div>
  )
}
