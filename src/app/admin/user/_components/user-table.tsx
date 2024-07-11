'use client'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { translatePosition, translateTeam } from '@/utils/format'
import { kstFormat } from '@/utils/date'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { GoogleIcon, KakaoIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const UserTable = ({ users, supabase }) => {
  const router = useRouter()

  const updateRoleHandler = async (id: string, role: string) => {
    const { error } = await supabase.auth.admin.updateUserById(id, { user_metadata: { role } })
    if (error) {
      toast.error(error.message)
    } else {
      router.refresh()
    }
  }

  return (
    <Table selectionMode="single" aria-label="도서 목록">
      <TableHeader>
        <TableColumn align="center">이름</TableColumn>
        <TableColumn align="center">직책</TableColumn>
        <TableColumn align="center">팀</TableColumn>
        <TableColumn align="center">이메일</TableColumn>
        <TableColumn align="center">공급자</TableColumn>
        <TableColumn align="center">권한</TableColumn>
        <TableColumn align="center">최근 로그인</TableColumn>
        <TableColumn align="center">액션</TableColumn>
      </TableHeader>
      <TableBody emptyContent="등록된 도서가 존재하지 않습니다">
        {users.map((user: any) => (
          <TableRow key={user.id} className="cursor-pointer">
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <Image src={user.user_metadata.avatar_url} width={30} height={30} alt={user.user_metadata.name} />
                {user.user_metadata.full_name}
              </div>
            </TableCell>
            <TableCell>{translatePosition(user.user_metadata.position)}</TableCell>
            <TableCell>{translateTeam(user.user_metadata.team)}</TableCell>
            <TableCell>{user.user_metadata.email}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                {user.app_metadata.provider === 'google' ? (
                  <GoogleIcon size={32} />
                ) : user.app_metadata.provider === 'kakao' ? (
                  <KakaoIcon />
                ) : null}
                {user.app_metadata.provider}
              </div>
            </TableCell>
            <TableCell>
              {user.user_metadata.role === 'ADMIN' ? (
                <Chip color="secondary">관리자</Chip>
              ) : (
                <Chip color="primary">유저</Chip>
              )}
            </TableCell>
            <TableCell>{kstFormat(new Date(user.last_sign_in_at), 'yyyy-MM-dd H:mm:ss')}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                {user.user_metadata.role === 'USER' ? (
                  <Button size="sm" color="success" onPress={() => updateRoleHandler(user.id, 'ADMIN')}>
                    관리자로 승급
                  </Button>
                ) : (
                  <Button size="sm" onPress={() => updateRoleHandler(user.id, 'USER')}>
                    유저로 강등
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
