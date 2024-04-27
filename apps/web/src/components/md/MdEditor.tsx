import { cn } from '@acme/ui/util'
import {
  MDXEditor, type MDXEditorProps, headingsPlugin, listsPlugin, toolbarPlugin, quotePlugin,
  BlockTypeSelect, BoldItalicUnderlineToggles, ListsToggle, UndoRedo,
} from '@mdxeditor/editor'
import type { MDXEditorMethods, RealmPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './MdEditor.css'
import { forwardRef } from 'react'

export type MdEditorProps = {
  hideToolbar?: boolean
} & MDXEditorProps

const MdEditor = forwardRef<MDXEditorMethods, MdEditorProps>((
  {
    hideToolbar,
    className,
    ...rest
  },
  ref,
) => {
  const plugins = Array.of(
    listsPlugin(),
    headingsPlugin(),
    quotePlugin(),
    hideToolbar ? undefined : toolbarPlugin({
      toolbarContents: () => (
        <div className='flex flex-wrap'>
          {' '}
          <UndoRedo />
          <BlockTypeSelect />
          <BoldItalicUnderlineToggles />
          <ListsToggle />
        </div>
      )
    }),
    ...(rest.plugins || [])
  ).filter(Boolean) as RealmPlugin[]

  return (
    <MDXEditor
      ref={ref}
      className={cn(
        'md bg-base-100 textarea-bordered border rounded-btn',
        className,
      )}
      contentEditableClassName='text-base-content border-t border-t-base-content border-opacity-20'
      plugins={plugins}
      {...rest}
    />
  )
})
MdEditor.displayName = 'MdEditor'

export default MdEditor