'use client'

import { useMediaQuery } from '@/hooks'
import { Icon } from '@iconify/react'
import { Link } from '@nextui-org/link'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export const SidebarNav = () => {
  const supabase = createClient()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [expanded, setExpanded] = useState(isDesktop)

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.refresh()
  }, [router, supabase.auth])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <aside className="h-full flex flex-col items-start justify-center border-r border-divider">
      <div className="w-full p-4 pb-2 flex justify-end items-center">
        {!isDesktop && (
          <>
            <Button isIconOnly variant="light" onPress={() => setExpanded((curr) => !curr)}>
              <Icon icon="solar:sidebar-minimalistic-outline" width="1.5rem" height="1.5rem" />
            </Button>
          </>
        )}
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-start">
        <ul className="px-3">
          <span className="text-foreground-500 text-tiny">관리</span>
          <ul>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/notice'}>
                <Icon icon="solar:notification-unread-linear" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  공지사항
                </span>
              </Link>
            </li>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/event'}>
                <Icon icon="solar:emoji-funny-circle-outline" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  이벤트
                </span>
              </Link>
            </li>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/user'}>
                <Icon icon="solar:user-broken" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  사용자
                </span>
              </Link>
            </li>
          </ul>
        </ul>
        <ul className="px-3">
          <span className="text-foreground-500 text-tiny">도서</span>
          <ul>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/books'}>
                <Icon icon="solar:notification-unread-linear" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  목록
                </span>
              </Link>
            </li>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/checkout'}>
                <Icon icon="solar:check-circle-outline" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  대여
                </span>
              </Link>
            </li>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/returns'}>
                <Icon icon="solar:undo-left-round-square-outline" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  반납
                </span>
              </Link>
            </li>
            <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
              <Link size="lg" className="text-foreground" href={'/admin/overdue'}>
                <Icon icon="solar:expressionless-square-outline" />
                <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3 h-auto' : 'w-0 h-0'}`}>
                  연체
                </span>
              </Link>
            </li>
          </ul>
        </ul>
      </div>

      <div className={`w-full flex flex-col ${expanded ? 'items-start' : 'items-center'} justify-center`}>
        {!expanded ? (
          <Button as={Link} href="/" size="lg" color="success" variant="light" isIconOnly>
            <Icon icon="solar:round-arrow-left-outline" width={24} height={24} />
          </Button>
        ) : (
          <Button
            as={Link}
            href="/"
            size="lg"
            color="success"
            variant="light"
            className="justify-start"
            startContent={<Icon icon="solar:round-arrow-left-outline" width={24} height={24} />}
          >
            나가기
          </Button>
        )}
        {!expanded ? (
          <Button size="lg" color="danger" variant="light" onPress={handleLogout} isIconOnly>
            <Icon icon="solar:minus-circle-outline" width={24} height={24} />
          </Button>
        ) : (
          <Button
            size="lg"
            color="danger"
            variant="light"
            className="justify-start"
            startContent={<Icon icon="solar:minus-circle-outline" width={24} height={24} />}
            onPress={handleLogout}
          >
            로그아웃
          </Button>
        )}
      </div>
    </aside>
  )
}
