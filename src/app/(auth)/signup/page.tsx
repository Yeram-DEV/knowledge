import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { createMeta } from '@/app/(auth)/signup/action'

export default async function SignupPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  console.log(user)

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-center bg-cartoon-pattern bg-no-repeat bg-cover bg-top">
        <Card
          className="w-full md:w-[528px] p-[16px] md:px-[48px] md:py-[64px] bg-transparent md:bg-content1"
          shadow="none"
        >
          <CardHeader className="w-full flex flex-col items-center justify-center gap-2">
            <Image
              src="https://static.yeram.co.kr/knowledge/book/assets/yeram.png"
              alt="Logo"
              width={130}
              height={120}
              priority
            />
            <span>지식센터</span>
            <div className="whitespace-pre-line word-break font-bold text-center text-2xl my-5">오성인을 지혜롭게</div>
          </CardHeader>
          <CardBody className="w-full flex flex-col items-center justify-center gap-4">
            <form action={createMeta} className="w-full flex flex-col items-center justify-center gap-4">
              <Input type="text" label="이름" defaultValue={user.user_metadata.full_name} />
              <select className="appearance-none w-full min-h-10 h-14 px-3 py-2 text-foreground-500 rounded-medium bg-default-100">
                <option value="">직책을 선택해주세요</option>
                <option value="head_of_department">본부장</option>
                <option value="team_leader">팀장</option>
                <option value="part_leader">파트장</option>
                <option value="professional">프로</option>
                <option value="manager">매니저</option>
                <option value="intern">인턴</option>
              </select>
              <select className="appearance-none w-full min-h-10 h-14 px-3 py-2 text-foreground-500 rounded-medium bg-default-100">
                <option value="">팀을 선택해주세요</option>
                <option value="management_support">경영지원</option>
                <option value="joint_venture">공동도급</option>
                <option value="education">교육</option>
                <option value="planning">기획</option>
                <option value="design_blue">디자인 BLUE</option>
                <option value="design_red">디자인 RED</option>
                <option value="marketing">마케팅</option>
                <option value="service1">서비스1</option>
                <option value="service2">서비스2</option>
                <option value="sales">세일즈</option>
                <option value="information_management">정보관리</option>
                <option value="product_completion">제품완성</option>
                <option value="consulting">컨설팅</option>
                <option value="tf">TF</option>
                <option value="others">기타</option>
              </select>
              <Button type="submit" fullWidth size="lg">
                저장
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
