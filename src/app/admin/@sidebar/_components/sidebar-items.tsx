import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Link } from '@nextui-org/link'

export const SidebarItems = () => {
  return (
    <div className="pr-6 py-6 overflow-y-auto max-h-full h-full -mr-6">
      <div className="w-full flex flex-col items-start justify-center px-1">
        <span className="text-foreground-500 text-tiny pl-1">관리</span>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:notification-unread-linear" />}
          as={Link}
          href={'/admin/notice'}
        >
          공지사항
        </Button>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:emoji-funny-circle-outline" />}
          as={Link}
          href={'/admin/event'}
        >
          이벤트
        </Button>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:user-broken" />}
          as={Link}
          href={'/admin/user'}
        >
          사용자
        </Button>
        <Divider orientation="vertical" className="w-full h-divider mt-2" />
      </div>
      <div className="w-full flex flex-col items-start justify-center px-1 mt-4">
        <span className="text-foreground-500 text-tiny pl-1">도서</span>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:notification-unread-linear" />}
          as={Link}
          href={'/admin/books'}
        >
          목록
        </Button>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:check-circle-outline" />}
          as={Link}
          href={'/admin/checkout'}
        >
          대여
        </Button>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:undo-left-round-square-outline" />}
          as={Link}
          href={'/admin/returns'}
        >
          반납
        </Button>
        <Button
          fullWidth
          variant="light"
          size="lg"
          className="justify-start ps-2"
          startContent={<Icon icon="solar:expressionless-square-outline" />}
          as={Link}
          href={'/admin/overdue'}
        >
          연체
        </Button>
      </div>
    </div>
  )
}
