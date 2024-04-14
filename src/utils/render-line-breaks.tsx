import { Fragment } from 'react'

// Функция для разбиения строки на строки по символу \n
export const renderLineBreaks = (text: string) => {
  return text.split('\n').map((line: string, index: number) => (
      <Fragment key={index}>
          {line}
          <br />
      </Fragment>
  ));
};
