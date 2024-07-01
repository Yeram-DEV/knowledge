'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { FilterIcon } from '@/components/common/icons'
import { Link } from '@nextui-org/link'

export const SubHeader = () => {
  const pathname = usePathname()

  return (
    <div className="w-full flex z-30 sticky inset-x-0 top-16 left-0 right-0 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
      <Tabs
        selectedKey={pathname}
        fullWidth
        color="primary"
        variant="light"
        className=" overflow-auto"
        aria-label="category_tab"
      >
        <Tab key="/" title="추천" href="/" />
        <Tab key="/category/es" title="에세이" href="/category/es" />
        <Tab key="/category/sl" title="자기계발" href="/category/sl" />
        <Tab key="/category/em" title="경제경영" href="/category/em" />
        <Tab key="/category/fm" title="가정" href="/category/fm" />
        <Tab key="/category/rl" title="종교" href="/category/rl" />
        <Tab key="/category/sp" title="사회정치" href="/category/sp" />
        <Tab key="/category/at" title="예술" href="/category/at" />
        <Tab key="/category/hs" title="역사" href="/category/hs" />
        <Tab key="/category/hh" title="건강/취미" href="/category/hh" />
        <Tab key="/category/it" title="IT" href="/category/it" />
        <Tab key="/category/ns" title="과학" href="/category/ns" />
        <Tab key="/category/nv" title="소설/시" href="/category/nv" />
        <Tab key="/category/nc" title="만화" href="/category/nc" />
        <Tab key="/category/ck" title="요리" href="/category/ck" />
        <Tab key="/category/hm" title="인문/교양" href="/category/hm" />
      </Tabs>
      <Button isIconOnly variant="light" className="sm:hidden" as={Link} href={'/category_list'}>
        <FilterIcon fill={'#A1A1A1'} />
      </Button>
    </div>
  )
}
