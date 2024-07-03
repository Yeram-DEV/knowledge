const teamMapping: { [key: string]: string } = {
  management_support: '경영지원',
  joint_venture: '공동도급',
  education: '교육',
  planning: '기획',
  design_blue: '디자인 BLUE',
  design_red: '디자인 RED',
  marketing: '마케팅',
  service1: '서비스1',
  service2: '서비스2',
  sales: '세일즈',
  information_management: '정보관리',
  product_completion: '제품완성',
  consulting: '컨설팅',
  tf: 'TF',
  others: '기타'
}

const positionMapping: { [key: string]: string } = {
  head_of_department: '본부장',
  team_leader: '팀장',
  part_leader: '파트장',
  professional: '프로',
  manager: '매니저',
  intern: '인턴'
}

export function translateTeam(value: string): string {
  return teamMapping[value] || '알 수 없음'
}

export function translatePosition(value: string): string {
  return positionMapping[value] || '알 수 없음'
}
