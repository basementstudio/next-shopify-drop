import { useRouter } from 'next/dist/client/router'
import NextHead from 'next/head'
import { NextSeo, NextSeoProps } from 'next-seo'
import * as React from 'react'

import { useMedia } from '~/hooks/use-media'
import { defaultMeta, siteOrigin } from '~/lib/constants'

type Meta = {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
}

export type HeadProps = Meta & { rawNextSeoProps?: NextSeoProps }

export const Head = (props: HeadProps) => {
  const router = useRouter()
  const isDark = useMedia('(prefers-color-scheme: dark)')

  const nextSeoProps: NextSeoProps = React.useMemo(() => {
    return {
      title: props.title ?? defaultMeta.title,
      description: props.description ?? defaultMeta.description,
      canonical: `${siteOrigin}${router.pathname}`,
      openGraph: {
        images: [
          {
            url: props.ogImage ?? defaultMeta.ogImage,
            alt: props.title ?? defaultMeta.title,
            width: 1200,
            height: 630
          }
        ]
      },
      twitter: {
        cardType: 'summary_large_image',
        handle: defaultMeta.twitter.handle,
        site: defaultMeta.twitter.site
      },
      noindex: props.noIndex,
      ...props.rawNextSeoProps
    }
  }, [props, router.pathname])

  return (
    <>
      <NextSeo {...nextSeoProps} />
      <NextHead>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href={isDark ? '/favicon-dark.svg' : '/favicon.svg'} />
        <link rel="mask-icon" href="/favicon.svg" color="#000" />
      </NextHead>
    </>
  )
}
