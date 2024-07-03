import { Image } from '@nextui-org/image'
import { translatePosition, translateTeam } from '@/utils/format'
import { User } from '@supabase/auth-js'

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <div className="w-full flex items-center justify-start gap-2 px-3">
      <Image src={user.user_metadata.avatar_url} width={40} height={40} alt="user avatar" />
      <div className="w-full flex flex-col items-start justify-center">
        <span className="text-tiny">
          {user.user_metadata.name} {translatePosition(user.user_metadata.position)}
        </span>
        <span className="text-tiny text-default-500">{translateTeam(user.user_metadata.team)}</span>
      </div>
    </div>
  )
}
