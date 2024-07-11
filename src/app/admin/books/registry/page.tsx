'use client'

import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { DatePicker } from '@nextui-org/date-picker'
import { I18nProvider } from '@react-aria/i18n'
import { Link } from '@nextui-org/link'
import { Select, SelectItem } from '@nextui-org/select'
import { useForm } from 'react-hook-form'
import { bookRegistryScheme, BookRegistryScheme } from '@/types/scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FileDropZone } from '@/app/admin/books/registry/_components'
import { toast } from 'sonner'

export default function BookRegistryPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<BookRegistryScheme>({
    resolver: zodResolver(bookRegistryScheme)
  })

  const [files, setFiles] = useState<File[]>([])

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('book_name', data.book_name)
    formData.append('author', data.author)
    formData.append('category', data.category)
    formData.append('publisher', data.publisher)
    formData.append('publication_date', data.publication_date)
    formData.append('description', data.description)
    formData.append('table_of_contents', data.table_of_contents)
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    try {
      const result = await fetch('/api/book', {
        method: 'POST',
        body: formData
      })

      const responseData = await result.json()

      if (responseData.book_data) {
        reset()
        setFiles([])
        toast.success(`${responseData.book_data.book_name} 등록완료`)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form
      className="relative w-full h-dvh flex flex-col items-center justify-start gap-8 p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex items-start justify-center gap-8">
        <FileDropZone setFiles={setFiles} files={files} />
        <div className="w-full flex flex-col items-center justify-start gap-4">
          <div className="w-full flex items-center justify-between gap-2">
            <Input
              isRequired
              type="text"
              label="책 제목"
              placeholder="책 제목을 입력해주세요"
              labelPlacement="outside"
              size="lg"
              {...register('book_name')}
              isInvalid={!!errors.book_name?.message}
              errorMessage={String(errors.book_name?.message ?? '')}
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <Input
              isRequired
              type="text"
              label="저자"
              placeholder="저자를 입력해주세요"
              labelPlacement="outside"
              size="lg"
              {...register('author')}
              isInvalid={!!errors.author?.message}
              errorMessage={String(errors.author?.message ?? '')}
            />
            <Select
              label="카테고리"
              placeholder="카테고리 선택해주세요"
              labelPlacement="outside"
              size="lg"
              {...register('category')}
              isInvalid={!!errors.category?.message}
              errorMessage={String(errors.category?.message ?? '')}
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
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <Input
              isRequired
              type="text"
              label="출판사"
              placeholder="출판사를 입력해주세요"
              labelPlacement="outside"
              size="lg"
              {...register('publisher')}
              isInvalid={!!errors.publisher?.message}
              errorMessage={String(errors.publisher?.message ?? '')}
            />
            <I18nProvider locale="ko-KR">
              <DatePicker
                isRequired
                showMonthAndYearPickers
                label="출판일"
                labelPlacement="outside"
                size="lg"
                {...register('publication_date')}
                onChange={(value) => {
                  if (value) {
                    const formattedDate = value.toString() // Or use any desired date formatting
                    setValue('publication_date', formattedDate, { shouldValidate: true })
                  } else {
                    setValue('publication_date', '', { shouldValidate: true })
                  }
                }}
                isInvalid={!!errors.publication_date?.message}
                errorMessage={String(errors.publication_date?.message ?? '')}
              />
            </I18nProvider>
          </div>

          <Textarea
            disableAutosize
            classNames={{ input: 'h-[350px]' }}
            isRequired
            label="작품소개"
            labelPlacement="outside"
            placeholder="작품소개를 넣어주세요"
            {...register('description')}
            isInvalid={!!errors.description?.message}
            errorMessage={String(errors.description?.message ?? '')}
          />
          <Textarea
            disableAutosize
            classNames={{ input: 'h-[350px]' }}
            isRequired
            label="목차"
            labelPlacement="outside"
            placeholder="목차를 넣어주세요"
            {...register('table_of_contents')}
            isInvalid={!!errors.table_of_contents?.message}
            errorMessage={String(errors.table_of_contents?.message ?? '')}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <Button color="danger" size="lg" variant="flat" as={Link} href="/admin/books" className="w-1/3">
          나가기
        </Button>
        <Button type="submit" fullWidth color="primary" size="lg" variant="flat">
          등록
        </Button>
      </div>
    </form>
  )
}
