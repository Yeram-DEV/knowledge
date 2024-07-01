'use client'

import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { ArrowLeftIcon } from '@/components/common/icons'
import { useRouter } from 'next/navigation'
import {
  FaBookBookmark,
  FaBowlFood,
  FaBuildingColumns,
  FaClock,
  FaComputer,
  FaCross,
  FaEarlybirds,
  FaFlask,
  FaHouse,
  FaPaintbrush,
  FaPersonRunning,
  FaRegLightbulb,
  FaRegMoon,
  FaSackDollar,
  FaUsersLine
} from 'react-icons/fa6'

export default function CategoryListPage() {
  const router = useRouter()

  const items = [
    {
      key: 'es',
      label: '에세이',
      href: '/category/es',
      icon: <FaBookBookmark size={'1.3em'} />
    },
    {
      key: 'sl',
      label: '자기계발',
      href: '/category/sl',
      icon: <FaRegLightbulb size={'1.3em'} />
    },
    {
      key: 'em',
      label: '경제경영',
      href: '/category/em',
      icon: <FaSackDollar size={'1.3em'} />
    },
    {
      key: 'fm',
      label: '가정',
      href: '/category/fm',
      icon: <FaHouse size={'1.3em'} />
    },
    {
      key: 'rl',
      label: '종교',
      href: '/category/rl',
      icon: <FaCross size={'1.3em'} />
    },
    {
      key: 'sp',
      label: '사회정치',
      href: '/category/sp',
      icon: <FaUsersLine size={'1.3em'} />
    },
    {
      key: 'at',
      label: '예술',
      href: '/category/at',
      icon: <FaPaintbrush size={'1.3em'} />
    },
    {
      key: 'hs',
      label: '역사',
      href: '/category/hs',
      icon: <FaClock size={'1.3em'} />
    },
    {
      key: 'hh',
      label: '건강/취미',
      href: '/category/hh',
      icon: <FaPersonRunning size={'1.3em'} />
    },
    {
      key: 'it',
      label: 'IT',
      href: '/category/it',
      icon: <FaComputer size={'1.3em'} />
    },
    {
      key: 'ns',
      label: '과학',
      href: '/category/ns',
      icon: <FaFlask size={'1.3em'} />
    },
    {
      key: 'nv',
      label: '소설/시',
      href: '/category/nv',
      icon: <FaRegMoon size={'1.3em'} />
    },
    {
      key: 'nc',
      label: '만화',
      href: '/category/nc',
      icon: <FaEarlybirds size={'1.3em'} />
    },
    {
      key: 'ck',
      label: '요리',
      href: '/category/ck',
      icon: <FaBowlFood size={'1.3em'} />
    },
    {
      key: 'hm',
      label: '인문/교양',
      href: '/category/hm',
      icon: <FaBuildingColumns size={'1.3em'} />
    }
  ]

  return (
    <div className="w-full px-1 py-2">
      <Button variant="light" size="lg" isIconOnly onPress={() => router.back()}>
        <ArrowLeftIcon />
      </Button>
      <Listbox items={items} aria-label="Category List" classNames={{ list: 'gap-4' }}>
        {(item) => (
          <ListboxItem
            as={Link}
            href={item.href}
            key={item.key}
            className="text-foreground"
            startContent={item.icon}
            classNames={{ title: '!text-xl ' }}
          >
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}
