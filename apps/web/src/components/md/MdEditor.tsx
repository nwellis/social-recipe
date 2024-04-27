import { cn } from '@acme/ui/util'
import {
  MDXEditor, type MDXEditorProps, headingsPlugin, listsPlugin, toolbarPlugin,
  BlockTypeSelect, BoldItalicUnderlineToggles, ListsToggle, UndoRedo,
  quotePlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export type MdEditorProps = {
} & MDXEditorProps

export default function MdEditor({
  className,
  ...rest
}: MdEditorProps) {

  return (
    <MDXEditor
      className={cn(
        ' rounded-xl input-bordered',
      )}
      plugins={[
        listsPlugin(),
        headingsPlugin(),
        quotePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <BlockTypeSelect />
            </>
          )
        })
      ]}
      {...rest}
    />
  )
}