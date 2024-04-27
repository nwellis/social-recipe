import { cn } from '@acme/ui/util'
import {
  MDXEditor, type MDXEditorProps, headingsPlugin, listsPlugin, toolbarPlugin,
  BlockTypeSelect, BoldItalicUnderlineToggles, ListsToggle, UndoRedo,
  quotePlugin,
  RealmPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './MdEditor.css'

export type MdEditorProps = {
  hideToolbar?: boolean
} & MDXEditorProps

export default function MdEditor({
  hideToolbar,
  className,
  ...rest
}: MdEditorProps) {

  const plugins = Array.of(
    listsPlugin(),
    headingsPlugin(),
    quotePlugin(),
    hideToolbar ? undefined : toolbarPlugin({
      toolbarContents: () => (
        <>
          {' '}
          <UndoRedo />
          <BoldItalicUnderlineToggles />
          <ListsToggle />
          <BlockTypeSelect />
        </>
      )
    }),
    ...(rest.plugins || [])
  ).filter(Boolean) as RealmPlugin[]

  return (
    <MDXEditor
      className={cn(
        'md bg-base-100 textarea-bordered border rounded-btn',
        // 'md bg-base-100 border border-base-content border-opacity-20 rounded-xl',
      )}
      contentEditableClassName='text-base-content border-t border-t-base-content border-opacity-20'
      plugins={plugins}
      {...rest}
    />
  )
}