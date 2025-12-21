import siteMetadata from '@/app/siteMetadata'
import { ButtonLink } from '@/components'
import { GitHub, LinkedIn } from '@/components/Icons'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const IconsGroup = ({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className="flex" {...props}>
    <ButtonLink href={siteMetadata.linkedin}>
      <LinkedIn />
    </ButtonLink>
    <ButtonLink className="ml-4" href={siteMetadata.github}>
      <GitHub />
    </ButtonLink>
  </div>
)
