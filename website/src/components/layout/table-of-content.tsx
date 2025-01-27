'use client'
import { useEffect, useState } from 'react'
import { Box, Stack, styled } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'
import { Typography } from '~/components/ui/typography'
import { useScrollSpy } from '~/lib/use-scroll-spy'

type Heading = {
  id: string
  text: string
}

export const TableOfContent = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const activeId = useScrollSpy(headings.map((item) => item.id))

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2'))
      .map((elem) => ({
        id: elem.id,
        text: elem.innerText,
      }))
      .filter((item) => item.text !== 'Make it yours') // TODO quickfix -.-
      .filter((item) => item.id !== '')
    setHeadings(elements)
  }, [])

  return headings.length > 0 ? (
    <Box
      display={{ base: 'none', xl: 'flex' }}
      position="fixed"
      width="48"
      top="28"
      mt="1px"
      bottom="0"
      right="max(0px, calc(100vw / 2 - 616px))"
    >
      <Stack gap="4">
        <Typography textStyle="sm" fontWeight="bold">
          On This Page
        </Typography>
        <Stack>
          {headings.map((heading, id) => (
            <styled.a
              key={id}
              href={`#${heading.id}`}
              aria-current={activeId === heading.id ? 'page' : undefined}
              className={link({ variant: 'toc' })}
              onClick={(e) => {
                e.preventDefault()
                document?.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              {heading.text}
            </styled.a>
          ))}
        </Stack>
      </Stack>
    </Box>
  ) : null
}
