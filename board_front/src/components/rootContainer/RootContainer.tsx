/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react'
import * as s from './style';

interface RootContainerprops {
  children: ReactNode;
}

export default function RootContainer( { children }: RootContainerprops) {
  return (
    <div css={s.container}>
      {children}
    </div>
  )
}
