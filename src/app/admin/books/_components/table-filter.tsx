'use client'

import { Select, SelectItem } from '@nextui-org/select'
import { Input } from '@nextui-org/input'

export const TableFilter = () => {
  return (
    <div className="w-full flex items-center justify-start gap-2">
      <Input type="text" size="lg" />
      <Select disallowEmptySelection label="카테고리" placeholder="카테고리 선택해주세요" className="max-w-xs">
        <SelectItem key="es">ㄴㅇㄹ</SelectItem>
        <SelectItem key="es1">ㄴㅇㄹ</SelectItem>
      </Select>
    </div>
  )
}
